import type { Metadata } from "next";

import { DashboardStateProvider } from "@/components/dashboard/dashboard-provider";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Online Banking",
  description: "Prestige Trust Bank online banking.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardStateProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardStateProvider>
  );
}
