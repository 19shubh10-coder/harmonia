"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FacultyHighlights() {
  return (
    <section className="py-24 md:py-32 bg-surface dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Meet Our Founder"
          subtitle="Visionary leadership and world-class musical education"
        />

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mt-16">
          {/* Founder Image */}
          <ScrollReveal className="w-full lg:w-1/2">
            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border-4 border-gold/20 shadow-2xl">
              <Image
                src="/images/founder.jpg"
                alt="Founder playing drums"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* Founder Bio */}
          <ScrollReveal delay={0.2} className="w-full lg:w-1/2">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-navy dark:text-white mb-6">
              A Decade of Musical Mastery
            </h3>
            <div className="space-y-6 text-lg text-muted dark:text-muted-dark leading-relaxed">
              <p>
                Our founder <strong>Divyanshu Vashistha</strong> is a distinguished alumnus of the prestigious <strong>KMMC (KM Music Conservatory), Chennai</strong>. With a profound passion for rhythm and melody, he has successfully completed all international grades in music and brings over <strong>10 years of professional teaching experience</strong> to Harmonic Learning Studio.
              </p>
              <p>
                As an expert percussionist and dedicated educator, he has spent the last decade breaking down complex musical concepts into engaging, accessible lessons. His teaching philosophy revolves around not just mastering an instrument, but truly understanding the universal language of music.
              </p>
              <p>
                Under his visionary leadership, Harmonic Learning Studio has flourished into a premier destination for aspiring musicians, offering the perfect blend of rigorous technical foundations and modern, innovative performance techniques.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
