import { formatCurrency } from "@/lib/dashboard-data";
import {
  getActivityStatusTone,
  isHeldActivity,
} from "@/lib/dashboard-status";
import type { ActivityItem } from "@/types/dashboard";

import { StatusBadge } from "@/components/dashboard/status-badge";

type ActivityListProps = {
  title: string;
  description?: string;
  items: ActivityItem[];
  emptyLabel?: string;
};

export function ActivityList({
  title,
  description,
  items,
  emptyLabel = "No recent activity to display.",
}: ActivityListProps) {
  return (
    <section className="panel overflow-hidden rounded-[2.25rem]">
      <div className="border-b border-[var(--color-line)] px-6 py-6 sm:px-8">
        <h2 className="text-[1.9rem] font-semibold leading-tight text-[var(--color-navy-950)] sm:text-[2.15rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-slate-700)]">
            {description}
          </p>
        ) : null}
      </div>

      {items.length ? (
        <ul className="divide-y divide-[var(--color-line)]">
          {items.map((item) => {
            const isOnHold = isHeldActivity(item.status);

            return (
              <li
                key={item.id}
                className={`grid gap-4 px-6 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-6 sm:px-8 ${
                  isOnHold
                    ? "bg-rose-50/80 shadow-[inset_5px_0_0_0_rgba(185,28,28,0.9)]"
                    : ""
                }`}
              >
                <div className="min-w-0">
                  {isOnHold ? (
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-danger)]">
                      Payment Hold
                    </p>
                  ) : null}
                  <div
                    className={`flex flex-wrap items-center gap-3 ${
                      isOnHold ? "mt-2" : ""
                    }`}
                  >
                    <p className="font-semibold text-[var(--color-slate-950)]">
                      {item.title}
                    </p>
                    <StatusBadge
                      label={item.status}
                      tone={getActivityStatusTone(item.status)}
                    />
                  </div>
                  <p
                    className={`mt-3 max-w-2xl text-sm leading-7 ${
                      isOnHold
                        ? "text-[var(--color-danger)]"
                        : "text-[var(--color-slate-700)]"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div className="md:min-w-[132px] md:pl-4 md:text-right">
                  <p
                    className={`text-lg font-semibold leading-none sm:text-xl ${
                      isOnHold
                        ? "text-[var(--color-danger)]"
                        : item.tone === "credit"
                          ? "text-[var(--color-success)]"
                          : item.tone === "debit"
                            ? "text-[var(--color-danger)]"
                            : "text-[var(--color-navy-950)]"
                    }`}
                  >
                    {typeof item.amount === "number"
                      ? `${item.tone === "credit" ? "+" : item.tone === "debit" ? "-" : ""}${formatCurrency(item.amount)}`
                      : "Update"}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-slate-500)]">
                    {item.dateLabel}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="px-6 py-10 text-sm text-[var(--color-slate-700)] sm:px-8">
          {emptyLabel}
        </div>
      )}
    </section>
  );
}
