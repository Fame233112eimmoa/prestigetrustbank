"use client";

import { useState, type FormEvent } from "react";

import type { AccountId } from "@/types/dashboard";

import { PageSectionHeader } from "@/components/dashboard/page-section-header";
import { useDashboard } from "@/components/dashboard/dashboard-provider";

type FeedbackState = {
  tone: "success" | "danger";
  message: string;
};

export function TransferForm() {
  const { transferBetweenAccounts } = useDashboard();
  const [form, setForm] = useState({
    fromAccountId: "checking" as AccountId,
    toAccountId: "savings" as AccountId,
    amount: "",
    memo: "",
  });
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = transferBetweenAccounts({
      fromAccountId: form.fromAccountId,
      toAccountId: form.toAccountId,
      amount: Number(form.amount),
      memo: form.memo,
    });

    setFeedback({
      tone: result.ok ? "success" : "danger",
      message: result.message,
    });

    if (result.ok) {
      setForm((current) => ({
        ...current,
        amount: "",
        memo: "",
      }));
    }
  }

  return (
    <section className="panel rounded-[2.25rem] p-6 sm:p-7">
      <PageSectionHeader
        eyebrow="Internal Transfer"
        title="Transfer Funds"
      />

      {feedback ? (
        <div
          className={`mt-6 rounded-[1.6rem] border px-5 py-4 text-sm ${
            feedback.tone === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {feedback.message}
        </div>
      ) : null}

      <form className="mt-7 space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2.5">
            <span className="block text-sm font-medium text-[var(--color-slate-950)]">
              From account
            </span>
            <select
              value={form.fromAccountId}
              onChange={(event) => {
                const nextFrom = event.target.value as AccountId;
                setForm((current) => ({
                  ...current,
                  fromAccountId: nextFrom,
                  toAccountId:
                    current.toAccountId === nextFrom
                      ? nextFrom === "checking"
                        ? "savings"
                        : "checking"
                      : current.toAccountId,
                }));
              }}
              className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
          </label>

          <label className="space-y-2.5">
            <span className="block text-sm font-medium text-[var(--color-slate-950)]">
              To account
            </span>
            <select
              value={form.toAccountId}
              onChange={(event) => {
                const nextTo = event.target.value as AccountId;
                setForm((current) => ({
                  ...current,
                  toAccountId: nextTo,
                  fromAccountId:
                    current.fromAccountId === nextTo
                      ? nextTo === "checking"
                        ? "savings"
                        : "checking"
                      : current.fromAccountId,
                }));
              }}
              className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2.5">
            <span className="block text-sm font-medium text-[var(--color-slate-950)]">
              Amount
            </span>
            <input
              type="number"
              min="1"
              step="0.01"
              value={form.amount}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  amount: event.target.value,
                }))
              }
              placeholder="0.00"
              className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
            />
          </label>

          <label className="space-y-2.5">
            <span className="block text-sm font-medium text-[var(--color-slate-950)]">
              Memo
            </span>
            <input
              type="text"
              value={form.memo}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  memo: event.target.value,
                }))
              }
              placeholder="Monthly reserve contribution"
              
              className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
            />
          </label>
        </div>

        <div className="rounded-[1.65rem] bg-[var(--color-surface-soft)] px-5 py-5 text-sm leading-7 text-[var(--color-slate-700)]">
          Transfers post immediately.
        </div>

        <button
          type="submit"
          className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-[var(--color-navy-950)] px-5 py-3.5 text-sm font-semibold text-white"
        >
          Transfer Funds
        </button>
      </form>
    </section>
  );
}
