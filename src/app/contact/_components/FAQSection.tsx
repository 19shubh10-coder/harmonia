"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const faqs = [
  {
    question: "What age groups do you accept?",
    answer:
      "We welcome students of all ages, from young beginners aged 4 and up to adult learners at any stage of life. Our programs are tailored to suit the developmental needs and goals of each age group, ensuring everyone receives an engaging and appropriate learning experience.",
  },
  {
    question: "Do I need prior musical experience to enroll?",
    answer:
      "Not at all! We offer programs for complete beginners as well as advanced musicians. During your initial consultation, our faculty will assess your current level and recommend the most suitable program and instructor for your goals.",
  },
  {
    question: "How do I prepare for Trinity or ABRSM exams?",
    answer:
      "We offer dedicated exam preparation programs for both Trinity College London and ABRSM examinations. Our structured approach includes technique coaching, repertoire selection, aural training, sight-reading practice, and regular mock exams. Our 98% pass rate speaks to the effectiveness of our preparation methodology.",
  },
  {
    question: "What instruments do you teach?",
    answer:
      "We offer instruction in a wide range of instruments including piano, violin, viola, cello, guitar (classical, acoustic, and electric), voice, flute, clarinet, drums, and more. We also offer music theory, composition, and ensemble programs. Contact us for our full instrument list.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-surface dark:bg-dark-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy dark:text-dark-text">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-muted dark:text-dark-text/60">
              Quick answers to common questions about Harmonic
            </p>
            <div className="mt-4 h-1 w-20 rounded-full bg-gold mx-auto" />
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-white dark:bg-dark-surface rounded-xl border border-border dark:border-dark-border overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                >
                  <h3 className="font-heading text-base font-bold text-navy dark:text-dark-text pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-muted dark:text-dark-text/60 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
