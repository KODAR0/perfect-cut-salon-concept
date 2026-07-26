"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/data/business";

const layoutClasses = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5 md:row-span-1",
  "md:col-span-5 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
  "md:col-span-4 md:row-span-1",
];

export function GallerySection() {
  const images = business.gallery.filter((image) => image.active);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null ? null : (current - 1 + images.length) % images.length,
      ),
    [images.length],
  );
  const next = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null ? null : (current + 1) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowLeft") {
        previous();
      } else if (event.key === "ArrowRight") {
        next();
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLButtonElement>(
            "button:not([disabled])",
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [activeIndex, close, next, previous]);

  if (!images.length) {
    return null;
  }

  const activeImage = activeIndex === null ? null : images[activeIndex];

  return (
    <section
      id="gallery"
      className="section bg-ink text-cream"
      aria-labelledby="gallery-title"
    >
      <div className="site-container">
        <motion.div
          id="gallery-title"
          className="scroll-reveal"
          initial={false}
        >
          <SectionHeading
            eyebrow="Gallery"
            title={business.copy.galleryTitle}
            description="Temporary editorial imagery is shown until verified salon photographs are added to the configuration."
            light
          />
        </motion.div>

        <div className="gallery-grid mt-12">
          {images.map((image, index) => (
            <motion.button
              key={image.id}
              type="button"
              className={
                "gallery-tile scroll-reveal group " +
                (layoutClasses[index % layoutClasses.length] ?? "")
              }
              aria-label={"Open image: " + image.alt}
              initial={false}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActiveIndex(index);
              }}
            >
              <SafeImage
                src={image.src}
                alt={image.alt}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                sizes="(max-width: 767px) 100vw, 60vw"
              />
              <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/28" />
              <span className="absolute right-3 top-3 grid size-11 place-items-center border border-cream/35 bg-ink/55 text-cream backdrop-blur">
                <Expand className="size-5" aria-hidden="true" />
              </span>
              <span className="absolute bottom-3 left-3 border border-cream/25 bg-ink/72 px-3 py-2 text-left text-[10px] uppercase text-cream/66 backdrop-blur">
                {image.isPlaceholder ? "Temporary editorial image" : image.category}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeImage && activeIndex !== null && (
          <motion.div
            ref={dialogRef}
            className="fixed inset-0 z-[90] grid place-items-center bg-black/94 p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                close();
              }
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="icon-button absolute right-3 top-3 z-20 bg-ink/75 text-cream sm:right-6 sm:top-6"
              aria-label="Close gallery"
              onClick={close}
            >
              <X className="size-6" aria-hidden="true" />
            </button>

            <div className="relative h-[76svh] w-full max-w-6xl overflow-hidden">
              <SafeImage
                key={activeImage.id}
                src={activeImage.src}
                alt={activeImage.alt}
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="icon-button absolute left-3 top-1/2 z-20 -translate-y-1/2 bg-ink/75 text-cream sm:left-6"
                  aria-label="Previous image"
                  onClick={previous}
                >
                  <ChevronLeft className="size-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="icon-button absolute right-3 top-1/2 z-20 -translate-y-1/2 bg-ink/75 text-cream sm:right-6"
                  aria-label="Next image"
                  onClick={next}
                >
                  <ChevronRight className="size-6" aria-hidden="true" />
                </button>
              </>
            )}

            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-ink/80 px-4 py-2 text-center text-xs text-cream/68 backdrop-blur sm:bottom-6"
              aria-live="polite"
            >
              {activeIndex + 1} / {images.length}
              {activeImage.isPlaceholder && " · Temporary editorial image"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
