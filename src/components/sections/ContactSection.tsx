"use client";

import {
  Check,
  Clock3,
  Copy,
  CreditCard,
  ExternalLink,
  Languages,
  MapPin,
  Phone,
  WalletCards,
} from "lucide-react";
import { useState } from "react";
import { business } from "@/data/business";
import { getHoursRows, getOpenStatus } from "@/lib/hours";

export function ContactSection() {
  const [copyMessage, setCopyMessage] = useState("");
  const status = getOpenStatus(business.hours, business.timezone);
  const hoursRows = getHoursRows(business.hours);

  const paymentLabels = [
    business.paymentMethods.cash ? "Cash" : null,
    business.paymentMethods.debit ? "Debit" : null,
    business.paymentMethods.credit ? "Credit" : null,
  ].filter((method): method is string => Boolean(method));

  const policyLabels = [
    business.policies.walkInsAccepted === null
      ? null
      : business.policies.walkInsAccepted
        ? "Walk-ins accepted"
        : "Appointments required",
    business.policies.colourConsultationRequired === null
      ? null
      : business.policies.colourConsultationRequired
        ? "Consultation required for colour"
        : "Colour consultation not required",
    business.policies.pricesIncludeTax === null
      ? null
      : business.policies.pricesIncludeTax
        ? "Listed prices include tax"
        : "Tax is additional",
    business.policies.cancellation,
  ].filter((item): item is string => Boolean(item));

  const hasImportantInfo =
    paymentLabels.length > 0 || policyLabels.length > 0 || business.languages.length > 0;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(business.address.display);
      setCopyMessage("Address copied.");
    } catch {
      setCopyMessage("Copy unavailable. Select the address manually.");
    }

    window.setTimeout(() => setCopyMessage(""), 2600);
  };

  const mapEmbedUrl =
    "https://www.google.com/maps?q=" +
    encodeURIComponent(business.address.display) +
    "&output=embed";

  return (
    <section id="contact" className="bg-cream text-ink" aria-labelledby="contact-title">
      <div className="site-container section">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div>
            <p className="eyebrow text-burgundy">Contact</p>
            <h2 id="contact-title" className="font-display text-section leading-[0.98]">
              Find Perfect Cut in Hamilton.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-ink/64">
              Call the salon to confirm available times, services, pricing and current
              hours.
            </p>

            <div className="mt-9 border-t border-ink/18">
              <div className="contact-row">
                <MapPin className="size-6 text-burgundy" aria-hidden="true" />
                <div>
                  <h3>Address</h3>
                  <p>{business.address.display}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      className="button button-dark button-small"
                      href={business.address.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Get Directions
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      className="button button-outline-dark button-small"
                      onClick={copyAddress}
                    >
                      <Copy className="size-4" aria-hidden="true" />
                      Copy Address
                    </button>
                  </div>
                </div>
              </div>

              <div className="contact-row">
                <Phone className="size-6 text-burgundy" aria-hidden="true" />
                <div>
                  <h3>Phone</h3>
                  <a
                    className="text-lg font-semibold underline decoration-burgundy underline-offset-4"
                    href={business.phone.href}
                  >
                    {business.phone.display}
                  </a>
                </div>
              </div>

              <div className="contact-row">
                <Clock3 className="size-6 text-burgundy" aria-hidden="true" />
                <div className="w-full">
                  <h3>Hours</h3>
                  {hoursRows.length > 0 ? (
                    <>
                      {status && (
                        <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold">
                          <span
                            className={
                              "size-2 " + (status.isOpen ? "bg-emerald-700" : "bg-burgundy")
                            }
                          />
                          {status.label}
                        </p>
                      )}
                      <dl className="space-y-2 text-sm text-ink/64">
                        {hoursRows.map((row) => (
                          <div
                            key={row.day}
                            className="grid grid-cols-[1fr_auto] gap-4"
                          >
                            <dt>{row.label}</dt>
                            <dd className="text-right">
                              {row.intervals.length
                                ? row.intervals
                                    .map(
                                      (interval) => interval.open + "–" + interval.close,
                                    )
                                    .join(", ")
                                : "Closed"}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </>
                  ) : (
                    <p>Hours available by phone.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[440px] overflow-hidden border border-ink/15 bg-milk lg:min-h-[620px]">
            <iframe
              title="Map showing Perfect Cut Hair Salon location"
              src={mapEmbedUrl}
              className="absolute inset-0 size-full border-0 grayscale-[0.65] contrast-[1.05]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {hasImportantInfo && (
          <div className="mt-12 grid border-l border-t border-ink/18 md:grid-cols-3">
            {paymentLabels.length > 0 && (
              <div className="info-cell">
                <WalletCards className="size-6 text-burgundy" aria-hidden="true" />
                <h3>Payment methods</h3>
                <p>{paymentLabels.join(", ")}</p>
              </div>
            )}
            {policyLabels.length > 0 && (
              <div className="info-cell">
                <CreditCard className="size-6 text-burgundy" aria-hidden="true" />
                <h3>Important information</h3>
                <p>{policyLabels.join(" · ")}</p>
              </div>
            )}
            {business.languages.length > 0 && (
              <div className="info-cell">
                <Languages className="size-6 text-burgundy" aria-hidden="true" />
                <h3>Languages</h3>
                <p>{business.languages.join(", ")}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        className={
          "fixed bottom-20 left-1/2 z-[75] flex -translate-x-1/2 items-center gap-2 bg-ink px-4 py-3 text-sm text-cream shadow-2xl transition-all md:bottom-6 " +
          (copyMessage
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0")
        }
        role="status"
        aria-live="polite"
      >
        {copyMessage.startsWith("Address") && (
          <Check className="size-4 text-bronze" aria-hidden="true" />
        )}
        {copyMessage}
      </div>
    </section>
  );
}
