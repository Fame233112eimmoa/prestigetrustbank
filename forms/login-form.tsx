"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { FormEvent } from "react";

import {
  authSessionKeys,
  isValidLoginCredentials,
} from "@/lib/auth-credentials";

type LoginValues = {
  customerId: string;
  password: string;
};

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState<LoginValues>({ customerId: "", password: "" });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!values.customerId.trim() || !values.password.trim()) {
      setError("Enter both your customer ID and password to continue.");
      return;
    }

    if (!isValidLoginCredentials(values.customerId, values.password)) {
      setError("Wrong credentials. Check your customer ID and password.");
      return;
    }

    window.sessionStorage.setItem(authSessionKeys.otpReady, "true");

    startTransition(() => {
      router.push("/otp");
    });
  }

  return (
    <div className="panel rounded-[2.25rem] p-7 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
        Client Sign-In
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--color-navy-950)]">
        Sign in
      </h1>
      <p className="mt-3 text-sm leading-7 text-[var(--color-slate-700)]">
        Enter your customer ID and password.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block text-sm font-medium text-[var(--color-slate-950)]">
          Customer ID
          <input
            value={values.customerId}
            onChange={(event) => setValues((current) => ({ ...current, customerId: event.target.value }))}
            className="mt-2 w-full rounded-[1.25rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface-soft)]/70 px-4 py-3.5 outline-none focus:border-[var(--color-gold)] focus:bg-white"
            placeholder="PTB-10248"
          />
        </label>

        <label className="mt-5 block text-sm font-medium text-[var(--color-slate-950)]">
          Password
          <input
            value={values.password}
            onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
            type="password"
            className="mt-2 w-full rounded-[1.25rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface-soft)]/70 px-4 py-3.5 outline-none focus:border-[var(--color-gold)] focus:bg-white"
            placeholder="Enter your password"
          />
        </label>

        {error ? (
          <p className="mt-4 rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-[var(--color-danger)]">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-navy-950)] px-6 py-3.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[var(--color-navy-900)]"
        >
          {isPending ? "Continuing..." : "Continue"}
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-3 rounded-[1.5rem] bg-[var(--color-surface-soft)] p-5 text-sm text-[var(--color-slate-700)]">
        <p>Need help signing in?</p>
        <Link href="/contact" className="font-semibold text-[var(--color-navy-900)] hover:text-[var(--color-gold)]">
          Contact Support
        </Link>
        <Link href="/" className="font-semibold text-[var(--color-navy-900)] hover:text-[var(--color-gold)]">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
