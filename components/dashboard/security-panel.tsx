"use client";

import { useState, type FormEvent } from "react";

import { PageSectionHeader } from "@/components/dashboard/page-section-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { useDashboard } from "@/components/dashboard/dashboard-provider";

const alertOptions = [
  {
    key: "login",
    label: "Login alerts",
    description: "New sign-ins.",
  },
  {
    key: "transfers",
    label: "Transfer alerts",
    description: "Transfers between accounts.",
  },
  {
    key: "cards",
    label: "Card alerts",
    description: "Card activity and controls.",
  },
  {
    key: "support",
    label: "Support alerts",
    description: "Replies and case updates.",
  },
] as const;

type FeedbackState = {
  tone: "success" | "danger";
  message: string;
};

export function SecurityPanel() {
  const {
    state,
    changePassword,
    setTwoFactorEnabled,
    updateSecurityAlert,
    signOutDevice,
  } = useDashboard();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    nextPassword: "",
    confirmPassword: "",
  });
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = changePassword(passwordForm);
    setFeedback({
      tone: result.ok ? "success" : "danger",
      message: result.message,
    });

    if (result.ok) {
      setPasswordForm({
        currentPassword: "",
        nextPassword: "",
        confirmPassword: "",
      });
    }
  }

  return (
    <section className="space-y-6">
      <div className="panel rounded-[2.25rem] p-6 sm:p-7">
        <PageSectionHeader
          eyebrow="Security"
          title="Passwords, verification, and devices."
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

        <div className="mt-7 grid gap-7 2xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <form
            className="rounded-[2rem] border border-[var(--color-line)] p-6 sm:p-7"
            onSubmit={handlePasswordSubmit}
          >
            <h3 className="text-xl font-semibold text-[var(--color-navy-950)]">
              Change Password
            </h3>
            <p className="mt-2 text-sm leading-7 text-[var(--color-slate-700)]">
              Last changed {state.security.lastPasswordChange}.
            </p>

            <div className="mt-6 space-y-5">
              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  Current password
                </span>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      currentPassword: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                />
              </label>
              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  New password
                </span>
                <input
                  type="password"
                  value={passwordForm.nextPassword}
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      nextPassword: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                />
              </label>
              <label className="space-y-2.5">
                <span className="block text-sm font-medium text-[var(--color-slate-950)]">
                  Confirm new password
                </span>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(event) =>
                    setPasswordForm((current) => ({
                      ...current,
                      confirmPassword: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-[var(--color-line)] bg-white px-5 py-3.5 text-[var(--color-navy-950)] outline-none focus:border-[rgba(200,164,93,0.55)] focus:ring-4 focus:ring-[rgba(200,164,93,0.12)]"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex min-w-[180px] items-center justify-center rounded-full bg-[var(--color-navy-950)] px-5 py-3.5 text-sm font-semibold text-white"
            >
              Update Password
            </button>
          </form>

          <div className="space-y-6 rounded-[2rem] border border-[var(--color-line)] p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--color-navy-950)]">
                  Authentication & Alerts
                </h3>
              </div>
              <StatusBadge
                label={state.security.twoFactorEnabled ? "2FA Enabled" : "2FA Off"}
                tone={state.security.twoFactorEnabled ? "success" : "warning"}
              />
            </div>

            <label className="flex items-center justify-between gap-5 rounded-[1.6rem] bg-[var(--color-surface-soft)] px-5 py-5">
              <div>
                <p className="font-semibold text-[var(--color-slate-950)]">
                  Two-factor verification
                </p>
                <p className="mt-1 text-sm leading-7 text-[var(--color-slate-700)]">
                  Required at sign-in.
                </p>
              </div>
              <input
                type="checkbox"
                checked={state.security.twoFactorEnabled}
                onChange={(event) => {
                  const result = setTwoFactorEnabled(event.target.checked);
                  setFeedback({
                    tone: result.ok ? "success" : "danger",
                    message: result.message,
                  });
                }}
                className="h-5 w-5 rounded border-[var(--color-line)] text-[var(--color-navy-950)]"
              />
            </label>

            <div className="space-y-4">
              {alertOptions.map((item) => (
                <label
                  key={item.key}
                  className="flex items-center justify-between gap-5 rounded-[1.6rem] border border-[var(--color-line)] px-5 py-5"
                >
                  <div>
                    <p className="font-semibold text-[var(--color-slate-950)]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-7 text-[var(--color-slate-700)]">
                      {item.description}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={state.security.alerts[item.key]}
                    onChange={(event) => {
                      const result = updateSecurityAlert(
                        item.key,
                        event.target.checked
                      );
                      setFeedback({
                        tone: result.ok ? "success" : "danger",
                        message: result.message,
                      });
                    }}
                    className="h-5 w-5 rounded border-[var(--color-line)] text-[var(--color-navy-950)]"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="panel rounded-[2.25rem] p-6 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
              Devices & Sessions
            </p>
            <h3 className="mt-4 text-[1.9rem] font-semibold leading-tight text-[var(--color-navy-950)]">
              Active sign-ins
            </h3>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          {state.security.devices.map((device) => (
            <div
              key={device.id}
              className="flex flex-col gap-5 rounded-[1.75rem] border border-[var(--color-line)] px-6 py-6 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-lg font-semibold text-[var(--color-slate-950)]">
                    {device.name}
                  </p>
                  <StatusBadge
                    label={device.status}
                    tone={
                      device.status === "Current Session"
                        ? "success"
                        : device.status === "Trusted Device"
                          ? "info"
                          : "neutral"
                    }
                  />
                </div>
                <p className="mt-2 text-sm leading-7 text-[var(--color-slate-700)]">
                  {device.location} • {device.lastActive}
                </p>
              </div>

              {device.status === "Current Session" ? (
                <span className="text-sm font-medium text-[var(--color-slate-500)]">
                  This device
                </span>
              ) : device.status === "Signed Out" ? (
                <span className="text-sm font-medium text-[var(--color-slate-500)]">
                  Session closed
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const result = signOutDevice(device.id);
                    setFeedback({
                      tone: result.ok ? "success" : "danger",
                      message: result.message,
                    });
                  }}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] px-5 py-3.5 text-sm font-semibold text-[var(--color-navy-950)]"
                >
                  Sign Out Device
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
