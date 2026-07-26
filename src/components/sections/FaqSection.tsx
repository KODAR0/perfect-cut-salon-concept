import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { business } from "@/data/business";

export function FaqSection() {
  const items = business.faq.filter((item) => item.active);

  if (!items.length) {
    return null;
  }

  return (
    <section className="section bg-milk text-ink" aria-labelledby="faq-title">
      <div className="site-container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow text-burgundy">FAQ</p>
          <h2 id="faq-title" className="font-display text-section leading-[0.98]">
            Good questions. Clear answers.
          </h2>
        </Reveal>

        <div className="border-t border-ink/18">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.04}>
              <details className="faq-item group border-b border-ink/18">
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-xl marker:hidden sm:text-2xl">
                  {item.question}
                  <ChevronDown
                    className="size-5 shrink-0 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-2xl pb-6 text-sm leading-7 text-ink/64 sm:text-base">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
