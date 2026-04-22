type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
};

export function TestimonialCard({
  quote,
  name,
  role,
}: TestimonialCardProps) {
  return (
    <article className="panel relative rounded-[2rem] p-7">
      <div className="absolute right-7 top-6 text-5xl leading-none text-[var(--color-gold)]/30">
        &ldquo;
      </div>
      <p className="relative text-lg leading-8 text-[var(--color-slate-950)]">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-6 border-t border-[var(--color-line)] pt-5">
        <p className="text-base font-semibold text-[var(--color-navy-950)]">
          {name}
        </p>
        <p className="mt-1 text-sm text-[var(--color-slate-700)]">{role}</p>
      </div>
    </article>
  );
}
