type StatusBadgeProps = {
  label: string;
  tone?: "success" | "warning" | "info" | "neutral" | "danger";
};

const toneClasses = {
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning:
    "border-amber-200 bg-amber-50 text-amber-700",
  info:
    "border-sky-200 bg-sky-50 text-sky-700",
  neutral:
    "border-slate-200 bg-slate-100 text-slate-700",
  danger:
    "border-rose-200 bg-rose-50 text-rose-700",
};

export function StatusBadge({
  label,
  tone = "neutral",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex whitespace-nowrap items-center rounded-full border px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
