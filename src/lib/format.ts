import type { ServicePrice } from "@/types/business";

export function formatPrice(price: ServicePrice | null): string | null {
  if (!price) {
    return null;
  }

  const formatted = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 0,
  }).format(price.amount);

  return price.mode === "from" ? "From " + formatted : formatted;
}

export function formatDuration(durationMinutes: number | null): string | null {
  if (!durationMinutes) {
    return null;
  }

  if (durationMinutes < 60) {
    return durationMinutes + " min";
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return minutes ? hours + " hr " + minutes + " min" : hours + " hr";
}

export function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length < 4) {
    return digits;
  }

  if (digits.length < 7) {
    return "(" + digits.slice(0, 3) + ") " + digits.slice(3);
  }

  return (
    "(" +
    digits.slice(0, 3) +
    ") " +
    digits.slice(3, 6) +
    "-" +
    digits.slice(6)
  );
}
