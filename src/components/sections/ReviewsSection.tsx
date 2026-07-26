import { ExternalLink, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Review } from "@/types/business";

interface ReviewsSectionProps {
  reviews: Review[];
  reviewUrl: string | null;
}

export function ReviewsSection({ reviews, reviewUrl }: ReviewsSectionProps) {
  const activeReviews = reviews.filter((review) => review.active);

  if (!activeReviews.length && !reviewUrl) {
    return null;
  }

  return (
    <section className="section bg-cream text-ink" aria-labelledby="reviews-title">
      <div className="site-container">
        <div id="reviews-title">
          <SectionHeading
            eyebrow="Verified reviews"
            title="Client words, shown with their source."
            description="This section only renders reviews entered in the business configuration."
          />
        </div>

        {activeReviews.length > 0 && (
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {activeReviews.map((review, index) => (
              <Reveal key={review.id} delay={index * 0.05}>
                <article className="h-full border border-ink/18 p-6">
                  <div
                    className="flex gap-1 text-burgundy"
                    aria-label={review.rating + " out of 5 stars"}
                  >
                    {Array.from({ length: review.rating }, (_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="size-4 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-5 text-base leading-7">
                    “{review.text}”
                  </blockquote>
                  <p className="mt-6 text-sm font-semibold">{review.name}</p>
                  <p className="mt-1 text-xs text-ink/55">
                    {review.source} · {review.date}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {reviewUrl && (
          <a
            className="button button-dark mt-8"
            href={reviewUrl}
            target="_blank"
            rel="noreferrer"
          >
            Leave a Review
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </section>
  );
}
