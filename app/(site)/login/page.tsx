"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";

import { ShieldIcon } from "@/components/icons";

type LoginValues = {
  customerId: string;
  password: string;
  verificationCode: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [values, setValues] = useState<LoginValues>({
    customerId: "",
    password: "",
    verificationCode: "",
  });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (
      !values.customerId.trim() ||
      !values.password.trim() ||
      !values.verificationCode.trim()
    ) {
      setError("Enter your customer ID, password, and verification code.");
      return;
    }

    if (values.password.trim().length < 6) {
      setError("Use at least 6 characters for your password.");
      return;
    }

    if (!/^\d{6}$/.test(values.verificationCode.trim())) {
      setError("Enter a valid 6-digit verification code.");
      return;
    }

    startTransition(() => {
      router.push("/dashboard");
    });
  }

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

        <div className="panel w-full rounded-[2rem] p-6 shadow-[0_24px_60px_rgba(8,20,38,0.12)] sm:p-7">
          <h1 className="sr-only">Sign in to Prestige Trust Bank</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-[var(--color-slate-950)]">
              Customer ID
              <input
                value={values.customerId}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    customerId: event.target.value,
                  }))
                }
                className="mt-2 w-full rounded-[1.15rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface-soft)]/80 px-4 py-3.5 outline-none focus:border-[var(--color-gold)] focus:bg-white"
                placeholder="PTB-10248"
                autoComplete="username"
              />
            </label>

            <label className="block text-sm font-medium text-[var(--color-slate-950)]">
              Password
              <input
                value={values.password}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
                type="password"
                className="mt-2 w-full rounded-[1.15rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface-soft)]/80 px-4 py-3.5 outline-none focus:border-[var(--color-gold)] focus:bg-white"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </label>

            <label className="block text-sm font-medium text-[var(--color-slate-950)]">
              Verification code
              <input
                value={values.verificationCode}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    verificationCode: event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6),
                  }))
                }
                inputMode="numeric"
                autoComplete="one-time-code"
                className="mt-2 w-full rounded-[1.15rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface-soft)]/80 px-4 py-3.5 outline-none focus:border-[var(--color-gold)] focus:bg-white"
                placeholder="000000"
              />
            </label>

            {error ? (
              <p className="rounded-[1.15rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-[var(--color-danger)]">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-navy-950)] px-6 py-3.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[var(--color-navy-900)]"
            >
              {isPending ? "Signing In..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
