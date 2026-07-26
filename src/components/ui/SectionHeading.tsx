interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="section-heading-grid">
      <div>
        <p className={light ? "eyebrow text-bronze" : "eyebrow text-burgundy"}>
          {eyebrow}
        </p>
        <h2 className="max-w-4xl font-display text-section leading-[0.98]">
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={
            "max-w-md text-base leading-7 " +
            (light ? "text-cream/68" : "text-ink/64")
          }
        >
          {description}
        </p>
      )}
    </div>
  );
}
