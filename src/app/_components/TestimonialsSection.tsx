"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-background dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Students Say"
          subtitle="Hear from the musicians who have transformed their lives at Harmonic"
        />
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
