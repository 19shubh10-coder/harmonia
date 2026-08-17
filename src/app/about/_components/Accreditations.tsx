"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const accreditations = [
  {
    name: "Trinity College London – Registered Exam Centre",
    description: "Authorized to administer all graded music examinations and diplomas.",
  },
  {
    name: "ABRSM – Registered Exam Centre",
    description: "Full preparation and examination services for all ABRSM grades.",
  },
  {
    name: "International Association of Music Educators (IAME)",
    description: "Active institutional member, committed to global best practices in music pedagogy.",
  },
  {
    name: "National Accreditation Board for Music Schools",
    description: "Fully accredited institution meeting all national standards for music education.",
  },
  {
    name: "Berklee College of Music – Affiliated Institution",
    description: "Academic partnership enabling curriculum alignment and student exchange opportunities.",
  },
  {
    name: "Royal Schools of Music – Quality Assured Partner",
    description: "Recognized for excellence in music teaching standards and student outcomes.",
  },
];

export default function Accreditations() {
  return (
    <section className="py-24 md:py-32 bg-background dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Accreditations & Recognition"
          subtitle="Our commitment to excellence is validated by the world's leading music organizations"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accreditations.map((acc, i) => (
            <motion.div
              key={acc.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-dark-surface border border-border dark:border-dark-border hover:border-gold/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-navy dark:text-dark-text">
                    {acc.name}
                  </h3>
                  <p className="mt-1 text-muted dark:text-dark-text/60 text-sm">
                    {acc.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
