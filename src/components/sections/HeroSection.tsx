"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import type { CSSProperties } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { business } from "@/data/business";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : ["0%", "7%"],
  );

  const reveal = (delay: number) => ({
    initial: false as const,
    style: { "--reveal-delay": delay + "s" } as CSSProperties,
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-shell relative isolate flex items-end overflow-hidden bg-ink text-cream"
      aria-labelledby="hero-title"
    >
      <motion.div className="absolute inset-0 -z-20 scale-[1.06]" style={{ y: imageY }}>
        <SafeImage
          src="/images/hero/perfect-cut-hero.webp"
          alt="Temporary editorial image of a stylist working with a client"
          className="object-cover object-[62%_center]"
          sizes="100vw"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-black/55" aria-hidden="true" />

      <div className="site-container relative z-10 pb-6 pt-24 sm:pb-12 sm:pt-32 lg:pb-14">
        <div className="max-w-4xl">
          <motion.p className="hero-reveal eyebrow text-bronze" {...reveal(0.08)}>
            {business.copy.heroEyebrow}
          </motion.p>
          <h1 id="hero-title" className="font-display leading-[0.88]">
            <motion.span
              className="hero-reveal mb-2 block font-sans text-sm font-semibold uppercase text-cream/70 sm:mb-4"
              {...reveal(0.12)}
            >
              {business.name}
            </motion.span>
            <motion.span
              className="hero-reveal block text-hero"
              {...reveal(0.18)}
            >
              {business.copy.heroTitle[0]}
            </motion.span>
            <motion.span
              className="hero-reveal block text-hero text-bronze"
              {...reveal(0.26)}
            >
              {business.copy.heroTitle[1]}
            </motion.span>
          </h1>

          <motion.p
            className="hero-reveal hero-subtitle mt-4 max-w-2xl text-base leading-7 text-cream/78 sm:mt-6 sm:text-lg"
            {...reveal(0.34)}
          >
            {business.copy.heroSubtitle}
          </motion.p>

          <motion.div
            className="hero-reveal mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:gap-3"
            {...reveal(0.42)}
          >
            <a className="button button-bronze" href={business.phone.href}>
              <Phone className="size-5" aria-hidden="true" />
              Call to Book
            </a>
            <Link className="button button-outline-light" href="#services">
              View Services
              <ArrowDown className="size-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero-reveal mt-6 grid max-w-3xl grid-cols-2 gap-2 border-t border-cream/25 pt-4 text-sm text-cream/68 sm:mt-10 sm:gap-3 sm:pt-5"
          {...reveal(0.5)}
        >
          <a
            className="flex min-h-11 items-center gap-3 transition-colors hover:text-cream"
            href={business.address.mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin className="size-5 shrink-0 text-bronze" aria-hidden="true" />
            {business.address.display}
          </a>
          <a
            className="flex min-h-11 items-center gap-3 transition-colors hover:text-cream sm:justify-end"
            href={business.phone.href}
          >
            <Phone className="size-5 shrink-0 text-bronze" aria-hidden="true" />
            {business.phone.display}
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-3 right-4 z-10 hidden border border-cream/25 bg-ink/75 px-3 py-2 text-[10px] uppercase text-cream/60 backdrop-blur sm:right-6 sm:block">
        Temporary editorial imagery
      </div>
    </section>
  );
}
