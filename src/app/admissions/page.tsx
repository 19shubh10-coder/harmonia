"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

import { courses } from "@/data/courses";
import { isValidEmail } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  program: string;
  experienceLevel: string;
  musicalBackground: string;
  preferredSchedule: string;
  heardAboutUs: string;
}

interface FormErrors {
  [key: string]: string;
}

/* ------------------------------------------------------------------ */
/*  Admission Steps Data                                               */
/* ------------------------------------------------------------------ */

const admissionSteps = [
  {
    step: 1,
    title: "Inquiry & Consultation",
    description:
      "Submit your inquiry online or visit our campus for a guided tour. Our admissions counselors will help you choose the right program based on your goals, experience, and interests.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Audition & Assessment",
    description:
      "Attend a friendly audition or skills assessment. For beginners, this is an aptitude test. For experienced musicians, prepare a short performance piece and demonstrate your current abilities.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Acceptance & Offer",
    description:
      "Receive your acceptance letter within 5 business days. Review your personalized learning plan, schedule options, and any scholarship awards before confirming your enrollment.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Enrollment & Welcome",
    description:
      "Complete your enrollment paperwork, pay the registration fee, and attend our new student orientation. Meet your instructor, tour the facilities, and begin your musical journey at Harmonic.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Fee Structure Data                                                 */
/* ------------------------------------------------------------------ */

const feeStructure = [
  { program: "Classical Piano Mastery", monthly: "$200", registration: "$150", examFee: "$100" },
  { program: "Violin & Strings Program", monthly: "$185", registration: "$150", examFee: "$100" },
  { program: "Contemporary Guitar", monthly: "$150", registration: "$100", examFee: "$80" },
  { program: "Vocal Performance", monthly: "$170", registration: "$100", examFee: "$80" },
  { program: "Music Theory & Composition", monthly: "$135", registration: "$100", examFee: "$60" },
  { program: "Trinity & ABRSM Exam Prep", monthly: "$200", registration: "$125", examFee: "Included" },
  { program: "Jazz & Improvisation", monthly: "$185", registration: "$150", examFee: "$80" },
  { program: "Chamber Music Ensemble", monthly: "$150", registration: "$100", examFee: "N/A" },
];

/* ------------------------------------------------------------------ */
/*  Scholarships Data                                                  */
/* ------------------------------------------------------------------ */

const scholarships = [
  {
    title: "Merit Scholarship",
    amount: "Up to 50% tuition",
    description:
      "Awarded to exceptional students who demonstrate outstanding musical ability and academic excellence. Assessed through audition performance, exam results, and faculty recommendation.",
    eligibility: [
      "Distinction in Grade 5+ exam",
      "Minimum 1 year at Harmonic",
      "Faculty recommendation",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "Need-Based Financial Aid",
    amount: "Up to 75% tuition",
    description:
      "Harmonic believes that financial circumstances should never be a barrier to musical education. Our need-based aid program supports talented students from all economic backgrounds.",
    eligibility: [
      "Demonstrated financial need",
      "Satisfactory academic progress",
      "Annual renewal application",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Young Prodigy Grant",
    amount: "Full tuition + mentoring",
    description:
      "Our most prestigious award, reserved for exceptionally gifted young musicians under the age of 14. Recipients receive full tuition, private mentoring from senior faculty, and priority performance opportunities.",
    eligibility: [
      "Under 14 years of age",
      "Exceptional audition performance",
      "Commitment to intensive program",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question: "What age groups do you accept?",
    answer:
      "We welcome students of all ages, from children as young as 4 years old to adult learners. Our programs are tailored to suit different age groups and learning paces. We have dedicated early childhood music programs (ages 4-6), junior programs (ages 7-12), teen programs (ages 13-17), and adult programs (18+).",
  },
  {
    question: "Do I need prior musical experience?",
    answer:
      "Not at all! We offer programs for complete beginners as well as advanced musicians. Our assessment during the admissions process helps us place you in the right level so you can learn at a comfortable pace. Many of our most successful students started with zero experience.",
  },
  {
    question: "What instruments do you provide?",
    answer:
      "Harmonic provides pianos, keyboards, and basic percussion instruments for use during lessons. For string instruments, guitars, and other personal instruments, students are expected to bring their own. However, we do offer an instrument rental program for new students who haven't purchased their own instrument yet.",
  },
  {
    question: "How are classes scheduled?",
    answer:
      "We offer flexible scheduling to accommodate different lifestyles. Classes are available in the morning (9 AM–12 PM), afternoon (1 PM–5 PM), evening (5:30 PM–8:30 PM), and on weekends. Private lessons are typically 45-60 minutes, while group classes run for 60-90 minutes. You'll work with your instructor to find the ideal time slot.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "We offer a full refund within the first 7 days of enrollment if you decide the program isn't right for you. After 7 days, a pro-rated refund is available for the current term. The registration fee is non-refundable. Detailed terms are provided in your enrollment agreement.",
  },
  {
    question: "Do you offer online classes?",
    answer:
      "Yes! We offer hybrid learning options for many of our programs. Students can attend in-person or join via our high-quality video platform. Online students receive the same curriculum, personalized attention, and access to performance opportunities through virtual recitals and masterclasses.",
  },
  {
    question: "How do I prepare for the audition?",
    answer:
      "For beginners, no preparation is needed — we'll conduct a simple aptitude assessment. For intermediate and advanced students, please prepare one piece of your choice (2-3 minutes) that showcases your current level. You may also be asked to do basic sight-reading and aural tests. Relax and let your musicality shine!",
  },
  {
    question: "What certifications do you offer?",
    answer:
      "We prepare students for internationally recognized examinations including Trinity College London (Grades 1-8, ATCL, LTCL, FTCL), ABRSM (Associated Board of the Royal Schools of Music), and Rockschool. We also award Harmonic certificates of completion for each program level. Our exam pass rate exceeds 98%.",
  },
  {
    question: "Can I switch programs or instructors?",
    answer:
      "Absolutely. We understand that musical interests evolve. You can request a program or instructor change at the beginning of any new term. Our academic team will help ensure a smooth transition and that your learning continuity is maintained.",
  },
  {
    question: "Are there performance opportunities for students?",
    answer:
      "Yes, performance is a core part of the Harmonic experience. We organize monthly student recitals, seasonal concerts, an annual gala, ensemble performances, and masterclass presentations. Advanced students also have opportunities to perform at external venues and competitions.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border dark:border-dark-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-gold"
        aria-expanded={isOpen}
      >
        <span className="pr-4 font-heading text-lg font-semibold text-navy dark:text-dark-text">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-gold"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-base leading-relaxed text-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Admissions Page                                                    */
/* ------------------------------------------------------------------ */

export default function AdmissionsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    program: "",
    experienceLevel: "",
    musicalBackground: "",
    preferredSchedule: "",
    heardAboutUs: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.program) newErrors.program = "Please select a program";
    if (!formData.experienceLevel) newErrors.experienceLevel = "Please select your experience level";
    if (!formData.preferredSchedule) newErrors.preferredSchedule = "Please select a preferred schedule";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: `Admission Application - ${formData.program}`,
          message: `
Experience Level: ${formData.experienceLevel}
Preferred Schedule: ${formData.preferredSchedule}
Date of Birth: ${formData.dateOfBirth}
How They Heard About Us: ${formData.heardAboutUs}

Musical Background:
${formData.musicalBackground}
          `.trim(),
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dateOfBirth: "",
          program: "",
          experienceLevel: "",
          musicalBackground: "",
          preferredSchedule: "",
          heardAboutUs: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName: string) =>
    `w-full rounded-lg border px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 dark:bg-dark-bg dark:text-dark-text ${
      errors[fieldName]
        ? "border-red-400 bg-red-50 dark:bg-red-900/10 dark:border-red-500"
        : "border-border bg-white hover:border-gold/50 dark:border-dark-border"
    }`;

  return (
    <>
      <main className="min-h-screen bg-background dark:bg-dark-bg">
        {/* Hero */}
        <HeroSection
          title="Admissions"
          subtitle="Begin your journey to musical excellence"
          backgroundImage="/images/about-classroom.png"
        />

        {/* Admission Process Timeline */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Your Path to Harmonic"
                subtitle="Our streamlined admissions process is designed to be welcoming and straightforward, ensuring you find the perfect program for your musical aspirations"
              />
            </ScrollReveal>

            <div className="relative mt-16">
              {/* Timeline connector line - desktop */}
              <div className="absolute top-12 right-0 left-0 hidden h-0.5 bg-gradient-to-r from-gold/20 via-gold to-gold/20 md:block" />

              <div className="grid gap-8 md:grid-cols-4 md:gap-0">
                {admissionSteps.map((step, index) => (
                  <ScrollReveal key={step.step} delay={index * 0.15}>
                    <div className="relative flex flex-col items-center text-center md:px-4">
                      {/* Step circle */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: index * 0.15,
                        }}
                        viewport={{ once: true }}
                        className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-gold bg-white shadow-lg shadow-gold/20 dark:bg-dark-surface"
                      >
                        <span className="text-gold">{step.icon}</span>
                        <span className="mt-1 text-xs font-bold text-gold">
                          Step {step.step}
                        </span>
                      </motion.div>

                      {/* Content */}
                      <h3 className="mt-6 font-heading text-lg font-bold text-navy dark:text-dark-text">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="bg-surface py-16 dark:bg-dark-surface md:py-24" id="apply">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Apply Now"
                subtitle="Complete the form below to begin your application. Our admissions team will review your submission and contact you within 3 business days."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <form
                onSubmit={handleSubmit}
                className="mt-12 rounded-2xl bg-white p-8 shadow-xl dark:bg-dark-bg md:p-10"
                noValidate
              >
                {/* Success Message */}
                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-8 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400"
                    >
                      <div className="flex items-center gap-3">
                        <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-semibold">Application Submitted Successfully!</p>
                          <p className="mt-1 text-sm">
                            Thank you for your interest in Harmonic. Our admissions team will review your
                            application and contact you within 3 business days.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error Message */}
                <AnimatePresence>
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
                    >
                      <p className="font-semibold">Something went wrong.</p>
                      <p className="mt-1 text-sm">
                        Please try again or contact us directly at admissions@harmonic.academy
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Personal Information */}
                <fieldset>
                  <legend className="font-heading text-xl font-bold text-navy dark:text-dark-text">
                    Personal Information
                  </legend>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-navy dark:text-dark-text">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={inputClasses("firstName")}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-navy dark:text-dark-text">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={inputClasses("lastName")}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy dark:text-dark-text">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClasses("email")}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy dark:text-dark-text">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses("phone")}
                        placeholder="+1 (555) 000-0000"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="dateOfBirth" className="mb-1.5 block text-sm font-medium text-navy dark:text-dark-text">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={inputClasses("dateOfBirth")}
                      />
                      {errors.dateOfBirth && (
                        <p className="mt-1 text-xs text-red-500">{errors.dateOfBirth}</p>
                      )}
                    </div>
                  </div>
                </fieldset>

                {/* Program Selection */}
                <fieldset className="mt-10">
                  <legend className="font-heading text-xl font-bold text-navy dark:text-dark-text">
                    Program Details
                  </legend>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="program" className="mb-1.5 block text-sm font-medium text-navy dark:text-dark-text">
                        Program <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="program"
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        className={inputClasses("program")}
                      >
                        <option value="">Select a program</option>
                        {courses.map((course) => (
                          <option key={course.slug} value={course.title}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                      {errors.program && (
                        <p className="mt-1 text-xs text-red-500">{errors.program}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="experienceLevel" className="mb-1.5 block text-sm font-medium text-navy dark:text-dark-text">
                        Experience Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="experienceLevel"
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className={inputClasses("experienceLevel")}
                      >
                        <option value="">Select your level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Professional">Professional</option>
                      </select>
                      {errors.experienceLevel && (
                        <p className="mt-1 text-xs text-red-500">{errors.experienceLevel}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="preferredSchedule" className="mb-1.5 block text-sm font-medium text-navy dark:text-dark-text">
                        Preferred Schedule <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="preferredSchedule"
                        name="preferredSchedule"
                        value={formData.preferredSchedule}
                        onChange={handleChange}
                        className={inputClasses("preferredSchedule")}
                      >
                        <option value="">Select preferred time</option>
                        <option value="Morning">Morning (9 AM – 12 PM)</option>
                        <option value="Afternoon">Afternoon (1 PM – 5 PM)</option>
                        <option value="Evening">Evening (5:30 PM – 8:30 PM)</option>
                        <option value="Weekend">Weekend</option>
                      </select>
                      {errors.preferredSchedule && (
                        <p className="mt-1 text-xs text-red-500">{errors.preferredSchedule}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="heardAboutUs" className="mb-1.5 block text-sm font-medium text-navy dark:text-dark-text">
                        How did you hear about us?
                      </label>
                      <select
                        id="heardAboutUs"
                        name="heardAboutUs"
                        value={formData.heardAboutUs}
                        onChange={handleChange}
                        className={inputClasses("heardAboutUs")}
                      >
                        <option value="">Select an option</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Friend or Family">Friend or Family</option>
                        <option value="School Referral">School Referral</option>
                        <option value="Local Event">Local Event</option>
                        <option value="Newspaper/Magazine">Newspaper/Magazine</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="musicalBackground" className="mb-1.5 block text-sm font-medium text-navy dark:text-dark-text">
                        Musical Background
                      </label>
                      <textarea
                        id="musicalBackground"
                        name="musicalBackground"
                        value={formData.musicalBackground}
                        onChange={handleChange}
                        rows={4}
                        className={inputClasses("musicalBackground")}
                        placeholder="Tell us about your musical experience, instruments you've played, any exams taken, performances given, etc."
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Submit */}
                <div className="mt-10 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-gold px-10 py-4 text-base font-bold text-white shadow-lg shadow-gold/25 transition-all hover:bg-gold/90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-xs text-muted">
                    By submitting this form, you agree to our{" "}
                    <Link href="/privacy" className="text-gold underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="text-gold underline">
                      Terms of Service
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </section>

        {/* Fee Structure */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Fee Structure"
                subtitle="Transparent pricing with no hidden costs. All fees include access to practice rooms, library resources, and performance opportunities."
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-12 overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-dark-surface">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="bg-navy text-white">
                        <th className="px-6 py-4 text-left text-sm font-semibold">Program</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold">Monthly Fee</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold">Registration</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold">Exam Fee</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border dark:divide-dark-border">
                      {feeStructure.map((fee, index) => (
                        <tr
                          key={fee.program}
                          className={`transition-colors hover:bg-gold/5 ${
                            index % 2 === 0 ? "bg-white dark:bg-dark-surface" : "bg-surface dark:bg-dark-bg"
                          }`}
                        >
                          <td className="px-6 py-4 font-medium text-navy dark:text-dark-text">
                            {fee.program}
                          </td>
                          <td className="px-6 py-4 text-center text-gold font-semibold">
                            {fee.monthly}
                          </td>
                          <td className="px-6 py-4 text-center text-muted">
                            {fee.registration}
                          </td>
                          <td className="px-6 py-4 text-center text-muted">
                            {fee.examFee}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border-t border-border bg-surface/50 px-6 py-4 dark:border-dark-border dark:bg-dark-bg/50">
                  <p className="text-sm text-muted">
                    <span className="font-semibold">Note:</span> Fees are subject to change.
                    Sibling discounts (10%) and multi-program enrollments (15% off second program) are available.
                    Contact our admissions office for details.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Scholarships */}
        <section className="bg-surface py-16 dark:bg-dark-surface md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Scholarships & Financial Aid"
                subtitle="We believe every talented musician deserves the opportunity to learn. Explore our scholarship programs designed to support your musical education."
              />
            </ScrollReveal>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {scholarships.map((scholarship, index) => (
                <ScrollReveal key={scholarship.title} delay={index * 0.15}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-bg"
                  >
                    {/* Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold">
                      {scholarship.icon}
                    </div>

                    {/* Amount Badge */}
                    <span className="mt-4 inline-block w-fit rounded-full bg-gold/10 px-3 py-1 text-sm font-bold text-gold">
                      {scholarship.amount}
                    </span>

                    <h3 className="mt-4 font-heading text-xl font-bold text-navy dark:text-dark-text">
                      {scholarship.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {scholarship.description}
                    </p>

                    {/* Eligibility */}
                    <div className="mt-6 border-t border-border pt-4 dark:border-dark-border">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                        Eligibility
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {scholarship.eligibility.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted">
                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold/80"
                    >
                      Apply for this scholarship
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Frequently Asked Questions"
                subtitle="Find answers to common questions about admissions, programs, scheduling, and more"
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-12 rounded-2xl bg-white p-6 shadow-lg dark:bg-dark-surface md:p-8">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFAQ === index}
                    onToggle={() =>
                      setOpenFAQ(openFAQ === index ? null : index)
                    }
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Admissions Counselor */}
        <section className="bg-navy py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="grid items-center gap-10 md:grid-cols-2">
                <div>
                  <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                    Speak with an Admissions Counselor
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-white/70">
                    Have questions? Our friendly admissions team is here to guide you
                    through every step of the process. Reach out today for personalized
                    advice on choosing the right program for you.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-center gap-4 rounded-xl bg-white/5 p-5 backdrop-blur-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Call Us</p>
                      <a href="tel:+15551234567" className="text-lg font-semibold text-white hover:text-gold transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 rounded-xl bg-white/5 p-5 backdrop-blur-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Email Us</p>
                      <a href="mailto:admissions@harmonic.academy" className="text-lg font-semibold text-white hover:text-gold transition-colors">
                        admissions@harmonic.academy
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex items-center gap-4 rounded-xl bg-white/5 p-5 backdrop-blur-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-white/50">Office Hours</p>
                      <p className="text-lg font-semibold text-white">
                        Mon–Sat: 9:00 AM – 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </>
  );
}
