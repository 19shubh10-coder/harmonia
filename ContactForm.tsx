'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, isValidEmail } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const subjectOptions = [
  'General Inquiry',
  'Admissions Information',
  'Course Details',
  'Schedule a Tour',
  'Partnership Opportunity',
  'Other',
];

const inputClasses =
  'w-full px-4 py-3 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-navy dark:text-white placeholder:text-muted dark:placeholder:text-muted-dark focus:border-gold dark:focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all duration-200';

const labelClasses = 'block text-sm font-semibold text-navy dark:text-white mb-1.5';

const errorClasses = 'text-xs text-error mt-1';

const CheckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export default function ContactForm({ className }: { className?: string }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[+\d\s()-]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className={cn('relative', className)}>
      {/* Toast notifications */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -top-16 left-0 right-0 flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/30 text-success"
          >
            <CheckIcon />
            <p className="text-sm font-medium">Thank you! Your message has been sent successfully. We will get back to you soon.</p>
          </motion.div>
        )}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -top-16 left-0 right-0 flex items-center gap-3 p-4 rounded-lg bg-error/10 border border-error/30 text-error"
          >
            <AlertIcon />
            <p className="text-sm font-medium">Something went wrong. Please try again or email us directly.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label htmlFor="contact-name" className={labelClasses}>
              Full Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Your full name"
              className={cn(inputClasses, errors.name && 'border-error focus:border-error focus:ring-error/20')}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className={errorClasses}>{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className={labelClasses}>
              Email Address <span className="text-error">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your@email.com"
              className={cn(inputClasses, errors.email && 'border-error focus:border-error focus:ring-error/20')}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className={errorClasses}>{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Phone */}
          <div>
            <label htmlFor="contact-phone" className={labelClasses}>
              Phone Number
            </label>
            <input
              type="tel"
              id="contact-phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 000-0000"
              className={cn(inputClasses, errors.phone && 'border-error focus:border-error focus:ring-error/20')}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className={errorClasses}>{errors.phone}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="contact-subject" className={labelClasses}>
              Subject <span className="text-error">*</span>
            </label>
            <select
              id="contact-subject"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              className={cn(inputClasses, 'appearance-none', errors.subject && 'border-error focus:border-error focus:ring-error/20')}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
            >
              <option value="">Select a subject</option>
              {subjectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.subject && (
              <p id="subject-error" className={errorClasses}>{errors.subject}</p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className={labelClasses}>
            Message <span className="text-error">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Tell us how we can help you..."
            className={cn(inputClasses, 'resize-y min-h-[120px]', errors.message && 'border-error focus:border-error focus:ring-error/20')}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className={errorClasses}>{errors.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={status === 'submitting'}
          className="w-full md:w-auto"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}
