'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import FacultyCard from '@/components/cards/FacultyCard';
import { faculty } from '@/data/faculty';

const departments = ['All', 'Piano', 'Strings', 'Vocals', 'Guitar', 'Theory'];

const masterclassHighlights = [
  {
    title: 'The Art of Romantic Piano Interpretation',
    instructor: 'Dr. Elena Petrova',
    date: 'July 15, 2026',
    time: '10:00 AM – 1:00 PM',
    description:
      'Explore the nuances of Chopin and Liszt with hands-on performance coaching. Open to intermediate and advanced piano students.',
    spots: '8 spots remaining',
    image: '/images/piano-closeup.png',
  },
  {
    title: 'Bow Technique and Tone Production',
    instructor: 'Prof. Rajesh Mehta',
    date: 'August 20, 2026',
    time: '2:00 PM – 5:00 PM',
    description:
      'A deep dive into right-hand technique for string players of all levels. Bring your instrument and bow.',
    spots: '12 spots remaining',
    image: '/images/violin-sheet.png',
  },
  {
    title: 'Understanding Form: From Minuet to Sonata',
    instructor: 'Dr. Ananya Iyer',
    date: 'August 5, 2026',
    time: '11:00 AM – 2:00 PM',
    description:
      'Analyze and understand the structural foundations of Western classical music through guided score study.',
    spots: '15 spots remaining',
    image: '/images/about-classroom.png',
  },
];

export default function FacultyPage() {
  const [activeDepartment, setActiveDepartment] = useState('All');

  const filteredFaculty =
    activeDepartment === 'All'
      ? faculty
      : faculty.filter((m) => {
          const lowerDept = activeDepartment.toLowerCase();
          const searchStr = `${m.role} ${m.instrument}`.toLowerCase();
          if (lowerDept === 'strings') return searchStr.includes('violin') || searchStr.includes('cello') || searchStr.includes('string');
          if (lowerDept === 'vocals') return searchStr.includes('vocal') || searchStr.includes('voice');
          return searchStr.includes(lowerDept);
        });

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Hero Section */}
      <HeroSection
        title="Our Distinguished Faculty"
        subtitle="Learn from world-class musicians and educators who bring decades of performance and teaching excellence to every lesson"
        backgroundImage="/images/about-classroom.png"
      />

      {/* Faculty Filter & Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          title="Meet Our Faculty"
          subtitle="Passionate educators and accomplished performers dedicated to nurturing your musical potential"
        />

        {/* Department Filter Pills */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {departments.map((dept) => (
            <motion.button
              key={dept}
              onClick={() => setActiveDepartment(dept)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeDepartment === dept
                  ? 'text-navy'
                  : 'text-muted hover:text-navy dark:text-gray-400 dark:hover:text-dark-text'
              }`}
            >
              {activeDepartment === dept && (
                <motion.span
                  layoutId="activeFacultyPill"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{dept}</span>
            </motion.button>
          ))}
        </div>

        {/* Faculty Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDepartment}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredFaculty.map((member, index) => (
              <FacultyCard key={member.id} faculty={member} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredFaculty.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-muted dark:text-gray-400">
              No faculty members found in this department.
            </p>
          </div>
        )}
      </section>

      {/* Masterclass Highlights */}
      <section className="bg-surface py-20 dark:bg-dark-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Upcoming Masterclasses"
            subtitle="Intensive workshops and masterclasses led by our distinguished faculty"
          />

          <div className="grid gap-8 md:grid-cols-3">
            {masterclassHighlights.map((masterclass, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-dark-border dark:bg-dark-bg">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={masterclass.image}
                      alt={masterclass.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-navy">
                      Masterclass
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading text-lg font-bold text-navy dark:text-dark-text">
                      {masterclass.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gold">
                      with {masterclass.instructor}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted dark:text-gray-400">
                      {masterclass.description}
                    </p>

                    <div className="mt-4 space-y-2 text-xs text-muted dark:text-gray-500">
                      <p className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {masterclass.date} | {masterclass.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {masterclass.spots}
                      </p>
                    </div>

                    <Link
                      href="/events"
                      className="mt-4 flex w-full items-center justify-center rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-navy dark:bg-gold dark:text-navy dark:hover:bg-white"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Faculty */}
      <section className="relative overflow-hidden bg-navy py-24 dark:bg-dark-surface">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold/5" />
        <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gold/10" />
        <div className="absolute left-1/3 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-accent/5" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                Join Our Distinguished Faculty
              </h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-gold" />
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                We&apos;re always looking for passionate, accomplished musicians and educators to join our team. 
                If you share our commitment to musical excellence and student success, we&apos;d love to hear from you.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  'Competitive compensation and flexible scheduling',
                  'State-of-the-art teaching facilities and instruments',
                  'Professional development and continued education support',
                  'Collaborative, supportive faculty community',
                  'Opportunities for performance and artistic growth',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 text-base font-semibold text-navy transition-all duration-300 hover:bg-white hover:shadow-lg"
                >
                  Apply Now
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:border-gold hover:text-gold"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Decorative Side */}
            <div className="relative hidden lg:block">
              <div className="relative h-96 w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/about-classroom.png"
                  alt="Teaching at Harmonic"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-navy/40 to-transparent" />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-white px-6 py-4 shadow-xl dark:bg-dark-bg">
                <p className="font-heading text-2xl font-bold text-gold">6+</p>
                <p className="text-xs text-muted dark:text-gray-400">Expert Faculty</p>
              </div>
              <div className="absolute -right-6 -top-6 rounded-xl bg-white px-6 py-4 shadow-xl dark:bg-dark-bg">
                <p className="font-heading text-2xl font-bold text-gold">15+</p>
                <p className="text-xs text-muted dark:text-gray-400">Years Average Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
