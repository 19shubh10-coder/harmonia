"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";


/* ------------------------------------------------------------------ */
/*  Gallery Data                                                       */
/* ------------------------------------------------------------------ */

type GalleryCategory =
  | "All"
  | "Performances"
  | "Classrooms"
  | "Student Showcases"
  | "Campus"
  | "Events";

interface GalleryItem {
  id: number;
  title: string;
  category: GalleryCategory;
  image: string;
  description: string;
  aspectRatio: "portrait" | "landscape" | "square";
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Annual Concert 2024",
    category: "Performances",
    image: "/images/events-concert.png",
    description:
      "Our flagship annual concert showcasing the best of Harmonic's talented students performing classical and contemporary pieces.",
    aspectRatio: "landscape",
  },
  {
    id: 2,
    title: "Piano Masterclass",
    category: "Classrooms",
    image: "/images/piano-closeup.png",
    description:
      "An intimate masterclass session with our senior piano faculty, exploring advanced techniques and musical interpretation.",
    aspectRatio: "portrait",
  },
  {
    id: 3,
    title: "String Ensemble Recital",
    category: "Performances",
    image: "/images/violin-sheet.png",
    description:
      "The Harmonic String Ensemble delivers a mesmerizing performance of Vivaldi's Four Seasons at the Spring Recital.",
    aspectRatio: "square",
  },
  {
    id: 4,
    title: "Trinity Exam Success",
    category: "Student Showcases",
    image: "/images/faculty-1.png",
    description:
      "Celebrating our students who achieved distinction in the Trinity College London examinations this year.",
    aspectRatio: "portrait",
  },
  {
    id: 5,
    title: "Violin Studio",
    category: "Classrooms",
    image: "/images/about-classroom.png",
    description:
      "Our state-of-the-art violin studio equipped with professional-grade acoustics and recording capabilities.",
    aspectRatio: "landscape",
  },
  {
    id: 6,
    title: "Piano Competition Finals",
    category: "Performances",
    image: "/images/hero-main.png",
    description:
      "The thrilling finals of the inter-academy piano competition, featuring performances from prodigious young pianists.",
    aspectRatio: "portrait",
  },
  {
    id: 7,
    title: "Summer Camp 2024",
    category: "Student Showcases",
    image: "/images/faculty-2.png",
    description:
      "Highlights from our intensive Summer Music Camp where students immersed themselves in two weeks of collaborative music-making.",
    aspectRatio: "square",
  },
  {
    id: 8,
    title: "Music Theory Class",
    category: "Classrooms",
    image: "/images/faculty-3.png",
    description:
      "Engaging music theory sessions that build a strong foundation in harmony, counterpoint, and musical analysis.",
    aspectRatio: "landscape",
  },
  {
    id: 9,
    title: "Choir Performance",
    category: "Performances",
    image: "/images/events-concert.png",
    description:
      "The Harmonic Youth Choir performing a powerful rendition of Mozart's Requiem at the Cathedral Concert Hall.",
    aspectRatio: "portrait",
  },
  {
    id: 10,
    title: "Student Recital",
    category: "Student Showcases",
    image: "/images/piano-closeup.png",
    description:
      "Monthly student recitals provide a supportive environment for performers to share their progress and artistry.",
    aspectRatio: "landscape",
  },
  {
    id: 11,
    title: "Recording Studio",
    category: "Classrooms",
    image: "/images/faculty-4.png",
    description:
      "Our professional recording studio where students learn production techniques and create their first recordings.",
    aspectRatio: "square",
  },
  {
    id: 12,
    title: "Campus Gardens",
    category: "Campus",
    image: "/images/hero-main.png",
    description:
      "The beautiful campus gardens where students often gather for informal jam sessions and outdoor rehearsals.",
    aspectRatio: "landscape",
  },
  {
    id: 13,
    title: "Gala Night 2024",
    category: "Events",
    image: "/images/events-concert.png",
    description:
      "An unforgettable evening of music and celebration at our annual Gala Night fundraiser.",
    aspectRatio: "portrait",
  },
  {
    id: 14,
    title: "Main Auditorium",
    category: "Campus",
    image: "/images/about-classroom.png",
    description:
      "The 500-seat main auditorium with world-class acoustics, hosting performances throughout the year.",
    aspectRatio: "landscape",
  },
  {
    id: 15,
    title: "Workshop Series",
    category: "Events",
    image: "/images/violin-sheet.png",
    description:
      "Guest artist workshop series bringing world-renowned musicians to share their expertise with our students.",
    aspectRatio: "square",
  },
];

