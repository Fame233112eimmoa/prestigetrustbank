"use client";

import { useState } from "react";
import Link from "next/link";

import { ActivityList } from "@/components/dashboard/activity-list";
import { AccountCard } from "@/components/dashboard/account-card";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { BankIcon, ChartIcon, WalletIcon } from "@/components/icons";
import { formatCurrency } from "@/lib/dashboard-data";

const primaryActionClass =
  "inline-flex items-center justify-center rounded-full bg-[var(--color-navy-950)] px-5 py-3 text-sm font-semibold text-white";

const secondaryActionClass =
  "inline-flex items-center justify-center rounded-full border border-[var(--color-line)] px-5 py-3 text-sm font-semibold text-[var(--color-navy-950)]";

export function AccountsPage() {
  const { accountList, state, totalPortfolioBalance } = useDashboard();
  const [message, setMessage] = useState<string | null>(null);

  const accountActivity = state.activities
    .filter((item) =>
      item.kind === "deposit" ||
      item.kind === "transfer" ||
      item.kind === "payment"
    )
    .slice(0, 6);

  return (
    <div className="space-y-8">
      <DashboardHeader
        eyebrow="Accounts"
        title="Checking and Savings"
        actions={
          <>
            <Link href="/dashboard/payments" className={primaryActionClass}>
              Transfer Funds
            </Link>
            <Link href="/dashboard/settings" className={secondaryActionClass}>
              Update Preferences
            </Link>
          </>
        }
      />

      {message ? (
        <div className="rounded-[1.65rem] border border-sky-200 bg-sky-50 px-5 py-4 text-sm text-sky-700">
          {message}
        </div>
      ) : null}

      <div className="grid gap-8 2xl:grid-cols-[minmax(0,1.08fr)_360px]">
        <div className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <SummaryCard
              label="Total Balance"
              value={formatCurrency(totalPortfolioBalance)}
              detail="Checking and savings"
              icon={BankIcon}
            />
            <SummaryCard
              label="Checking"
              value={formatCurrency(state.accounts.checking.availableBalance)}
              detail={state.accounts.checking.maskedNumber}
              icon={WalletIcon}
            />
            <SummaryCard
              label="Savings"
              value={formatCurrency(state.accounts.savings.availableBalance)}
              detail={state.accounts.savings.maskedNumber}
              icon={ChartIcon}
              accent="gold"
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {accountList.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                actions={
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setMessage(
                          `${account.name} statement is ready.`
                        )
                      }
                      className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy-950)] px-5 py-3 text-sm font-semibold text-white"
                    >
                      View Statement
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setMessage(
                          `${account.name} details are current.`
                        )
                      }
                      className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] px-5 py-3 text-sm font-semibold text-[var(--color-navy-950)]"
                    >
                      Account Details
                    </button>
                  </>
                }
              />
            ))}
          </div>
        </div>

        <div className="space-y-6 2xl:sticky 2xl:top-8 2xl:self-start">
          <section className="panel rounded-[2.25rem] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
              Account Details
            </p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-tight text-[var(--color-navy-950)]">
              Your account profile
            </h2>
            <div className="mt-7 space-y-4">
              <div className="rounded-[1.7rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                  Total Balance
                </p>
                <p className="mt-3 text-[2rem] font-semibold leading-tight text-[var(--color-navy-950)]">
                  {formatCurrency(totalPortfolioBalance)}
                </p>
              </div>
              <div className="rounded-[1.7rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                  Client ID
                </p>
                <p className="mt-3 text-xl font-semibold leading-tight text-[var(--color-navy-950)]">
                  {state.user.clientId}
                </p>
              </div>
              <div className="rounded-[1.7rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                  Relationship Manager
                </p>
                <p className="mt-3 text-xl font-semibold leading-tight text-[var(--color-navy-950)]">
                  {state.user.relationshipManager}
                </p>
              </div>
            </div>
          </section>

          <section className="panel rounded-[2.25rem] bg-[var(--color-navy-950)] p-6 sm:p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold-soft)]">
              Service Team
            </p>
            <h2 className="mt-4 text-[1.9rem] font-semibold leading-tight">
              Advisory support
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
              <p>{state.user.branch}</p>
              <p>Member since {state.user.memberSince}</p>
              <p>{state.user.email}</p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/dashboard/support"
                className="inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-[var(--color-navy-950)]"
              >
                Contact Support
              </Link>
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center justify-center rounded-full border border-white/12 px-4 py-3 text-sm font-semibold text-white"
              >
                Preferences
              </Link>
            </div>
          </section>
        </div>
      </div>

      <ActivityList
        title="Account Activity"
        items={accountActivity}
      />
    </div>
  );
}
