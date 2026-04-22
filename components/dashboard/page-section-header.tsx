type PageSectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageSectionHeader({
  eyebrow,
  title,
  description,
}: PageSectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 text-[1.9rem] font-semibold leading-tight text-[var(--color-navy-950)] sm:text-[2.3rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-slate-700)] sm:text-base sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