const categories: GalleryCategory[] = [
  "All",
  "Performances",
  "Classrooms",
  "Student Showcases",
  "Campus",
  "Events",
];

/* ------------------------------------------------------------------ */
/*  Lightbox Component                                                 */
/* ------------------------------------------------------------------ */

function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-8"
        aria-label="Previous image"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image */}
      <motion.div
        key={item.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative mx-16 max-h-[85vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
        <div className="mt-4 text-center">
          <span className="mb-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-sm font-medium text-gold">
            {item.category}
          </span>
          <h3 className="font-heading text-2xl font-bold text-white">{item.title}</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">{item.description}</p>
        </div>
      </motion.div>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-8"
        aria-label="Next image"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery Page                                                       */
/* ------------------------------------------------------------------ */

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
    );
  }, [filteredItems.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : null
    );
  }, [filteredItems.length]);

  return (
    <>
      <main className="min-h-screen bg-background dark:bg-dark-bg">
        {/* Hero */}
        <HeroSection
          title="Gallery"
          subtitle="Capturing moments of musical excellence"
          backgroundImage="/images/events-concert.png"
        />

        {/* Category Filter */}
        <section className="border-b border-border bg-surface py-6 dark:border-dark-border dark:bg-dark-surface">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gold text-white shadow-lg shadow-gold/25"
                      : "bg-white text-navy hover:bg-gold/10 hover:text-gold dark:bg-dark-surface dark:text-dark-text dark:hover:bg-gold/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Masonry Gallery */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Our Visual Journey"
                subtitle="Explore the vibrant life at Harmonic Learning Studio through our curated collection of photographs"
              />
            </ScrollReveal>

            <motion.div
              layout
              className="mt-12 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative cursor-pointer break-inside-avoid overflow-hidden rounded-xl"
                    onClick={() => openLightbox(index)}
                  >
                    <div
                      className={`relative w-full overflow-hidden ${
                        item.aspectRatio === "portrait"
                          ? "aspect-[3/4]"
                          : item.aspectRatio === "square"
                          ? "aspect-square"
                          : "aspect-video"
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Category badge */}
                      <span className="absolute top-4 left-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        {item.category}
                      </span>

                      {/* Title overlay */}
                      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <h3 className="font-heading text-lg font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-white/80 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-gold">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          <span className="text-xs font-medium">View Full Size</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center"
              >
                <p className="text-lg text-muted">
                  No images found in this category.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Video Section */}
        <section className="bg-surface py-16 dark:bg-dark-surface md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Featured Videos"
                subtitle="Watch performances, masterclasses, and behind-the-scenes moments from our academy"
              />
            </ScrollReveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Annual Concert 2024 Highlights",
                  duration: "12:34",
                  thumbnail: "/images/events-concert.png",
                  description:
                    "Relive the magic of our Annual Concert featuring performances from over 100 talented students.",
                },
                {
                  title: "Piano Masterclass with Prof. Ivanova",
                  duration: "45:20",
                  thumbnail: "/images/piano-closeup.png",
                  description:
                    "An exclusive masterclass on Chopin's Ballades with internationally acclaimed pianist Prof. Elena Ivanova.",
                },
                {
                  title: "A Day at Harmonic",
                  duration: "8:15",
                  thumbnail: "/images/about-classroom.png",
                  description:
                    "Experience a typical day at Harmonic Learning Studio — from morning practice sessions to evening performances.",
                },
              ].map((video, index) => (
                <ScrollReveal key={video.title} delay={index * 0.15}>
                  <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-dark-surface">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
                          <svg className="ml-1 h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {/* Duration badge */}
                      <span className="absolute right-3 bottom-3 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">
                        {video.duration}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading text-lg font-bold text-navy dark:text-dark-text">
                        {video.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy py-16 dark:bg-navy/90 md:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                Want to Be Part of Our Story?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
                Join Harmonic Learning Studio and create your own musical memories. Enroll today and start your journey.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="/admissions"
                  className="inline-flex items-center rounded-lg bg-gold px-8 py-3 font-semibold text-white shadow-lg shadow-gold/25 transition-all hover:bg-gold/90 hover:shadow-xl"
                >
                  Apply Now
                  <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                >
                  Contact Us
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && filteredItems[lightboxIndex] && (
            <Lightbox
              item={filteredItems[lightboxIndex]}
              onClose={closeLightbox}
              onPrev={goToPrev}
              onNext={goToNext}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
