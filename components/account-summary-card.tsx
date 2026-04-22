type AccountSummaryCardProps = {
  label: string;
  amount: string;
  detail: string;
};

export function AccountSummaryCard({
  label,
  amount,
  detail,
}: AccountSummaryCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
      <p className="text-sm text-slate-300">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{amount}</p>
      <p className="mt-2 text-sm text-slate-300">{detail}</p>
    </article>
  );
}
