"use client";

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import CourseCard from "@/components/cards/CourseCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { courses } from "@/data/courses";

export default function FeaturedPrograms() {
  const featuredCourses = courses.slice(0, 6);

  return (
    <section className="py-24 md:py-32 bg-surface dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Programs"
          subtitle="World-Class Music Education"
          titleClassName="text-5xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course, i) => (
            <ScrollReveal key={course.slug} delay={i * 0.1}>
              <CourseCard course={course} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-14 text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all duration-300 text-lg"
            >
              View All Programs
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
