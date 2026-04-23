import Link from "next/link";
import Image from "next/image";

import { Footer } from "@/components/footer";
import {
  ArrowRightIcon,
  BankIcon,
  CardIcon,
  ChartIcon,
  CheckIcon,
  ClockIcon,
  GlobeIcon,
  LoanIcon,
  MapPinIcon,
  ReceiptIcon,
  ShieldIcon,
  SparkleIcon,
  WalletIcon,
} from "@/components/icons";

const navigation = [
  { label: "Home", href: "#top" },
  { label: "Contact", href: "/contact" },
];

const services = [
  {
    title: "Prestige Checking",
    description:
      "Primary checking with premium servicing, digital access, and day-to-day payment support.",
    href: "/personal-banking",
    icon: WalletIcon,
    points: ["Relationship-led banking", "Debit card and bill pay", "Online and mobile access"],
  },
  {
    title: "Reserve Savings",
    description:
      "High-balance savings designed for liquidity, disciplined growth, and long-term planning.",
    href: "/personal-banking",
    icon: ChartIcon,
    points: ["Goal-based saving", "Transfer support", "Competitive savings structure"],
  },
  {
    title: "Signature Cards",
    description:
      "Credit and debit cards with controls, alerts, travel support, and premium servicing.",
    href: "/cards",
    icon: CardIcon,
    points: ["Card controls", "Secure purchases", "Rewards and servicing"],
  },
  {
    title: "Lending Solutions",
    description:
      "Home, personal, and business lending with structured guidance from application to closing.",
    href: "/loans",
    icon: LoanIcon,
    points: ["Personal loans", "Home financing", "Business credit"],
  },
];

const features = [
  {
    title: "Secure banking",
    description:
      "Multi-step verification, account alerts, device monitoring, and card controls.",
    icon: ShieldIcon,
  },
  {
    title: "Fast transfers",
    description:
      "Internal transfers, bill payments, and daily account activity with clear status updates.",
    icon: ReceiptIcon,
  },
  {
    title: "24/7 access",
    description:
      "Balances, account activity, servicing, and secure access from desktop or mobile.",
    icon: GlobeIcon,
  },
];

const trustIndicators = [
  { value: "125+", label: "Years of banking service" },
  { value: "42", label: "Advisory and banking offices" },
  { value: "24/7", label: "Digital banking access" },
  { value: "98%", label: "Client satisfaction" },
];

const testimonials = [
  {
    quote:
      "Prestige Trust brings structure to every interaction. Our accounts, cards, and treasury support now feel aligned under one team.",
    name: "Leila Hassan",
    role: "Founder, Harbor Trade Co.",
  },
  {
    quote:
      "The experience is professional from the first call. Lending updates were clear, timely, and easy to follow.",
    name: "Daniel Mercer",
    role: "Homebuyer, Ridgeview Estates",
  },
  {
    quote:
      "The digital experience is polished, and the service still feels personal. That balance matters to our family office.",
    name: "Amara Cole",
    role: "Principal, Cole Advisory",
  },
];

