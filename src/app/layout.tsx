import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ConceptBanner } from "@/components/layout/ConceptBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActions } from "@/components/layout/MobileActions";
import { BackToTop } from "@/components/ui/BackToTop";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { business } from "@/data/business";
import "./globals.css";

const isPortfolioConcept = true;
const title = "Perfect Cut Hair Salon Website Concept | Danil Interactive";
const description =
  "An independent portfolio website concept created by Danil Interactive for Perfect Cut Hair Salon in Hamilton, Ontario.";

export const metadata: Metadata = {
  metadataBase: new URL(business.canonicalUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_CA",
    url: "/",
    siteName: business.name,
    images: [
      {
        url: "/images/hero/perfect-cut-hero.webp",
        width: 1536,
        height: 1024,
        alt: "Independent Perfect Cut Hair Salon website concept",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero/perfect-cut-hero.webp"],
  },
};

function buildStructuredData() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: business.name,
    telephone: business.phone.e164,
    url: business.canonicalUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street + ", " + business.address.unit,
      addressLocality: business.address.city,
      addressRegion: business.address.province,
      addressCountry: business.address.country,
    },
  };

  if (business.coordinates) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: business.coordinates.latitude,
      longitude: business.coordinates.longitude,
    };
  }

  const sameAs = [
    business.socials.instagram,
    business.socials.facebook,
  ].filter((url): url is string => Boolean(url));

  if (sameAs.length) {
    data.sameAs = sameAs;
  }

  if (business.hours) {
    const dayNames: Record<string, string> = {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    };

    data.openingHoursSpecification = Object.entries(business.hours).flatMap(
      ([day, intervals]) =>
        intervals.map((interval) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "https://schema.org/" + dayNames[day],
          opens: interval.open,
          closes: interval.close,
        })),
    );
  }

  return data;
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const structuredData = JSON.stringify(buildStructuredData()).replace(/</g, "\\u003c");

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <ScrollProgress />
        <ConceptBanner />
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
        <MobileActions />
        <BackToTop />
        {!isPortfolioConcept && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: structuredData }}
          />
        )}
      </body>
    </html>
  );
}
