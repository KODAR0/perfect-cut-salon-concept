import { business } from "@/data/business";

export const metadata = {
  title: "Terms | Perfect Cut Hair Salon",
  description: "Website terms for Perfect Cut Hair Salon.",
};

export default function TermsPage() {
  return (
    <main className="bg-cream px-5 pb-20 pt-32 text-ink sm:pt-36">
      <article className="mx-auto max-w-3xl">
        <p className="eyebrow text-burgundy">Terms</p>
        <h1 className="font-display text-5xl leading-none sm:text-7xl">Website terms</h1>
        <div className="legal-copy mt-10">
          <p>
            This website presents general information about {business.name}. Service
            availability, pricing, duration and business hours must be confirmed directly
            with the salon.
          </p>
          <h2>Appointments</h2>
          <p>
            An appointment is only confirmed through direct contact with the salon. The
            demonstration request form does not reserve a time.
          </p>
          <h2>Temporary imagery</h2>
          <p>
            Images marked as temporary editorial imagery are presentation placeholders
            and are not photographs of the salon, its staff or completed client work.
          </p>
          <h2>Contact</h2>
          <p>
            Call <a href={business.phone.href}>{business.phone.display}</a> for current
            salon information.
          </p>
        </div>
      </article>
    </main>
  );
}
