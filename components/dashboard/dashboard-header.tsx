import type { ReactNode } from "react";

type DashboardHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function DashboardHeader({
  eyebrow,
  title,
  description,
  actions,
}: DashboardHeaderProps) {
  return (
    <header className="panel rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(239,243,248,0.92))] px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold)]">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-[2.45rem] font-semibold leading-[1.05] text-[var(--color-navy-950)] sm:text-[3.15rem] lg:text-[3.65rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-slate-700)] sm:text-base sm:leading-8">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-4">{actions}</div> : null}
      </div>
    </header>
  );
}
