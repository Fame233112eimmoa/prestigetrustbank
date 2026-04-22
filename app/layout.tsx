import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://prestigetrustbank.com"),
  title: {
    default: "Prestige Trust Bank",
    template: "%s | Prestige Trust Bank",
  },
  description:
    "Prestige Trust Bank offers personal banking, business banking, lending, cards, and digital banking services.",
  applicationName: "Prestige Trust Bank",
  keywords: [
    "bank",
    "banking",
    "personal banking",
    "business banking",
    "digital banking",
    "loan services",
  ],
  openGraph: {
    title: "Prestige Trust Bank",
    description:
      "Personal banking, business banking, lending, cards, and digital banking from Prestige Trust Bank.",
    siteName: "Prestige Trust Bank",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-[var(--color-ivory)] text-[var(--color-slate-950)] antialiased">
        {children}
      </body>
    </html>
  );
}
