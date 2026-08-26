"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function MapSection() {
  return (
    <section className="py-24 md:py-32 bg-surface dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy dark:text-dark-text">
              Find Us
            </h2>
            <p className="mt-3 text-muted dark:text-dark-text/60">
              Located in Arumbakkam, Chennai — easily accessible by metro and bus
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border dark:border-dark-border h-[400px] md:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.452089702498!2d80.20968867489356!3d13.069600087269756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266381e09c97d%3A0x23a0064480e1b22f!2sArumbakkam%2C%20Chennai%2C%20Tamil%20Nadu%20600106!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Harmonic Learning Studio Location"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          {/* Directions strip */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                ),
                label: "By Car",
                text: "Located near MMDA Colony main road. Street parking available nearby.",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: "By Metro",
                text: "Arumbakkam Metro Station (Blue Line), 5-minute walk.",
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                ),
                label: "By Bus",
                text: "MTC buses on Anna Nagar Western Extension road. Short walk to studio.",
              },
            ].map((direction, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-white dark:bg-dark-surface rounded-xl border border-border dark:border-dark-border"
              >
                <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  {direction.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-navy dark:text-dark-text">{direction.label}</h4>
                  <p className="text-xs text-muted dark:text-dark-text/60 mt-0.5">{direction.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
