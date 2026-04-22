import Link from "next/link";
import type { Metadata } from "next";

import { ContentGrid } from "@/components/content-grid";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import {
  BankIcon,
  ChartIcon,
  GlobeIcon,
  ShieldIcon,
  SparkleIcon,
  UserIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Prestige Trust Bank.",
};

const heritageMetrics = [
  { value: "125+", label: "Years of service" },
  { value: "42", label: "Banking offices" },
  { value: "24/7", label: "Digital banking" },
  { value: "98%", label: "Client satisfaction" },
];

const operatingCommitments = [
  {
    title: "Measured decisions",
    description:
      "Clear guidance and disciplined decisions.",
  },
  {
    title: "Relationship continuity",
    description:
      "Direct support from bankers who know your needs.",
  },
  {
    title: "Modern execution",
    description:
      "Digital access with responsive service.",
  },
];

const principles = [
  {
    title: "Financial strength",
    description:
      "Prudent guidance and dependable service.",
    icon: BankIcon,
  },
  {
    title: "Clear guidance",
    description:
      "Straightforward communication across banking and lending.",
    icon: ChartIcon,
  },
  {
    title: "Security and discretion",
    description:
      "Secure service and careful handling of client information.",
    icon: ShieldIcon,
  },
];

const serviceModel = [
  {
    title: "Relationship banking",
    description:
      "Personal and business banking with direct support.",
    icon: UserIcon,
  },
  {
    title: "Lending and treasury",
    description:
      "Financing, liquidity, and treasury services.",
    icon: SparkleIcon,
  },
  {
    title: "Digital banking",
    description:
      "Secure access to accounts, cards, and payments.",
    icon: GlobeIcon,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Prestige Trust"
        title="Banking built on service, discretion, and long-term relationships."
        description="Prestige Trust serves individuals, families, and businesses with personal guidance and dependable banking."
        primaryHref="/contact"
        primaryLabel="Speak with a Banker"
        secondaryHref="/business"
        secondaryLabel="Explore Business Banking"
        metrics={heritageMetrics}
        highlights={[
          "Personal and business banking",
          "Clear lending guidance",
          "Secure digital banking",
        ]}
      />

      <section className="section-spacing">
        <div className="container-shell grid gap-10 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
          <SectionHeader
            eyebrow="Institutional Profile"
            title="Who We Are"
          />
          <div className="panel rounded-[2.25rem] p-8 sm:p-10">
            <p className="text-base leading-8 text-[var(--color-slate-700)]">
              Prestige Trust Bank brings together personal banking, business
              banking, lending, cards, and digital banking under one relationship.
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--color-slate-700)]">
              Clients rely on us for clear communication, dependable follow-up,
              and direct access to experienced bankers.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {operatingCommitments.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface-soft)]/60 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--color-navy-950)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-slate-700)]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Core Principles"
            title="What Guides Us"
            align="center"
          />
          <div className="mt-12">
            <ContentGrid items={principles} />
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-shell rounded-[2.75rem] bg-[linear-gradient(135deg,#081426,#10223f)] px-6 py-10 text-white sm:px-10 sm:py-12">
          <SectionHeader
            eyebrow="How We Serve"
            title="How We Serve"
            theme="light"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {serviceModel.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[2rem] border border-white/10 bg-white/6 p-6"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/8 text-[var(--color-gold)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-semibold text-[var(--color-navy-950)] hover:bg-[var(--color-gold-soft)]"
            >
              Contact Us
            </Link>
            <Link
              href="/digital-banking"
              className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/6"
            >
              Digital Banking
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
