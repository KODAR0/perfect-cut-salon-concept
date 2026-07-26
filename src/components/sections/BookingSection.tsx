"use client";

import { Check, LoaderCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { business } from "@/data/business";
import { submitBookingRequest } from "@/lib/booking";
import { formatPhoneInput } from "@/lib/format";

interface FormValues {
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  comment: string;
}

type FormErrors = Partial<Record<keyof FormValues | "form", string>>;

const initialValues: FormValues = {
  name: "",
  phone: "",
  service: "",
  preferredDate: "",
  preferredTime: "",
  comment: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const phoneDigits = values.phone.replace(/\D/g, "");

  if (values.name.trim().length < 2) {
    errors.name = "Enter your name.";
  }
  if (phoneDigits.length !== 10) {
    errors.phone = "Enter a 10-digit phone number.";
  }
  if (!values.service) {
    errors.service = "Select a service category.";
  }
  if (!values.preferredDate) {
    errors.preferredDate = "Choose a preferred date.";
  }
  if (!values.preferredTime) {
    errors.preferredTime = "Choose a preferred time.";
  }

  return errors;
}

export function BookingSection() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const today = new Date();
  const minDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60_000,
  )
    .toISOString()
    .slice(0, 10);

  const updateValue = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || submitted) {
      return;
    }

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      await submitBookingRequest(values);
      setSubmitted(true);
    } catch {
      setErrors({
        form: "The demo request could not be prepared. Please call the salon directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const services = business.services.filter((service) => service.active);

  return (
    <section id="booking" className="bg-burgundy text-cream" aria-labelledby="booking-title">
      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-between px-5 py-16 sm:px-8 lg:min-h-[780px] lg:px-[max(2rem,calc((100vw-1280px)/2))] lg:py-20">
          <div>
            <p className="eyebrow text-bronze">Book by phone</p>
            <h2 id="booking-title" className="max-w-xl font-display text-section leading-[0.98]">
              {business.copy.bookingTitle}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-cream/72">
              {business.copy.bookingBody}
            </p>
          </div>

          <a className="button button-cream mt-10 w-fit" href={business.phone.href}>
            <Phone className="size-5" aria-hidden="true" />
            Call: {business.phone.display}
          </a>
        </div>

        <div className="bg-graphite px-5 py-16 sm:px-8 lg:px-14 lg:py-20 xl:px-20">
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow text-bronze">Request form demo</p>
            <h3 className="font-display text-4xl leading-none sm:text-5xl">
              Tell us what you are looking for.
            </h3>
            <p className="mt-5 text-sm leading-6 text-cream/58">
              This form is a demonstration only. It does not send or store your data.
              An appointment is not booked until you confirm it by phone.
            </p>

            {submitted ? (
              <div
                className="mt-10 border border-bronze/45 bg-ink/55 p-6"
                role="status"
                aria-live="polite"
              >
                <Check className="size-8 text-bronze" aria-hidden="true" />
                <h4 className="mt-5 font-display text-3xl">Thank you!</h4>
                <p className="mt-3 leading-7 text-cream/72">
                  To confirm your appointment, contact the salon by phone at{" "}
                  <a className="font-semibold text-bronze underline" href={business.phone.href}>
                    {business.phone.display}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  className="button button-outline-light mt-6"
                  onClick={() => {
                    setValues(initialValues);
                    setSubmitted(false);
                  }}
                >
                  Prepare Another Request
                </button>
              </div>
            ) : (
              <form className="mt-10 grid gap-5" noValidate onSubmit={onSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="field">
                    <label htmlFor="booking-name">Name</label>
                    <input
                      id="booking-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "booking-name-error" : undefined}
                      onChange={(event) => updateValue("name", event.target.value)}
                    />
                    {errors.name && (
                      <p id="booking-name-error" className="field-error">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="booking-phone">Phone</label>
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(905) 000-0000"
                      value={values.phone}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "booking-phone-error" : undefined}
                      onChange={(event) =>
                        updateValue("phone", formatPhoneInput(event.target.value))
                      }
                    />
                    {errors.phone && (
                      <p id="booking-phone-error" className="field-error">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="booking-service">Service of interest</label>
                  <select
                    id="booking-service"
                    name="service"
                    value={values.service}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? "booking-service-error" : undefined}
                    onChange={(event) => updateValue("service", event.target.value)}
                  >
                    <option value="">Select a category</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p id="booking-service-error" className="field-error">
                      {errors.service}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="field">
                    <label htmlFor="booking-date">Preferred date</label>
                    <input
                      id="booking-date"
                      name="preferredDate"
                      type="date"
                      min={minDate || undefined}
                      value={values.preferredDate}
                      aria-invalid={Boolean(errors.preferredDate)}
                      aria-describedby={
                        errors.preferredDate ? "booking-date-error" : undefined
                      }
                      onChange={(event) => updateValue("preferredDate", event.target.value)}
                    />
                    {errors.preferredDate && (
                      <p id="booking-date-error" className="field-error">
                        {errors.preferredDate}
                      </p>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="booking-time">Preferred time</label>
                    <input
                      id="booking-time"
                      name="preferredTime"
                      type="time"
                      value={values.preferredTime}
                      aria-invalid={Boolean(errors.preferredTime)}
                      aria-describedby={
                        errors.preferredTime ? "booking-time-error" : undefined
                      }
                      onChange={(event) => updateValue("preferredTime", event.target.value)}
                    />
                    {errors.preferredTime && (
                      <p id="booking-time-error" className="field-error">
                        {errors.preferredTime}
                      </p>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="booking-comment">
                    Comment <span className="text-cream/42">(optional)</span>
                  </label>
                  <textarea
                    id="booking-comment"
                    name="comment"
                    rows={4}
                    maxLength={500}
                    value={values.comment}
                    onChange={(event) => updateValue("comment", event.target.value)}
                  />
                </div>

                {errors.form && (
                  <p className="field-error" role="alert">
                    {errors.form}
                  </p>
                )}

                <button
                  type="submit"
                  className="button button-bronze mt-2 w-full disabled:cursor-not-allowed disabled:opacity-55"
                  disabled={submitting || submitted}
                >
                  {submitting ? (
                    <>
                      <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
                      Preparing Request
                    </>
                  ) : (
                    <>
                      <Send className="size-5" aria-hidden="true" />
                      Prepare Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