export default function HomePage() {
  return (
    <div
      id="top"
      className="min-h-screen bg-[var(--color-ivory)] text-[var(--color-slate-950)]"
    >
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-ivory)]/92 backdrop-blur-xl">
        <div className="container-shell py-3.5 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-navy-950)] text-white shadow-lg shadow-slate-950/15">
                <ShieldIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-semibold uppercase tracking-[0.1em] text-[var(--color-navy-950)]">
                  Prestige Trust
                </p>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-slate-500)]">
                  Bank
                </p>
              </div>
            </Link>

            <nav
              className="hidden items-center gap-8 lg:flex"
              aria-label="Primary navigation"
            >
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-[var(--color-slate-700)] hover:text-[var(--color-navy-950)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/login"
              className="shrink-0 rounded-full bg-[var(--color-gold)] px-7 py-3.5 text-base font-extrabold uppercase tracking-[0.08em] text-[var(--color-navy-950)] shadow-[0_18px_42px_rgba(200,164,93,0.36)] ring-1 ring-[rgba(200,164,93,0.35)] hover:-translate-y-0.5 hover:bg-[var(--color-gold-soft)] sm:px-9 sm:py-4"
            >
              Login
            </Link>
          </div>

          <nav
            className="mt-4 flex justify-center gap-2 overflow-x-auto pb-1 lg:hidden"
            aria-label="Mobile navigation"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="shrink-0 rounded-full border border-[var(--color-line)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-navy-950)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="overflow-hidden bg-[var(--color-navy-950)] text-white">
          <div className="hero-grid bg-radial-premium">
            <div className="container-shell grid gap-14 py-18 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
              <div>
                <p className="inline-flex rounded-full border border-white/14 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
                  Prestige Trust Bank
                </p>
                <h1 className="mt-7 max-w-4xl font-display text-5xl font-semibold leading-tight text-balance sm:text-6xl xl:text-7xl">
                  Premium banking for personal wealth, business growth, and
                  everyday confidence.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  Checking, savings, cards, lending, and digital banking backed
                  by direct service and disciplined financial guidance.
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/open-account"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-semibold text-[var(--color-navy-950)] hover:-translate-y-0.5 hover:bg-[var(--color-gold-soft)]"
                  >
                    Open an Account
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/6"
                  >
                    Online Banking
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.6rem] border border-white/12 bg-white/6 px-5 py-5 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold-soft)]">
                      Private Service
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-200">
                      Dedicated support for households, professionals, and businesses.
                    </p>
                  </div>
                  <div className="rounded-[1.6rem] border border-white/12 bg-white/6 px-5 py-5 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold-soft)]">
                      Secure Access
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-200">
                      Secure sign-in, alerts, and card controls across devices.
                    </p>
                  </div>
                  <div className="rounded-[1.6rem] border border-white/12 bg-white/6 px-5 py-5 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold-soft)]">
                      Fast Support
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-200">
                      Professional guidance for deposits, payments, lending, and servicing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-8 top-12 h-28 w-28 rounded-full bg-[var(--color-gold)]/18 blur-3xl" />
                <div className="absolute -right-6 bottom-8 h-36 w-36 rounded-full bg-white/10 blur-3xl" />

                <div className="relative rounded-[2.2rem] border border-white/12 bg-white/8 p-5 shadow-[0_30px_80px_rgba(8,20,38,0.34)] backdrop-blur-md">
                  <div className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))] p-6 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-gold)]">
                          Client Banking
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold leading-tight">
                          Personal, business, and digital banking in one relationship.
                        </h2>
                      </div>
                      <span className="rounded-full border border-white/14 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                        Premium Access
                      </span>
                    </div>

                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                      {trustIndicators.map((item) => (
                        <article
                          key={item.label}
                          className="rounded-[1.5rem] border border-white/10 bg-white/8 px-5 py-5"
                        >
                          <p className="font-display text-4xl font-semibold text-white">
                            {item.value}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-slate-300">
                            {item.label}
                          </p>
                        </article>
                      ))}
                    </div>

                    <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-[var(--color-navy-900)]/70 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
                        Banking Highlights
                      </p>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4">
                          <BankIcon className="mt-0.5 h-5 w-5 text-[var(--color-gold)]" />
                          <div>
                            <p className="text-sm font-semibold text-white">
                              Deposit accounts and premium service
                            </p>
                            <p className="mt-1 text-sm text-slate-300">
                              Checking, savings, and direct banker support.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4">
                          <SparkleIcon className="mt-0.5 h-5 w-5 text-[var(--color-gold)]" />
                          <div>
                            <p className="text-sm font-semibold text-white">
                              Cards, controls, and secure access
                            </p>
                            <p className="mt-1 text-sm text-slate-300">
                              Alerts, transfers, and servicing from anywhere.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4">
                          <CheckIcon className="mt-0.5 h-5 w-5 text-[var(--color-gold)]" />
                          <div>
                            <p className="text-sm font-semibold text-white">
                              Lending and payment guidance
                            </p>
                            <p className="mt-1 text-sm text-slate-300">
                              Clear financing support for personal and business needs.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-[var(--color-navy-950)] text-white">
          <div className="container-shell">
            <div className="grid gap-10 overflow-hidden rounded-[2.75rem] border border-white/10 bg-[linear-gradient(145deg,#081426_0%,#10223f_58%,#17345e_100%)] p-6 shadow-[0_30px_90px_rgba(8,20,38,0.24)] sm:p-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center xl:p-10">
              <div className="max-w-2xl">
                <p className="inline-flex rounded-full border border-white/14 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
                  Premium Cards
                </p>
                <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-balance sm:text-5xl">
                  Premium Cards built for secure, rewarding, global spending.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-300">
                  Enjoy card security, meaningful rewards, everyday convenience,
                  and global acceptance with a premium card experience designed
                  for travel, business, and lifestyle purchases.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    "Advanced card security",
                    "Rewards on eligible spending",
                    "Convenient digital controls",
                    "Global Visa acceptance",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-3.5 text-sm font-medium text-slate-200"
                    >
                      <span className="rounded-full bg-white/10 p-1 text-[var(--color-gold)]">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>

                <Link
                  href="/cards"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-semibold text-[var(--color-navy-950)] hover:-translate-y-0.5 hover:bg-[var(--color-gold-soft)]"
                >
                  Explore Cards
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-[var(--color-gold)]/20 blur-3xl" />
                <div className="absolute -right-8 bottom-8 h-36 w-36 rounded-full bg-white/12 blur-3xl" />

                <div className="relative rounded-[2.25rem] border border-white/12 bg-white/8 p-3 shadow-[0_26px_70px_rgba(0,0,0,0.34)] backdrop-blur sm:p-4">
                  <Image
                    src="/images/prestige-premium-card.jpg"
                    width={704}
                    height={795}
                    alt="Prestige Trust Bank premium Visa card"
                    sizes="(max-width: 768px) 100vw, 48vw"
                    className="h-auto w-full rounded-[1.8rem] object-contain shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section-spacing bg-white">
          <div className="container-shell">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
                Banking Services
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[var(--color-navy-950)] sm:text-5xl">
                Accounts, cards, and lending designed for how clients bank today.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--color-slate-700)]">
                Everyday account access, premium cards, and financing support in
                a clean, secure banking experience.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.title}
                    className="panel gold-ring flex h-full flex-col overflow-hidden rounded-[2rem] p-7"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-soft)] text-[var(--color-navy-900)]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
                      Prestige Trust
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold text-[var(--color-navy-950)]">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-slate-700)]">
                      {service.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-3 text-sm text-[var(--color-slate-700)]"
                        >
                          <span className="rounded-full bg-[var(--color-surface-soft)] p-1 text-[var(--color-gold)]">
                            <CheckIcon className="h-4 w-4" />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={service.href}
                      className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-navy-900)] hover:translate-x-1 hover:text-[var(--color-gold)]"
                    >
                      Learn More
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-shell grid gap-8 xl:grid-cols-[0.86fr_1.14fr] xl:items-start">
            <div className="rounded-[2.4rem] bg-[linear-gradient(145deg,#081426,#10223f)] p-7 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
                Core Features
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                Modern banking with protection, speed, and control.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                Every service is built to keep account access simple, transfers
                efficient, and account security front and center.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-[1.6rem] border border-white/10 bg-white/6 px-5 py-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-soft)]">
                    Client Support
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    Service teams, secure channels, and direct assistance for
                    payments, accounts, and cards.
                  </p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-white/6 px-5 py-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-soft)]">
                    Account Visibility
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    Clear balances, recent activity, card controls, and account
                    servicing across devices.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="panel rounded-[2rem] p-7 md:min-h-[19rem]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-soft)] text-[var(--color-navy-900)]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-[var(--color-navy-950)]">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-slate-700)]">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="digital-banking" className="section-spacing bg-white">
          <div className="container-shell grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
                Digital Banking
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[var(--color-navy-950)] sm:text-5xl">
                Secure banking from desktop, tablet, and mobile.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-slate-700)]">
                Review balances, move funds, manage cards, and monitor activity
                from a digital experience designed for daily banking.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.7rem] bg-[var(--color-surface-soft)] px-5 py-5">
                  <div className="flex items-center gap-3">
                    <GlobeIcon className="h-5 w-5 text-[var(--color-gold)]" />
                    <p className="text-sm font-semibold text-[var(--color-navy-950)]">
                      Online banking
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-slate-700)]">
                    Account activity, balance visibility, secure transfers, and
                    servicing from any device.
                  </p>
                </div>
                <div className="rounded-[1.7rem] bg-[var(--color-surface-soft)] px-5 py-5">
                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-5 w-5 text-[var(--color-gold)]" />
                    <p className="text-sm font-semibold text-[var(--color-navy-950)]">
                      Real-time support
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-slate-700)]">
                    Timely servicing for transfers, account questions, and
                    card-related needs.
                  </p>
                </div>
                <div className="rounded-[1.7rem] bg-[var(--color-surface-soft)] px-5 py-5">
                  <div className="flex items-center gap-3">
                    <ShieldIcon className="h-5 w-5 text-[var(--color-gold)]" />
                    <p className="text-sm font-semibold text-[var(--color-navy-950)]">
                      Built-in protection
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-slate-700)]">
                    Verification, alerts, and monitoring built into each banking
                    session.
                  </p>
                </div>
                <div className="rounded-[1.7rem] bg-[var(--color-surface-soft)] px-5 py-5">
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="h-5 w-5 text-[var(--color-gold)]" />
                    <p className="text-sm font-semibold text-[var(--color-navy-950)]">
                      Branch-backed service
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-slate-700)]">
                    Digital convenience with branch support whenever reviews or
                    servicing require it.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-[var(--color-gold)]/15 blur-3xl" />
              <div className="absolute right-2 bottom-8 h-36 w-36 rounded-full bg-[var(--color-navy-900)]/12 blur-3xl" />

              <div className="relative rounded-[2.5rem] bg-[linear-gradient(160deg,#081426,#10223f)] p-6 text-white shadow-[0_30px_80px_rgba(8,20,38,0.24)] sm:p-8">
                <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
                  <div className="mx-auto w-full max-w-[220px] rounded-[2rem] border border-white/12 bg-white/8 p-4">
                    <div className="rounded-[1.6rem] border border-white/10 bg-[var(--color-navy-900)]/75 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">
                        Mobile
                      </p>
                      <div className="mt-4 rounded-[1.3rem] bg-white/8 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                          Available Balance
                        </p>
                        <p className="mt-2 text-2xl font-semibold">$18,240.90</p>
                      </div>
                      <div className="mt-3 space-y-3">
                        <div className="rounded-[1.2rem] border border-white/10 bg-white/6 px-3 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                            Transfer
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            Internal and external payments
                          </p>
                        </div>
                        <div className="rounded-[1.2rem] border border-white/10 bg-white/6 px-3 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                            Card Control
                          </p>
                          <p className="mt-1 text-sm font-semibold text-white">
                            Alerts and security settings
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[1.8rem] border border-white/10 bg-white/8 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]">
                        Online Banking
                      </p>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                            Checking
                          </p>
                          <p className="mt-2 text-xl font-semibold text-white">
                            $18,240.90
                          </p>
                        </div>
                        <div className="rounded-[1.4rem] border border-white/10 bg-white/6 px-4 py-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                            Savings
                          </p>
                          <p className="mt-2 text-xl font-semibold text-white">
                            $40,087.99
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.8rem] border border-white/10 bg-white/8 p-5">
                        <BankIcon className="h-6 w-6 text-[var(--color-gold)]" />
                        <p className="mt-4 text-lg font-semibold text-white">
                          Account visibility
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-300">
                          Clear balances, recent activity, and servicing tools.
                        </p>
                      </div>
                      <div className="rounded-[1.8rem] border border-white/10 bg-white/8 p-5">
                        <SparkleIcon className="h-6 w-6 text-[var(--color-gold)]" />
                        <p className="mt-4 text-lg font-semibold text-white">
                          Premium servicing
                        </p>
                        <p className="mt-2 text-sm leading-7 text-slate-300">
                          Secure access with polished digital account management.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-shell">
            <div className="rounded-[2.5rem] bg-[var(--color-navy-950)] px-6 py-10 text-white sm:px-10">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
                    Trust and Confidence
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                    A banking relationship built on service, discipline, and secure access.
                  </h2>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/6"
                >
                  Contact Support
                </Link>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {trustIndicators.map((item) => (
                  <article
                    key={item.label}
                    className="rounded-[1.75rem] border border-white/12 bg-white/6 p-6"
                  >
                    <p className="font-display text-5xl font-semibold text-[var(--color-gold)]">
                      {item.value}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.label}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-white">
          <div className="container-shell">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
                Client Perspective
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-[var(--color-navy-950)] sm:text-5xl">
                Trusted by households, founders, and established businesses.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article key={testimonial.name} className="panel rounded-[2rem] p-7">
                  <div className="text-5xl leading-none text-[var(--color-gold)]/28">
                    &ldquo;
                  </div>
                  <p className="mt-4 text-lg leading-8 text-[var(--color-slate-950)]">
                    {testimonial.quote}
                  </p>
                  <div className="mt-6 border-t border-[var(--color-line)] pt-5">
                    <p className="text-base font-semibold text-[var(--color-navy-950)]">
                      {testimonial.name}
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-slate-700)]">
                      {testimonial.role}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-14 rounded-[2.5rem] bg-[linear-gradient(145deg,#10223f,#081426)] px-6 py-10 text-white sm:px-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[var(--color-gold)]">
                    Start Banking
                  </p>
                  <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
                    Open an account or speak with a Prestige Trust banker.
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                    Personal banking, cards, lending, and digital access with
                    direct support from a professional banking team.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <Link
                    href="/open-account"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-semibold text-[var(--color-navy-950)] hover:bg-[var(--color-gold-soft)]"
                  >
                    Open Account
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/6"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
