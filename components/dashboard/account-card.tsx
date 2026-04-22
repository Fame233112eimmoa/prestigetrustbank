import type { ReactNode } from "react";

import { formatCurrency } from "@/lib/dashboard-data";
import type { DashboardAccount } from "@/types/dashboard";

import { StatusBadge } from "@/components/dashboard/status-badge";

type AccountCardProps = {
  account: DashboardAccount;
  actions?: ReactNode;
  compact?: boolean;
};

function getStatusTone(status: DashboardAccount["status"]) {
  if (status === "Active") {
    return "success";
  }

  if (status === "Protected") {
    return "info";
  }

  return "warning";
}

export function AccountCard({
  account,
  actions,
  compact = false,
}: AccountCardProps) {
  const transactions = account.recentTransactions.slice(0, compact ? 2 : 3);

  return (
    <article className="panel rounded-[2.25rem] p-6 sm:p-7 lg:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
            {account.type}
          </p>
          <h3 className="mt-4 text-[1.9rem] font-semibold leading-tight text-[var(--color-navy-950)] sm:text-[2.2rem]">
            {account.name}
          </h3>
          <p className="mt-3 text-sm font-medium tracking-[0.08em] text-[var(--color-slate-700)]">
            {account.maskedNumber}
          </p>
        </div>
        <StatusBadge label={account.status} tone={getStatusTone(account.status)} />
      </div>

      <div
        className={`mt-8 grid gap-4 ${
          compact ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        <div className="flex min-h-[134px] flex-col justify-between rounded-[1.65rem] bg-[var(--color-surface-soft)] px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
            Available Balance
          </p>
          <p className="mt-4 text-[1.95rem] font-semibold leading-tight text-[var(--color-navy-950)] sm:text-[2.15rem]">
            {formatCurrency(account.availableBalance)}
          </p>
        </div>
        <div className="flex min-h-[134px] flex-col justify-between rounded-[1.65rem] bg-[var(--color-surface-soft)] px-5 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
            Account Number
          </p>
          <p className="mt-4 text-xl font-semibold leading-tight text-[var(--color-navy-950)] sm:text-[1.35rem]">
            {account.maskedNumber}
          </p>
        </div>
        {!compact ? (
          <div className="flex min-h-[134px] flex-col justify-between rounded-[1.65rem] bg-[var(--color-surface-soft)] px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
              Status
            </p>
            <p className="mt-4 text-xl font-semibold leading-tight text-[var(--color-navy-950)] sm:text-[1.35rem]">
              {account.status}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-8 border-t border-[var(--color-line)] pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-slate-500)]">
          Recent Transactions
        </p>
        <ul className="mt-5 space-y-4">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="rounded-[1.55rem] border border-[var(--color-line)] px-5 py-5"
            >
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-6">
                <div className="min-w-0">
                  <p className="font-semibold text-[var(--color-slate-950)]">
                    {transaction.title}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--color-slate-700)]">
                    {transaction.description}
                  </p>
                </div>
                <div className="md:min-w-[124px] md:pl-4 md:text-right">
                  <p
                    className={`text-lg font-semibold leading-none ${
                      transaction.tone === "credit"
                        ? "text-[var(--color-success)]"
                        : transaction.tone === "debit"
                          ? "text-[var(--color-danger)]"
                          : "text-[var(--color-navy-950)]"
                    }`}
                  >
                    {typeof transaction.amount === "number"
                      ? `${transaction.tone === "credit" ? "+" : transaction.tone === "debit" ? "-" : ""}${formatCurrency(transaction.amount)}`
                      : "Update"}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-slate-500)]">
                    {transaction.dateLabel}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
    </article>
  );
}
