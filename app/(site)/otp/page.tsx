import type { Metadata } from "next";
import Link from "next/link";

import { ShieldIcon } from "@/components/icons";
import { OtpForm } from "@/forms/otp-form";

export const metadata: Metadata = {
  title: "Verify Login",
  description: "Verify your Prestige Trust Bank sign-in.",
};

export default function OtpPage() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden px-4 py-8 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,164,93,0.12),transparent_26%),linear-gradient(180deg,rgba(8,20,38,0.08),transparent_38%)]" />

      <div className="relative mx-auto flex w-full max-w-md flex-col items-center">
        <Link href="/" className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-navy-950)] text-white shadow-lg shadow-slate-950/15">
            <ShieldIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-navy-950)]">
              Prestige Trust
            </p>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-gold)]">
              Online Banking
            </p>
          </div>
        </Link>

        <div className="w-full">
          <OtpForm />
        </div>
      </div>
    </section>
  );
}
