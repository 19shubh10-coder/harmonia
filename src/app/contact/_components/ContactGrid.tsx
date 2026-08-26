"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactForm from "@/components/forms/ContactForm";

const contactInfo = [
  {
    label: "Visit Us",
    value: "19 Vinayagapuram 2nd Street,\nMMDA Colony, Arumbakkam,\nChennai 600106, Tamil Nadu, India",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: "Call Us",
    value: "+91 7906112586",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "Email Us",
    value: "divyanshu@harmoniclearningstudio.com",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Working Hours",
    value: "Mon – Fri: 8:00 AM – 8:00 PM\nSat: 9:00 AM – 5:00 PM\nSun: Closed",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ContactGrid() {
  return (
    <section className="py-24 md:py-32 bg-background dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <ScrollReveal direction="left" className="lg:col-span-3">
            <div className="bg-white dark:bg-dark-surface p-8 md:p-10 rounded-2xl border border-border dark:border-dark-border shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-dark-text mb-2">
                Send Us a Message
              </h2>
              <p className="text-muted dark:text-dark-text/60 mb-8">
                Fill out the form below and our admissions team will get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>
          </ScrollReveal>

          {/* Contact Details */}
          <ScrollReveal direction="right" className="lg:col-span-2">
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-6 bg-white dark:bg-dark-surface rounded-xl border border-border dark:border-dark-border hover:border-gold/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-navy dark:text-dark-text">
                      {info.label}
                    </h3>
                    <p className="mt-1 text-muted dark:text-dark-text/60 text-sm whitespace-pre-line leading-relaxed">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}

              {/* Quick response badge */}
              <div className="p-6 bg-gold/5 rounded-xl border border-gold/20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-navy dark:text-dark-text">
                    Typically responds within 2 hours
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
