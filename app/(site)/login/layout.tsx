import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to Prestige Trust Bank online banking.",
  alternates: { canonical: "/login" },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
