import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  return (
    <div
      className={("scroll-reveal " + className).trim()}
      style={{ "--reveal-delay": delay + "s" } as CSSProperties}
    >
      {children}
    </div>
  );
}