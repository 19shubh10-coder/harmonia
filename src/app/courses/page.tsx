'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/sections/HeroSection';
import CTABanner from '@/components/sections/CTABanner';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CourseCard from '@/components/cards/CourseCard';
import { courses, courseCategories } from '@/data/courses';

const methodologyFeatures = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Personalized Learning Paths',
    description:
      'Every student receives a customized curriculum designed around their goals, pace, and musical interests. Our faculty adapts teaching strategies to match individual learning styles, ensuring optimal progress and sustained motivation.',
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Research-Backed Methodology',
    description:
      'Our teaching methods are grounded in the latest music education research and combine proven pedagogical traditions — Suzuki, Kodály, and Orff — with modern approaches to deliver a holistic musical education.',
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: 'Performance-Driven Growth',
    description:
      'Regular performance opportunities — from informal studio recitals to grand concert events — build confidence, stage presence, and real-world musicianship skills that set our students apart.',
  },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCourses =
    activeCategory === 'All'
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Hero Section */}
      <HeroSection
        title="Our Music Programs"
        subtitle="From beginner to virtuoso, discover the program that matches your musical aspirations"
        backgroundImage="/images/violin-sheet.png"
      />

      {/* Category Filter & Course Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          title="Explore Our Programs"
          subtitle="Choose from a diverse range of music programs designed by world-class educators"
        />

        {/* Filter Pills */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {courseCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'text-navy'
                  : 'text-muted hover:text-navy dark:text-gray-400 dark:hover:text-dark-text'
              }`}
            >
              {activeCategory === category && (
                <motion.span
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </div>

        {/* Course Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredCourses.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-muted dark:text-gray-400">
              No programs found in this category. Try selecting a different filter.
            </p>
          </div>
        )}
      </section>

      {/* Why Our Programs */}
      <section className="bg-surface py-20 dark:bg-dark-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Our Programs Stand Out"
            subtitle="A methodology refined over decades, delivering exceptional results for every student"
          />

          <div className="grid gap-8 md:grid-cols-3">
            {methodologyFeatures.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="group rounded-2xl border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gold/50 dark:border-dark-border dark:bg-dark-bg">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-bold text-navy dark:text-dark-text">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        heading="Not Sure Which Program?"
        description="Schedule a free consultation with our academic advisors to find the perfect path for you."
        ctaLabel="Book Free Consultation"
        ctaHref="/contact"
        secondaryLabel="Browse FAQs"
        secondaryHref="/about#faq"
      />
    </main>
  );
}
