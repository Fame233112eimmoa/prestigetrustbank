import Link from "next/link";
import type { Metadata } from "next";

import { ContentGrid } from "@/components/content-grid";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import {
  BankIcon,
  BuildingIcon,
  ChartIcon,
  CheckIcon,
  ReceiptIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/icons";
import { businessHighlights } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Business Banking",
  description:
    "Business banking from Prestige Trust Bank.",
};

const businessMetrics = [
  { value: "Multi-user", label: "Team access" },
  { value: "24/7", label: "Balances and payments" },
  { value: "Direct", label: "Business bankers" },
  { value: "Flexible", label: "Operating support" },
];

const businessSolutions = [
  {
    title: "Operating and reserve accounts",
    description:
      "Accounts for operations, reserves, and liquidity.",
    icon: BuildingIcon,
  },
  {
    title: "Treasury and approvals",
    description:
      "Approvals, reporting, and payment oversight.",
    icon: ChartIcon,
  },
  {
    title: "Merchant services",
    description:
      "Card acceptance and collections support.",
    icon: ReceiptIcon,
  },
  {
    title: "Commercial advisory",
    description:
      "Banking, liquidity, and credit guidance.",
    icon: UserIcon,
  },
];

const operatingAdvantages = [
  {
    title: "Liquidity visibility",
    description:
      "Balances, payments, and reporting in one place.",
    icon: BankIcon,
  },
  {
    title: "Controlled access",
    description:
      "Approvals and permissions for daily operations.",
    icon: CheckIcon,
  },
  {
    title: "Protection across payments",
    description:
      "Payment protection and account monitoring.",
    icon: ShieldIcon,
  },
];

export default function BusinessPage() {
  return (
    <>
      <PageHero
        eyebrow="Business Banking"
        title="Business banking for daily operations and growth."
        description="Operating accounts, treasury services, merchant support, and business credit."
        primaryHref="/contact"
        primaryLabel="Speak with a Business Advisor"
        secondaryHref="/loans"
        secondaryLabel="Explore Lending"
        metrics={businessMetrics}
        highlights={[
          "Operating and reserve accounts",
          "Treasury and payments",
          "Business lending",
        ]}
      />

      <section className="section-spacing">
        <div className="container-shell grid gap-10 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
          <SectionHeader
            eyebrow="Commercial Capability"
            title="Business banking for companies of every size."
          />

          <div className="panel rounded-[2.25rem] p-8 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {businessHighlights.map((item, index) => (
                <article
                  key={item}
                  className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface-soft)]/70 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="mt-3 flex items-start gap-3">
                    <span className="mt-1 rounded-full bg-white p-1 text-[var(--color-gold)]">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <p className="text-sm leading-7 text-[var(--color-slate-700)]">{item}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-[1.85rem] border border-[var(--color-line)] bg-white p-6">
              <p className="text-base leading-8 text-[var(--color-slate-700)]">
                Accounts, payments, treasury services, and credit under one relationship.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Business Solutions"
            title="Business Banking Services"
            align="center"
          />
          <div className="mt-12">
            <ContentGrid items={businessSolutions} />
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-shell rounded-[2.75rem] bg-[linear-gradient(135deg,#081426,#10223f)] px-6 py-10 text-white sm:px-10 sm:py-12">
          <SectionHeader
            eyebrow="Built for Growth"
            title="Built for business."
            theme="light"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {operatingAdvantages.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-white/6 p-6"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/8 text-[var(--color-gold)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-semibold text-[var(--color-navy-950)] hover:bg-[var(--color-gold-soft)]"
            >
              Speak with a Business Banker
            </Link>
            <Link
              href="/open-account"
              className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/6"
            >
              Open an Account
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
