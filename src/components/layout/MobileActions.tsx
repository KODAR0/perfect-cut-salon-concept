import { MapPin, Phone, Scissors } from "lucide-react";
import Link from "next/link";
import { business } from "@/data/business";

export function MobileActions() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-3 border-t border-cream/10 bg-ink text-cream shadow-2xl md:hidden"
      aria-label="Quick actions"
    >
      <a
        className="mobile-action bg-bronze text-ink"
        href={business.phone.href}
      >
        <Phone className="size-5" aria-hidden="true" />
        Call
      </a>
      <a
        className="mobile-action"
        href={business.address.mapUrl}
        target="_blank"
        rel="noreferrer"
      >
        <MapPin className="size-5" aria-hidden="true" />
        Directions
      </a>
      <Link className="mobile-action" href="/#services">
        <Scissors className="size-5" aria-hidden="true" />
        Services
      </Link>
    </nav>
  );
}
