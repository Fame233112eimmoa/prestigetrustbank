"use client";

import Link from "next/link";

import { ActivityList } from "@/components/dashboard/activity-list";
import { CardDisplay } from "@/components/dashboard/card-display";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { CardIcon, SparkleIcon, WalletIcon } from "@/components/icons";
import { formatCurrency } from "@/lib/dashboard-data";

const primaryActionClass =
  "inline-flex items-center justify-center rounded-full bg-[var(--color-navy-950)] px-5 py-3 text-sm font-semibold text-white";

const secondaryActionClass =
  "inline-flex items-center justify-center rounded-full border border-[var(--color-line)] px-5 py-3 text-sm font-semibold text-[var(--color-navy-950)]";

export function CardsPage() {
  const { cards, state, toggleCardFrozen, updateCardLimit } = useDashboard();

  const totalAvailableCredit = cards.reduce(
    (total, card) => total + card.availableCredit,
    0
  );
  const totalRewards = cards.reduce((total, card) => total + card.rewards, 0);
  const frozenCards = cards.filter((card) => card.frozen).length;
  const cardActivity = state.activities
    .filter((item) => item.kind === "card")
    .slice(0, 6);

  return (
    <div className="space-y-8">
      <DashboardHeader
        eyebrow="Cards"
        title="Cards"
        description="Manage limits, controls, and activity."
        actions={
          <>
            <Link href="/dashboard/support" className={primaryActionClass}>
              Card Support
            </Link>
            <Link href="/dashboard/payments" className={secondaryActionClass}>
              Make a Payment
            </Link>
          </>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          label="Cards on File"
          value={cards.length.toString()}
          detail="Active cards"
          icon={CardIcon}
        />
        <SummaryCard
          label="Available Credit"
          value={formatCurrency(totalAvailableCredit)}
          detail="Total available credit"
          icon={WalletIcon}
        />
        <SummaryCard
          label="Rewards"
          value={`${totalRewards.toLocaleString("en-GB")} pts`}
          detail="Current rewards"
          icon={SparkleIcon}
          accent="gold"
        />
      </div>

      <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          {cards.map((card) => (
            <CardDisplay
              key={card.id}
              card={card}
              onToggleFrozen={toggleCardFrozen}
              onUpdateLimit={updateCardLimit}
            />
          ))}
        </div>

        <div className="space-y-6 2xl:sticky 2xl:top-8 2xl:self-start">
          <section className="panel rounded-[2.25rem] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
              Card Portfolio
            </p>
            <h2 className="mt-4 text-[1.9rem] font-semibold leading-tight text-[var(--color-navy-950)]">
              Status and limits
            </h2>
            <div className="mt-7 space-y-4">
              {cards.map((card) => (
                <article
                  key={card.id}
                  className="rounded-[1.7rem] bg-[var(--color-surface-soft)] px-5 py-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold text-[var(--color-slate-950)]">
                        {card.name}
                      </p>
                      <p className="mt-2 text-sm tracking-[0.08em] text-[var(--color-slate-700)]">
                        {card.maskedNumber}
                      </p>
                    </div>
                    <StatusBadge
                      label={card.frozen ? "Frozen" : "Active"}
                      tone={card.frozen ? "warning" : "success"}
                    />
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2 2xl:grid-cols-1">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-slate-500)]">
                        Spending Limit
                      </p>
                      <p className="mt-2 text-lg font-semibold text-[var(--color-navy-950)]">
                        {formatCurrency(card.spendingLimit)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-slate-500)]">
                        Available Credit
                      </p>
                      <p className="mt-2 text-lg font-semibold text-[var(--color-navy-950)]">
                        {formatCurrency(card.availableCredit)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel rounded-[2.25rem] bg-[var(--color-navy-950)] p-6 sm:p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold-soft)]">
              Card Controls
            </p>
            <h2 className="mt-4 text-[1.9rem] font-semibold leading-tight">
              Portfolio status
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 2xl:grid-cols-1">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/6 px-5 py-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                  Active Cards
                </p>
                <p className="mt-3 text-2xl font-semibold">
                  {cards.length - frozenCards}
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/6 px-5 py-5">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                  Frozen Cards
                </p>
                <p className="mt-3 text-2xl font-semibold">
                  {frozenCards}
                </p>
              </div>
            </div>
          </section>

          <ActivityList
            title="Card Activity"
            items={cardActivity}
          />
        </div>
      </div>
    </div>
  );
}
