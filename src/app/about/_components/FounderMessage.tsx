"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FounderMessage() {
  return (
    <section className="py-24 md:py-32 bg-background dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Photo */}
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/founder.jpg"
                  alt="Founder of Harmonic Learning Studio"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-gold/20 -z-10" />
            </div>
          </ScrollReveal>

          {/* Message */}
          <ScrollReveal direction="right" className="lg:col-span-3">
            <div>
              <span className="text-gold text-sm font-bold uppercase tracking-[0.2em]">
                Founder&apos;s Message
              </span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-navy dark:text-dark-text">
                A Note from Our Founder
              </h2>

              {/* Quote */}
              <blockquote className="mt-8 relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-gold to-gold/20 rounded-full" />
                <p className="pl-8 text-xl md:text-2xl font-heading italic text-navy/80 dark:text-dark-text/80 leading-relaxed">
                  &ldquo;Music is not just about learning notes — it&apos;s about discovering who you are.
                  At Harmonic, we build musicians from the heart, one rhythm at a time.&rdquo;
                </p>
              </blockquote>

              <div className="mt-8 space-y-4 text-muted dark:text-dark-text/60 leading-relaxed">
                <p>
                  As a proud graduate of <strong>KMMC (KM Music Conservatory), Chennai</strong>, I was
                  fortunate to learn under some of the finest musical minds in the country. That experience
                  shaped my belief that world-class music education should be accessible, inspiring, and
                  deeply personal.
                </p>
                <p>
                  Having completed all international grades in music and with over <strong>10 years of
                  dedicated teaching experience</strong>, I founded Harmonic Learning Studio with a singular
                  vision: to create a space where students don&apos;t just learn to play — they learn to
                  express, to feel, and to connect through the universal language of music.
                </p>
                <p>
                  As a percussionist at heart, I understand the power of rhythm in shaping discipline,
                  creativity, and confidence. Whether you&apos;re picking up an instrument for the first
                  time or preparing for international examinations, I invite you to join our family.
                  Your musical journey is our greatest composition.
                </p>
              </div>

              <div className="mt-8">
                <p className="font-heading text-lg font-bold text-navy dark:text-dark-text">
                  Divyanshu Vashistha
                </p>
                <p className="text-gold text-sm">
                  Founder &amp; Director, Harmonic Learning Studio
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

