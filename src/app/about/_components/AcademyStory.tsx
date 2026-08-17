"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const milestones = [
  { year: "2015", title: "Foundation", description: "Divyanshu Vashistha founds Harmonic Learning Studio with a handful of students and a passion for music education." },
  { year: "2017", title: "Trinity Partnership", description: "Became an official Trinity College London examination centre." },
  { year: "2019", title: "ABRSM Recognition", description: "Achieved ABRSM registered centre status and launched the exam preparation program." },
  { year: "2021", title: "Campus Expansion", description: "Expanded to a dedicated campus with multiple practice rooms and a recording studio." },
  { year: "2023", title: "Rock School Affiliation", description: "Established academic partnership with Rock School of Music London for contemporary programs." },
  { year: "2025", title: "A Growing Legacy", description: "Celebrated hundreds of successful students and continued to grow as one of the region's most trusted music institutions." },
];

export default function AcademyStory() {
  return (
    <section className="py-24 md:py-32 bg-background dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <ScrollReveal direction="left">
            <div>
              <span className="text-gold text-sm font-bold uppercase tracking-[0.2em]">
                Our Story
              </span>
              <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-navy dark:text-dark-text">
                A Decade of Musical Excellence
              </h2>
              <div className="mt-6 space-y-4 text-muted dark:text-dark-text/60 leading-relaxed">
                <p>
                  Founded by Divyanshu Vashistha, a distinguished graduate of <strong>KMMC (KM Music
                  Conservatory), Chennai</strong>, Harmonic Learning Studio began as a small studio
                  with a singular vision: to make world-class music education accessible to passionate
                  musicians of every age and background.
                </p>
                <p>
                  What started with just a handful of students and a deep love for rhythm has grown into
                  one of the region&apos;s most respected music institutions, with partnerships with the
                  world&apos;s leading examination boards including Trinity, ABRSM, and Rock School of
                  Music London.
                </p>
                <p>
                  Today, with over <strong>10 years of teaching experience</strong> and having completed
                  all international grades in music, Divyanshu and his team at Harmonic continue to
                  nurture hundreds of students — many of whom have gone on to clear international
                  examinations with distinctions and build fulfilling journeys in music.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal direction="right">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about-classroom.png"
                alt="Harmonic Learning Studio classroom"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
              {/* Floating stat card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-sm rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-heading font-bold text-gold">10+</p>
                    <p className="text-xs text-muted dark:text-dark-text/60">Years of Excellence</p>
                  </div>
                  <div className="h-10 w-px bg-border dark:bg-dark-border" />
                  <div>
                    <p className="text-2xl font-heading font-bold text-gold">2,500+</p>
                    <p className="text-xs text-muted dark:text-dark-text/60">Students Trained</p>
                  </div>
                  <div className="h-10 w-px bg-border dark:bg-dark-border" />
                  <div>
                    <p className="text-2xl font-heading font-bold text-gold">98%</p>
                    <p className="text-xs text-muted dark:text-dark-text/60">Exam Pass Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <ScrollReveal>
            <h3 className="text-center font-heading text-2xl font-bold text-navy dark:text-dark-text mb-12">
              Our Journey
            </h3>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border dark:bg-dark-border hidden md:block" />

            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-4 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white dark:bg-dark-surface p-6 rounded-xl border border-border dark:border-dark-border shadow-sm">
                      <span className="text-gold font-heading font-bold text-lg">{milestone.year}</span>
                      <h4 className="font-heading font-bold text-navy dark:text-dark-text mt-1">
                        {milestone.title}
                      </h4>
                      <p className="text-muted dark:text-dark-text/60 text-sm mt-2">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="w-4 h-4 bg-gold rounded-full border-4 border-background dark:border-dark-surface z-10 shrink-0 hidden md:block" />

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
