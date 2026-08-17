import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CertificationsClient from './CertificationsClient';

export const metadata: Metadata = {
  title: 'International Certifications | Harmonic Learning Studio',
  description:
    'Prepare for globally recognized music examinations including Trinity College London, ABRSM, Rockschool, and London College of Music with expert guidance at Harmonic Learning Studio.',
};

const certificationPartners = [
  {
    name: 'Trinity College London',
    shortName: 'Trinity',
    description:
      'Trinity College London is one of the most prestigious international exam boards, offering graded examinations in music performance, theory, and professional diplomas. Our academy is an official Trinity preparation centre with a 98% pass rate.',
    highlights: ['Graded Exams (Initial–Grade 8)', 'Theory Exams (Grade 1–8)', 'Diplomas (ATCL, LTCL, FTCL)'],
    color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600',
    link: '#',
  },
  {
    name: 'ABRSM',
    shortName: 'ABRSM',
    description:
      'The Associated Board of the Royal Schools of Music is the UK\'s largest music education body. Their exams are recognized worldwide and set the standard for music education excellence. We prepare students for all ABRSM practical and theory exams.',
    highlights: ['Performance Grades (1–8)', 'Music Theory (1–8)', 'Practical Musicianship'],
    color: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    iconColor: 'text-red-600',
    link: '#',
  },
  {
    name: 'Rockschool',
    shortName: 'RSL',
    description:
      'Rockschool (RSL Awards) specializes in contemporary music examinations covering rock, pop, jazz, and electronic genres. Perfect for students interested in modern music styles with internationally recognized qualifications.',
    highlights: ['Graded Exams (Debut–Grade 8)', 'Performance Certificates', 'Music Production Grades'],
    color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    iconColor: 'text-purple-600',
    link: '#',
  },
  {
    name: 'London College of Music',
    shortName: 'LCM',
    description:
      'The London College of Music Examinations (LCME) under the University of West London offers a comprehensive suite of graded and diploma examinations in music performance, theory, and composition.',
    highlights: ['Graded Exams (Step 1–Grade 8)', 'Theory & Composition', 'Teaching Diplomas'],
    color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    iconColor: 'text-green-600',
    link: '#',
  },
];

const gradeExams = [
  { grade: 'Initial', description: 'Introduction to performance with simple pieces and basic techniques. Ideal for absolute beginners.' },
  { grade: 'Grade 1', description: 'Foundation level with simple melodies, basic scales, and introductory sight-reading.' },
  { grade: 'Grade 2', description: 'Building on fundamentals with slightly more complex pieces, additional scales, and aural tests.' },
  { grade: 'Grade 3', description: 'Developing musicality with expressive pieces, extended scales, and improved sight-reading.' },
  { grade: 'Grade 4', description: 'Intermediate level requiring greater technical control, musical interpretation, and aural skills.' },
  { grade: 'Grade 5', description: 'A pivotal grade often required before advancing to higher grades. Solid technique and theory knowledge expected.' },
  { grade: 'Grade 6', description: 'Advanced intermediate requiring sophisticated interpretation, complex rhythms, and advanced scales.' },
  { grade: 'Grade 7', description: 'Pre-professional standard with demanding repertoire, advanced technique, and mature musical expression.' },
  { grade: 'Grade 8', description: 'The highest graded exam level, requiring professional-level performance, comprehensive musicianship, and artistic maturity.' },
];

const theoryExams = [
  { level: 'Grades 1–3', description: 'Music notation, basic time signatures, key signatures, intervals, and simple harmony fundamentals.' },
  { level: 'Grade 4', description: 'Ornaments, writing for voices, keys with up to 5 sharps/flats, and basic musical forms.' },
  { level: 'Grade 5', description: 'A crucial milestone — required for higher practical grades. Covers all major/minor keys, four-part harmony, transposition, and score reading.' },
  { level: 'Grades 6–8', description: 'Advanced harmony, counterpoint, composition, orchestration basics, and detailed score analysis.' },
];

