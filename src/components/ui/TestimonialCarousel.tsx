'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type Testimonial } from '@/data/testimonials';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
  className?: string;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={cn('w-5 h-5', filled ? 'text-gold' : 'text-border dark:text-border-dark')}
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const QuoteIcon = () => (
  <svg
    className="w-12 h-12 text-gold/20 dark:text-gold/10"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function TestimonialCarousel({
  testimonials,
  autoPlayInterval = 6000,
  className,
}: TestimonialCarouselProps) {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      const nextIndex =
        (currentIndex + newDirection + testimonials.length) % testimonials.length;
      setCurrentIndex([nextIndex, newDirection]);
    },
    [currentIndex, testimonials.length]
  );

  const goToSlide = useCallback(
    (index: number) => {
      const dir = index > currentIndex ? 1 : -1;
      setCurrentIndex([index, dir]);
    },
    [currentIndex]
  );

  // Auto-play
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const interval = setInterval(() => paginate(1), autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPaused, paginate, autoPlayInterval, testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <div
      className={cn('relative w-full max-w-4xl mx-auto', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main testimonial card */}
      <div className="relative overflow-hidden rounded-2xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark shadow-lg min-h-[320px] md:min-h-[280px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="p-8 md:p-12"
          >
            {/* Quote icon */}
            <div className="mb-4">
              <QuoteIcon />
            </div>

            {/* Quote text */}
            <blockquote className="text-lg md:text-xl leading-relaxed text-text-primary dark:text-text-dark-primary mb-8 italic">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author info */}
            <div className="flex items-center gap-4">

              <div className="flex-1 min-w-0">
                <div className="font-heading font-bold text-navy dark:text-white">
                  {current.studentName}
                </div>
                <div className="text-sm text-muted dark:text-muted-dark">
                  {current.course}
                </div>
                {/* Star rating */}
                <div className="flex gap-0.5 mt-1" aria-label={`${current.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < current.rating} />
                  ))}
                </div>
              </div>
              {current.achievement && (
                <div className="hidden md:block text-right">
                  <span className="inline-block px-3 py-1 bg-gold/10 text-gold dark:text-gold-light text-xs font-semibold rounded-full">
                    {current.achievement}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {testimonials.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-surface dark:bg-surface-dark border border-border dark:border-border-dark shadow-md flex items-center justify-center text-navy dark:text-white hover:bg-gold hover:text-navy hover:border-gold transition-all duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-surface dark:bg-surface-dark border border-border dark:border-border-dark shadow-md flex items-center justify-center text-navy dark:text-white hover:bg-gold hover:text-navy hover:border-gold transition-all duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon />
          </button>
        </>
      )}

      {/* Dots */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-2 mt-6" role="tablist">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'w-8 bg-gold'
                  : 'w-2 bg-border dark:bg-border-dark hover:bg-gold/50'
              )}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
