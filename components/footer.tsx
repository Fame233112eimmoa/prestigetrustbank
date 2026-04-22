import Link from "next/link";

import { contactDetails, footerGroups, socialPlaceholders } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-auto bg-[var(--color-navy-950)] text-white">
      <div className="container-shell grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Prestige Trust Bank
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold">
            Banking with clarity and care.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Personal banking, business banking, lending, cards, and digital
            banking for individuals, families, and businesses.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialPlaceholders.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
              {group.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-300 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-shell grid gap-5 py-6 text-sm text-slate-300 md:grid-cols-2 xl:grid-cols-4">
          {contactDetails.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl bg-white/6 p-2 text-[var(--color-gold)]">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-white">{item.label}</p>
                  <p className="mt-1 text-slate-300">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