const diplomaPathways = [
  {
    name: 'ATCL',
    fullName: 'Associate of Trinity College London',
    description: 'The first diploma level, equivalent to the first year of an undergraduate degree in music. Requires a 25-minute recital programme demonstrating artistic interpretation and advanced technical command. Candidates must show musical maturity beyond Grade 8 standard.',
    prerequisites: 'Grade 8 pass (or equivalent standard)',
    recitalLength: '25 minutes',
  },
  {
    name: 'LTCL',
    fullName: 'Licentiate of Trinity College London',
    description: 'Equivalent to a Bachelor\'s degree in music performance. Requires a 35-minute recital programme showcasing a broad range of styles and periods. Candidates must demonstrate professional-level musicianship, technical mastery, and artistic individuality.',
    prerequisites: 'ATCL or equivalent standard',
    recitalLength: '35 minutes',
  },
  {
    name: 'FTCL',
    fullName: 'Fellow of Trinity College London',
    description: 'The highest performance diploma, equivalent to a postgraduate degree. Requires a full 50-minute recital of the highest artistic and technical standard. Only exceptional musicians achieve this prestigious qualification, which is recognized internationally as a mark of the highest musical achievement.',
    prerequisites: 'LTCL or equivalent standard',
    recitalLength: '50 minutes',
  },
];

const examSchedule = [
  { exam: 'Trinity Practical (Session 1)', registrationDeadline: 'June 30, 2026', examDate: 'August 15–25, 2026', status: 'Open' },
  { exam: 'ABRSM Theory Online', registrationDeadline: 'July 15, 2026', examDate: 'August–October 2026', status: 'Open' },
  { exam: 'Trinity Theory (Grade 1–5)', registrationDeadline: 'July 31, 2026', examDate: 'September 10, 2026', status: 'Open' },
  { exam: 'Rockschool (All Grades)', registrationDeadline: 'August 15, 2026', examDate: 'September 20–30, 2026', status: 'Coming Soon' },
  { exam: 'Trinity Practical (Session 2)', registrationDeadline: 'September 30, 2026', examDate: 'November 10–20, 2026', status: 'Coming Soon' },
  { exam: 'ABRSM Practical', registrationDeadline: 'October 15, 2026', examDate: 'December 5–15, 2026', status: 'Coming Soon' },
];

const syllabusDownloads = [
  { instrument: 'Piano', icon: '🎹', grades: 'Initial – Grade 8 + Diplomas', slug: 'piano' },
  { instrument: 'Violin', icon: '🎻', grades: 'Initial – Grade 8 + Diplomas', slug: 'violin' },
  { instrument: 'Guitar (Classical)', icon: '🎸', grades: 'Initial – Grade 8', slug: 'guitar-classical' },
  { instrument: 'Singing', icon: '🎤', grades: 'Initial – Grade 8 + Diplomas', slug: 'singing' },
  { instrument: 'Drums', icon: '🥁', grades: 'Debut – Grade 8 (Rockschool)', slug: 'drums' },
  { instrument: 'Music Theory', icon: '📖', grades: 'Grade 1 – Grade 8', slug: 'music-theory' },
  { instrument: 'Flute', icon: '🎵', grades: 'Initial – Grade 8', slug: 'flute' },
  { instrument: 'Keyboard (Electronic)', icon: '🎹', grades: 'Initial – Grade 8', slug: 'keyboard-electronic' },
];

