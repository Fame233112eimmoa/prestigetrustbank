"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SupportPanel } from "@/components/dashboard/support-panel";

export function SupportPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        eyebrow="Support"
        title="Support"
        description="Contact us and review service requests."
      />

      <SupportPanel />
    </div>
  );
}
