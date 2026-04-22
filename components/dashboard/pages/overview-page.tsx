"use client";

import Link from "next/link";

import { ActivityList } from "@/components/dashboard/activity-list";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NotificationsPanel } from "@/components/dashboard/notifications-panel";
import { QuickActionsPanel } from "@/components/dashboard/quick-actions-panel";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import {
  BankIcon,
  ChartIcon,
  SparkleIcon,
  WalletIcon,
} from "@/components/icons";
import { formatCurrency } from "@/lib/dashboard-data";

const primaryActionClass =
  "inline-flex items-center justify-center rounded-full bg-[var(--color-navy-950)] px-5 py-3 text-sm font-semibold text-white";

const secondaryActionClass =
  "inline-flex items-center justify-center rounded-full border border-[var(--color-line)] px-5 py-3 text-sm font-semibold text-[var(--color-navy-950)]";

export function OverviewPage() {
  const {
    accounts,
    primaryCard,
    state,
    totalPortfolioBalance,
    unreadNotificationsCount,
  } = useDashboard();
  const portfolioAccounts = [accounts.checking, accounts.savings];

  return (
    <div className="space-y-8">
      <DashboardHeader
        eyebrow="Account Summary"
        title={`Welcome back, ${state.user.firstName}.`}
        description="Checking, savings, cards, and recent activity."
        actions={
          <>
            <Link href="/dashboard/payments" className={primaryActionClass}>
              Move Money
            </Link>
            <Link href="/dashboard/support" className={secondaryActionClass}>
              Contact Support
            </Link>
          </>
        }
      />

      <div className="grid gap-8 2xl:grid-cols-[minmax(0,1.08fr)_390px]">
        <div className="space-y-8">
          <section className="panel rounded-[2.25rem] p-6 sm:p-7">
            <div className="grid gap-7 xl:grid-cols-[minmax(0,1.18fr)_320px] xl:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
                  Portfolio
                </p>
                <h2 className="mt-4 text-[2rem] font-semibold leading-tight text-[var(--color-navy-950)] sm:text-[2.35rem]">
                  Balances and card position
                </h2>
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <SummaryCard
                    label="Total Balance"
                    value={formatCurrency(totalPortfolioBalance)}
                    detail="Checking and savings"
                    icon={BankIcon}
                  />
                  <SummaryCard
                    label="Checking"
                    value={formatCurrency(accounts.checking.availableBalance)}
                    detail="Primary account"
                    icon={WalletIcon}
                  />
                  <SummaryCard
                    label="Savings"
                    value={formatCurrency(accounts.savings.availableBalance)}
                    detail="Reserve account"
                    icon={ChartIcon}
                    accent="gold"
                  />
                  <SummaryCard
                    label="Rewards"
                    value={`${primaryCard.rewards.toLocaleString("en-US")} pts`}
                    detail="Available rewards"
                    icon={SparkleIcon}
                    accent="gold"
                  />
                </div>
              </div>

              <section className="rounded-[2rem] bg-[linear-gradient(145deg,#081426_0%,#10223f_52%,#17345e_100%)] p-6 text-white shadow-[0_22px_50px_rgba(8,20,38,0.22)] sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold-soft)]">
                      Featured Card
                    </p>
                    <h3 className="mt-4 text-[1.8rem] font-semibold leading-tight">
                      {primaryCard.name}
                    </h3>
                  </div>
                  <StatusBadge
                    label={primaryCard.frozen ? "Frozen" : "Active"}
                    tone={primaryCard.frozen ? "warning" : "success"}
                  />
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-white/12 bg-white/8 px-5 py-5 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-300">
                    {primaryCard.network}
                  </p>
                  <p className="mt-5 text-[1.75rem] font-semibold tracking-[0.16em]">
                    {primaryCard.maskedNumber}
                  </p>
                  <p className="mt-3 text-sm text-slate-300">
                    Expires {primaryCard.expiry}
                  </p>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                      Available Credit
                    </p>
                    <p className="mt-3 text-xl font-semibold leading-tight">
                      {formatCurrency(primaryCard.availableCredit)}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                      Spending Limit
                    </p>
                    <p className="mt-3 text-xl font-semibold leading-tight">
                      {formatCurrency(primaryCard.spendingLimit)}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard/cards"
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/8 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/12"
                >
                  Manage Cards
                </Link>
              </section>
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-2">
              {portfolioAccounts.map((account) => {
                const latestTransaction = account.recentTransactions[0];

                return (
                  <article
                    key={account.id}
                    className="rounded-[1.9rem] border border-[var(--color-line)] bg-[var(--color-surface-soft)]/65 p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
                          {account.type}
                        </p>
                        <h3 className="mt-4 text-[1.55rem] font-semibold leading-tight text-[var(--color-navy-950)]">
                          {account.name}
                        </h3>
                        <p className="mt-3 text-sm font-medium tracking-[0.08em] text-[var(--color-slate-700)]">
                          {account.maskedNumber}
                        </p>
                      </div>
                      <StatusBadge
                        label={account.status}
                        tone={
                          account.status === "Active"
                            ? "success"
                            : account.status === "Protected"
                              ? "info"
                              : "warning"
                        }
                      />
                    </div>

                    <div className="mt-7 rounded-[1.55rem] bg-white px-5 py-5 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)]">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                        Available Balance
                      </p>
                      <p className="mt-3 text-[2rem] font-semibold leading-tight text-[var(--color-navy-950)]">
                        {formatCurrency(account.availableBalance)}
                      </p>
                    </div>

                    {latestTransaction ? (
                      <div className="mt-6 border-t border-[var(--color-line)] pt-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                          Latest Transaction
                        </p>
                        <div className="mt-4 flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="font-semibold text-[var(--color-slate-950)]">
                              {latestTransaction.title}
                            </p>
                            <p className="mt-2 text-sm leading-7 text-[var(--color-slate-700)]">
                              {latestTransaction.description}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p
                              className={`text-base font-semibold ${
                                latestTransaction.tone === "credit"
                                  ? "text-[var(--color-success)]"
                                  : latestTransaction.tone === "debit"
                                    ? "text-[var(--color-danger)]"
                                    : "text-[var(--color-navy-950)]"
                              }`}
                            >
                              {typeof latestTransaction.amount === "number"
                                ? `${latestTransaction.tone === "credit" ? "+" : latestTransaction.tone === "debit" ? "-" : ""}${formatCurrency(latestTransaction.amount)}`
                                : latestTransaction.status}
                            </p>
                            <p className="mt-2 text-sm text-[var(--color-slate-500)]">
                              {latestTransaction.dateLabel}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href="/dashboard/accounts"
                        className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy-950)] px-4 py-3 text-sm font-semibold text-white"
                      >
                        View Account
                      </Link>
                      <Link
                        href="/dashboard/payments"
                        className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] px-4 py-3 text-sm font-semibold text-[var(--color-navy-950)]"
                      >
                        Transfer Funds
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
            <ActivityList
              title="Recent Activity"
              items={state.activities.slice(0, 6)}
            />
            <QuickActionsPanel />
          </div>
        </div>

        <div className="space-y-6 2xl:sticky 2xl:top-8 2xl:self-start">
          <NotificationsPanel />

          <section className="panel rounded-[2.25rem] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
              Client Profile
            </p>
            <h2 className="mt-4 text-[1.9rem] font-semibold leading-tight text-[var(--color-navy-950)]">
              Relationship details
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 2xl:grid-cols-1">
              <div className="rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-slate-500)]">
                  Relationship Manager
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-navy-950)]">
                  {state.user.relationshipManager}
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-slate-500)]">
                  Primary Branch
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-navy-950)]">
                  {state.user.branch}
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-slate-500)]">
                  Client ID
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-navy-950)]">
                  {state.user.clientId}
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-slate-500)]">
                  Notifications
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-navy-950)]">
                  {unreadNotificationsCount} unread
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/dashboard/support"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy-950)] px-4 py-3 text-sm font-semibold text-white"
              >
                Contact Support
              </Link>
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] px-4 py-3 text-sm font-semibold text-[var(--color-navy-950)]"
              >
                Preferences
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
