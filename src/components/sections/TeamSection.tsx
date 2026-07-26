import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { StaffMember } from "@/types/business";

interface TeamSectionProps {
  staff: StaffMember[];
}

export function TeamSection({ staff }: TeamSectionProps) {
  const activeStaff = staff.filter((member) => member.active);

  if (!activeStaff.length) {
    return null;
  }

  return (
    <section className="section bg-graphite text-cream" aria-labelledby="team-title">
      <div className="site-container">
        <div id="team-title">
          <SectionHeading
            eyebrow="The team"
            title="Meet the people behind the chair."
            description="Only verified team profiles are shown."
            light
          />
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activeStaff.map((member, index) => (
            <Reveal key={member.id} delay={index * 0.06}>
              <article className="border border-cream/14 bg-ink">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <SafeImage
                    src={member.image}
                    alt={member.name}
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl">{member.name}</h3>
                  <p className="mt-1 text-sm text-bronze">{member.specialization}</p>
                  <p className="mt-4 text-sm leading-6 text-cream/62">{member.bio}</p>
                  {member.experience && (
                    <p className="mt-3 text-xs text-cream/48">{member.experience}</p>
                  )}
                  {member.socialUrl && (
                    <a
                      className="mt-5 inline-flex items-center gap-2 text-sm text-cream hover:text-bronze"
                      href={member.socialUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View profile
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