const preparationSteps = [
  {
    step: 1,
    title: 'Assessment',
    description: 'We evaluate your current level through a detailed diagnostic assessment covering technique, theory knowledge, and musical understanding.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    step: 2,
    title: 'Personalized Plan',
    description: 'Based on your assessment, we create a tailored preparation plan with specific repertoire selection, technical goals, and a realistic timeline.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: 'Rigorous Practice',
    description: 'Structured weekly lessons with focused practice assignments, regular progress check-ins, and technique-specific exercises aligned with exam requirements.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: 4,
    title: 'Mock Exams',
    description: 'Realistic mock examinations with external assessors simulate the actual exam experience, reducing anxiety and building confidence for the big day.',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
];

const successStories = [
  {
    name: 'Anisha Patel',
    achievement: 'Trinity Grade 8 Piano — Distinction',
    story: 'Starting from Grade 3, Anisha progressed through five grades in just four years under Dr. Petrova\'s guidance. Her Grade 8 recital earned a remarkable 92/100, placing her among the top scorers in the region. She is now preparing for her ATCL diploma.',
    image: '/images/faculty-1.png',
  },
  {
    name: 'Rohan Deshmukh',
    achievement: 'ABRSM Grade 7 Violin — Merit',
    story: 'Rohan began his violin journey at age 7 and has grown into a confident performer. His ABRSM Grade 7 performance was praised by examiners for its exceptional tone quality and musical sensitivity. He is a key member of the Harmonic String Ensemble.',
    image: '/images/faculty-2.png',
  },
  {
    name: 'Kavya Sharma',
    achievement: 'ATCL Diploma in Singing — Distinction',
    story: 'Kavya\'s extraordinary vocal talent, nurtured by Sarah Williams over six years, culminated in an ATCL diploma with distinction. Her 25-minute recital spanning art songs to musical theatre left examiners spellbound. She is now pursuing a career in vocal performance.',
    image: '/images/faculty-4.png',
  },
];

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden min-h-[60vh]">
        <Image
          src="/images/piano-closeup.png"
          alt="International Certifications"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              International Certifications
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
              Prepare for globally recognized music examinations with expert guidance
            </p>
            <div className="mt-8 h-1 w-20 rounded-full bg-gold" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-dark-bg" />
      </section>

      {/* Certification Partners */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl dark:text-dark-text">
            Our Certification Partners
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted dark:text-gray-400">
            We are an authorized preparation centre for the world&apos;s leading music examination boards
          </p>
          <div className="mt-6 mx-auto h-1 w-20 rounded-full bg-gold" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {certificationPartners.map((partner) => (
            <div
              key={partner.name}
              className={`rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg ${partner.color}`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white text-2xl font-bold shadow-sm dark:bg-dark-bg ${partner.iconColor}`}>
                  {partner.shortName}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-navy dark:text-dark-text">
                    {partner.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted dark:text-gray-400">
                    {partner.description}
                  </p>
                  <ul className="mt-4 space-y-1">
                    {partner.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-navy dark:text-dark-text">
                        <svg className="h-4 w-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grade Exams */}
      <section className="bg-surface py-20 dark:bg-dark-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl dark:text-dark-text">
              Graded Examinations
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted dark:text-gray-400">
              A structured progression from beginner to advanced performance standards
            </p>
            <div className="mt-6 mx-auto h-1 w-20 rounded-full bg-gold" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gradeExams.map((exam, index) => (
              <div
                key={exam.grade}
                className="group rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:shadow-md hover:border-gold/50 dark:border-dark-border dark:bg-dark-bg"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-sm font-bold text-gold group-hover:bg-gold group-hover:text-navy transition-colors">
                    {index === 0 ? 'IN' : index}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-navy dark:text-dark-text">
                    {exam.grade}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted dark:text-gray-400">
                  {exam.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Theory Exams */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl dark:text-dark-text">
            Music Theory Examinations
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted dark:text-gray-400">
            Build the intellectual foundation that elevates your musical understanding
          </p>
          <div className="mt-6 mx-auto h-1 w-20 rounded-full bg-gold" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {theoryExams.map((exam) => (
            <div
              key={exam.level}
              className="rounded-xl border border-border bg-white p-6 shadow-sm dark:border-dark-border dark:bg-dark-surface"
            >
              <h3 className="flex items-center gap-3 font-heading text-xl font-bold text-navy dark:text-dark-text">
                <svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {exam.level}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted dark:text-gray-400">
                {exam.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Diploma Pathways */}
      <section className="bg-navy py-20 dark:bg-dark-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Diploma Pathways
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-white/75">
              Achieve internationally recognized professional qualifications
            </p>
            <div className="mt-6 mx-auto h-1 w-20 rounded-full bg-gold" />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {diplomaPathways.map((diploma, index) => (
              <div
                key={diploma.name}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
              >
                {index === 2 && (
                  <span className="absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">
                    Highest Level
                  </span>
                )}
                <h3 className="font-heading text-3xl font-bold text-gold">{diploma.name}</h3>
                <p className="mt-1 text-sm text-white/60">{diploma.fullName}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/80">{diploma.description}</p>
                <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Prerequisites</span>
                    <span className="text-white font-medium">{diploma.prerequisites}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Recital Length</span>
                    <span className="text-white font-medium">{diploma.recitalLength}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual progression arrow */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <span className="rounded-full bg-gold/20 px-4 py-2 text-sm font-semibold text-gold">Grade 8</span>
            <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="rounded-full bg-gold/20 px-4 py-2 text-sm font-semibold text-gold">ATCL</span>
            <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="rounded-full bg-gold/20 px-4 py-2 text-sm font-semibold text-gold">LTCL</span>
            <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="rounded-full bg-gold px-4 py-2 text-sm font-bold text-navy">FTCL</span>
          </div>
        </div>
      </section>

      {/* Exam Schedule */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl dark:text-dark-text">
            Upcoming Exam Schedule
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted dark:text-gray-400">
            Plan ahead and register early to secure your preferred exam date
          </p>
          <div className="mt-6 mx-auto h-1 w-20 rounded-full bg-gold" />
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-border dark:border-dark-border">
          <table className="w-full">
            <thead>
              <tr className="bg-navy text-white">
                <th className="px-6 py-4 text-left text-sm font-semibold">Examination</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Registration Deadline</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Exam Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-dark-border">
              {examSchedule.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white transition-colors hover:bg-surface dark:bg-dark-bg dark:hover:bg-dark-surface"
                >
                  <td className="px-6 py-4 text-sm font-medium text-navy dark:text-dark-text">
                    {item.exam}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted dark:text-gray-400">
                    {item.registrationDeadline}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted dark:text-gray-400">
                    {item.examDate}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === 'Open'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {examSchedule.map((item, index) => (
            <div key={index} className="rounded-xl border border-border bg-white p-4 dark:border-dark-border dark:bg-dark-surface">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-semibold text-navy dark:text-dark-text">{item.exam}</h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    item.status === 'Open'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="mt-2 space-y-1 text-xs text-muted dark:text-gray-400">
                <p>Deadline: {item.registrationDeadline}</p>
                <p>Exam: {item.examDate}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Syllabus Downloads */}
      <section className="bg-surface py-20 dark:bg-dark-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl dark:text-dark-text">
              Syllabus Downloads
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted dark:text-gray-400">
              Access exam syllabi for your instrument and start preparing today
            </p>
            <div className="mt-6 mx-auto h-1 w-20 rounded-full bg-gold" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {syllabusDownloads.map((item) => (
              <a
                key={item.instrument}
                href={`/api/syllabus/${item.slug}`}
                download
                className="group flex items-center gap-4 rounded-xl border border-border bg-white p-5 transition-all duration-300 hover:shadow-md hover:border-gold/50 dark:border-dark-border dark:bg-dark-bg dark:hover:border-gold/50"
              >
                <span className="text-3xl">{item.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-navy dark:text-dark-text group-hover:text-gold transition-colors">
                    {item.instrument}
                  </h3>
                  <p className="text-xs text-muted dark:text-gray-400">{item.grades}</p>
                </div>
                <svg
                  className="h-5 w-5 text-muted transition-colors group-hover:text-gold dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Methodology */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl dark:text-dark-text">
            Our Exam Preparation Methodology
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted dark:text-gray-400">
            A proven four-step approach that has helped hundreds of students achieve exam success
          </p>
          <div className="mt-6 mx-auto h-1 w-20 rounded-full bg-gold" />
        </div>

        <CertificationsClient steps={preparationSteps} />
      </section>

      {/* Success Stories */}
      <section className="bg-surface py-20 dark:bg-dark-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl dark:text-dark-text">
              Student Success Stories
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted dark:text-gray-400">
              Our students consistently achieve outstanding results in international examinations
            </p>
            <div className="mt-6 mx-auto h-1 w-20 rounded-full bg-gold" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {successStories.map((story) => (
              <div
                key={story.name}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-dark-border dark:bg-dark-bg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <Image src={story.image} alt={story.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy dark:text-dark-text">
                      {story.name}
                    </h3>
                    <p className="text-sm font-medium text-gold">{story.achievement}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted dark:text-gray-400">
                  {story.story}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: '98%', label: 'Pass Rate' },
              { value: '75%', label: 'Distinction Rate' },
              { value: '500+', label: 'Exams Conducted' },
              { value: '50+', label: 'Diploma Graduates' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl font-bold text-gold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-navy py-20 dark:bg-dark-surface">
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold/10" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gold/5" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Begin Your Certification Journey
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
            Schedule a free assessment to determine your current level and create a personalized exam preparation plan
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-gold px-8 py-3 text-base font-semibold text-navy transition-all duration-300 hover:bg-white hover:shadow-lg"
            >
              Book Free Assessment
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:border-gold hover:text-gold"
            >
              View Our Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
