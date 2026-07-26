export type ServiceCategory = "cuts" | "colour" | "styling" | "care";
export type PriceMode = "fixed" | "from";
export type WeekdayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface ServicePrice {
  amount: number;
  currency: "CAD";
  mode: PriceMode;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  image: string | null;
  active: boolean;
  availability: "confirmed" | "confirm-by-phone";
  price: ServicePrice | null;
  durationMinutes: number | null;
}

export interface StaffMember {
  id: string;
  name: string;
  image: string;
  specialization: string;
  bio: string;
  experience: string | null;
  socialUrl: string | null;
  active: boolean;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
  service: string | null;
  source: string;
  sourceUrl: string | null;
  active: boolean;
}

export interface PhotoAsset {
  id: string;
  src: string;
  alt: string;
  category:
    | "interior"
    | "staff"
    | "mens-cuts"
    | "womens-cuts"
    | "colour"
    | "styling"
    | "work";
  width: number;
  height: number;
  isPlaceholder: boolean;
  active: boolean;
}

export interface OpeningInterval {
  open: string;
  close: string;
}

export type WeeklyHours = Record<WeekdayKey, OpeningInterval[]>;

export interface BusinessConfig {
  name: string;
  legalName: string | null;
  phone: {
    display: string;
    e164: string;
    href: string;
  };
  address: {
    street: string;
    unit: string;
    city: string;
    province: string;
    country: string;
    postalCode: string | null;
    display: string;
    mapUrl: string;
  };
  timezone: string;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  canonicalUrl: string;
  email: string | null;
  socials: {
    instagram: string | null;
    facebook: string | null;
  };
  hours: WeeklyHours | null;
  services: Service[];
  staff: StaffMember[];
  gallery: PhotoAsset[];
  reviews: Review[];
  reviewUrl: string | null;
  paymentMethods: {
    cash: boolean | null;
    debit: boolean | null;
    credit: boolean | null;
  };
  policies: {
    walkInsAccepted: boolean | null;
    colourConsultationRequired: boolean | null;
    pricesIncludeTax: boolean | null;
    cancellation: string | null;
  };
  languages: string[];
  booking: {
    primaryMethod: "phone";
    onlineUrl: string | null;
    requestFormMode: "demo";
  };
  logo: {
    src: string;
    alt: string;
  } | null;
  sections: {
    about: boolean;
    services: boolean;
    team: boolean;
    gallery: boolean;
    benefits: boolean;
    reviews: boolean;
    booking: boolean;
    contact: boolean;
    faq: boolean;
  };
  copy: {
    heroTitle: [string, string];
    heroSubtitle: string;
    heroEyebrow: string;
    aboutTitle: string;
    aboutBody: string;
    servicesTitle: string;
    servicesBody: string;
    galleryTitle: string;
    bookingTitle: string;
    bookingBody: string;
    footerDescription: string;
    footerTagline: string;
  };
  faq: Array<{
    question: string;
    answer: string;
    active: boolean;
  }>;
}
