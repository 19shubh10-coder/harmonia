
import HomeHero from "./_components/HomeHero";
import FeaturedPrograms from "./_components/FeaturedPrograms";
import WhyChooseUs from "./_components/WhyChooseUs";
import StatsSection from "@/components/sections/StatsSection";
import CertificationsStrip from "./_components/CertificationsStrip";
import StudentAchievements from "./_components/StudentAchievements";
import TestimonialsSection from "./_components/TestimonialsSection";
import CTABanner from "@/components/sections/CTABanner";
import NewsletterSection from "./_components/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <main>
        {/* 1. Hero Section */}
        <HomeHero />

        {/* 2. Featured Programs */}
        <FeaturedPrograms />

        {/* 3. Why Choose Us */}
        <WhyChooseUs />

        {/* 4. Stats Section */}
        <StatsSection />

        {/* 5. International Certifications */}
        <CertificationsStrip />

        {/* 6. Student Achievements */}
        <StudentAchievements />

        {/* 7. Testimonials */}
        <TestimonialsSection />

        {/* 8. Exam Preparation CTA */}
        <CTABanner
          heading="Excel in Your Trinity & ABRSM Examinations"
          description="Our structured exam preparation program has achieved a 98% success rate. Join hundreds of students who have earned distinctions in their graded examinations."
          ctaLabel="Explore Exam Prep"
          ctaHref="/courses"
        />

        {/* 9. Newsletter */}
        <NewsletterSection />
      </main>
    </>
  );
}
