"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const musicalNotes = ["♪", "♫", "♬", "♩", "𝄞"];

function FloatingNote({ index }: { index: number }) {
  const randomLeft = `${10 + (index * 17) % 80}%`;
  const randomDelay = index * 1.8;
  const randomDuration = 8 + (index * 3) % 7;
  const randomSize = 16 + (index * 5) % 20;
  const note = musicalNotes[index % musicalNotes.length];

  return (
    <span
      className="absolute text-gold/20 animate-float pointer-events-none select-none"
      style={{
        left: randomLeft,
        bottom: "-20px",
        animationDelay: `${randomDelay}s`,
        animationDuration: `${randomDuration}s`,
        fontSize: `${randomSize}px`,
      }}
    >
      {note}
    </span>
  );
}

export default function HomeHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-main.png"
          alt="Harmonic Learning Studio"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/60 via-transparent to-navy/40" />
      </div>

      {/* Floating musical notes */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <FloatingNote key={i} index={i} />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Enrollments Open for 2026-27
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]"
          >
            Where Musical{" "}
            <span className="gold-shimmer">Excellence</span>{" "}
            Begins
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl"
          >
            Discover your potential at one of the world&apos;s premier music academies. 
            From classical mastery to contemporary innovation, your journey starts here.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Button href="/courses" variant="primary" size="lg">
              Explore Programs
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Book a Trial
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex flex-wrap items-center gap-6"
          >
            <span className="text-white/40 text-sm uppercase tracking-wider">Affiliated with</span>
            <div className="flex items-center gap-4">
              {["Trinity", "ABRSM", "Berklee"].map((name) => (
                <span
                  key={name}
                  className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/60 text-sm font-medium backdrop-blur-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5 text-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
