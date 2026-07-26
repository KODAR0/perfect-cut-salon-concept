"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="fixed bottom-24 right-4 z-40 grid size-12 place-items-center border border-bronze/50 bg-ink/95 text-cream shadow-xl backdrop-blur md:bottom-6 md:right-6"
          aria-label="Back to top"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reduceMotion ? "auto" : "smooth",
            })
          }
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
