import {
  CircleDot,
  MapPinned,
  PhoneCall,
  ScanLine,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits = [
  {
    title: "Personal approach",
    description: "Start with a conversation about your hair and the result you want.",
    icon: UserRoundCheck,
  },
  {
    title: "Hamilton location",
    description: "A clearly listed salon location with direct route access.",
    icon: MapPinned,
  },
  {
    title: "Booking by phone",
    description: "Call the confirmed salon number to discuss timing and availability.",
    icon: PhoneCall,
  },
  {
    title: "Attention to detail",
    description: "A visual direction centered on shape, finish and considered details.",
    icon: ScanLine,
  },
  {
    title: "Modern perspective",
    description: "A contemporary approach to finding a look that feels current and personal.",
    icon: Sparkles,
  },
  {
    title: "Client comfort",
    description: "Clear information and a straightforward path from browsing to calling.",
    icon: CircleDot,
  },
];

export function BenefitsSection() {
  return (
    <section className="section bg-milk text-ink" aria-labelledby="benefits-title">
      <div className="site-container">
        <Reveal>
          <div id="benefits-title">
            <SectionHeading
              eyebrow="The approach"
              title="Confidence starts with the details."
              description="These points describe the intended client experience without making unverified claims about products, awards or policies."
            />
          </div>
        </Reveal>

        <div className="mt-12 grid border-l border-t border-ink/18 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal
                key={benefit.title}
                className="min-h-56 border-b border-r border-ink/18 p-6 sm:p-7"
                delay={index * 0.04}
              >
                <Icon className="size-7 text-burgundy" aria-hidden="true" />
                <h3 className="mt-12 font-display text-2xl">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/62">
                  {benefit.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
