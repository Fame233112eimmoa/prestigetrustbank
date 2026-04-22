type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "default" | "light";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "default",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  const titleClass =
    theme === "light" ? "text-white" : "text-[var(--color-navy-950)]";
  const descriptionClass =
    theme === "light" ? "text-slate-300" : "text-[var(--color-slate-700)]";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`font-display text-4xl font-semibold leading-tight sm:text-5xl ${titleClass}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-8 sm:text-lg ${descriptionClass}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
