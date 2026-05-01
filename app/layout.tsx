import "./globals.css";

export const metadata = {
  title: "Prestige Trust App | Digital Banking Platform",
  description: "Prestige Trust App is a secure digital banking platform for managing accounts, transfers, and financial services online.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" }
    ],
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
