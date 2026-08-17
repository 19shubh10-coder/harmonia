"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const affiliations = [
  {
    name: "Trinity College London",
    description: "Official examination centre for graded music examinations, theory, and performance diplomas. Our students consistently achieve distinction-level results.",
    type: "Exam Centre",
  },
  {
    name: "ABRSM",
    description: "Registered centre for the Associated Board of the Royal Schools of Music. Full preparation programs for all grades and diploma levels.",
    type: "Registered Centre",
  },
  {
    name: "Rock School of Music",
    description: "Academic partner for contemporary music programs, providing curriculum alignment and pathway opportunities for advanced students.",
    type: "Academic Partner",
  },
];

export default function GlobalAffiliations() {
  return (
    <section className="py-24 md:py-32 bg-background dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Global Affiliations"
          subtitle="Partnering with the world's most prestigious music institutions and examination boards"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {affiliations.map((affiliation, i) => (
            <motion.div
              key={affiliation.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="p-8 rounded-2xl bg-white dark:bg-dark-surface border border-border dark:border-dark-border hover:border-gold/30 hover:shadow-lg transition-all duration-500 h-full">
                <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                  {affiliation.type}
                </span>
                <h3 className="font-heading text-xl font-bold text-navy dark:text-dark-text mb-3 group-hover:text-gold transition-colors duration-300">
                  {affiliation.name}
                </h3>
                <p className="text-muted dark:text-dark-text/60 text-sm leading-relaxed">
                  {affiliation.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
