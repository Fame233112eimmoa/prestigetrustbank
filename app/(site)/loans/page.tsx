import Link from "next/link";
import type { Metadata } from "next";

import { ContentGrid } from "@/components/content-grid";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { BankIcon, ChartIcon, CheckIcon, ShieldIcon } from "@/components/icons";
import { loanSolutions } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Loans",
  description:
    "Lending from Prestige Trust Bank.",
};

const lendingMetrics = [
  { value: "3", label: "Lending options" },
  { value: "Clear", label: "Timelines" },
  { value: "Flexible", label: "Terms" },
  { value: "Direct", label: "Lending support" },
];

const lendingSteps = [
  {
    title: "Initial conversation",
    description:
      "Tell us what you need and when you need it.",
  },
  {
    title: "Guidance and structuring",
    description:
      "Review loan options, terms, and required information.",
  },
  {
    title: "Review and coordination",
    description:
      "Submit documents and receive updates.",
  },
  {
    title: "Decision and onboarding",
    description:
      "Finalize terms and complete closing.",
  },
];

const lendingAdvantages = [
  {
    title: "Clear credit decisions",
    description:
      "Straightforward guidance from application to closing.",
    icon: BankIcon,
  },
  {
    title: "Timely updates",
    description:
      "Know what comes next at every stage.",
    icon: CheckIcon,
  },
  {
    title: "Private service",
    description:
      "Careful handling of personal and business borrowing.",
    icon: ShieldIcon,
  },
];

export default function LoansPage() {
  return (
    <>
      <PageHero
        eyebrow="Loans"
        title="Lending for homes, major purchases, and business needs."
        description="Home loans, personal loans, and business credit with direct lending support."
        primaryHref="/contact"
        primaryLabel="Discuss Lending Needs"
        secondaryHref="/open-account"
        secondaryLabel="Start a Banking Relationship"
        metrics={lendingMetrics}
        highlights={[
          "Home loans",
          "Personal loans",
          "Business credit",
        ]}
      />

      <section className="section-spacing">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Borrowing Options"
            title="Lending Solutions"
            align="center"
          />
          <div className="mt-12">
            <ContentGrid items={loanSolutions} />
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-shell grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
          <SectionHeader
            eyebrow="Lending Process"
            title="How Borrowing Works"
          />

          <div className="panel rounded-[2.25rem] p-8 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              {lendingSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface-soft)]/70 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--color-navy-950)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-slate-700)]">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-[1.85rem] border border-[var(--color-line)] bg-white p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-[var(--color-surface-soft)] p-2 text-[var(--color-gold)]">
                  <ChartIcon className="h-4 w-4" />
                </div>
                <p className="text-base leading-8 text-[var(--color-slate-700)]">
                  Clear steps, timely updates, and direct support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-shell rounded-[2.75rem] bg-[linear-gradient(135deg,#081426,#10223f)] px-6 py-10 text-white sm:px-10 sm:py-12">
          <SectionHeader
            eyebrow="Why Prestige Lending"
            title="Borrow with confidence."
            theme="light"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {lendingAdvantages.map((item) => {
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
              Talk with a Lending Specialist
            </Link>
            <Link
              href="/personal-banking"
              className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/6"
            >
              Explore Personal Banking
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
