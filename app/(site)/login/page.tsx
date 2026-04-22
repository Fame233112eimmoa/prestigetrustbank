import type { Metadata } from "next";

import { LoginForm } from "@/forms/login-form";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to Prestige Trust Bank online banking.",
};

export default function LoginPage() {
  return (
    <section className="section-spacing">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[2.25rem] bg-[linear-gradient(145deg,#081426,#10223f)] p-8 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
            Secure Access
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-tight">
            Secure sign-in for online banking.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-300">
            Use your customer ID, password, and verification code to continue.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              "Customer ID",
              "Password",
              "Verification code",
            ].map((item) => (
              <article
                key={item}
                className="rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-4 text-sm leading-7 text-slate-200"
              >
                {item}
              </article>
            ))}
          </div>
        </div>

        <LoginForm />
      </div>
    </section>
  );
}
