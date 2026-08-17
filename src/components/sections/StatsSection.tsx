'use client';

import { cn } from '@/lib/utils';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ScrollReveal from '@/components/ui/ScrollReveal';

interface Stat {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface StatsSectionProps {
  stats?: Stat[];
  className?: string;
}

const defaultStats: Stat[] = [
  { end: 2500, suffix: '+', label: 'Students Trained' },
  { end: 45, suffix: '+', label: 'Expert Faculty' },
  { end: 99, suffix: '%', label: 'Success Rate' },
  { end: 10, suffix: '+', label: 'Years of Excellence' },
];

export default function StatsSection({ stats = defaultStats, className }: StatsSectionProps) {
  return (
    <section
      className={cn(
        'relative py-20 md:py-28 bg-navy dark:bg-navy-dark overflow-hidden',
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern opacity-5" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Numbers That Speak
            </h2>
            <div className="h-1 w-16 bg-gold rounded-full mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} direction="up" delay={index * 0.15}>
              <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  label={stat.label}
                  duration={2.5}
                />

                {/* Decorative corner accent */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-2xl" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
