import type {
  ActivityItem,
  DashboardNotification,
  DashboardNavItem,
  DashboardState,
} from "@/types/dashboard";

function activity(
  id: string,
  title: string,
  description: string,
  amount: number | undefined,
  tone: ActivityItem["tone"],
  dateLabel: string,
  status: ActivityItem["status"],
  kind: ActivityItem["kind"]
): ActivityItem {
  return {
    id,
    title,
    description,
    amount,
    tone,
    dateLabel,
    status,
    kind,
  };
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

export function createDateLabel(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export const ukBankOptions = [
  "Barclays Bank",
  "HSBC UK Bank",
  "Lloyds Bank",
  "NatWest",
  "Santander UK",
  "Royal Bank of Scotland",
  "Nationwide Building Society",
  "Halifax",
  "TSB Bank",
  "Metro Bank",
];

export const dashboardNavItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Account Summary", icon: "overview" },
  { href: "/dashboard/accounts", label: "Accounts", icon: "accounts" },
  { href: "/dashboard/cards", label: "Cards", icon: "cards" },
  { href: "/dashboard/payments", label: "Payments", icon: "payments" },
  { href: "/dashboard/notifications", label: "Notifications", icon: "notifications" },
  { href: "/dashboard/security", label: "Security", icon: "security" },
  { href: "/dashboard/support", label: "Support", icon: "support" },
  { href: "/dashboard/settings", label: "Settings", icon: "settings" },
  { href: "/login", label: "Log Out", icon: "logout" },
];

function notification(
  id: string,
  title: string,
  message: string,
  dateLabel: string,
  tone: DashboardNotification["tone"],
  read = false
): DashboardNotification {
  return {
    id,
    title,
    message,
    dateLabel,
    tone,
    read,
  };
}

const checkingTransactions = [
  activity(
    "acct-checking-1",
    "Payroll Deposit",
    "Monthly salary deposit.",
    4200,
    "credit",
    "Apr 20",
    "Completed",
    "deposit"
  ),
  activity(
    "acct-checking-2",
    "Harbor Rent",
    "Rent payment.",
    1350,
    "debit",
    "Apr 19",
    "Completed",
    "payment"
  ),
  activity(
    "acct-checking-3",
    "Transfer to Reserve Savings",
    "Transfer to savings.",
    1200,
    "debit",
    "Apr 18",
    "Completed",
    "transfer"
  ),
];

const savingsTransactions = [
  activity(
    "acct-savings-1",
    "Transfer from Everyday Checking",
    "Transfer from checking.",
    1200,
    "credit",
    "Apr 18",
    "Completed",
    "transfer"
  ),
  activity(
    "acct-savings-2",
    "High-Yield Interest",
    "Interest payment.",
    84.55,
    "credit",
    "Apr 17",
    "Completed",
    "deposit"
  ),
  activity(
    "acct-savings-3",
    "Savings Deposit",
    "Savings contribution.",
    650,
    "credit",
    "Apr 14",
    "Completed",
    "deposit"
  ),
];

const globalActivities = [
  activity(
    "activity-1",
    "Payroll Deposit",
    "Salary deposit.",
    4200,
    "credit",
    "Apr 20",
    "Completed",
    "deposit"
  ),
  activity(
    "activity-2",
    "Harbor Rent",
    "Rent payment.",
    1350,
    "debit",
    "Apr 19",
    "Completed",
    "payment"
  ),
  activity(
    "activity-3",
    "Internal Transfer",
    "Checking to savings.",
    1200,
    "neutral",
    "Apr 18",
    "Completed",
    "transfer"
  ),
  activity(
    "activity-4",
    "Card Payment",
    "Card payment.",
    280,
    "debit",
    "Apr 18",
    "Completed",
    "card"
  ),
  activity(
    "activity-5",
    "Security",
    "Two-factor verification enabled.",
    undefined,
    "neutral",
    "Apr 16",
    "Reviewed",
    "security"
  ),
];

const notifications = [
  notification(
    "notification-1",
    "Transfer Posted",
    "Transfer to Prestige Reserve Savings completed.",
    "Apr 18",
    "success"
  ),
  notification(
    "notification-2",
    "Payment Due",
    "Signature Credit payment due Jul 26.",
    "Apr 20",
    "warning"
  ),
  notification(
    "notification-3",
    "Secure Message",
    "Travel notice confirmation received.",
    "Jun 20",
    "info"
  ),
  notification(
    "notification-4",
    "Security",
    "Two-factor verification enabled.",
    "Apr 16",
    "info",
    true
  ),
];

export const initialDashboardState: DashboardState = {
  user: {
    fullName: "MARIA COX WALKER",
    firstName: "MARIA",
    email: "maria.cox.walker@prestigetrustbank.com",
    phone: "+44 20 7946 0186",
    relationshipManager: "Natalie Bennett",
    branch: "London Private Banking Centre",
    memberSince: "2018",
    clientId: "PTB-10248",
  },
  accounts: {
    checking: {
      id: "checking",
      name: "Prestige Everyday Checking",
      type: "Checking Account",
      maskedNumber: "•••• 4182",
      availableBalance: 451809.9,
      status: "Active",
      recentTransactions: checkingTransactions,
    },
    savings: {
      id: "savings",
      name: "Prestige Reserve Savings",
      type: "Savings Account",
      maskedNumber: "•••• 7721",
      availableBalance: 109087,
      status: "Growth",
      recentTransactions: savingsTransactions,
    },
  },
  cards: [
    {
      id: "card-signature",
      name: "Prestige Signature Credit",
      type: "Signature Credit",
      holder: "MARIA COX WALKER",
      maskedNumber: "•••• 4829",
      expiry: "04/30",
      network: "Visa Signature",
      creditLimit: 25000,
      availableCredit: 18240,
      spendingLimit: 6000,
      rewards: 18420,
      frozen: false,
      activity: [
        activity(
          "card-activity-1",
          "Aster House Dining",
          "Dining purchase.",
          148.2,
          "debit",
          "Apr 20",
          "Completed",
          "card"
        ),
        activity(
          "card-activity-2",
          "Orchid Air",
          "Travel purchase.",
          820,
          "debit",
          "Apr 17",
          "Completed",
          "card"
        ),
      ],
    },
    {
      id: "card-reserve",
      name: "Prestige Reserve Debit",
      type: "Reserve Debit",
      holder: "MARIA COX WALKER",
      maskedNumber: "•••• 1093",
      expiry: "11/29",
      network: "Mastercard World",
      creditLimit: 5000,
      availableCredit: 5000,
      spendingLimit: 2500,
      rewards: 6420,
      frozen: false,
      activity: [
        activity(
          "card-activity-3",
          "Harbor Market",
          "Debit purchase.",
          84.7,
          "debit",
          "Apr 19",
          "Completed",
          "card"
        ),
        activity(
          "card-activity-4",
          "Wallet Token Added",
          "Digital wallet added.",
          undefined,
          "neutral",
          "Apr 15",
          "Completed",
          "card"
        ),
      ],
    },
  ],
  activities: globalActivities,
  billers: [
    {
      id: "biller-utilities",
      name: "Thames Utilities",
      category: "Utilities",
      reference: "Acct • 4021",
    },
    {
      id: "biller-insurance",
      name: "Northline Insurance",
      category: "Insurance",
      reference: "Policy • 1884",
    },
    {
      id: "biller-internet",
      name: "Harbour Fibre",
      category: "Internet",
      reference: "Service • 7740",
    },
    {
      id: "biller-property",
      name: "Ridgeview Property Services",
      category: "Property",
      reference: "Client • 5912",
    },
  ],
  transferRecipients: [
    {
      id: "recipient-user-1",
      name: "Ariana Cole",
      type: "User",
      destinationLabel: "PTB •••• 6601",
      email: "ariana.cole@gmail.com",
    },
    {
      id: "recipient-user-2",
      name: "Devon Mercer",
      type: "User",
      destinationLabel: "PTB •••• 1847",
      email: "devon.mercer@aol.com",
    },
    {
      id: "recipient-user-3",
      name: "Naomi Blake",
      type: "User",
      destinationLabel: "PTB •••• 9120",
      email: "naomi.blake@gmail.com",
    },
    {
      id: "recipient-bank-1",
      name: "Kensington Property Services",
      type: "Bank",
      destinationLabel: "•••• 1021",
      bankName: "Barclays Bank",
      routingNumber: "203012",
      accountNumber: "45521021",
    },
    {
      id: "recipient-bank-2",
      name: "London Mortgage Services",
      type: "Bank",
      destinationLabel: "•••• 4990",
      bankName: "HSBC UK Bank",
      routingNumber: "401276",
      accountNumber: "78234990",
    },
    {
      id: "recipient-bank-3",
      name: "Manchester Logistics Ltd",
      type: "Bank",
      destinationLabel: "•••• 5077",
      bankName: "Lloyds Bank",
      routingNumber: "309674",
      accountNumber: "63455077",
    },
  ],
  notifications,
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: "Mar 28",
    devices: [
      {
        id: "device-1",
        name: "MacBook Pro - Safari",
        location: "London, UK",
        lastActive: "Active now",
        status: "Current Session",
      },
      {
        id: "device-2",
        name: "iPhone 15 - Prestige App",
        location: "London, UK",
        lastActive: "Today, 8:42 AM",
        status: "Trusted Device",
      },
      {
        id: "device-3",
        name: "iPad Air - Web Access",
        location: "Manchester, UK",
        lastActive: "Apr 18, 4:12 PM",
        status: "Trusted Device",
      },
    ],
    alerts: {
      login: true,
      transfers: true,
      cards: true,
      support: false,
    },
  },
  supportTickets: [
    {
      id: "ticket-201",
      subject: "Travel notice confirmation",
      message: "Client requested confirmation that international travel settings remain active.",
      channel: "Secure Message",
      updatedAt: "Today, 9:15 AM",
      status: "Resolved",
    },
    {
      id: "ticket-198",
      subject: "Statement delivery preference",
      message: "Requested an update to monthly statement delivery preferences.",
      channel: "Advisor",
      updatedAt: "Apr 19, 2:20 PM",
      status: "In Review",
    },
    {
      id: "ticket-193",
      subject: "Wire cutoff guidance",
      message: "Requested timing guidance for outgoing international wires.",
      channel: "Phone",
      updatedAt: "Apr 17, 11:05 AM",
      status: "Open",
    },
  ],
  settings: {
    profile: {
      fullName: "MARIA COX WALKER",
      email: "maria.cox.walker@prestigetrustbank.com",
      phone: "+44 20 7946 0186",
      city: "London",
      country: "United Kingdom",
      occupation: "Managing Partner",
      relationshipManager: "Natalie Bennett",
    },
    notifications: {
      email: true,
      sms: false,
      push: true,
      monthlyInsights: true,
    },
    appearance: {
      theme: "Classic Light",
      language: "English (UK)",
    },
  },
};
