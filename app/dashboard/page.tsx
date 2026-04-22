import type { Metadata } from "next";

import { OverviewPage } from "@/components/dashboard/pages/overview-page";

export const metadata: Metadata = {
  title: "Account Summary",
  description: "Account summary, cards, payments, security, and support.",
};

export default function DashboardPage() {
  return <OverviewPage />;
}
