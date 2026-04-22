import Link from "next/link";
import type { Metadata } from "next";

import { HeroSection } from "@/components/hero-section";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { benefits, featuredServices, testimonials, trustStats } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Personal banking, business banking, lending, cards, and digital banking from Prestige Trust Bank.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section id="services" className="section-spacing">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Featured Services"
            title="Banking for personal and business needs."
            description="Checking, savings, lending, cards, treasury services, and digital banking."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredServices.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-shell grid gap-10 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
          <div>
            <SectionHeader
              eyebrow="Why Prestige Trust"
              title="Service, security, and steady guidance."
              description="Personal, private, and business banking with direct support."
            />
            <div className="mt-8 rounded-[2.25rem] bg-[linear-gradient(135deg,#081426,#10223f)] p-7 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                Our Approach
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-200">
                Everyday banking, lending, treasury services, and digital access
                under one bank.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article key={benefit.title} className="panel rounded-[2rem] p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-soft)] text-[var(--color-navy-900)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-[var(--color-navy-950)]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-slate-700)]">
                    {benefit.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-shell rounded-[2.5rem] bg-[var(--color-navy-950)] px-6 py-10 text-white sm:px-10">
          <SectionHeader
            eyebrow="Trust Indicators"
            title="Why clients choose Prestige Trust."
            theme="light"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {trustStats.map((stat) => (
              <article key={stat.label} className="rounded-[1.75rem] border border-white/12 bg-white/6 p-6">
                <p className="font-display text-5xl font-semibold text-[var(--color-gold)]">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Client Perspective"
            title="What clients say."
            align="center"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-shell">
          <div className="panel rounded-[2.5rem] bg-[linear-gradient(135deg,#10223f,#081426)] px-6 py-10 text-white sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
              Get Started
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Open an account or speak with a banker.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              We are ready to help.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/open-account"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-semibold text-[var(--color-navy-950)] hover:bg-[var(--color-gold-soft)]"
              >
                Open Account
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/6"
              >
                Speak with a Banker
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
