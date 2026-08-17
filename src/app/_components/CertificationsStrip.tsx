"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const certifications = [
  {
    name: "Trinity College London",
    description: "Graded examinations in music performance and theory",
    tag: "Official Exam Centre",
  },
  {
    name: "ABRSM",
    description: "Associated Board of the Royal Schools of Music",
    tag: "Registered Centre",
  },
  {
    name: "Rock School of Music London",
    description: "Affiliated partner for contemporary music programs",
    tag: "Academic Partner",
  },
];

export default function CertificationsStrip() {
  return (
    <Link href="/certifications" className="block">
    <section className="py-20 md:py-28 bg-navy relative overflow-hidden cursor-pointer">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(201,168,76,0.3) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="text-gold text-sm font-bold uppercase tracking-[0.2em]">
              Globally Recognized
            </span>
            <h2 className="mt-4 font-heading text-3xl md:text-4xl font-bold text-white">
              International Certifications & Affiliations
            </h2>
            <p className="mt-4 text-white/50 max-w-2xl mx-auto">
              Our students have access to the world&apos;s most prestigious music examination boards
              and educational institutions
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all duration-500 text-center"
            >
              <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-wider rounded-full mb-4">
                {cert.tag}
              </span>
              <h3 className="font-heading text-lg font-bold text-white mb-2">
                {cert.name}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </Link>
  );
}
