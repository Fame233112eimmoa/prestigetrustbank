export type AccountId = "checking" | "savings";

export type ActivityTone = "credit" | "debit" | "neutral";

export type ActivityKind =
  | "deposit"
  | "payment"
  | "transfer"
  | "card"
  | "security"
  | "support"
  | "system";

export type ActivityStatus =
  | "Completed"
  | "Pending"
  | "Scheduled"
  | "Delivered"
  | "Reviewed"
  | "Failed";

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  amount?: number;
  tone: ActivityTone;
  dateLabel: string;
  status: ActivityStatus;
  kind: ActivityKind;
};

export type DashboardAccount = {
  id: AccountId;
  name: string;
  type: string;
  maskedNumber: string;
  availableBalance: number;
  status: "Active" | "Protected" | "Growth";
  recentTransactions: ActivityItem[];
};

export type DashboardCard = {
  id: string;
  name: string;
  type: string;
  holder: string;
  maskedNumber: string;
  expiry: string;
  network: string;
  creditLimit: number;
  availableCredit: number;
  spendingLimit: number;
  rewards: number;
  frozen: boolean;
  activity: ActivityItem[];
};

export type Beneficiary = {
  id: string;
  name: string;
  category: string;
  reference: string;
};

export type TransferRecipientType = "User" | "Bank";

export type TransferRecipient = {
  id: string;
  name: string;
  type: TransferRecipientType;
  destinationLabel: string;
  email?: string;
  bankName?: string;
  routingNumber?: string;
  accountNumber?: string;
};

export type DeviceSession = {
  id: string;
  name: string;
  location: string;
  lastActive: string;
  status: "Current Session" | "Trusted Device" | "Signed Out";
};

export type SecuritySettings = {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  devices: DeviceSession[];
  alerts: {
    login: boolean;
    transfers: boolean;
    cards: boolean;
    support: boolean;
  };
};

export type SupportTicketStatus = "Open" | "In Review" | "Resolved";

export type SupportTicket = {
  id: string;
  subject: string;
  message: string;
  channel: string;
  updatedAt: string;
  status: SupportTicketStatus;
};

export type DashboardUser = {
  fullName: string;
  firstName: string;
  email: string;
  phone: string;
  relationshipManager: string;
  branch: string;
  memberSince: string;
  clientId: string;
};

export type DashboardNotificationTone = "info" | "success" | "warning";

export type DashboardNotification = {
  id: string;
  title: string;
  message: string;
  dateLabel: string;
  read: boolean;
  tone: DashboardNotificationTone;
};

export type NotificationSettings = {
  email: boolean;
  sms: boolean;
  push: boolean;
  monthlyInsights: boolean;
};

export type AppearanceTheme = "Classic Light" | "Midnight";

export type LanguagePreference =
  | "English (US)"
  | "French (FR)"
  | "Spanish (US)";

export type AppearanceSettings = {
  theme: AppearanceTheme;
  language: LanguagePreference;
};

export type DashboardSettings = {
  profile: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    occupation: string;
    relationshipManager: string;
  };
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
};

export type DashboardState = {
  user: DashboardUser;
  accounts: Record<AccountId, DashboardAccount>;
  cards: DashboardCard[];
  activities: ActivityItem[];
  billers: Beneficiary[];
  transferRecipients: TransferRecipient[];
  notifications: DashboardNotification[];
  security: SecuritySettings;
  supportTickets: SupportTicket[];
  settings: DashboardSettings;
};

export type ActionResult = {
  ok: boolean;
  message: string;
};

export type TransferInput = {
  fromAccountId: AccountId;
  toAccountId: AccountId;
  amount: number;
  memo: string;
};

export type BillPaymentInput = {
  fromAccountId: AccountId;
  billerId: string;
  amount: number;
  memo: string;
};

export type ExternalTransferInput = {
  fromAccountId: AccountId;
  recipientType: TransferRecipientType;
  recipientId?: string;
  recipientName: string;
  email?: string;
  bankName?: string;
  routingNumber?: string;
  accountNumber?: string;
  amount: number;
  memo: string;
};

export type PasswordChangeInput = {
  currentPassword: string;
  nextPassword: string;
  confirmPassword: string;
};

export type SupportMessageInput = {
  subject: string;
  message: string;
};

export type DashboardNavIcon =
  | "overview"
  | "accounts"
  | "cards"
  | "payments"
  | "notifications"
  | "security"
  | "support"
  | "settings"
  | "logout";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: DashboardNavIcon;
};
