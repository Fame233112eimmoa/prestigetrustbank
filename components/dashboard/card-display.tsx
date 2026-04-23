"use client";

import { useState, type FormEvent } from "react";

import { formatCurrency } from "@/lib/dashboard-data";
import type { DashboardCard } from "@/types/dashboard";

import { StatusBadge } from "@/components/dashboard/status-badge";

type CardDisplayProps = {
  card: DashboardCard;
  showControls?: boolean;
  onToggleFrozen?: (cardId: string) => { ok: boolean; message: string };
  onUpdateLimit?: (
    cardId: string,
    spendingLimit: number
  ) => { ok: boolean; message: string };
};

type FeedbackState = {
  tone: "success" | "danger";
  message: string;
};

export function CardDisplay({
  card,
  showControls = true,
  onToggleFrozen,
  onUpdateLimit,
}: CardDisplayProps) {
  const [limitValue, setLimitValue] = useState(card.spendingLimit.toString());
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  function handleFreezeToggle() {
    if (!onToggleFrozen) {
      return;
    }

    const result = onToggleFrozen(card.id);
    setFeedback({
      tone: result.ok ? "success" : "danger",
      message: result.message,
    });
  }

  function handleLimitSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!onUpdateLimit) {
      return;
    }

    const parsedLimit = Number(limitValue);
    const result = onUpdateLimit(card.id, parsedLimit);
    setFeedback({
      tone: result.ok ? "success" : "danger",
      message: result.message,
    });

    if (result.ok) {
      setLimitValue(parsedLimit.toFixed(2));
    }
  }

  return (
    <section className="panel overflow-hidden rounded-[2.25rem]">
      <div className="grid gap-0 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
        <div className="bg-[linear-gradient(140deg,#081426_0%,#10223f_52%,#17345e_100%)] px-6 py-7 text-white sm:px-9 sm:py-9">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold-soft)]">
                {card.type}
              </p>
              <h3 className="mt-4 text-[2rem] font-semibold leading-tight sm:text-[2.35rem]">
                {card.name}
              </h3>
            </div>
            <StatusBadge
              label={card.frozen ? "Frozen" : "Active"}
              tone={card.frozen ? "warning" : "success"}
            />
          </div>

          <div className="mt-10 rounded-[2rem] border border-white/12 bg-white/8 p-6 backdrop-blur sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300 sm:text-sm">
                {card.network}
              </p>
              <p className="text-xs text-slate-300 sm:text-sm">
                Expires {card.expiry}
              </p>
            </div>
            <p className="mt-10 text-[2rem] font-semibold leading-none tracking-[0.16em] sm:text-[2.35rem]">
              {card.maskedNumber}
            </p>
            <div className="mt-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                  Cardholder
                </p>
                <p className="mt-2 text-base font-semibold">{card.holder}</p>
              </div>
              <div className="h-12 w-20 rounded-full border border-white/20 bg-[radial-gradient(circle_at_top,rgba(236,217,178,0.9),rgba(200,164,93,0.3))]" />
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            <div className="flex min-h-[132px] flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                Credit Limit
              </p>
              <p className="mt-4 text-xl font-semibold leading-tight sm:text-[1.35rem]">
                {formatCurrency(card.creditLimit)}
              </p>
            </div>
            <div className="flex min-h-[132px] flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                Available Credit
              </p>
              <p className="mt-4 text-xl font-semibold leading-tight sm:text-[1.35rem]">
                {formatCurrency(card.availableCredit)}
              </p>
            </div>
            <div className="flex min-h-[132px] flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                Rewards
              </p>
              <p className="mt-4 text-xl font-semibold leading-tight sm:text-[1.35rem]">
                {card.rewards.toLocaleString("en-GB")} pts
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-7 sm:px-9 sm:py-9">
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                Card Management
              </p>
              <h3 className="mt-4 text-[1.9rem] font-semibold leading-tight text-[var(--color-navy-950)] sm:text-[2.25rem]">
                Limits, controls, and activity
              </h3>
            </div>
          </div>

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

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="flex min-h-[136px] flex-col justify-between rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                Spending Limit
              </p>
              <p className="mt-4 text-[1.9rem] font-semibold leading-tight text-[var(--color-navy-950)]">
                {formatCurrency(card.spendingLimit)}
              </p>
            </div>
            <div className="flex min-h-[136px] flex-col justify-between rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                Card Status
              </p>
              <p className="mt-4 text-[1.9rem] font-semibold leading-tight text-[var(--color-navy-950)]">
                {card.frozen ? "Frozen" : "Active"}
              </p>
            </div>
          </div>

          {showControls ? (
            <div className="mt-8 space-y-5">
              <button
                type="button"
                onClick={handleFreezeToggle}
                className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold ${
                  card.frozen
                    ? "bg-[var(--color-navy-950)] text-white"
                    : "border border-[var(--color-line)] text-[var(--color-navy-950)]"
                }`}
              >
                {card.frozen ? "Unfreeze Card" : "Freeze Card"}
              </button>

              <form className="space-y-4" onSubmit={handleLimitSubmit}>
                <label
                  htmlFor={`limit-${card.id}`}
                  className="block text-sm font-medium text-[var(--color-slate-950)]"
                >
                  Update spending limit
                </label>
                <input
                  id={`limit-${card.id}`}
                  type="number"
                  min="500"
                  step="0.01"
                  value={limitValue}
                  onChange={(event) => setLimitValue(event.target.value)}
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                />
                <button
                  type="submit"
                  className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-[var(--color-gold)] px-5 py-3.5 text-sm font-semibold text-[var(--color-navy-950)]"
                >
                  Update Limit
                </button>
              </form>
            </div>
          ) : null}

          <div className="mt-10 border-t border-[var(--color-line)] pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-slate-500)]">
              Card Activity
            </p>
            <ul className="mt-5 space-y-4">
              {card.activity.slice(0, showControls ? 3 : 2).map((item) => (
                <li
                  key={item.id}
                  className="rounded-[1.5rem] border border-[var(--color-line)] px-5 py-5"
                >
                  <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-6">
                    <div className="min-w-0">
                      <p className="font-semibold text-[var(--color-slate-950)]">
                        {item.title}
                      </p>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-slate-700)]">
                        {item.description}
                      </p>
                    </div>
                    <div className="md:min-w-[116px] md:pl-4 md:text-right">
                      <p className="text-base font-semibold leading-none text-[var(--color-navy-950)]">
                        {typeof item.amount === "number"
                          ? formatCurrency(item.amount)
                          : item.status}
                      </p>
                      <p className="mt-2 text-sm text-[var(--color-slate-500)]">
                        {item.dateLabel}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
