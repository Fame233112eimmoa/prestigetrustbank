"use client";

import { StatusBadge } from "@/components/dashboard/status-badge";
import { useDashboard } from "@/components/dashboard/dashboard-provider";

type NotificationsPanelProps = {
  limit?: number;
  title?: string;
  description?: string;
  showMarkAll?: boolean;
};

const toneDotClasses = {
  info: "bg-sky-500",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
};

export function NotificationsPanel({
  limit,
  title = "Notifications",
  description,
  showMarkAll = true,
}: NotificationsPanelProps) {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
  } = useDashboard();

  const items = typeof limit === "number" ? notifications.slice(0, limit) : notifications;

  return (
    <section className="panel rounded-[2.25rem] p-6 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
            {title}
          </p>
          <h2 className="mt-4 text-[1.9rem] font-semibold leading-tight text-[var(--color-navy-950)]">
            {unreadNotificationsCount} unread
          </h2>
          {description ? (
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate-700)]">
              {description}
            </p>
          ) : null}
        </div>

        {showMarkAll && unreadNotificationsCount ? (
          <button
            type="button"
            onClick={() => {
              markAllNotificationsRead();
            }}
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] px-5 py-3 text-sm font-semibold text-[var(--color-navy-950)]"
          >
            Mark All Read
          </button>
        ) : null}
      </div>

      <div className="mt-7 space-y-4">
        {items.length ? (
          items.map((item) => (
            <article
              key={item.id}
              className={`rounded-[1.7rem] border px-5 py-5 sm:px-6 sm:py-6 ${
                item.read
                  ? "border-[var(--color-line)] bg-white"
                  : "border-[rgba(200,164,93,0.32)] bg-[var(--color-surface-soft)]/60"
              }`}
            >
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-6">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${toneDotClasses[item.tone]}`}
                    />
                    <p className="font-semibold text-[var(--color-slate-950)]">
                      {item.title}
                    </p>
                    <StatusBadge
                      label={item.read ? "Read" : "Unread"}
                      tone={item.read ? "neutral" : "warning"}
                    />
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-slate-700)]">
                    {item.message}
                  </p>
                </div>

                <div className="flex items-center gap-4 sm:min-w-[110px] sm:flex-col sm:items-end">
                  <p className="text-sm text-[var(--color-slate-500)]">{item.dateLabel}</p>
                  {!item.read ? (
                    <button
                      type="button"
                      onClick={() => {
                        markNotificationRead(item.id);
                      }}
                      className="text-sm font-semibold text-[var(--color-navy-950)] hover:text-[var(--color-gold)]"
                    >
                      Mark Read
                    </button>
                  ) : null}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[1.6rem] border border-[var(--color-line)] px-5 py-6 text-sm text-[var(--color-slate-700)]">
            No notifications
          </div>
        )}
      </div>
    </section>
  );
}
