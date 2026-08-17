'use client';

import { motion } from 'framer-motion';

interface CourseDetailClientProps {
  curriculum: string[];
}

export default function CourseDetailClient({ curriculum }: CourseDetailClientProps) {
  return (
    <ul className="mt-6 space-y-4 rounded-xl border border-border p-6 dark:border-dark-border bg-surface dark:bg-dark-surface">
      {curriculum.map((topic, topicIndex) => (
        <motion.li
          key={topicIndex}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: topicIndex * 0.05 }}
          className="flex items-start gap-3 py-2 text-muted dark:text-gray-400"
        >
          <svg
            className="mt-1 h-4 w-4 shrink-0 text-gold"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>{topic}</span>
        </motion.li>
      ))}
    </ul>
  );
}
