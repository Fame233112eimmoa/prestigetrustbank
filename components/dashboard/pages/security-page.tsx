"use client";

import { ActivityList } from "@/components/dashboard/activity-list";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SecurityPanel } from "@/components/dashboard/security-panel";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { ShieldIcon, SparkleIcon, UserIcon } from "@/components/icons";

export function SecurityPage() {
  const { state } = useDashboard();

  const activeAlerts = Object.values(state.security.alerts).filter(Boolean).length;
  const trustedDevices = state.security.devices.filter(
    (device) => device.status === "Trusted Device"
  ).length;
  const securityActivity = state.activities
    .filter((item) => item.kind === "security")
    .slice(0, 6);

  return (
    <div className="space-y-8">
      <DashboardHeader
        eyebrow="Security"
        title="Security"
        description="Passwords, verification, devices, and alerts."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          label="Two-Factor"
          value={state.security.twoFactorEnabled ? "Enabled" : "Disabled"}
          detail="Sign-in protection"
          icon={ShieldIcon}
          accent="gold"
        />
        <SummaryCard
          label="Alert Preferences"
          value={`${activeAlerts} active`}
          detail="Active alerts"
          icon={SparkleIcon}
        />
        <SummaryCard
          label="Trusted Devices"
          value={trustedDevices.toString()}
          detail="Approved devices"
          icon={UserIcon}
        />
      </div>

      <SecurityPanel />

      <ActivityList
        title="Security Activity"
        items={securityActivity}
      />
    </div>
  );
}
