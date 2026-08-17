"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="relative py-24 md:py-32 bg-surface dark:bg-dark-bg overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
          <text x="50" y="100" fontSize="200" fill="currentColor" fontFamily="serif" opacity="0.3">♪</text>
          <text x="400" y="300" fontSize="250" fill="currentColor" fontFamily="serif" opacity="0.2">♫</text>
          <text x="600" y="500" fontSize="180" fill="currentColor" fontFamily="serif" opacity="0.3">𝄞</text>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Stay in Tune"
            subtitle="Subscribe to our newsletter for the latest news, event announcements, and musical inspiration"
          />
          <div className="max-w-xl mx-auto">
            <NewsletterForm />
          </div>
          <p className="text-center text-xs text-muted dark:text-dark-text/40 mt-4">
            No spam, ever. Unsubscribe at any time. We respect your privacy.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
