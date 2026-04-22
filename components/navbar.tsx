"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { MenuIcon, ShieldIcon, XIcon } from "@/components/icons";
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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-ivory)]/92 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <LogoMark />
          <div>
            <p className="text-base font-semibold tracking-[0.1em] text-[var(--color-navy-950)] uppercase">
              Prestige Trust
            </p>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-slate-500)]">
              Bank
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium ${
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

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/login"
            className="rounded-full border border-[var(--color-line)] px-5 py-2.5 text-sm font-semibold text-[var(--color-navy-950)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            Sign In
          </Link>
          <Link
            href="/open-account"
            className="rounded-full bg-[var(--color-navy-950)] px-5 py-2.5 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-[var(--color-navy-900)]"
          >
            Open Account
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-navy-950)] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--color-line)] bg-[var(--color-surface)] lg:hidden">
          <nav className="container-shell flex flex-col gap-2 py-4" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-[var(--color-surface-soft)] text-[var(--color-navy-950)]"
                    : "text-[var(--color-slate-700)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[var(--color-line)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-navy-950)]"
              >
                Sign In
              </Link>
              <Link
                href="/open-account"
                onClick={() => setOpen(false)}
                className="rounded-full bg-[var(--color-navy-950)] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Open Account
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
