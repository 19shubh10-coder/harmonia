"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const achievements = [
  {
    title: "National Young Pianist Award",
    student: "Isabella Chen, Age 16",
    description:
      "First-place winner at the 2025 National Young Pianist Competition, performing Rachmaninoff's Piano Concerto No. 2 with the National Youth Orchestra.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a8.997 8.997 0 01-4.27 1.522m4.27-1.522a7.465 7.465 0 00.981-3.172M9.497 14.25a8.997 8.997 0 004.27-1.522m-4.27 1.522a7.465 7.465 0 01-.981-3.172" />
      </svg>
    ),
  },
  {
    title: "Trinity Distinction Excellence",
    student: "2025 Exam Cohort",
    description:
      "Over 85% of our 2025 Trinity exam candidates achieved Distinction level scores, with 15 students earning the highest marks in their region.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "International String Ensemble",
    student: "Harmonic Chamber Quartet",
    description:
      "Our senior chamber quartet was selected to perform at the Vienna International Youth Music Festival, representing the academy on the world stage.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
      </svg>
    ),
  },
];

export default function StudentAchievements() {
  return (
    <section className="py-24 md:py-32 bg-surface dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Student Achievements"
          subtitle="Celebrating excellence and the remarkable accomplishments of our students"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-white dark:bg-dark-surface border border-border dark:border-dark-border hover:border-gold/30 transition-all duration-500 hover:shadow-xl h-full">
                {/* Gold accent top bar */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-gold to-transparent rounded-b-full" />
                
                <div className="w-14 h-14 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-6">
                  {achievement.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-navy dark:text-dark-text mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gold text-sm font-semibold mb-3">
                  {achievement.student}
                </p>
                <p className="text-muted dark:text-dark-text/60 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
