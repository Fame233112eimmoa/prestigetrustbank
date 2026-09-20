import type { Metadata } from "next";

import { DashboardAuthGuard } from "@/components/dashboard/dashboard-auth-guard";
import { DashboardStateProvider } from "@/components/dashboard/dashboard-provider";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Online Banking",
  description: "Prestige Trust Bank online banking.",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardStateProvider>
      <DashboardAuthGuard>
        <DashboardShell>{children}</DashboardShell>
      </DashboardAuthGuard>
    </DashboardStateProvider>
  );
}
