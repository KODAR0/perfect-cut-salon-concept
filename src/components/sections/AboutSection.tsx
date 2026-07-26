import { MapPin, PhoneCall } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { business } from "@/data/business";

export function AboutSection() {
  return (
    <section id="about" className="section bg-cream text-ink" aria-labelledby="about-title">
      <div className="site-container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow text-burgundy">About the salon</p>
          <h2 id="about-title" className="font-display text-section leading-[0.98]">
            {business.copy.aboutTitle}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-ink/66">
            {business.copy.aboutBody}
          </p>

          <div className="mt-9 grid gap-4 border-t border-ink/15 pt-6 sm:grid-cols-2">
            <a
              className="fact-link"
              href={business.address.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin className="size-5 text-burgundy" aria-hidden="true" />
              <span>
                <strong>Hamilton location</strong>
                {business.address.display}
              </span>
            </a>
            <a className="fact-link" href={business.phone.href}>
              <PhoneCall className="size-5 text-burgundy" aria-hidden="true" />
              <span>
                <strong>Book by phone</strong>
                {business.phone.display}
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal className="relative min-h-[390px] overflow-hidden bg-graphite sm:min-h-[520px]" delay={0.12}>
          <SafeImage
            src="/images/interior/salon-interior-placeholder.webp"
            alt="Temporary editorial image of a premium modern salon interior"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute bottom-4 left-4 border border-cream/25 bg-ink/80 px-3 py-2 text-[10px] uppercase text-cream/66 backdrop-blur">
            Replace with verified salon photography
          </div>
        </Reveal>
      </div>
    </section>
  );
}
