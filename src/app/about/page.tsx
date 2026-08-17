import { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import CTABanner from "@/components/sections/CTABanner";
import AcademyStory from "./_components/AcademyStory";
import MissionVision from "./_components/MissionVision";
import FounderMessage from "./_components/FounderMessage";
import CampusGallery from "./_components/CampusGallery";
import GlobalAffiliations from "./_components/GlobalAffiliations";
import ValuesPhilosophy from "./_components/ValuesPhilosophy";
import Accreditations from "./_components/Accreditations";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Harmonic Learning Studio's 25+ year legacy of nurturing musical talent. Discover our story, mission, world-class faculty, and global affiliations with Trinity, ABRSM, and Berklee.",
};

export default function AboutPage() {
  return (
    <>
      <main>
        {/* 1. Hero */}
        <HeroSection
          title="About Harmonic"
          subtitle="A legacy of musical excellence spanning over two decades, shaping the next generation of extraordinary musicians."
          backgroundImage="/images/about-classroom.png"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]}
        />

        {/* 2. Academy Story */}
        <AcademyStory />

        {/* 3. Mission & Vision */}
        <MissionVision />

        {/* 4. Founder's Message */}
        <FounderMessage />

        {/* 5. Campus Gallery */}
        <CampusGallery />

        {/* 6. Global Affiliations */}
        <GlobalAffiliations />

        {/* 7. Values & Philosophy */}
        <ValuesPhilosophy />

        {/* 8. Accreditations */}
        <Accreditations />

        {/* 9. CTA */}
        <CTABanner
          heading="Begin Your Musical Journey"
          description="Whether you're a beginner discovering your first instrument or an advanced musician seeking mastery, Harmonic has a place for you."
          ctaLabel="Explore Our Programs"
          ctaHref="/courses"
        />
      </main>
    </>
  );
}
