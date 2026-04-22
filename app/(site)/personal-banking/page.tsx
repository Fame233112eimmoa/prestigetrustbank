import Link from "next/link";
import type { Metadata } from "next";

import { ContentGrid } from "@/components/content-grid";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import {
  BankIcon,
  ChartIcon,
  CheckIcon,
  ShieldIcon,
  SparkleIcon,
  UserIcon,
  WalletIcon,
} from "@/components/icons";
import { personalHighlights } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Personal Banking",
  description:
    "Personal banking from Prestige Trust Bank.",
};

const personalMetrics = [
  { value: "24/7", label: "Digital banking" },
  { value: "4", label: "Core services" },
  { value: "Direct", label: "Banker access" },
  { value: "Instant", label: "Card controls" },
];

const personalSolutions = [
  {
    title: "Prestige Everyday Checking",
    description:
      "Checking for everyday banking and payments.",
    icon: WalletIcon,
  },
  {
    title: "Reserve Savings",
    description:
      "Savings for reserves, goals, and future plans.",
    icon: ChartIcon,
  },
  {
    title: "Borrowing and advice",
    description:
      "Lending and guidance for major financial decisions.",
    icon: UserIcon,
  },
];

const relationshipAdvantages = [
  {
    title: "Personal service",
    description:
      "Direct support from bankers who know your accounts.",
    icon: BankIcon,
  },
  {
    title: "Clear guidance",
    description:
      "Straightforward banking and lending support.",
    icon: SparkleIcon,
  },
  {
    title: "Secure access",
    description:
      "Alerts, controls, and digital banking.",
    icon: ShieldIcon,
  },
];

export default function PersonalBankingPage() {
  return (
    <>
      <PageHero
        eyebrow="Personal Banking"
        title="Personal banking for everyday life and long-term plans."
        description="Checking, savings, cards, and lending with direct support."
        primaryHref="/open-account"
        primaryLabel="Open a Personal Account"
        secondaryHref="/digital-banking"
        secondaryLabel="Explore Digital Banking"
        metrics={personalMetrics}
        highlights={[
          "Checking and savings",
          "Cards and lending",
          "Digital banking",
        ]}
      />

      <section className="section-spacing">
        <div className="container-shell grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
          <SectionHeader
            eyebrow="Everyday Banking"
            title="Accounts for daily banking and savings."
          />

          <div className="panel rounded-[2.25rem] p-8 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {personalHighlights.map((item, index) => (
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
                Checking, savings, cards, and lending under one relationship.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Personal Solutions"
            title="Personal Banking Services"
            align="center"
          />
          <div className="mt-12">
            <ContentGrid items={personalSolutions} />
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-shell rounded-[2.75rem] bg-[linear-gradient(135deg,#081426,#10223f)] px-6 py-10 text-white sm:px-10 sm:py-12">
          <SectionHeader
            eyebrow="Why Prestige Trust"
            title="Bank with confidence."
            theme="light"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {relationshipAdvantages.map((item) => {
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
              href="/open-account"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-semibold text-[var(--color-navy-950)] hover:bg-[var(--color-gold-soft)]"
            >
              Open an Account
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/6"
            >
              Speak with a Banker
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
