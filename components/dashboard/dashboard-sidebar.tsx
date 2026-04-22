"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { dashboardNavItems } from "@/lib/dashboard-data";

import { useDashboard } from "@/components/dashboard/dashboard-provider";
import {
  ArrowLeftIcon,
  BankIcon,
  BellIcon,
  CardIcon,
  MailIcon,
  ReceiptIcon,
  SettingsIcon,
  ShieldIcon,
  WalletIcon,
  XIcon,
} from "@/components/icons";

type DashboardSidebarProps = {
  mobileOpen: boolean;
  onClose: () => void;
};

const iconMap = {
  overview: BankIcon,
  accounts: WalletIcon,
  cards: CardIcon,
  payments: ReceiptIcon,
  notifications: BellIcon,
  security: ShieldIcon,
  support: MailIcon,
  settings: SettingsIcon,
  logout: ArrowLeftIcon,
};

export function DashboardSidebar({
  mobileOpen,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const {
    state,
    totalPortfolioBalance,
    accounts,
    unreadNotificationsCount,
  } = useDashboard();

  function isActive(href: string) {
    if (!href.startsWith("/dashboard")) {
      return false;
    }

    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  }

  const mainNavItems = dashboardNavItems.filter((item) => item.icon !== "logout");
  const logoutItem = dashboardNavItems.find((item) => item.icon === "logout");

  const sidebarContent = (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 rounded-[1.9rem] border border-white/10 bg-white/6 p-5">
        <div className="flex items-start justify-between gap-4 lg:block">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
              Prestige Trust Bank
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold">
              Online Banking
            </h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
            aria-label="Close dashboard navigation"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="dashboard-sidebar-scroll mt-8 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2">
        <div className="flex min-h-full flex-col">
          <nav className="space-y-2" aria-label="Online banking navigation">
            {mainNavItems.map((item) => {
              const Icon = iconMap[item.icon];
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium ${
                    active
                      ? "bg-white text-[var(--color-navy-950)]"
                      : "text-slate-200 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      active
                        ? "text-[var(--color-navy-950)]"
                        : "text-[var(--color-gold)]"
                    }`}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.icon === "notifications" && unreadNotificationsCount ? (
                    <span
                      className={`inline-flex min-w-8 items-center justify-center rounded-full px-2 py-1 text-xs font-semibold ${
                        active
                          ? "bg-[var(--color-navy-950)] text-white"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {unreadNotificationsCount}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4 pb-2 pt-8">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
              <p className="text-sm text-slate-300">Total Balance</p>
              <p className="mt-3 text-3xl font-semibold text-white">
                ${totalPortfolioBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Checking
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    ${accounts.checking.availableBalance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Savings
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    ${accounts.savings.availableBalance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
              <p className="text-sm text-slate-300">Profile</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm font-semibold text-[var(--color-navy-950)]">
                  {state.user.firstName.slice(0, 1)}
                  {state.user.fullName.split(" ")[1]?.slice(0, 1) ?? ""}
                </div>
                <div>
                  <p className="font-semibold text-white">{state.user.fullName}</p>
                  <p className="text-sm text-slate-300">
                    {state.user.relationshipManager}
                  </p>
                </div>
              </div>
            </div>

            {logoutItem ? (
              <Link
                href={logoutItem.href}
                onClick={onClose}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <ArrowLeftIcon className="h-5 w-5 text-[var(--color-gold)]" />
                {logoutItem.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden h-full min-h-0 bg-[var(--color-navy-950)] text-white lg:block">
        <div className="flex h-full min-h-0 flex-col px-6 py-8 xl:px-7">
          {sidebarContent}
        </div>
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 bg-slate-950/55 lg:hidden">
          <div className="h-[100dvh] max-w-[320px] overflow-hidden bg-[var(--color-navy-950)] text-white shadow-2xl">
            <div className="flex h-full min-h-0 flex-col px-5 py-6">
              {sidebarContent}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
