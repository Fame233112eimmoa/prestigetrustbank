"use client";

import { useEffect, useState, type FormEvent } from "react";

import { formatCurrency, ukBankOptions } from "@/lib/dashboard-data";
import type {
  AccountId,
  TransferRecipient,
  TransferRecipientType,
} from "@/types/dashboard";

import { PageSectionHeader } from "@/components/dashboard/page-section-header";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import {
  AlertIcon,
  ClockIcon,
  MapPinIcon,
  ShieldIcon,
  XIcon,
} from "@/components/icons";

type FeedbackState = {
  tone: "success" | "danger";
  message: string;
};

const MANUAL_ENTRY = "__manual__";
const CUSTOM_BANK_ENTRY = "__custom-bank__";

function getBankSelectValue(bankName?: string) {
  if (!bankName) {
    return ukBankOptions[0] ?? CUSTOM_BANK_ENTRY;
  }

  return ukBankOptions.includes(bankName) ? bankName : CUSTOM_BANK_ENTRY;
}

function userDefaults(recipient?: TransferRecipient) {
  return {
    recipientId: recipient?.id ?? MANUAL_ENTRY,
    recipientName: recipient?.name ?? "",
    email: recipient?.email ?? "",
  };
}

function bankDefaults(recipient?: TransferRecipient) {
  return {
    recipientId: recipient?.id ?? MANUAL_ENTRY,
    recipientName: recipient?.name ?? "",
    bankName: getBankSelectValue(recipient?.bankName),
    customBankName:
      recipient?.bankName && !ukBankOptions.includes(recipient.bankName)
        ? recipient.bankName
        : "",
    routingNumber: recipient?.routingNumber ?? "",
    accountNumber: recipient?.accountNumber ?? "",
  };
}

