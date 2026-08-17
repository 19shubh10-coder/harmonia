'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface CTABannerProps {
  heading?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export default function CTABanner({
  heading = 'Begin Your Musical Journey Today',
  description = 'Join Harmonic Learning Studio and discover the transformative power of music. Our world-class faculty, state-of-the-art facilities, and nurturing community await you.',
  ctaLabel = 'Apply Now',
  ctaHref = '/admissions',
  secondaryLabel = 'Book a Trial',
  secondaryHref = '/contact',
  className,
}: CTABannerProps) {
  return (
    <section className={cn('relative overflow-hidden py-20 md:py-28', className)}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-accent to-navy-dark" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-pattern opacity-5" />

      {/* Decorative musical elements */}
      <motion.div
        className="absolute -top-10 -right-10 text-gold/10 hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <svg className="w-64 h-64" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute -bottom-8 -left-8 text-gold/8 hidden md:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" opacity="0.1" />
        </svg>
      </motion.div>

      {/* Gradient orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-gold mb-4"
          >
            Take the First Step
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight"
          >
            {heading}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-1 w-20 bg-gold rounded-full mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button href={ctaHref} variant="primary" size="lg">
              {ctaLabel}
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button
                href={secondaryHref}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-navy"
              >
                {secondaryLabel}
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
