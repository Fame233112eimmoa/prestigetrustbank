import Link from "next/link";

import { ArrowRightIcon, CheckIcon } from "@/components/icons";

type PageHeroMetric = {
  value: string;
  label: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  highlights?: string[];
  metrics?: PageHeroMetric[];
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  highlights,
  metrics,
}: PageHeroProps) {
  const hasAside = Boolean((highlights?.length ?? 0) > 0 || (metrics?.length ?? 0) > 0);

  return (
    <section className="overflow-hidden bg-[var(--color-navy-950)] text-white">
      <div className="hero-grid bg-radial-premium">
        <div
          className={`container-shell grid gap-10 py-18 sm:py-20 ${
            hasAside ? "xl:grid-cols-[1.02fr_0.98fr] xl:items-center" : ""
          }`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
              {eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-tight text-balance sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-gold)] px-6 py-3.5 text-sm font-semibold text-[var(--color-navy-950)] hover:bg-[var(--color-gold-soft)]"
              >
                {primaryLabel}
              </Link>
              {secondaryHref && secondaryLabel ? (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/14 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/6"
                >
                  {secondaryLabel}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          </div>

          {hasAside ? (
            <Link
              href={primaryHref}
              className="relative block rounded-[2.25rem] border border-white/12 bg-white/8 p-5 shadow-[0_26px_80px_rgba(2,8,23,0.35)] backdrop-blur-xl"
            >
              <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-[var(--color-gold)]/18 blur-3xl" />
              <div className="absolute -right-6 bottom-6 h-32 w-32 rounded-full bg-white/12 blur-3xl" />

              <div className="relative rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))] p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold)]">
                  Highlights
                </p>

                {metrics?.length ? (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {metrics.map((metric) => (
                      <article
                        key={metric.label}
                        className="rounded-[1.5rem] border border-white/10 bg-[var(--color-navy-900)]/65 p-5"
                      >
                        <p className="font-display text-3xl font-semibold text-white">
                          {metric.value}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {metric.label}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : null}

                {highlights?.length ? (
                  <div className={metrics?.length ? "mt-6" : "mt-5"}>
                    <div className="space-y-3">
                      {highlights.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-[1.25rem] border border-white/10 bg-white/6 px-4 py-4"
                        >
                          <span className="mt-0.5 rounded-full bg-white/10 p-1 text-[var(--color-gold)]">
                            <CheckIcon className="h-4 w-4" />
                          </span>
                          <p className="text-sm leading-7 text-slate-100">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
