import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { courses } from '@/data/courses';
import Breadcrumb from '@/components/layout/Breadcrumb';
import CourseDetailClient from './CourseDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return { title: 'Course Not Found' };
  }

  return {
    title: `${course.title} | Harmonic Learning Studio`,
    description: course.description.slice(0, 160),
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  const relatedCourses = courses
    .filter((c) => c.category === course.category && c.slug !== course.slug)
    .slice(0, 3);

  // If not enough related courses in same category, add from other categories
  if (relatedCourses.length < 3) {
    const additionalCourses = courses
      .filter((c) => c.slug !== course.slug && !relatedCourses.find((r) => r.slug === c.slug))
      .slice(0, 3 - relatedCourses.length);
    relatedCourses.push(...additionalCourses);
  }

  return (
    <main className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden min-h-[50vh]">
        <Image
          src={course.image}
          alt={course.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Courses', href: '/courses' },
              { label: course.title },
            ]}
          />

          <div className="mt-4 flex items-center gap-4">
            <div>
              <span className="rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-navy">
                {course.category}
              </span>
              <h1 className="mt-2 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                {course.title}
              </h1>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {course.duration}
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {course.level}
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-5 w-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {course.instructor}
            </span>
          </div>

          <div className="mt-6 h-1 w-20 rounded-full bg-gold" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-dark-bg" />
      </section>

      {/* Course Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-dark-text">
                About This Program
              </h2>
              <div className="mt-1 h-1 w-12 rounded-full bg-gold" />
              <p className="mt-6 text-lg leading-relaxed text-muted dark:text-gray-400">
                {course.description}
              </p>
            </div>

            {/* Curriculum - Interactive Accordion */}
            <div className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-dark-text">
                Curriculum
              </h2>
              <div className="mt-1 h-1 w-12 rounded-full bg-gold" />

              <CourseDetailClient curriculum={course.curriculum} />
            </div>

            {/* Instructor */}
            <div className="mb-12">
              <h2 className="font-heading text-2xl font-bold text-navy dark:text-dark-text">
                Your Instructor
              </h2>
              <div className="mt-1 h-1 w-12 rounded-full bg-gold" />

              <div className="mt-6 rounded-2xl border border-border bg-surface p-6 dark:border-dark-border dark:bg-dark-surface">
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-navy dark:text-dark-text">
                    {course.instructor}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted dark:text-gray-400">
                    A highly qualified professional instructor guiding you through the {course.title} program.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-border bg-white p-6 shadow-lg dark:border-dark-border dark:bg-dark-surface">
              {/* Fees */}
              <div className="mb-6 text-center">
                <span className="text-sm text-muted dark:text-gray-400">Starting from</span>
                <div className="mt-1">
                  <span className="font-heading text-4xl font-bold text-gold">
                    {course.fees}
                  </span>
                </div>
              </div>

              {/* Enroll Button */}
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-xl bg-gold px-6 py-3.5 text-base font-bold text-navy transition-all duration-300 hover:bg-navy hover:text-white hover:shadow-lg"
              >
                Enroll Now
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="/contact"
                className="mt-3 flex w-full items-center justify-center rounded-xl border-2 border-navy px-6 py-3 text-sm font-semibold text-navy transition-all duration-300 hover:bg-navy hover:text-white dark:border-gold dark:text-gold dark:hover:bg-gold dark:hover:text-navy"
              >
                Request Free Trial Lesson
              </Link>



              {/* Divider */}
              <div className="my-6 h-px bg-border dark:bg-dark-border" />

              {/* Key Features */}
              <h4 className="font-semibold text-navy dark:text-dark-text">
                Key Features
              </h4>
              <ul className="mt-3 space-y-2">
                {course.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted dark:text-gray-400"
                  >
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="my-6 h-px bg-border dark:bg-dark-border" />

              {/* Quick Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted dark:text-gray-400">Duration</span>
                  <span className="font-semibold text-navy dark:text-dark-text">
                    {course.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted dark:text-gray-400">Level</span>
                  <span className="font-semibold text-navy dark:text-dark-text">
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted dark:text-gray-400">Category</span>
                  <span className="font-semibold text-navy dark:text-dark-text">
                    {course.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="bg-surface py-20 dark:bg-dark-surface">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold text-navy dark:text-dark-text text-center">
              Related Programs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted dark:text-gray-400">
              Explore more programs that complement your musical journey
            </p>
            <div className="mt-1 mx-auto h-1 w-20 rounded-full bg-gold" />

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCourses.map((relatedCourse, index) => (
                <div key={relatedCourse.slug} className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-dark-border dark:bg-dark-bg">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={relatedCourse.image}
                      alt={relatedCourse.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-navy backdrop-blur-sm">
                      {relatedCourse.category}
                    </span>

                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-heading text-xl font-bold text-navy dark:text-dark-text">
                      {relatedCourse.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted dark:text-gray-400">
                      {relatedCourse.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4 dark:border-dark-border">
                      <span className="text-lg font-bold text-gold">{relatedCourse.fees}</span>
                      <Link
                        href={`/courses/${relatedCourse.slug}`}
                        className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-navy dark:bg-gold dark:text-navy dark:hover:bg-white"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-navy py-20 dark:bg-dark-surface">
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold/10" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gold/5" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Start Your Musical Journey Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
            Join hundreds of students who have transformed their lives through music at Harmonic
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-gold px-8 py-3 text-base font-semibold text-navy transition-all duration-300 hover:bg-white hover:shadow-lg"
            >
              Enroll Now
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Browse All Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
