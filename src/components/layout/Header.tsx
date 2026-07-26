"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business } from "@/data/business";
import { Brand } from "@/components/ui/Brand";

const navigation = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Gallery", href: "/#gallery", id: "gallery" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const openButton = openButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) {
        return;
      }

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
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
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      openButton?.focus();
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={
        "fixed inset-x-0 top-9 z-50 transition-all duration-300 " +
        (scrolled
          ? "h-16 border-b border-cream/10 bg-ink/90 backdrop-blur-xl"
          : "h-20 border-b border-cream/15 bg-transparent")
      }
    >
      <div className="site-container flex h-full items-center justify-between">
        <Brand compact={scrolled} />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              aria-current={
                pathname === "/" && activeSection === item.id ? "page" : undefined
              }
              className={
                "nav-link " +
                (pathname === "/" && activeSection === item.id
                  ? "text-bronze"
                  : "text-cream/72 hover:text-cream")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a className="button button-bronze" href={business.phone.href}>
            <Phone className="size-4" aria-hidden="true" />
            Call to Book
          </a>
        </div>

        <button
          ref={openButtonRef}
          type="button"
          className="icon-button text-cream lg:!hidden"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            ref={menuRef}
            className="fixed inset-0 z-[70] flex min-h-svh flex-col overflow-y-auto bg-ink px-5 pb-10 pt-5 text-cream lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{
              duration: reduceMotion ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center justify-between">
              <Brand />
              <button
                ref={closeButtonRef}
                type="button"
                className="icon-button text-cream"
                aria-label="Close navigation menu"
                onClick={closeMenu}
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>

            <nav
              className="my-auto flex flex-col border-t border-cream/15"
              aria-label="Mobile navigation"
            >
              {navigation.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.045 }}
                >
                  <Link
                    href={item.href}
                    aria-current={
                      pathname === "/" && activeSection === item.id ? "page" : undefined
                    }
                    className={
                      "flex min-h-16 items-center justify-between border-b border-cream/15 font-display text-3xl " +
                      (pathname === "/" && activeSection === item.id
                        ? "text-bronze"
                        : "text-cream")
                    }
                    onClick={closeMenu}
                  >
                    {item.label}
                    <span className="font-sans text-xs text-bronze">
                      0{index + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <a
              className="button button-bronze w-full"
              href={business.phone.href}
              onClick={closeMenu}
            >
              <Phone className="size-5" aria-hidden="true" />
              Call {business.phone.display}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
