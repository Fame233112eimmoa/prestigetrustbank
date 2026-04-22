import Link from "next/link";
import type { Metadata } from "next";

import { ContentGrid } from "@/components/content-grid";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import {
  CardIcon,
  CheckIcon,
  GlobeIcon,
  ReceiptIcon,
  ShieldIcon,
  SparkleIcon,
} from "@/components/icons";
import { cardOptions } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Cards",
  description:
    "Cards from Prestige Trust Bank.",
};

const cardMetrics = [
  { value: "Real-time", label: "Card activity" },
  { value: "Travel-ready", label: "Travel use" },
  { value: "Business", label: "Team spending" },
  { value: "Integrated", label: "Digital wallet" },
];

const cardControls = [
  {
    title: "Instant card controls",
    description:
      "Freeze, unfreeze, and manage spending.",
    icon: ShieldIcon,
  },
  {
    title: "Travel and lifestyle readiness",
    description:
      "Rewards, travel benefits, and premium service.",
    icon: GlobeIcon,
  },
  {
    title: "Expense oversight",
    description:
      "Spending visibility for business cards and teams.",
    icon: ReceiptIcon,
  },
];

const premiumBenefits = [
  "Premium credit and debit card options",
  "Card controls and digital wallet access",
  "Business card programs for team spending",
];

export default function CardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Cards"
        title="Cards for spending, travel, and business."
        description="Credit, debit, and business cards with secure controls and premium service."
        primaryHref="/contact"
        primaryLabel="Speak with a Card Specialist"
        secondaryHref="/digital-banking"
        secondaryLabel="Explore Digital Banking"
        metrics={cardMetrics}
        highlights={[
          "Credit and debit cards",
          "Business expense cards",
          "Card controls",
        ]}
      />

      <section className="section-spacing">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Card Portfolio"
            title="Card Options"
            align="center"
          />
          <div className="mt-12">
            <ContentGrid items={cardOptions} />
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-shell grid gap-6 xl:grid-cols-[1.02fr_0.98fr] xl:items-stretch">
          <div className="panel rounded-[2.5rem] bg-[linear-gradient(155deg,#10223f,#081426)] p-8 text-white sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
              Prestige Signature Credit
            </p>
            <div className="mt-10 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.05))] p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-300">
                    Prestige Trust
                  </p>
                  <p className="mt-4 font-display text-3xl font-semibold text-white">
                    Signature
                  </p>
                </div>
                <SparkleIcon className="h-7 w-7 text-[var(--color-gold)]" />
              </div>
              <p className="mt-12 text-4xl font-semibold tracking-[0.28em]">•••• 4829</p>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Cardholder
                  </p>
                  <p className="mt-2 text-lg font-medium text-white">Prestige Client</p>
                </div>
                <CardIcon className="h-8 w-8 text-white/80" />
              </div>
            </div>
          </div>

          <div className="panel rounded-[2.25rem] p-8 sm:p-10">
            <SectionHeader
              eyebrow="Service Standard"
              title="Premium cards with everyday control."
            />

            <div className="mt-8 space-y-4">
              {premiumBenefits.map((item) => (
                <article
                  key={item}
                  className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface-soft)]/70 p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 rounded-full bg-white p-1 text-[var(--color-gold)]">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <p className="text-sm leading-7 text-[var(--color-slate-700)]">{item}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-shell rounded-[2.75rem] bg-[linear-gradient(135deg,#081426,#10223f)] px-6 py-10 text-white sm:px-10 sm:py-12">
          <SectionHeader
            eyebrow="Card Controls"
            title="Security, controls, and support."
            theme="light"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {cardControls.map((item) => {
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
              Speak with a Card Specialist
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
