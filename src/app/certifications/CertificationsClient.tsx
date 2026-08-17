'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Step {
  step: number;
  title: string;
  description: string;
  icon: ReactNode;
}

interface CertificationsClientProps {
  steps: Step[];
}

export default function CertificationsClient({ steps }: CertificationsClientProps) {
  return (
    <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {/* Connecting line (desktop) */}
      <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-gradient-to-r from-gold/20 via-gold to-gold/20 lg:block" />

      {steps.map((item, index) => (
        <motion.div
          key={item.step}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className="relative flex flex-col items-center text-center"
        >
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-navy shadow-lg shadow-gold/20">
            {item.icon}
          </div>
          <span className="mt-2 text-xs font-bold text-gold">Step {item.step}</span>
          <h3 className="mt-2 font-heading text-xl font-bold text-navy dark:text-dark-text">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted dark:text-gray-400">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
