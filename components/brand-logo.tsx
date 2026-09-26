import Image from "next/image";

export function BrandLogo({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-[var(--color-navy-950)] shadow-lg shadow-slate-950/15 ${className}`}
    >
      <Image
        src="/images/prestige-logo.png"
        alt="Prestige Trust Bank logo"
        fill
        sizes="44px"
        className="object-cover"
        priority
      />
    </div>
  );
}
