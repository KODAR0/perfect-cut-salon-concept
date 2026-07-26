import { AboutSection } from "@/components/sections/AboutSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { business } from "@/data/business";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      {business.sections.about && <AboutSection />}
      {business.sections.services && <ServicesSection />}
      {business.sections.team && <TeamSection staff={business.staff} />}
      {business.sections.gallery && <GallerySection />}
      {business.sections.benefits && <BenefitsSection />}
      {business.sections.reviews && (
        <ReviewsSection reviews={business.reviews} reviewUrl={business.reviewUrl} />
      )}
      {business.sections.booking && <BookingSection />}
      {business.sections.contact && <ContactSection />}
      {business.sections.faq && <FaqSection />}
    </main>
  );
}
