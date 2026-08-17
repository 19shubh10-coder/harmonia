'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type Course } from '@/data/courses';

import React from 'react';

interface CourseCardProps {
  course: Course;
  className?: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Instrumental: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  ),
  Vocal: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.41 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
    </svg>
  ),
  'Music Theory': (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v2H5zm0-4h14v2H5zm0-4h14v2H5z" />
    </svg>
  ),
};

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Advanced: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'All Levels': 'bg-gold/10 text-gold-dark dark:bg-gold/20 dark:text-gold-light',
};

export default function CourseCard({ course, className }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className={cn('group', className)}
    >
      <div className="relative h-full overflow-hidden flex flex-col rounded-2xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark shadow-md hover:shadow-xl hover:border-gold/50 dark:hover:border-gold/30 transition-all duration-500">
        <Link href={`/courses/${course.slug}`} className="absolute inset-0 z-0">
          <span className="sr-only">View {course.title} details</span>
        </Link>
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold text-navy text-xs font-bold rounded-full uppercase tracking-wide">
                {categoryIcons[course.category]}
                {course.category}
              </span>
            </div>

            {/* Level badge */}
            <div className="absolute top-4 right-4">
              <span className={cn('px-2.5 py-1 text-xs font-semibold rounded-full', levelColors[course.level])}>
                {course.level}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-heading font-bold text-navy dark:text-white mb-2 group-hover:text-gold dark:group-hover:text-gold transition-colors duration-300">
              {course.title}
            </h3>

            <p className="text-sm text-muted dark:text-muted-dark line-clamp-2 mb-4">
              {course.description}
            </p>

            {/* Meta info */}
            <div className="flex items-center justify-between pt-4 border-t border-border dark:border-border-dark">
              <div className="flex items-center gap-1.5 text-sm text-muted dark:text-muted-dark">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {course.duration}
              </div>

              <Link 
                href="/contact" 
                className="relative z-10 px-4 py-1.5 bg-gold/10 hover:bg-gold text-gold hover:text-navy rounded-lg text-sm font-semibold transition-colors duration-300"
              >
                Book a Trial
              </Link>
            </div>
          </div>

          {/* Gold accent line on hover */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
    </motion.div>
  );
}
