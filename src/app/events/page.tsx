'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import EventCard from '@/components/cards/EventCard';
import { events, eventCategories } from '@/data/events';

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const upcomingEvents = events.filter((e) => !e.isPast);
  const pastEvents = events.filter((e) => e.isPast);
  const featuredEvent = upcomingEvents.find((e) => e.featured);

  const filteredUpcoming =
    activeCategory === 'All'
      ? upcomingEvents.filter((e) => !e.featured)
      : upcomingEvents.filter(
          (e) => e.category === activeCategory && !(e.featured && activeCategory === 'All')
        );

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Hero Section */}
      <HeroSection
        title="Events & Workshops"
        subtitle="Experience the magic of live music through our concerts, recitals, masterclasses, and festivals"
        backgroundImage="/images/events-concert.png"
      />

      {/* Category Filter */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          title="Upcoming Events"
          subtitle="Discover performances, workshops, and musical experiences that inspire"
        />

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {eventCategories.map((category) => (
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
                  layoutId="activeEventPill"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </div>

        {/* Featured Event */}
        {featuredEvent && activeCategory === 'All' && (
          <div className="mb-12">
            <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-bold text-navy dark:text-dark-text">
              <svg className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured Event
            </h3>
            <EventCard event={featuredEvent} />
          </div>
        )}

        {/* Events Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredUpcoming.map((event, index) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredUpcoming.length === 0 && !featuredEvent && (
          <div className="py-16 text-center">
            <svg className="mx-auto h-16 w-16 text-muted/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-4 text-lg text-muted dark:text-gray-400">
              No upcoming events in this category. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="bg-surface py-20 dark:bg-dark-surface">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Past Events"
              subtitle="A look back at memorable musical experiences at Harmonic"
            />

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event, index) => (
                <ScrollReveal key={event.id} delay={index * 0.1}>
                  <EventCard event={event} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: '50+', label: 'Events Per Year', icon: '🎵' },
            { value: '2000+', label: 'Audience Members', icon: '👥' },
            { value: '15+', label: 'Guest Artists', icon: '🌟' },
            { value: '100%', label: 'Memorable Experiences', icon: '❤️' },
          ].map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <span className="text-3xl">{stat.icon}</span>
                <p className="mt-2 font-heading text-3xl font-bold text-gold sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted dark:text-gray-400">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Host an Event CTA */}
      <section className="relative overflow-hidden bg-navy py-24 dark:bg-dark-surface">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold/5" />
        <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-gold/10" />
        <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                Host an Event at Harmonic
              </h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-gold" />
              <p className="mt-6 text-lg leading-relaxed text-white/80">
                Our world-class auditorium and intimate performance spaces are available for concerts, recitals, 
                workshops, and corporate events. With state-of-the-art acoustics, a Steinway concert grand, 
                and professional technical support, Harmonic provides the perfect setting for unforgettable musical experiences.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-6">
                {[
                  { label: 'Grand Auditorium', detail: '350 seats' },
                  { label: 'Chamber Music Hall', detail: '80 seats' },
                  { label: 'Performance Studio A', detail: '50 seats' },
                  { label: 'Performance Studio B', detail: '30 seats' },
                ].map((venue) => (
                  <div key={venue.label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold text-white">{venue.label}</p>
                    <p className="text-sm text-white/60">{venue.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3 text-base font-semibold text-navy transition-all duration-300 hover:bg-white hover:shadow-lg"
                >
                  Inquire About Venue
                  <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:border-gold hover:text-gold"
                >
                  Download Venue Guide
                </Link>
              </div>
            </div>

            {/* Right side decorative */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="h-80 w-80 rounded-full border-2 border-gold/20 flex items-center justify-center">
                  <div className="h-60 w-60 rounded-full border-2 border-gold/30 flex items-center justify-center">
                    <div className="h-40 w-40 rounded-full bg-gold/10 flex items-center justify-center">
                      <span className="text-6xl">🎶</span>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 right-8 rounded-lg bg-white px-4 py-2 shadow-lg dark:bg-dark-bg">
                  <p className="text-xs font-bold text-gold">Steinway</p>
                  <p className="text-xs text-muted">Concert Grand</p>
                </div>
                <div className="absolute -bottom-4 left-4 rounded-lg bg-white px-4 py-2 shadow-lg dark:bg-dark-bg">
                  <p className="text-xs font-bold text-gold">Professional</p>
                  <p className="text-xs text-muted">Sound & Lighting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
