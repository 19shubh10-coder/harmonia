"use client";

import { motion } from "framer-motion";

export default function MissionVision() {
  return (
    <section className="py-24 md:py-32 bg-surface dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative p-10 rounded-2xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-sm border border-border/50 dark:border-dark-border/50 h-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/5 to-transparent" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-6">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy dark:text-dark-text mb-4">
                  Our Mission
                </h3>
                <p className="text-muted dark:text-dark-text/60 leading-relaxed">
                  To provide exceptional music education that inspires artistic growth, cultivates technical 
                  mastery, and empowers students of all ages and backgrounds to achieve their fullest 
                  musical potential. We believe every individual has a unique musical voice, and our 
                  mission is to help them discover and refine it.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Foster a love of music through engaging, personalized instruction",
                    "Prepare students for international examinations and performance",
                    "Build a diverse, inclusive community of lifelong musicians",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted dark:text-dark-text/60">
                      <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="relative p-10 rounded-2xl bg-white/50 dark:bg-white/[0.03] backdrop-blur-sm border border-border/50 dark:border-dark-border/50 h-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-navy/5 to-transparent dark:from-gold/5" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-6">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-bold text-navy dark:text-dark-text mb-4">
                  Our Vision
                </h3>
                <p className="text-muted dark:text-dark-text/60 leading-relaxed">
                  To be recognized as the world&apos;s premier learning studio — a place where tradition meets 
                  innovation, where every student is empowered to become not just a skilled musician, but 
                  a thoughtful artist who contributes to the cultural fabric of our global community.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Set the global standard for music education excellence",
                    "Bridge classical traditions with contemporary innovation",
                    "Develop artists who inspire and transform communities",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted dark:text-dark-text/60">
                      <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
