"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import {
  createDateLabel,
  formatCurrency,
  initialDashboardState,
} from "@/lib/dashboard-data";
import type {
  AccountId,
  ActionResult,
  ActivityItem,
  BillPaymentInput,
  DashboardCard,
  DashboardNotification,
  DashboardSettings,
  DashboardState,
  ExternalTransferInput,
  PasswordChangeInput,
  SupportMessageInput,
  TransferInput,
  TransferRecipient,
} from "@/types/dashboard";

type DashboardContextValue = {
  state: DashboardState;
  accounts: DashboardState["accounts"];
  accountList: DashboardState["accounts"][AccountId][];
  cards: DashboardCard[];
  primaryCard: DashboardCard;
  notifications: DashboardNotification[];
  transferRecipients: TransferRecipient[];
  unreadNotificationsCount: number;
  totalPortfolioBalance: number;
  transferBetweenAccounts: (input: TransferInput) => ActionResult;
  transferToRecipient: (input: ExternalTransferInput) => ActionResult;
  recordBlockedTransferAttempt: (input: ExternalTransferInput) => ActionResult;
  payBill: (input: BillPaymentInput) => ActionResult;
  toggleCardFrozen: (cardId: string) => ActionResult;
  updateCardLimit: (cardId: string, spendingLimit: number) => ActionResult;
  changePassword: (input: PasswordChangeInput) => ActionResult;
  setTwoFactorEnabled: (enabled: boolean) => ActionResult;
  updateSecurityAlert: (
    key: keyof DashboardState["security"]["alerts"],
    enabled: boolean
  ) => ActionResult;
  markNotificationRead: (notificationId: string) => ActionResult;
  markAllNotificationsRead: () => ActionResult;
  signOutDevice: (deviceId: string) => ActionResult;
  submitSupportMessage: (input: SupportMessageInput) => ActionResult;
  saveSettings: (settings: DashboardSettings) => ActionResult;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function roundAmount(value: number) {
  return Math.round(value * 100) / 100;
}

function maskAccountNumber(accountNumber: string) {
  return `•••• ${accountNumber.slice(-4)}`;
}

function prependItem<T>(current: T[], next: T, limit = 6) {
  return [next, ...current].slice(0, limit);
}

function activity(
  title: string,
  description: string,
  amount: number | undefined,
  tone: ActivityItem["tone"],
  kind: ActivityItem["kind"],
  status: ActivityItem["status"] = "Completed"
): ActivityItem {
  return {
    id: makeId(kind),
    title,
    description,
    amount,
    tone,
    dateLabel: createDateLabel(),
    status,
    kind,
  };
}

const restrictedTransferMessage =
  "For your Safety ,Your transfer cannot be completed because an access from a restricted area was noticed. Please visit the nearest branch with a valid government-issued ID for review.";

function dashboardNotification(
  title: string,
  message: string,
  tone: DashboardNotification["tone"] = "info"
): DashboardNotification {
  return {
    id: makeId("notification"),
    title,
    message,
    dateLabel: createDateLabel(),
    read: false,
    tone,
  };
}

export function DashboardStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DashboardState>(() =>
    structuredClone(initialDashboardState)
  );

  function transferBetweenAccounts({
    fromAccountId,
    toAccountId,
    amount,
    memo,
  }: TransferInput) {
    let result: ActionResult = {
      ok: false,
      message: "Unable to complete the transfer.",
    };

    setState((current) => {
      const fromAccount = current.accounts[fromAccountId];
      const toAccount = current.accounts[toAccountId];
      const parsedAmount = roundAmount(amount);

      if (fromAccountId === toAccountId) {
        result = {
          ok: false,
          message: "Choose two different accounts for this transfer.",
        };
        return current;
      }

      if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        result = {
          ok: false,
          message: "Enter a transfer amount greater than zero.",
        };
        return current;
      }

      if (fromAccount.availableBalance < parsedAmount) {
        result = {
          ok: false,
          message: `Insufficient funds in ${fromAccount.type.toLowerCase()}.`,
        };
        return current;
      }

      const descriptor = memo.trim() || "Internal relationship transfer";
      const globalActivity = activity(
        "Internal Transfer",
        `${fromAccount.type} to ${toAccount.type} • ${descriptor}`,
        parsedAmount,
        "neutral",
        "transfer"
      );
      const fromTransaction = activity(
        `Transfer to ${toAccount.type}`,
        `${toAccount.maskedNumber} • ${descriptor}`,
        parsedAmount,
        "debit",
        "transfer"
      );
      const toTransaction = activity(
        `Transfer from ${fromAccount.type}`,
        `${fromAccount.maskedNumber} • ${descriptor}`,
        parsedAmount,
        "credit",
        "transfer"
      );
      const transferNotification = dashboardNotification(
        "Transfer Complete",
        `${formatCurrency(parsedAmount)} moved to ${toAccount.type}.`,
        "success"
      );

      result = {
        ok: true,
        message: `Transferred ${formatCurrency(parsedAmount)} from ${fromAccount.type} to ${toAccount.type}.`,
      };

      return {
        ...current,
        accounts: {
          ...current.accounts,
          [fromAccountId]: {
            ...fromAccount,
            availableBalance: roundAmount(
              fromAccount.availableBalance - parsedAmount
            ),
            recentTransactions: prependItem(
              fromAccount.recentTransactions,
              fromTransaction
            ),
          },
          [toAccountId]: {
            ...toAccount,
            availableBalance: roundAmount(
              toAccount.availableBalance + parsedAmount
            ),
            recentTransactions: prependItem(
              toAccount.recentTransactions,
              toTransaction
            ),
          },
        },
        activities: prependItem(current.activities, globalActivity, 8),
        notifications: prependItem(current.notifications, transferNotification, 10),
      };
    });

    return result;
  }

  function transferToRecipient({
    fromAccountId,
    recipientType,
    recipientId,
    recipientName,
    email,
    bankName,
    routingNumber,
    accountNumber,
    amount,
    memo,
  }: ExternalTransferInput) {
    let result: ActionResult = {
      ok: false,
      message: "Unable to send the transfer.",
    };

    setState((current) => {
      const fromAccount = current.accounts[fromAccountId];
      const recipient = recipientId
        ? current.transferRecipients.find((item) => item.id === recipientId)
        : undefined;
      const parsedAmount = roundAmount(amount);
      const resolvedType = recipient?.type ?? recipientType;
      const resolvedName = recipientName.trim() || recipient?.name || "";
      const resolvedEmail = email?.trim() || recipient?.email || "";
      const resolvedBankName = bankName?.trim() || recipient?.bankName || "";
      const resolvedRouting = routingNumber?.trim() || recipient?.routingNumber || "";
      const resolvedAccountNumber =
        accountNumber?.trim() || recipient?.accountNumber || "";
      const referenceLabel = recipient?.destinationLabel;

      if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        result = {
          ok: false,
          message: "Enter a transfer amount greater than zero.",
        };
        return current;
      }

      if (fromAccount.availableBalance < parsedAmount) {
        result = {
          ok: false,
          message: `Insufficient funds in ${fromAccount.type.toLowerCase()}.`,
        };
        return current;
      }

      if (!resolvedName) {
        result = {
          ok: false,
          message: "Enter a recipient name before continuing.",
        };
        return current;
      }

      if (resolvedType === "User" && !resolvedEmail) {
        result = {
          ok: false,
          message: "Enter the recipient email address.",
        };
        return current;
      }

      if (
        resolvedType === "User" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resolvedEmail)
      ) {
        result = {
          ok: false,
          message: "Enter a valid email address.",
        };
        return current;
      }

      if (resolvedType === "Bank" && !resolvedBankName) {
        result = {
          ok: false,
          message: "Enter the destination bank name.",
        };
        return current;
      }

      if (resolvedType === "Bank" && !/^\d{9}$/.test(resolvedRouting)) {
        result = {
          ok: false,
          message: "Enter a valid 9-digit routing number.",
        };
        return current;
      }

      if (resolvedType === "Bank" && !/^\d{6,17}$/.test(resolvedAccountNumber)) {
        result = {
          ok: false,
          message: "Enter a valid bank account number.",
        };
        return current;
      }

      const detailParts =
        resolvedType === "User"
          ? [resolvedEmail, referenceLabel]
          : [
              resolvedBankName,
              `Routing ${resolvedRouting}`,
              `Acct ${referenceLabel || maskAccountNumber(resolvedAccountNumber)}`,
            ];
      const detailLabel = detailParts.filter(Boolean).join(" • ");
      const memoLabel = memo.trim();
      const targetLabel = [resolvedName, detailLabel].filter(Boolean).join(" • ");
      const transferTitle = resolvedType === "User" ? "User Transfer" : "Bank Transfer";
      const globalActivity = activity(
        transferTitle,
        [targetLabel, memoLabel].filter(Boolean).join(" • "),
        parsedAmount,
        "debit",
        "transfer"
      );
      const accountTransaction = activity(
        `Transfer to ${resolvedName}`,
        [resolvedType, detailLabel, memoLabel].filter(Boolean).join(" • "),
        parsedAmount,
        "debit",
        "transfer"
      );
      const transferNotification = dashboardNotification(
        "Transfer Sent",
        `${formatCurrency(parsedAmount)} sent to ${resolvedName}.`,
        "success"
      );

      result = {
        ok: true,
        message: `${formatCurrency(parsedAmount)} sent to ${resolvedName}.`,
      };

      return {
        ...current,
        accounts: {
          ...current.accounts,
          [fromAccountId]: {
            ...fromAccount,
            availableBalance: roundAmount(
              fromAccount.availableBalance - parsedAmount
            ),
            recentTransactions: prependItem(
              fromAccount.recentTransactions,
              accountTransaction
            ),
          },
        },
        activities: prependItem(current.activities, globalActivity, 8),
        notifications: prependItem(current.notifications, transferNotification, 10),
      };
    });

    return result;
  }

  function recordBlockedTransferAttempt({
    recipientType,
    recipientId,
    recipientName,
    email,
    bankName,
    routingNumber,
    accountNumber,
    amount,
    memo,
  }: ExternalTransferInput) {
    const parsedAmount =
      Number.isFinite(amount) && amount > 0 ? roundAmount(amount) : undefined;

    setState((current) => {
      const recipient = recipientId
        ? current.transferRecipients.find((item) => item.id === recipientId)
        : undefined;
      const resolvedType = recipient?.type ?? recipientType;
      const resolvedName = recipientName.trim() || recipient?.name || "Transfer Review";
      const resolvedEmail = email?.trim() || recipient?.email || "";
      const resolvedBankName = bankName?.trim() || recipient?.bankName || "";
      const resolvedRouting = routingNumber?.trim() || recipient?.routingNumber || "";
      const resolvedAccountNumber =
        accountNumber?.trim() || recipient?.accountNumber || "";

      const detailParts =
        resolvedType === "User"
          ? [resolvedEmail]
          : [
              resolvedBankName,
              resolvedRouting ? `Routing ${resolvedRouting}` : "",
              resolvedAccountNumber
                ? `Acct ${maskAccountNumber(resolvedAccountNumber)}`
                : "",
            ];
      const detailLabel = detailParts.filter(Boolean).join(" • ");
      const memoLabel = memo.trim();
      const description = [
        resolvedName,
        detailLabel,
        memoLabel,
        "Branch review required.",
      ]
        .filter(Boolean)
        .join(" • ");

      const failedActivity = activity(
        resolvedType === "User" ? "User Transfer Failed" : "Bank Transfer Failed",
        description,
        parsedAmount,
        "debit",
        "transfer",
        "Failed"
      );

      return {
        ...current,
        activities: prependItem(current.activities, failedActivity, 8),
      };
    });

    return {
      ok: false,
      message: restrictedTransferMessage,
    };
  }

  function payBill({ fromAccountId, billerId, amount, memo }: BillPaymentInput) {
    let result: ActionResult = {
      ok: false,
      message: "Unable to submit the bill payment.",
    };

    setState((current) => {
      const fromAccount = current.accounts[fromAccountId];
      const biller = current.billers.find((item) => item.id === billerId);
      const parsedAmount = roundAmount(amount);

      if (!biller) {
        result = {
          ok: false,
          message: "Choose a beneficiary before continuing.",
        };
        return current;
      }

      if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
        result = {
          ok: false,
          message: "Enter a bill amount greater than zero.",
        };
        return current;
      }

      if (fromAccount.availableBalance < parsedAmount) {
        result = {
          ok: false,
          message: `Insufficient funds in ${fromAccount.type.toLowerCase()}.`,
        };
        return current;
      }

      const descriptor = memo.trim() || biller.reference;
      const globalActivity = activity(
        `${biller.name} Payment`,
        `${fromAccount.type} • ${descriptor}`,
        parsedAmount,
        "debit",
        "payment"
      );
      const accountTransaction = activity(
        `${biller.name} Payment`,
        `${biller.category} • ${descriptor}`,
        parsedAmount,
        "debit",
        "payment"
      );
      const paymentNotification = dashboardNotification(
        "Payment Scheduled",
        `${formatCurrency(parsedAmount)} to ${biller.name}.`,
        "info"
      );

      result = {
        ok: true,
        message: `Scheduled ${formatCurrency(parsedAmount)} to ${biller.name}.`,
      };

      return {
        ...current,
        accounts: {
          ...current.accounts,
          [fromAccountId]: {
            ...fromAccount,
            availableBalance: roundAmount(
              fromAccount.availableBalance - parsedAmount
            ),
            recentTransactions: prependItem(
              fromAccount.recentTransactions,
              accountTransaction
            ),
          },
        },
        activities: prependItem(current.activities, globalActivity, 8),
        notifications: prependItem(current.notifications, paymentNotification, 10),
      };
    });

    return result;
  }

  function toggleCardFrozen(cardId: string) {
    let result: ActionResult = {
      ok: false,
      message: "Card status could not be updated.",
    };

    setState((current) => {
      const target = current.cards.find((card) => card.id === cardId);

      if (!target) {
        result = {
          ok: false,
          message: "Card not found.",
        };
        return current;
      }

      const nextFrozen = !target.frozen;
      const cardActivity = activity(
        nextFrozen ? "Card Frozen" : "Card Reactivated",
        `${target.name} status updated by client control.`,
        undefined,
        "neutral",
        "card"
      );
      const globalActivity = activity(
        nextFrozen ? "Card Frozen" : "Card Reactivated",
        `${target.name} status changed from the cards center.`,
        undefined,
        "neutral",
        "card"
      );
      const cardNotification = dashboardNotification(
        nextFrozen ? "Card Frozen" : "Card Active",
        nextFrozen
          ? `${target.name} has been frozen.`
          : `${target.name} is active again.`,
        nextFrozen ? "warning" : "success"
      );

      result = {
        ok: true,
        message: nextFrozen
          ? `${target.name} has been frozen.`
          : `${target.name} is active again.`,
      };

      return {
        ...current,
        cards: current.cards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                frozen: nextFrozen,
                activity: prependItem(card.activity, cardActivity),
              }
            : card
        ),
        activities: prependItem(current.activities, globalActivity, 8),
        notifications: prependItem(current.notifications, cardNotification, 10),
      };
    });

    return result;
  }

  function updateCardLimit(cardId: string, spendingLimit: number) {
    let result: ActionResult = {
      ok: false,
      message: "Spending limit could not be updated.",
    };

    setState((current) => {
      const target = current.cards.find((card) => card.id === cardId);
      const normalizedLimit = roundAmount(spendingLimit);

      if (!target) {
        result = {
          ok: false,
          message: "Card not found.",
        };
        return current;
      }

      if (!Number.isFinite(normalizedLimit) || normalizedLimit < 500) {
        result = {
          ok: false,
          message: "Choose a spending limit of at least $500.",
        };
        return current;
      }

      if (normalizedLimit > target.creditLimit) {
        result = {
          ok: false,
          message: "Spending limit cannot exceed the card credit limit.",
        };
        return current;
      }

      const cardActivity = activity(
        "Spending Limit Updated",
        `${target.name} spending limit set to ${formatCurrency(normalizedLimit)}.`,
        normalizedLimit,
        "neutral",
        "card"
      );
      const cardNotification = dashboardNotification(
        "Card Limit Updated",
        `${target.name} limit set to ${formatCurrency(normalizedLimit)}.`,
        "info"
      );

      result = {
        ok: true,
        message: `${target.name} spending limit updated successfully.`,
      };

      return {
        ...current,
        cards: current.cards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                spendingLimit: normalizedLimit,
                activity: prependItem(card.activity, cardActivity),
              }
            : card
        ),
        notifications: prependItem(current.notifications, cardNotification, 10),
      };
    });

    return result;
  }

  function changePassword({
    currentPassword,
    nextPassword,
    confirmPassword,
  }: PasswordChangeInput) {
    let result: ActionResult = {
      ok: false,
      message: "Password update could not be completed.",
    };

    setState((current) => {
      if (currentPassword.trim().length < 6) {
        result = {
          ok: false,
          message: "Enter your current password to continue.",
        };
        return current;
      }

      if (nextPassword.trim().length < 8) {
        result = {
          ok: false,
          message: "Use at least 8 characters for the new password.",
        };
        return current;
      }

      if (nextPassword !== confirmPassword) {
        result = {
          ok: false,
          message: "The new password confirmation does not match.",
        };
        return current;
      }

      if (currentPassword === nextPassword) {
        result = {
          ok: false,
          message: "Choose a new password that differs from the current one.",
        };
        return current;
      }

      const passwordActivity = activity(
        "Password Updated",
        "Password changed.",
        undefined,
        "neutral",
        "security"
      );
      const passwordNotification = dashboardNotification(
        "Password Changed",
        "Your sign-in password has been updated.",
        "info"
      );

      result = {
        ok: true,
        message: "Your password has been updated successfully.",
      };

      return {
        ...current,
        security: {
          ...current.security,
          lastPasswordChange: createDateLabel(),
        },
        activities: prependItem(current.activities, passwordActivity, 8),
        notifications: prependItem(current.notifications, passwordNotification, 10),
      };
    });

    return result;
  }

  function setTwoFactorEnabled(enabled: boolean) {
    const result: ActionResult = {
      ok: true,
      message: enabled
        ? "Two-factor verification is now enabled."
        : "Two-factor verification has been turned off.",
    };

    setState((current) => {
      const securityActivity = activity(
        enabled ? "Two-Factor Enabled" : "Two-Factor Disabled",
        "Two-factor setting updated.",
        undefined,
        "neutral",
        "security"
      );
      const securityNotification = dashboardNotification(
        enabled ? "Two-Factor Enabled" : "Two-Factor Disabled",
        enabled
          ? "Two-factor verification turned on."
          : "Two-factor verification turned off.",
        enabled ? "success" : "warning"
      );

      return {
        ...current,
        security: {
          ...current.security,
          twoFactorEnabled: enabled,
        },
        activities: prependItem(current.activities, securityActivity, 8),
        notifications: prependItem(current.notifications, securityNotification, 10),
      };
    });

    return result;
  }

  function updateSecurityAlert(
    key: keyof DashboardState["security"]["alerts"],
    enabled: boolean
  ) {
    setState((current) => ({
      ...current,
      security: {
        ...current.security,
        alerts: {
          ...current.security.alerts,
          [key]: enabled,
        },
      },
      notifications: prependItem(
        current.notifications,
        dashboardNotification(
          "Alert Settings",
          `${key.charAt(0).toUpperCase()}${key.slice(1)} alerts ${enabled ? "enabled" : "disabled"}.`,
          "info"
        ),
        10
      ),
    }));

    return {
      ok: true,
      message: "Alert settings updated.",
    };
  }

  function markNotificationRead(notificationId: string) {
    let result: ActionResult = {
      ok: false,
      message: "Notification not found.",
    };

    setState((current) => {
      const target = current.notifications.find(
        (notification) => notification.id === notificationId
      );

      if (!target) {
        return current;
      }

      result = {
        ok: true,
        message: "Notification marked as read.",
      };

      return {
        ...current,
        notifications: current.notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        ),
      };
    });

    return result;
  }

  function markAllNotificationsRead() {
    setState((current) => ({
      ...current,
      notifications: current.notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    }));

    return {
      ok: true,
      message: "All notifications marked as read.",
    };
  }

  function signOutDevice(deviceId: string) {
    let result: ActionResult = {
      ok: false,
      message: "Device session could not be updated.",
    };

    setState((current) => {
      const target = current.security.devices.find((device) => device.id === deviceId);

      if (!target) {
        result = {
          ok: false,
          message: "Device session not found.",
        };
        return current;
      }

      if (target.status === "Signed Out") {
        result = {
          ok: false,
          message: "This session has already been signed out.",
        };
        return current;
      }

      const securityActivity = activity(
        "Device Session Closed",
        `${target.name} was signed out from ${target.location}.`,
        undefined,
        "neutral",
        "security"
      );
      const securityNotification = dashboardNotification(
        "Device Signed Out",
        `${target.name} signed out.`,
        "info"
      );

      result = {
        ok: true,
        message: `${target.name} has been signed out.`,
      };

      return {
        ...current,
        security: {
          ...current.security,
          devices: current.security.devices.map((device) =>
            device.id === deviceId
              ? {
                  ...device,
                  status: "Signed Out",
                  lastActive: "Just now",
                }
            : device
          ),
        },
        activities: prependItem(current.activities, securityActivity, 8),
        notifications: prependItem(current.notifications, securityNotification, 10),
      };
    });

    return result;
  }

  function submitSupportMessage({ subject, message }: SupportMessageInput) {
    let result: ActionResult = {
      ok: false,
      message: "Your support request could not be sent.",
    };

    setState((current) => {
      if (!subject.trim()) {
        result = {
          ok: false,
          message: "Enter a subject for your message.",
        };
        return current;
      }

      if (message.trim().length < 12) {
        result = {
          ok: false,
          message: "Please include a bit more detail in your message.",
        };
        return current;
      }

      const nextTicket = {
        id: `ticket-${current.supportTickets.length + 204}`,
        subject: subject.trim(),
        message: message.trim(),
        channel: "Secure Message",
        updatedAt: "Just now",
        status: "Open" as const,
      };
      const supportActivity = activity(
        "Support Request Submitted",
        `${subject.trim()} sent to Client Support.`,
        undefined,
        "neutral",
        "support"
      );
      const supportNotification = dashboardNotification(
        "Message Sent",
        `${subject.trim()} sent to Client Support.`,
        "success"
      );

      result = {
        ok: true,
        message: "Your message has been sent.",
      };

      return {
        ...current,
        supportTickets: [nextTicket, ...current.supportTickets],
        activities: prependItem(current.activities, supportActivity, 8),
        notifications: prependItem(current.notifications, supportNotification, 10),
      };
    });

    return result;
  }

  function saveSettings(settings: DashboardSettings) {
    setState((current) => ({
      ...current,
      settings,
      notifications: prependItem(
        current.notifications,
        dashboardNotification(
          "Settings Updated",
          "Your profile and preferences have been saved.",
          "success"
        ),
        10
      ),
      user: {
        ...current.user,
        fullName: settings.profile.fullName,
        firstName: settings.profile.fullName.split(" ")[0] ?? settings.profile.fullName,
        email: settings.profile.email,
        phone: settings.profile.phone,
        relationshipManager: settings.profile.relationshipManager,
      },
    }));

    return {
      ok: true,
      message: "Your changes have been saved.",
    };
  }

  const accountList = [state.accounts.checking, state.accounts.savings];
  const unreadNotificationsCount = state.notifications.filter(
    (notification) => !notification.read
  ).length;
  const totalPortfolioBalance = accountList.reduce(
    (total, account) => total + account.availableBalance,
    0
  );

  const value: DashboardContextValue = {
    state,
    accounts: state.accounts,
    accountList,
    cards: state.cards,
    primaryCard: state.cards[0],
    notifications: state.notifications,
    transferRecipients: state.transferRecipients,
    unreadNotificationsCount,
    totalPortfolioBalance,
    transferBetweenAccounts,
    transferToRecipient,
    recordBlockedTransferAttempt,
    payBill,
    toggleCardFrozen,
    updateCardLimit,
    changePassword,
    setTwoFactorEnabled,
    updateSecurityAlert,
    markNotificationRead,
    markAllNotificationsRead,
    signOutDevice,
    submitSupportMessage,
    saveSettings,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useDashboard must be used within DashboardStateProvider.");
  }

  return context;
}
