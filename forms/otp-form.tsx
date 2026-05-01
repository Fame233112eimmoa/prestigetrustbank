"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import type { FormEvent } from "react";
import { isValidOtpCode } from "@/lib/auth-credentials";
import {
  completeOtpSignIn,
  hasValidAuthSession,
  isOtpChallengeReady,
} from "@/lib/auth-session";

export function OtpForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "info">("idle");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (hasValidAuthSession()) {
      router.replace("/dashboard");
      return;
    }

    if (!isOtpChallengeReady()) {
      router.replace("/login");
    }
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!isOtpChallengeReady()) {
      router.replace("/login");
      return;
    }

    if (!/^\d{6}$/.test(code.trim())) {
      setStatus("error");
      setMessage("Enter the 6-digit verification code to continue.");
      return;
    }

    if (!isValidOtpCode(code)) {
      setStatus("error");
      setMessage("The verification code is incorrect. Please try again.");
      return;
    }

    completeOtpSignIn();

    startTransition(() => {
      router.push("/dashboard");
    });
  }

  function handleResend() {
    setStatus("info");
    setMessage("A new verification code has been issued to your registered device.");
  }

  return (
    <div className="panel rounded-[2.25rem] p-7 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
        One-Time Passcode
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--color-navy-950)]">
        Verify Sign-In
      </h1>
      <p className="mt-3 text-sm leading-7 text-[var(--color-slate-700)]">
        Enter the 6-digit code sent to your registered device.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block text-sm font-medium text-[var(--color-slate-950)]">
          Verification code
          <input
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            inputMode="numeric"
            autoComplete="one-time-code"
            className="mt-2 w-full rounded-[1.25rem] border border-[rgba(15,23,42,0.08)] bg-[var(--color-surface-soft)]/70 px-4 py-4 text-center text-2xl tracking-[0.5em] outline-none focus:border-[var(--color-gold)] focus:bg-white"
            placeholder=""
          />
        </label>

        {message ? (
          <p
            className={`mt-4 rounded-[1.25rem] border px-4 py-3 text-sm ${
              status === "error"
                ? "border-rose-200 bg-rose-50 text-[var(--color-danger)]"
                : "border-emerald-200 bg-emerald-50 text-[var(--color-success)]"
            }`}
          >
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-navy-950)] px-6 py-3.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[var(--color-navy-900)]"
        >
          {isPending ? "Verifying..." : "Verify"}
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-3 rounded-[1.5rem] bg-[var(--color-surface-soft)] p-5 text-sm text-[var(--color-slate-700)]">
        <button
          type="button"
          onClick={handleResend}
          className="text-left font-semibold text-[var(--color-navy-900)] hover:text-[var(--color-gold)]"
        >
          Resend verification code
        </button>
        <Link href="/login" className="font-semibold text-[var(--color-navy-900)] hover:text-[var(--color-gold)]">
          Back to Sign In
        </Link>
        <Link href="/contact" className="font-semibold text-[var(--color-navy-900)] hover:text-[var(--color-gold)]">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
