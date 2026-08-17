'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type AcademyEvent } from '@/data/events';
import { getDateParts } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface EventCardProps {
  event: AcademyEvent;
  className?: string;
}

const categoryColors: Record<string, string> = {
  Concert: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Masterclass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Workshop: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Competition: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'Open Day': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  Festival: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
};

export default function EventCard({ event, className }: EventCardProps) {
  const { month, day } = getDateParts(event.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className={cn('group', className)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />

          {/* Date badge */}
          <div className="absolute top-4 left-4 bg-white dark:bg-surface-dark rounded-xl overflow-hidden shadow-lg text-center w-16">
            <div className="bg-gold text-navy text-xs font-bold uppercase py-1 px-2">
              {month}
            </div>
            <div className="text-2xl font-heading font-bold text-navy dark:text-white py-1">
              {day}
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <span className={cn('px-3 py-1 text-xs font-semibold rounded-full', categoryColors[event.category] || 'bg-gray-100 text-gray-700')}>
              {event.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-heading font-bold text-navy dark:text-white mb-2 group-hover:text-gold dark:group-hover:text-gold transition-colors duration-300">
            {event.title}
          </h3>

          {/* Venue & Time */}
          <div className="flex flex-col gap-1.5 mb-3">
            <div className="flex items-center gap-2 text-sm text-muted dark:text-muted-dark">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
              </svg>
              <span className="truncate">{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted dark:text-muted-dark">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{event.time}</span>
            </div>
          </div>

          <p className="text-sm text-muted dark:text-muted-dark line-clamp-2 mb-4 flex-1">
            {event.description}
          </p>

          <Button href={event.registrationLink} variant="outline" size="sm" className="w-full">
            Register Now
          </Button>
        </div>

        {/* Gold accent line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  );
}
