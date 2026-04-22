import type { ComponentType, SVGProps } from "react";

import {
  BankIcon,
  BuildingIcon,
  CardIcon,
  ChartIcon,
  CheckIcon,
  ClockIcon,
  GlobeIcon,
  LoanIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ReceiptIcon,
  ShieldIcon,
  SparkleIcon,
  UserIcon,
  WalletIcon,
} from "@/components/icons";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type NavItem = {
  href: string;
  label: string;
};

export type Service = {
  title: string;
  description: string;
  href: string;
  icon: IconType;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/personal-banking", label: "Personal Banking" },
  { href: "/business", label: "Business" },
  { href: "/loans", label: "Loans" },
  { href: "/cards", label: "Cards" },
  { href: "/digital-banking", label: "Digital Banking" },
  { href: "/contact", label: "Contact" },
];

export const featuredServices: Service[] = [
  {
    title: "Personal Banking",
    description:
      "Checking, savings, cards, and everyday banking.",
    href: "/personal-banking",
    icon: WalletIcon,
  },
  {
    title: "Business Banking",
    description:
      "Operating accounts, treasury services, and payment support.",
    href: "/business",
    icon: BuildingIcon,
  },
  {
    title: "Lending Solutions",
    description:
      "Home loans, personal loans, and business credit.",
    href: "/loans",
    icon: LoanIcon,
  },
  {
    title: "Cards & Payments",
    description:
      "Credit, debit, and business cards with secure controls.",
    href: "/cards",
    icon: CardIcon,
  },
];

export const trustStats = [
  { value: "125+", label: "Years of service" },
  { value: "42", label: "Banking offices" },
  { value: "98%", label: "Client satisfaction" },
  { value: "24/7", label: "Digital banking" },
];

export const benefits = [
  {
    title: "Personal service",
    description:
      "Direct access to bankers who know your accounts.",
    icon: UserIcon,
  },
  {
    title: "Secure banking",
    description:
      "Alerts, verification, and account protection at every step.",
    icon: ShieldIcon,
  },
  {
    title: "Personal and business",
    description:
      "Banking, borrowing, and payments under one relationship.",
    icon: BankIcon,
  },
  {
    title: "Clear decisions",
    description:
      "Straightforward guidance and timely updates.",
    icon: CheckIcon,
  },
];

export const testimonials = [
  {
    name: "Amara Cole",
    role: "Creative Director, Northline Studio",
    quote:
      "Prestige Trust Bank feels thoughtful from the first conversation. The business banking guidance and digital tools make cash flow planning feel organized and calm.",
  },
  {
    name: "Daniel Mercer",
    role: "Homebuyer, Ridgeview Estates",
    quote:
      "The lending process was clear from the start. I always knew what was needed and when to expect an update.",
  },
  {
    name: "Leila Hassan",
    role: "Founder, Harbor Trade Co.",
    quote:
      "I wanted one bank that could support payroll, payments, and growth plans. Prestige Trust communicates that kind of confidence across every touchpoint.",
  },
];

export const footerGroups = [
  {
    title: "Banking",
    links: [
      { href: "/personal-banking", label: "Personal Banking" },
      { href: "/business", label: "Business Banking" },
      { href: "/loans", label: "Loans" },
      { href: "/cards", label: "Cards" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Prestige Trust" },
      { href: "/digital-banking", label: "Digital Banking" },
      { href: "/contact", label: "Contact" },
      { href: "/dashboard", label: "Online Banking" },
    ],
  },
];

export const contactDetails = [
  {
    label: "Client support",
    value: "+1 (800) 555-0148",
    icon: PhoneIcon,
  },
  {
    label: "Email",
    value: "clientservices@prestigetrustbank.com",
    icon: MailIcon,
  },
  {
    label: "Head office",
    value: "880 Harbor Avenue, New Haven, CT 06510",
    icon: MapPinIcon,
  },
  {
    label: "Service hours",
    value: "Mon-Fri, 8:00 AM-6:00 PM ET",
    icon: ClockIcon,
  },
];

export const socialPlaceholders = ["LinkedIn", "X", "Facebook", "Instagram"];

export const personalHighlights = [
  "Relationship checking with premium support",
  "Savings and goals accounts with automated tools",
  "Youth, student, and family banking options",
  "Lifestyle lending and wealth guidance",
];

export const businessHighlights = [
  "Operating, escrow, and reserve accounts",
  "Treasury, payroll, and cash-management support",
  "Merchant services and collections",
  "Commercial lending and strategic advisory",
];

export const loanSolutions = [
  {
    title: "Home Loans",
    description:
      "Purchase, refinance, and relocation financing.",
    icon: BankIcon,
  },
  {
    title: "Auto & Personal Loans",
    description:
      "Financing for vehicles, education, and major expenses.",
    icon: LoanIcon,
  },
  {
    title: "Business Credit",
    description:
      "Working capital, equipment finance, and revolving credit.",
    icon: ChartIcon,
  },
];

export const cardOptions = [
  {
    title: "Prestige Signature Credit",
    description:
      "Rewards, travel benefits, and premium service.",
    icon: SparkleIcon,
  },
  {
    title: "Everyday Debit",
    description:
      "Daily spending with card controls and wallet access.",
    icon: CardIcon,
  },
  {
    title: "Business Expense Card",
    description:
      "Team spending controls and business expense tracking.",
    icon: ReceiptIcon,
  },
];

export const digitalFeatures = [
  {
    title: "Mobile and web banking",
    description:
      "Balances, transfers, cards, and account activity online.",
    icon: PhoneIcon,
  },
  {
    title: "Alerts and insights",
    description:
      "Balance alerts, payment notices, and account updates.",
    icon: GlobeIcon,
  },
  {
    title: "Security controls",
    description:
      "Verification, device monitoring, and card protection.",
    icon: ShieldIcon,
  },
];
