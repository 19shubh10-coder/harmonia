import { Metadata } from "next";

import HeroSection from "@/components/sections/HeroSection";
import ContactGrid from "./_components/ContactGrid";
import MapSection from "./_components/MapSection";
import SocialMedia from "./_components/SocialMedia";
import FAQSection from "./_components/FAQSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Harmonic Learning Studio. Schedule a tour, inquire about our programs, or speak with our admissions team. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <main>
        {/* 1. Hero */}
        <HeroSection
          title="Get In Touch"
          subtitle="We'd love to hear from you. Whether you have questions about our programs, want to schedule a tour, or are ready to enroll — our team is here to help."
          backgroundImage="/images/piano-closeup.png"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]}
        />

        {/* 2. Contact Grid */}
        <ContactGrid />

        {/* 3. Map */}
        <MapSection />

        {/* 4. Social Media */}
        <SocialMedia />

        {/* 5. FAQ */}
        <FAQSection />
      </main>
    </>
  );
}
