"use client";

import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import EventCard from "@/components/cards/EventCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { events } from "@/data/events";

export default function UpcomingEvents() {
  const upcomingEvents = events.filter((e) => !e.isPast).slice(0, 3);

  return (
    <section className="py-24 md:py-32 bg-background dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Upcoming Events"
          subtitle="Join us for performances, masterclasses, and community celebrations"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, i) => (
            <ScrollReveal key={event.id} delay={i * 0.1}>
              <EventCard event={event} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-14 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all duration-300 text-lg"
            >
              View All Events
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