export function ExternalTransferForm() {
  const { accounts, transferRecipients, recordBlockedTransferAttempt } = useDashboard();
  const userRecipients = transferRecipients.filter((recipient) => recipient.type === "User");
  const bankRecipients = transferRecipients.filter((recipient) => recipient.type === "Bank");
  const firstUserRecipient = userRecipients[0];
  const firstBankRecipient = bankRecipients[0];
  const initialBankState = bankDefaults(firstBankRecipient);
  const [form, setForm] = useState(() => ({
    fromAccountId: "checking" as AccountId,
    recipientType: "User" as TransferRecipientType,
    ...userDefaults(firstUserRecipient),
    bankName: initialBankState.bankName,
    customBankName: initialBankState.customBankName,
    routingNumber: initialBankState.routingNumber,
    accountNumber: initialBankState.accountNumber,
    amount: "",
    memo: "",
  }));
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState(15);

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const timeoutId = window.setTimeout(() => {
      setFeedback(null);
    }, 15000);
    const intervalId = window.setInterval(() => {
      setCountdownSeconds((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
      document.body.style.overflow = "";
    };
  }, [feedback]);

  const activeRecipients =
    form.recipientType === "User" ? userRecipients : bankRecipients;
  const selectedRecipient =
    activeRecipients.find((recipient) => recipient.id === form.recipientId) ?? null;
  const resolvedBankName =
    form.bankName === CUSTOM_BANK_ENTRY ? form.customBankName : form.bankName;

  function handleTransferTypeChange(nextType: TransferRecipientType) {
    setForm((current) => ({
      ...current,
      recipientType: nextType,
      ...(nextType === "User"
        ? userDefaults(firstUserRecipient)
        : bankDefaults(firstBankRecipient)),
    }));
  }

  function handleRecipientChange(nextRecipientId: string) {
    const recipient =
      activeRecipients.find((item) => item.id === nextRecipientId) ?? undefined;

    setForm((current) => ({
      ...current,
      ...(current.recipientType === "User"
        ? userDefaults(recipient)
        : bankDefaults(recipient)),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = recordBlockedTransferAttempt({
      fromAccountId: form.fromAccountId,
      recipientType: form.recipientType,
      recipientId: form.recipientId === MANUAL_ENTRY ? undefined : form.recipientId,
      recipientName: form.recipientName,
      email: form.recipientType === "User" ? form.email : undefined,
      bankName: form.recipientType === "Bank" ? resolvedBankName : undefined,
      routingNumber: form.recipientType === "Bank" ? form.routingNumber : undefined,
      accountNumber: form.recipientType === "Bank" ? form.accountNumber : undefined,
      amount: Number(form.amount),
      memo: form.memo,
    });

    setCountdownSeconds(15);
    setFeedback({
      tone: "danger",
      message: result.message,
    });
  }

  return (
    <>
      {feedback ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/72 p-4 backdrop-blur-md sm:p-6">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-live="assertive"
            className={`relative w-full max-w-[38rem] rounded-[2rem] border shadow-[0_28px_80px_rgba(8,20,38,0.35)] ${
              feedback.tone === "success"
                ? "border-emerald-200 bg-white text-emerald-700"
                : "border-rose-200 bg-white text-rose-700"
            }`}
          >
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/80 text-[var(--color-navy-950)]"
              aria-label="Dismiss transfer alert"
            >
              <XIcon className="h-4 w-4" />
            </button>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                  <AlertIcon className="h-8 w-8" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-rose-600">
                    Transfer Declined
                  </p>
                  <h3 className="mt-3 text-[1.8rem] font-semibold leading-tight text-[var(--color-navy-950)] sm:text-[2rem]">
                    Transfer Review Required
                  </h3>
                </div>
              </div>

              <p className="mt-6 text-base leading-8 text-[var(--color-slate-950)]">
                {feedback.message}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.35rem] border border-[var(--color-line)] bg-[var(--color-surface-soft)] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="h-5 w-5 text-rose-600" />
                    <span className="text-sm font-semibold text-[var(--color-navy-950)]">
                      Restricted Area
                    </span>
                  </div>
                </div>
                <div className="rounded-[1.35rem] border border-[var(--color-line)] bg-[var(--color-surface-soft)] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <ShieldIcon className="h-5 w-5 text-rose-600" />
                    <span className="text-sm font-semibold text-[var(--color-navy-950)]">
                      Branch Review
                    </span>
                  </div>
                </div>
                <div className="rounded-[1.35rem] border border-[var(--color-line)] bg-[var(--color-surface-soft)] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-5 w-5 text-rose-600" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-navy-950)]">
                        Auto Closes
                      </p>
                      <p className="mt-1 text-xs font-medium text-[var(--color-slate-700)]">
                        {countdownSeconds}s remaining
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setFeedback(null)}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy-950)] px-5 py-3 text-sm font-semibold text-white"
                >
                  Dismiss
                </button>
                <div className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                  This message closes automatically in {countdownSeconds} seconds.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <section className="panel rounded-[2.25rem] p-6 sm:p-7">
        <PageSectionHeader eyebrow="External Transfers" title="Send Money" />

        <form className="mt-7 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                From account
              </span>
              <select
                value={form.fromAccountId}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    fromAccountId: event.target.value as AccountId,
                  }))
                }
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
              >
                <option value="checking">
                  Checking • {formatCurrency(accounts.checking.availableBalance)}
                </option>
                <option value="savings">
                  Savings • {formatCurrency(accounts.savings.availableBalance)}
                </option>
              </select>
            </label>

            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Send to
              </span>
              <select
                value={form.recipientType}
                onChange={(event) =>
                  handleTransferTypeChange(event.target.value as TransferRecipientType)
                }
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
              >
                <option value="User">Send to User</option>
                <option value="Bank">Send to Bank</option>
              </select>
            </label>
          </div>

        {form.recipientType === "User" ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  Saved user
                </span>
                <select
                  value={form.recipientId}
                  onChange={(event) => handleRecipientChange(event.target.value)}
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                >
                  {userRecipients.map((recipient) => (
                    <option key={recipient.id} value={recipient.id}>
                      {recipient.name}
                    </option>
                  ))}
                  <option value={MANUAL_ENTRY}>Enter manually</option>
                </select>
              </label>

              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  Recipient name
                </span>
                <input
                  type="text"
                  value={form.recipientName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      recipientId: MANUAL_ENTRY,
                      recipientName: event.target.value,
                    }))
                  }
                  placeholder="Enter recipient name"
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                />
              </label>
            </div>

            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Email address
              </span>
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    recipientId: MANUAL_ENTRY,
                    email: event.target.value,
                  }))
                }
                placeholder="name@example.com"
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
              />
            </label>
          </>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  Saved payee
                </span>
                <select
                  value={form.recipientId}
                  onChange={(event) => handleRecipientChange(event.target.value)}
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                >
                  {bankRecipients.map((recipient) => (
                    <option key={recipient.id} value={recipient.id}>
                      {recipient.name}
                    </option>
                  ))}
                  <option value={MANUAL_ENTRY}>Enter manually</option>
                </select>
              </label>

              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  Recipient name
                </span>
                <input
                  type="text"
                  value={form.recipientName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      recipientId: MANUAL_ENTRY,
                      recipientName: event.target.value,
                    }))
                  }
                  placeholder="Enter recipient name"
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  Bank name
                </span>
                <select
                  value={form.bankName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      recipientId: MANUAL_ENTRY,
                      bankName: event.target.value,
                      customBankName:
                        event.target.value === CUSTOM_BANK_ENTRY
                          ? current.customBankName
                          : "",
                    }))
                  }
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                >
                  {ukBankOptions.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                  <option value={CUSTOM_BANK_ENTRY}>Bank not listed</option>
                </select>
              </label>

              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  Sort code
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={form.routingNumber}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      recipientId: MANUAL_ENTRY,
                      routingNumber: event.target.value.replace(/\D/g, "").slice(0, 6),
                    }))
                  }
                  placeholder="6-digit sort code"
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                />
              </label>
            </div>

            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Account number
              </span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={17}
                value={form.accountNumber}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    recipientId: MANUAL_ENTRY,
                    accountNumber: event.target.value.replace(/\D/g, "").slice(0, 17),
                  }))
                }
                placeholder="Enter account number"
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
              />
            </label>

            {form.bankName === CUSTOM_BANK_ENTRY ? (
              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  Enter bank name
                </span>
                <input
                  type="text"
                  value={form.customBankName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      recipientId: MANUAL_ENTRY,
                      customBankName: event.target.value,
                    }))
                  }
                  placeholder="Enter bank name"
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                />
              </label>
            ) : null}
          </>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2.5">
            <span className="block text-sm font-medium text-[var(--color-slate-950)]">
              Amount
            </span>
            <input
              type="number"
              min="1"
              step="0.01"
              value={form.amount}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  amount: event.target.value,
                }))
              }
              placeholder="0.00"
              className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
            />
          </label>

          <label className="space-y-2.5">
            <span className="block text-sm font-medium text-[var(--color-slate-950)]">
              Memo
            </span>
            <input
              type="text"
              value={form.memo}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  memo: event.target.value,
                }))
              }
              placeholder="Invoice 2048"
              className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
            />
          </label>
        </div>

        <div className="rounded-[1.65rem] bg-[var(--color-surface-soft)] px-5 py-5 text-sm leading-7 text-[var(--color-slate-700)]">
          <p className="font-semibold text-[var(--color-slate-950)]">
            {form.recipientName || selectedRecipient?.name || "Transfer preview"}
          </p>
          {form.recipientType === "User" ? (
            <>
              <p className="mt-1">Send to User</p>
              <p>{form.email || selectedRecipient?.email || "Enter recipient email"}</p>
              {selectedRecipient?.destinationLabel ? (
                <p>{selectedRecipient.destinationLabel}</p>
              ) : null}
            </>
          ) : (
            <>
              <p className="mt-1">Send to Bank</p>
              <p>{resolvedBankName || "Select or enter bank name"}</p>
              <p>
                {form.routingNumber || selectedRecipient?.routingNumber || "Enter sort code"}
              </p>
              <p>
                {form.accountNumber || selectedRecipient?.destinationLabel || "Enter account number"}
              </p>
            </>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-[var(--color-navy-950)] px-5 py-3.5 text-sm font-semibold text-white"
        >
          Send Transfer
        </button>
        </form>
      </section>
    </>
  );
}
