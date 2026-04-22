import Link from "next/link";
import type { Metadata } from "next";

import { ContentGrid } from "@/components/content-grid";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import {
  ChartIcon,
  GlobeIcon,
  PhoneIcon,
  ShieldIcon,
  SparkleIcon,
} from "@/components/icons";
import { digitalFeatures } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Digital Banking",
  description:
    "Digital banking from Prestige Trust Bank.",
};

const digitalMetrics = [
  { value: "24/7", label: "Account access" },
  { value: "Biometric", label: "Sign-in" },
  { value: "Real-time", label: "Alerts" },
  { value: "Unified", label: "Web and mobile" },
];

const digitalJourneys = [
  {
    title: "Account overview",
    description:
      "Balances and transactions in one place.",
    icon: ChartIcon,
  },
  {
    title: "Payments and transfers",
    description:
      "Move money and pay bills quickly.",
    icon: SparkleIcon,
  },
  {
    title: "Support and servicing",
    description:
      "Alerts, messages, and service support.",
    icon: PhoneIcon,
  },
];

const confidenceLayers = [
  {
    title: "Security-first access",
    description:
      "Verification, device monitoring, and account protection.",
    icon: ShieldIcon,
  },
  {
    title: "Anywhere access",
    description:
      "Review accounts, manage cards, and move money on the go.",
    icon: GlobeIcon,
  },
  {
    title: "Everyday control",
    description:
      "Manage banking with speed and confidence.",
    icon: SparkleIcon,
  },
];

export default function DigitalBankingPage() {
  return (
    <>
      <PageHero
        eyebrow="Digital Banking"
        title="Digital banking with secure access and everyday control."
        description="Review balances, move money, manage cards, and stay informed."
        primaryHref="/contact"
        primaryLabel="Talk to Digital Support"
        secondaryHref="/personal-banking"
        secondaryLabel="Explore Personal Banking"
        metrics={digitalMetrics}
        highlights={[
          "Balances and transactions",
          "Transfers and bill payments",
          "Card controls and alerts",
        ]}
      />

      <section className="section-spacing">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Digital Features"
            title="Digital Banking Features"
            align="center"
          />
          <div className="mt-12">
            <ContentGrid items={digitalFeatures} />
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-shell grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
          <SectionHeader
            eyebrow="Everyday Banking"
            title="Everyday Banking"
          />

          <div className="panel rounded-[2.25rem] p-8 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-3">
              {digitalJourneys.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface-soft)]/70 p-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[var(--color-gold)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[var(--color-navy-950)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-slate-700)]">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-shell rounded-[2.75rem] bg-[linear-gradient(135deg,#081426,#10223f)] px-6 py-10 text-white sm:px-10 sm:py-12">
          <SectionHeader
            eyebrow="Security and Confidence"
            title="Security and Access"
            theme="light"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {confidenceLayers.map((item) => {
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
              Digital Support
            </Link>
            <Link
              href="/cards"
              className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/6"
            >
              Cards and Payments
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
