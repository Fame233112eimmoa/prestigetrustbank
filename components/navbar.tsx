"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ShieldIcon } from "@/components/icons";
import { navItems } from "@/lib/site-data";

function LogoMark() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-navy-950)] text-white shadow-lg shadow-slate-950/15">
      <ShieldIcon className="h-5 w-5" />
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-ivory)]/92 backdrop-blur-xl">
      <div className="container-shell py-3.5 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <LogoMark />
            <div className="hidden sm:block">
              <p className="text-base font-semibold uppercase tracking-[0.1em] text-[var(--color-navy-950)]">
                Prestige Trust
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-slate-500)]">
                Bank
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active = item.href === "/" && pathname === "/";

              return (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className={`text-sm font-semibold ${
                    active
                      ? "text-[var(--color-navy-950)]"
                      : "text-[var(--color-slate-700)] hover:text-[var(--color-navy-950)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/open-account"
              className="rounded-full border border-[var(--color-line)] bg-white px-4 py-3 text-xs font-bold text-[var(--color-navy-950)] shadow-sm hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] sm:px-5 sm:py-3.5 sm:text-sm"
            >
              Create Account
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-[var(--color-gold)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-[var(--color-navy-950)] shadow-[0_18px_42px_rgba(200,164,93,0.36)] ring-1 ring-[rgba(200,164,93,0.35)] hover:-translate-y-0.5 hover:bg-[var(--color-gold-soft)] sm:px-9 sm:py-4 sm:text-base"
            >
              Login
            </Link>
          </div>
        </div>

        <nav
          className="mt-4 flex justify-center gap-2 overflow-x-auto pb-1 lg:hidden"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="shrink-0 rounded-full border border-[var(--color-line)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-navy-950)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
