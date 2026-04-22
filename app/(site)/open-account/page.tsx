import type { Metadata } from "next";

import { OpenAccountForm } from "@/forms/open-account-form";

export const metadata: Metadata = {
  title: "Open Account",
  description:
    "Open a Prestige Trust Bank account.",
};

export default function OpenAccountPage() {
  return (
    <section className="section-spacing">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="rounded-[2.25rem] bg-[var(--color-navy-950)] p-8 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
            Account Opening
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-tight">
            Open your account with Prestige Trust.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Start your application in a few steps.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              "Personal details",
              "Account type",
              "Contact details",
            ].map((item) => (
              <article key={item} className="rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-4 text-sm text-slate-200">
                {item}
              </article>
            ))}
          </div>
        </div>

        <OpenAccountForm />
      </div>
    </section>
  );
}
