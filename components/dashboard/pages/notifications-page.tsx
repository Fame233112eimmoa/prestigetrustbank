"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { NotificationsPanel } from "@/components/dashboard/notifications-panel";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { useDashboard } from "@/components/dashboard/dashboard-provider";
import { BellIcon, CheckIcon, SparkleIcon } from "@/components/icons";

export function NotificationsPage() {
  const { notifications, unreadNotificationsCount } = useDashboard();

  return (
    <div className="space-y-8">
      <DashboardHeader
        eyebrow="Notifications"
        title="Notifications"
        description="Account updates, transfers, and service messages."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          label="Unread"
          value={unreadNotificationsCount.toString()}
          detail="New notifications"
          icon={BellIcon}
          accent="gold"
        />
        <SummaryCard
          label="Total"
          value={notifications.length.toString()}
          detail="All notifications"
          icon={SparkleIcon}
        />
        <SummaryCard
          label="Read"
          value={(notifications.length - unreadNotificationsCount).toString()}
          detail="Reviewed notifications"
          icon={CheckIcon}
        />
      </div>

      <NotificationsPanel showMarkAll />
    </div>
  );
}
