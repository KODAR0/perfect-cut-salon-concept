import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { business } from "@/data/business";

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const socials = [
    { label: "Instagram", url: business.socials.instagram },
    { label: "Facebook", url: business.socials.facebook },
  ].filter((social): social is { label: string; url: string } => Boolean(social.url));

  return (
    <footer className="border-t border-cream/10 bg-ink pb-20 text-cream md:pb-0">
      <div className="site-container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr]">
        <div>
          <Brand />
          <p className="mt-6 max-w-md text-sm leading-7 text-cream/62">
            {business.copy.footerDescription}
          </p>
          <p className="mt-8 font-display text-3xl text-bronze">
            {business.copy.footerTagline}
          </p>
        </div>

        <div>
          <h2 className="footer-heading">Explore</h2>
          <nav className="mt-5 flex flex-col gap-3" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                className="w-fit text-sm text-cream/68 transition-colors hover:text-bronze"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="footer-heading">Contact</h2>
          <div className="mt-5 space-y-4 text-sm text-cream/68">
            <a
              className="flex items-start gap-3 transition-colors hover:text-bronze"
              href={business.phone.href}
            >
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {business.phone.display}
            </a>
            <a
              className="flex items-start gap-3 transition-colors hover:text-bronze"
              href={business.address.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{business.address.display}</span>
            </a>
            {socials.map((social) => (
              <a
                key={social.label}
                className="flex items-center gap-2 transition-colors hover:text-bronze"
                href={social.url}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="site-container flex flex-col gap-4 py-6 text-xs text-cream/48 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link className="hover:text-cream" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-cream" href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
