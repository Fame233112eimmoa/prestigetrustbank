import Link from "next/link";

import {
  ArrowRightIcon,
  BankIcon,
  BuildingIcon,
  CheckIcon,
  ShieldIcon,
} from "@/components/icons";

const highlights = [
  "Personal, private, and business banking",
  "Lending, cards, and treasury services",
  "Secure digital banking and support",
];

export function HeroSection() {
  const serviceBands = [
    {
      title: "Personal and private banking",
      description: "Checking, savings, cards, and personal service.",
      icon: BankIcon,
    },
    {
      title: "Business and treasury support",
      description: "Accounts, payments, cash management, and treasury services.",
      icon: BuildingIcon,
    },
    {
      title: "Secure digital servicing",
      description: "Online banking, card controls, and secure access.",
      icon: ShieldIcon,
    },
  ];

  const heroMetrics = [
    { value: "125+", label: "Years of service" },
    { value: "42", label: "Banking offices" },
    { value: "24/7", label: "Digital banking" },
    { value: "98%", label: "Client satisfaction" },
  ];

  return (
    <section className="overflow-hidden bg-[var(--color-navy-950)] text-white">
      <div className="hero-grid bg-radial-premium">
        <div className="container-shell grid gap-12 py-18 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <p className="inline-flex rounded-full border border-white/14 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
              Prestige Trust Bank
            </p>
            <h1 className="mt-7 max-w-3xl font-display text-5xl font-semibold leading-tight text-balance sm:text-6xl xl:text-7xl">
              Prestige Trust App – Digital Banking Platform
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Prestige Trust App is a modern digital banking platform that
              allows users to manage accounts, send money, and access financial
              services securely online. Our online banking app provides a
              secure finance platform for individuals and businesses looking
              for fast and reliable banking solutions.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
              With Prestige Trust App, users can experience digital banking
              with real-time transactions, account management, and secure
              financial tools designed for convenience and safety.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/open-account"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-semibold text-[var(--color-navy-950)] hover:-translate-y-0.5 hover:bg-[var(--color-gold-soft)]"
              >
                Open an Account
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/6"
              >
                Speak with a Banker
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-200">
                  <span className="rounded-full bg-white/10 p-1 text-[var(--color-gold)]">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-[var(--color-gold)]/18 blur-3xl" />
            <div className="absolute -right-4 bottom-10 h-32 w-32 rounded-full bg-white/12 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/12 bg-white/8 p-5 shadow-2xl backdrop-blur-md">
              <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-gold)]">
                      Prestige Trust
                    </p>
                    <p className="mt-2 text-2xl font-semibold">Private & Commercial Banking</p>
                  </div>
                  <span className="rounded-full border border-white/14 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
                    Private and Commercial
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {heroMetrics.map((metric) => (
                    <article
                      key={metric.label}
                      className="rounded-[1.75rem] border border-white/12 bg-white/8 p-5 backdrop-blur-sm"
                    >
                      <p className="font-display text-3xl font-semibold text-white">{metric.value}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{metric.label}</p>
                    </article>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[var(--color-navy-900)]/75 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-gold)]">
                    Banking Services
                  </p>

                  <div className="mt-4 space-y-3">
                    {serviceBands.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4"
                        >
                          <div className="rounded-xl bg-white/8 p-2 text-[var(--color-gold)]">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{item.title}</p>
                            <p className="mt-1 text-sm leading-6 text-slate-300">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
