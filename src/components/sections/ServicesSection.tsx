"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock3, HeartPulse, Palette, Phone, Scissors, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/data/business";
import { formatDuration, formatPrice } from "@/lib/format";
import type { Service, ServiceCategory } from "@/types/business";

type FilterId = "all" | ServiceCategory;

const filters: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "All services" },
  { id: "cuts", label: "Cuts" },
  { id: "colour", label: "Colour" },
  { id: "styling", label: "Styling" },
  { id: "care", label: "Care" },
];

const categoryIcon = {
  cuts: Scissors,
  colour: Palette,
  styling: Sparkles,
  care: HeartPulse,
};

function ServiceCard({ service, reduceMotion }: { service: Service; reduceMotion: boolean | null }) {
  const price = formatPrice(service.price);
  const duration = formatDuration(service.durationMinutes);
  const Icon = categoryIcon[service.category];

  return (
    <motion.article
      layout={!reduceMotion}
      className="service-card group"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
      transition={{ duration: reduceMotion ? 0 : 0.28 }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
    >
      <div className="flex items-start justify-between gap-5">
        <span className="grid size-12 place-items-center border border-bronze/35 bg-bronze/8 text-bronze">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        {service.availability === "confirm-by-phone" && (
          <span className="border border-cream/15 px-2.5 py-1 text-[10px] uppercase text-cream/45">
            Confirm by phone
          </span>
        )}
      </div>

      <h3 className="mt-10 font-display text-3xl leading-none">{service.name}</h3>
      <p className="mt-4 min-h-20 text-sm leading-6 text-cream/60">
        {service.description}
      </p>

      <div className="mt-8 flex min-h-12 items-end justify-between gap-4 border-t border-cream/12 pt-5">
        <div>
          <p className="text-sm font-semibold text-bronze">
            {price ?? "Contact for Pricing"}
          </p>
          {duration && (
            <p className="mt-2 flex items-center gap-2 text-xs text-cream/48">
              <Clock3 className="size-4" aria-hidden="true" />
              {duration}
            </p>
          )}
        </div>
        <a
          className="icon-button shrink-0 text-cream transition-colors group-hover:border-bronze group-hover:text-bronze"
          href={business.phone.href}
          aria-label={"Call about " + service.name}
        >
          <Phone className="size-5" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

export function ServicesSection() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const reduceMotion = useReducedMotion();

  const services = useMemo(
    () =>
      business.services.filter(
        (service) =>
          service.active &&
          (activeFilter === "all" || service.category === activeFilter),
      ),
    [activeFilter],
  );

  return (
    <section
      id="services"
      className="section bg-graphite text-cream"
      aria-labelledby="services-title"
    >
      <div className="site-container">
        <motion.div
          id="services-title"
          className="scroll-reveal"
          initial={false}
        >
          <SectionHeading
            eyebrow="Services"
            title={business.copy.servicesTitle}
            description={business.copy.servicesBody}
            light
          />
        </motion.div>

        <div
          className="mt-10 flex max-w-full gap-2 overflow-x-auto pb-2"
          role="toolbar"
          aria-label="Filter services"
        >
          {filters.map((filter) => {
            const selected = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                className={
                  "min-h-11 shrink-0 border px-4 text-sm font-semibold transition-colors " +
                  (selected
                    ? "border-bronze bg-bronze text-ink"
                    : "border-cream/18 text-cream/68 hover:border-bronze/60 hover:text-cream")
                }
                aria-pressed={selected}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <motion.div layout={!reduceMotion} className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} reduceMotion={reduceMotion} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
