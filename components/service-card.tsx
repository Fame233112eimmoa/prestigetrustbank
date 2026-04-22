import type { ComponentType, SVGProps } from "react";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";

type ServiceCardProps = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
}: ServiceCardProps) {
  return (
    <article className="panel gold-ring group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,rgba(200,164,93,0.9),rgba(16,34,63,0.45))]" />
      <div className="relative">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-soft)] text-[var(--color-navy-900)]">
          <Icon className="h-7 w-7" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold)]">
          Banking
        </p>
        <h3 className="mt-4 text-xl font-semibold text-[var(--color-navy-950)]">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-[var(--color-slate-700)]">
          {description}
        </p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-navy-900)] hover:translate-x-1 hover:text-[var(--color-gold)]"
        >
          Learn More
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
