import Link from "next/link";

import { ArrowRightIcon, CardIcon, PhoneIcon, ReceiptIcon, WalletIcon } from "@/components/icons";

const quickActions = [
  {
    href: "/dashboard/payments",
    title: "Move Money",
    description: "Transfer between accounts.",
    icon: WalletIcon,
  },
  {
    href: "/dashboard/payments",
    title: "Pay Bills",
    description: "Pay saved billers.",
    icon: ReceiptIcon,
  },
  {
    href: "/dashboard/cards",
    title: "Manage Cards",
    description: "Review limits and card activity.",
    icon: CardIcon,
  },
  {
    href: "/dashboard/support",
    title: "Contact Support",
    description: "Send a secure message.",
    icon: PhoneIcon,
  },
];

export function QuickActionsPanel() {
  return (
    <section className="panel rounded-[2.25rem] p-6 sm:p-7">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
          Quick Actions
        </p>
        <h2 className="mt-4 text-[1.9rem] font-semibold leading-tight text-[var(--color-navy-950)]">
          Choose a service
        </h2>
      </div>

      <div className="mt-7 grid gap-4">
        {quickActions.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href + item.title}
              href={item.href}
              className="group rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface-soft)]/70 p-5 sm:p-6 hover:border-[rgba(200,164,93,0.4)] hover:bg-white"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--color-navy-900)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-[var(--color-navy-950)]">
                      {item.title}
                    </p>
                    <ArrowRightIcon className="h-4 w-4 text-[var(--color-gold)]" />
                  </div>
                  <p className="mt-3 max-w-[18rem] text-sm leading-7 text-[var(--color-slate-700)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
