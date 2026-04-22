import type { ComponentType, SVGProps } from "react";

type ContentGridItem = {
  title: string;
  description: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

type ContentGridProps = {
  items: ContentGridItem[];
  columns?: 2 | 3;
};

export function ContentGrid({ items, columns = 3 }: ContentGridProps) {
  return (
    <div
      className={`grid gap-6 ${
        columns === 2 ? "lg:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"
      }`}
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <article key={item.title} className="panel rounded-[2rem] p-7">
            {Icon ? (
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-surface-soft)] text-[var(--color-navy-900)]">
                <Icon className="h-7 w-7" />
              </div>
            ) : null}
            <h3 className="text-xl font-semibold text-[var(--color-navy-950)]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-slate-700)]">
              {item.description}
            </p>
          </article>
        );
      })}
    </div>
  );
}
