"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const socialLinks = [
  {
    name: "Instagram",
    handle: "@harmonic.learning",
    href: "https://www.instagram.com/harmonic.learning/",
    color: "hover:bg-[#E4405F] hover:border-[#E4405F]",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function SocialMedia() {
  return (
    <section className="py-24 md:py-32 bg-background dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy dark:text-dark-text">
              Connect With Us
            </h2>
            <p className="mt-3 text-muted dark:text-dark-text/60">
              Follow us on Instagram for daily inspiration, student performances, and behind-the-scenes content
            </p>
            <div className="mt-4 h-1 w-20 rounded-full bg-gold mx-auto" />
          </div>
        </ScrollReveal>

        <div className="flex justify-center">
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`group flex flex-col items-center gap-3 p-8 rounded-2xl bg-white dark:bg-dark-surface border border-border dark:border-dark-border hover:text-white transition-all duration-300 ${social.color}`}
            >
              <div className="text-navy dark:text-dark-text group-hover:text-white transition-colors">
                {social.icon}
              </div>
              <div className="text-center">
                <p className="font-bold text-sm text-navy dark:text-dark-text group-hover:text-white transition-colors">
                  {social.name}
                </p>
                <p className="text-xs text-muted dark:text-dark-text/60 group-hover:text-white/70 transition-colors">
                  {social.handle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
