import { business } from "@/data/business";

export const metadata = {
  title: "Privacy | Perfect Cut Hair Salon",
  description: "Privacy information for the Perfect Cut Hair Salon website.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-cream px-5 pb-20 pt-32 text-ink sm:pt-36">
      <article className="mx-auto max-w-3xl">
        <p className="eyebrow text-burgundy">Privacy</p>
        <h1 className="font-display text-5xl leading-none sm:text-7xl">Privacy notice</h1>
        <div className="legal-copy mt-10">
          <p>
            This website currently provides salon information and direct links for
            telephone calls and directions.
          </p>
          <h2>Booking request demonstration</h2>
          <p>
            The booking request form is a front-end demonstration. Information entered
            into it is not transmitted to or stored on a server. An appointment is not
            created by submitting the demonstration form.
          </p>
          <h2>External services</h2>
          <p>
            The directions link and map may open or load Google Maps. Those services
            operate under their own privacy terms.
          </p>
          <h2>Contact</h2>
          <p>
            For questions about salon information, call{" "}
            <a href={business.phone.href}>{business.phone.display}</a>.
          </p>
        </div>
      </article>
    </main>
  );
}
