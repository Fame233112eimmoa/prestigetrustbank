"use client";

import { PageSectionHeader } from "@/components/dashboard/page-section-header";
import { useDashboard } from "@/components/dashboard/dashboard-provider";

const inputClassName =
  "w-full rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-soft)] px-5 py-3.5 text-[var(--color-navy-950)] outline-none";

const toggleClassName =
  "h-5 w-5 rounded border-[var(--color-line)] text-[var(--color-navy-950)] accent-[var(--color-navy-950)]";

export function SettingsForm() {
  const { state } = useDashboard();
  const { profile, notifications, appearance } = state.settings;

  return (
    <section className="panel rounded-[2.25rem] p-6 sm:p-7">
      <PageSectionHeader eyebrow="Settings" title="Profile and preferences." />

      <div className="mt-6 rounded-[1.6rem] border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-[var(--color-slate-700)]">
        This information is view only and cannot be edited online.
      </div>

      <div className="mt-7 space-y-7">
        <div className="rounded-[2rem] border border-[var(--color-line)] p-6 sm:p-7">
          <h3 className="text-xl font-semibold text-[var(--color-navy-950)]">
            Profile
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Primary account holder
              </span>
              <input
                type="text"
                value={profile.fullName}
                readOnly
                aria-readonly="true"
                className={inputClassName}
              />
            </label>
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Joint account holder
              </span>
              <input
                type="text"
                value={profile.jointHolderName}
                readOnly
                aria-readonly="true"
                className={inputClassName}
              />
            </label>
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Email
              </span>
              <input
                type="email"
                value={profile.email}
                readOnly
                aria-readonly="true"
                className={inputClassName}
              />
            </label>
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Phone
              </span>
              <input
                type="tel"
                value={profile.phone}
                readOnly
                aria-readonly="true"
                className={inputClassName}
              />
            </label>
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Occupation
              </span>
              <input
                type="text"
                value={profile.occupation}
                readOnly
                aria-readonly="true"
                className={inputClassName}
              />
            </label>
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                City
              </span>
              <input
                type="text"
                value={profile.city}
                readOnly
                aria-readonly="true"
                className={inputClassName}
              />
            </label>
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Country
              </span>
              <input
                type="text"
                value={profile.country}
                readOnly
                aria-readonly="true"
                className={inputClassName}
              />
            </label>
            <label className="space-y-2.5 md:col-span-2 xl:col-span-3">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Relationship manager
              </span>
              <input
                type="text"
                value={profile.relationshipManager}
                readOnly
                aria-readonly="true"
                className={inputClassName}
              />
            </label>
          </div>
        </div>

        <div className="grid gap-7 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="rounded-[2rem] border border-[var(--color-line)] p-6 sm:p-7">
            <h3 className="text-xl font-semibold text-[var(--color-navy-950)]">
              Notifications
            </h3>
            <div className="mt-6 space-y-4">
              <label className="flex items-center justify-between gap-5 rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <span className="font-medium text-[var(--color-slate-950)]">
                  Email updates
                </span>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  readOnly
                  disabled
                  className={toggleClassName}
                />
              </label>
              <label className="flex items-center justify-between gap-5 rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <span className="font-medium text-[var(--color-slate-950)]">
                  SMS updates
                </span>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  readOnly
                  disabled
                  className={toggleClassName}
                />
              </label>
              <label className="flex items-center justify-between gap-5 rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <span className="font-medium text-[var(--color-slate-950)]">
                  Push notifications
                </span>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  readOnly
                  disabled
                  className={toggleClassName}
                />
              </label>
              <label className="flex items-center justify-between gap-5 rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <span className="font-medium text-[var(--color-slate-950)]">
                  Monthly insights
                </span>
                <input
                  type="checkbox"
                  checked={notifications.monthlyInsights}
                  readOnly
                  disabled
                  className={toggleClassName}
                />
              </label>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--color-line)] p-6 sm:p-7">
            <h3 className="text-xl font-semibold text-[var(--color-navy-950)]">
              Display and Language
            </h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  Theme
                </span>
                <input
                  type="text"
                  value={appearance.theme}
                  readOnly
                  aria-readonly="true"
                  className={inputClassName}
                />
              </label>
              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  Language
                </span>
                <input
                  type="text"
                  value={appearance.language}
                  readOnly
                  aria-readonly="true"
                  className={inputClassName}
                />
              </label>
            </div>

            <div className="mt-6 rounded-[1.65rem] bg-[var(--color-surface-soft)] px-5 py-5 text-sm leading-7 text-[var(--color-slate-700)]">
              Theme and language are displayed for reference only.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
