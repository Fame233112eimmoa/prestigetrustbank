"use client";

import { useState, type ReactNode } from "react";

import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { MenuIcon, UserIcon } from "@/components/icons";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { state } = useDashboard();
  const isMidnight = state.settings.appearance.theme === "Midnight";

  return (
    <div
      className={`min-h-screen overflow-x-clip ${
        isMidnight ? "bg-[#091625]" : "bg-[var(--color-surface-soft)]"
      }`}
    >
      <div className="mx-auto w-full max-w-[1840px] lg:grid lg:h-screen lg:grid-cols-[312px_minmax(0,1fr)] lg:overflow-hidden xl:grid-cols-[324px_minmax(0,1fr)] 2xl:px-6">
        <DashboardSidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <div className="min-h-screen min-w-0 lg:h-screen lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain">
          <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-4 py-5 sm:px-6 sm:py-6 lg:min-h-full lg:px-8 lg:py-8 xl:px-10 2xl:max-w-[1520px] 2xl:px-12">
            <div className="panel sticky top-4 z-30 flex items-center justify-between rounded-[2rem] bg-white/90 px-4 py-4 backdrop-blur sm:px-5 sm:py-5 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-navy-950)]"
                aria-label="Open dashboard navigation"
              >
                <MenuIcon className="h-5 w-5" />
              </button>

              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-gold)]">
                  Prestige Trust
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--color-navy-950)]">
                  Online Banking
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-surface-soft)] text-[var(--color-navy-900)]">
                <UserIcon className="h-5 w-5" />
              </div>
            </div>

            <main className="min-w-0 flex-1 space-y-8 pb-8 xl:pb-10">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
