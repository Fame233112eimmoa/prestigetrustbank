"use client";

import { useState, type FormEvent } from "react";

import type {
  AppearanceTheme,
  DashboardSettings,
  LanguagePreference,
} from "@/types/dashboard";

import { PageSectionHeader } from "@/components/dashboard/page-section-header";
import { useDashboard } from "@/components/dashboard/dashboard-provider";

type FeedbackState = {
  tone: "success" | "danger";
  message: string;
};

const themeOptions: AppearanceTheme[] = ["Classic Light", "Midnight"];
const languageOptions: LanguagePreference[] = [
  "English (UK)",
  "French (FR)",
  "Spanish (ES)",
];

export function SettingsForm() {
  const { state, saveSettings } = useDashboard();
  const [form, setForm] = useState<DashboardSettings>(state.settings);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = saveSettings(form);
    setFeedback({
      tone: result.ok ? "success" : "danger",
      message: result.message,
    });
  }

  return (
    <section className="panel rounded-[2.25rem] p-6 sm:p-7">
      <PageSectionHeader
        eyebrow="Settings"
        title="Profile and preferences."
      />

      {feedback ? (
        <div
          className={`mt-6 rounded-[1.6rem] border px-5 py-4 text-sm ${
            feedback.tone === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {feedback.message}
        </div>
      ) : null}

      <form className="mt-7 space-y-7" onSubmit={handleSubmit}>
        <div className="rounded-[2rem] border border-[var(--color-line)] p-6 sm:p-7">
          <h3 className="text-xl font-semibold text-[var(--color-navy-950)]">
            Profile
          </h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Full name
              </span>
              <input
                type="text"
                value={form.profile.fullName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    profile: {
                      ...current.profile,
                      fullName: event.target.value,
                    },
                  }))
                }
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
              />
            </label>
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Email
              </span>
              <input
                type="email"
                value={form.profile.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    profile: {
                      ...current.profile,
                      email: event.target.value,
                    },
                  }))
                }
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
              />
            </label>
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Phone
              </span>
              <input
                type="tel"
                value={form.profile.phone}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    profile: {
                      ...current.profile,
                      phone: event.target.value,
                    },
                  }))
                }
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
              />
            </label>
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Occupation
              </span>
              <input
                type="text"
                value={form.profile.occupation}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    profile: {
                      ...current.profile,
                      occupation: event.target.value,
                    },
                  }))
                }
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
              />
            </label>
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                City
              </span>
              <input
                type="text"
                value={form.profile.city}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    profile: {
                      ...current.profile,
                      city: event.target.value,
                    },
                  }))
                }
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
              />
            </label>
            <label className="space-y-2.5">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Country
              </span>
              <input
                type="text"
                value={form.profile.country}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    profile: {
                      ...current.profile,
                      country: event.target.value,
                    },
                  }))
                }
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
              />
            </label>
            <label className="space-y-2.5 md:col-span-2 xl:col-span-3">
              <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                Relationship manager
              </span>
              <input
                type="text"
                value={form.profile.relationshipManager}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    profile: {
                      ...current.profile,
                      relationshipManager: event.target.value,
                    },
                  }))
                }
                className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
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
                  checked={form.notifications.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      notifications: {
                        ...current.notifications,
                        email: event.target.checked,
                      },
                    }))
                  }
                  className="h-5 w-5 rounded border-[var(--color-line)] text-[var(--color-navy-950)]"
                />
              </label>
              <label className="flex items-center justify-between gap-5 rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <span className="font-medium text-[var(--color-slate-950)]">
                  SMS updates
                </span>
                <input
                  type="checkbox"
                  checked={form.notifications.sms}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      notifications: {
                        ...current.notifications,
                        sms: event.target.checked,
                      },
                    }))
                  }
                  className="h-5 w-5 rounded border-[var(--color-line)] text-[var(--color-navy-950)]"
                />
              </label>
              <label className="flex items-center justify-between gap-5 rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <span className="font-medium text-[var(--color-slate-950)]">
                  Push notifications
                </span>
                <input
                  type="checkbox"
                  checked={form.notifications.push}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      notifications: {
                        ...current.notifications,
                        push: event.target.checked,
                      },
                    }))
                  }
                  className="h-5 w-5 rounded border-[var(--color-line)] text-[var(--color-navy-950)]"
                />
              </label>
              <label className="flex items-center justify-between gap-5 rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
                <span className="font-medium text-[var(--color-slate-950)]">
                  Monthly insights
                </span>
                <input
                  type="checkbox"
                  checked={form.notifications.monthlyInsights}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      notifications: {
                        ...current.notifications,
                        monthlyInsights: event.target.checked,
                      },
                    }))
                  }
                  className="h-5 w-5 rounded border-[var(--color-line)] text-[var(--color-navy-950)]"
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
                <select
                  value={form.appearance.theme}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      appearance: {
                        ...current.appearance,
                        theme: event.target.value as AppearanceTheme,
                      },
                    }))
                  }
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                >
                  {themeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  Language
                </span>
                <select
                  value={form.appearance.language}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      appearance: {
                        ...current.appearance,
                        language: event.target.value as LanguagePreference,
                      },
                    }))
                  }
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                >
                  {languageOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 rounded-[1.65rem] bg-[var(--color-surface-soft)] px-5 py-5 text-sm leading-7 text-[var(--color-slate-700)]">
              Theme and language apply to your online banking view.
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-[var(--color-navy-950)] px-5 py-3.5 text-sm font-semibold text-white"
        >
          Save Settings
        </button>
      </form>
    </section>
  );
}
