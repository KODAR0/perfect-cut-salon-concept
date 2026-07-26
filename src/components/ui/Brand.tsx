import Link from "next/link";

interface BrandProps {
  compact?: boolean;
  href?: string;
}

export function Brand({ compact = false, href = "/#home" }: BrandProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-3 text-cream focus-visible:outline-none"
      aria-label="Perfect Cut Hair Salon home"
    >
      <span
        className="grid size-10 place-items-center border border-bronze/70 font-display text-lg transition-colors group-hover:bg-bronze group-hover:text-ink"
        aria-hidden="true"
      >
        PC
      </span>
      <span className="flex flex-col font-semibold uppercase leading-none">
        <span className="text-sm">Perfect Cut</span>
        {!compact && (
          <span className="mt-1 text-[10px] font-normal text-cream/60">
            Hair Salon
          </span>
        )}
      </span>
    </Link>
  );
}
