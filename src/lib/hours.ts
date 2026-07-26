import type { WeekdayKey, WeeklyHours } from "@/types/business";

const weekdayOrder: WeekdayKey[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const weekdayLabels: Record<WeekdayKey, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function toMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function getCurrentParts(timezone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekdayMap: Record<string, WeekdayKey> = {
    Sun: "sunday",
    Mon: "monday",
    Tue: "tuesday",
    Wed: "wednesday",
    Thu: "thursday",
    Fri: "friday",
    Sat: "saturday",
  };

  return {
    weekday: weekdayMap[getPart("weekday")],
    minutes: Number(getPart("hour")) * 60 + Number(getPart("minute")),
  };
}

export function getOpenStatus(
  hours: WeeklyHours | null,
  timezone: string,
): { isOpen: boolean; label: string } | null {
  if (!hours) {
    return null;
  }

  const current = getCurrentParts(timezone);
  const intervals = hours[current.weekday] ?? [];
  const isOpen = intervals.some(
    (interval) =>
      current.minutes >= toMinutes(interval.open) &&
      current.minutes < toMinutes(interval.close),
  );

  return {
    isOpen,
    label: isOpen ? "Open now" : "Closed now",
  };
}

export function getHoursRows(hours: WeeklyHours | null) {
  if (!hours) {
    return [];
  }

  return weekdayOrder.slice(1).concat("sunday").map((day) => ({
    day,
    label: weekdayLabels[day],
    intervals: hours[day],
  }));
}
