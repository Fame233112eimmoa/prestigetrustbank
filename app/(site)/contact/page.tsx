import type { Metadata } from "next";

import { ContentGrid } from "@/components/content-grid";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { BankIcon, BuildingIcon, PhoneIcon, ShieldIcon } from "@/components/icons";
import { ContactForm } from "@/forms/contact-form";
import { contactDetails } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Prestige Trust Bank for personal banking, business services, lending guidance, and digital support.",
};

const contactMetrics = [
  { value: "1 Day", label: "Response time" },
  { value: "24/7", label: "Digital banking" },
  { value: "Direct", label: "Banker access" },
  { value: "Secure", label: "Message handling" },
];

const serviceAreas = [
  {
    title: "Personal and private banking",
    description:
      "Accounts, cards, and everyday banking.",
    icon: BankIcon,
  },
  {
    title: "Business and treasury services",
    description:
      "Business accounts, payments, and treasury services.",
    icon: BuildingIcon,
  },
  {
    title: "Digital banking support",
    description:
      "Online banking, account access, and alerts.",
    icon: ShieldIcon,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Prestige Trust"
        title="Contact Prestige Trust Bank."
        description="We are here to help with accounts, lending, cards, business banking, and digital banking."
        primaryHref="#contact-form"
        primaryLabel="Send a Message"
        secondaryHref="/about"
        secondaryLabel="Learn About Prestige Trust"
        metrics={contactMetrics}
        highlights={[
          "Personal and business banking",
          "Lending and digital banking",
        ]}
      />

      <section className="section-spacing">
        <div className="container-shell grid gap-8 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
          <div
            id="contact-details"
            className="rounded-[2.5rem] bg-[linear-gradient(145deg,#081426,#10223f)] p-8 text-white sm:p-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
              Client Support
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Talk to the right team.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Call, email, or send a message.
            </p>

            <div className="mt-8 grid gap-4">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.label}
                    className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-white/8 p-2 text-[var(--color-gold)]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{item.label}</p>
                        <p className="mt-1 text-sm leading-7 text-slate-300">{item.value}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/6 p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white/8 p-2 text-[var(--color-gold)]">
                  <PhoneIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                    Direct Support
                  </p>
                  <p className="mt-3 text-lg leading-8 text-slate-100">
                    Personal banking, business banking, lending, cards, and digital banking.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="container-shell">
          <SectionHeader
            eyebrow="Service Areas"
            title="How We Can Help"
            align="center"
          />

          <div className="mt-12">
            <ContentGrid items={serviceAreas} />
          </div>
        </div>
      </section>
    </>
  );
}
