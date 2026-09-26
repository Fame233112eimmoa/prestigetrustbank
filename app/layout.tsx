import type { Metadata } from "next";

import "./globals.css";

import { AuthSessionBootstrap } from "@/components/auth-session-bootstrap";

const siteUrl = "https://prestigetrustapp.com";
const siteName = "Prestige Trust App";
const defaultTitle = "Prestige Trust App | Digital Banking Platform";
const defaultDescription =
  "Prestige Trust App is a secure digital banking platform for managing accounts, transfers, and financial services online.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: "/images/prestige-premium-card.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/prestige-premium-card.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
        <AuthSessionBootstrap />
        {children}
      </body>
    </html>
  );
}
