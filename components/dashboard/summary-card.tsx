import type { ComponentType, SVGProps } from "react";

type SummaryCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent?: "navy" | "gold";
};

export function SummaryCard({
  label,
  value,
  detail,
  icon: Icon,
  accent = "navy",
}: SummaryCardProps) {
  const accentClass =
    accent === "gold"
      ? "bg-[var(--color-gold)]/12 text-[var(--color-gold)]"
      : "bg-[var(--color-surface-soft)] text-[var(--color-navy-900)]";

  return (
    <article className="panel flex h-full min-h-[190px] flex-col justify-between rounded-[2rem] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0 pr-2">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-slate-500)]">
            {label}
          </p>
          <p className="mt-5 text-3xl font-semibold leading-tight text-[var(--color-navy-950)] sm:text-[2.2rem]">
            {value}
          </p>
        </div>
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.15rem] ${accentClass}`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <p className="mt-6 max-w-[18rem] text-sm leading-6 text-[var(--color-slate-700)]">
        {detail}
      </p>
    </article>
  );
}
