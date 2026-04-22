"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { BellIcon, GlobeIcon, SettingsIcon } from "@/components/icons";

export function SettingsPage() {
  const { state } = useDashboard();
  const activeNotifications = Object.values(state.settings.notifications).filter(Boolean).length;

  return (
    <div className="space-y-8">
      <DashboardHeader
        eyebrow="Settings"
        title="Settings"
        description="Profile, notifications, display, and language."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          label="Theme"
          value={state.settings.appearance.theme}
          detail="Display preference"
          icon={SettingsIcon}
        />
        <SummaryCard
          label="Language"
          value={state.settings.appearance.language}
          detail="Selected language"
          icon={GlobeIcon}
        />
        <SummaryCard
          label="Alerts"
          value={`${activeNotifications} active`}
          detail="Notification channels enabled"
          icon={BellIcon}
          accent="gold"
        />
      </div>

      <div className="grid gap-8 2xl:grid-cols-[minmax(0,1.08fr)_380px]">
        <SettingsForm />

        <section className="space-y-6 2xl:sticky 2xl:top-8 2xl:self-start">
          <div className="panel rounded-[2.25rem] p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
              Profile Summary
            </p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-tight text-[var(--color-navy-950)]">
              Your information
            </h2>
            <div className="mt-7 space-y-4">
              <div className="rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                  Client Name
                </p>
                <p className="mt-3 text-xl font-semibold leading-tight text-[var(--color-navy-950)]">
                  {state.user.fullName}
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                  Member Since
                </p>
                <p className="mt-3 text-xl font-semibold leading-tight text-[var(--color-navy-950)]">
                  {state.user.memberSince}
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                  Theme Preference
                </p>
                <p className="mt-3 text-xl font-semibold leading-tight text-[var(--color-navy-950)]">
                  {state.settings.appearance.theme}
                </p>
              </div>
              <div className="rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
                  Language
                </p>
                <p className="mt-3 text-xl font-semibold leading-tight text-[var(--color-navy-950)]">
                  {state.settings.appearance.language}
                </p>
              </div>
            </div>
          </div>

          <div className="panel rounded-[2.25rem] bg-[var(--color-navy-950)] p-6 sm:p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold-soft)]">
              Notification Delivery
            </p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-tight">
              Alert settings
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              Email {state.settings.notifications.email ? "On" : "Off"} • SMS{" "}
              {state.settings.notifications.sms ? "On" : "Off"} • Push{" "}
              {state.settings.notifications.push ? "On" : "Off"}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
