'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, isValidEmail } from '@/lib/utils';

interface NewsletterFormProps {
  className?: string;
  variant?: 'inline' | 'stacked';
  dark?: boolean;
}

export default function NewsletterForm({
  className,
  variant = 'inline',
  dark = false,
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage('Email is required');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setErrorMessage('');
    setStatus('submitting');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClasses = cn(
    'flex-1 px-4 py-3 rounded-lg border outline-none transition-all duration-200',
    dark
      ? 'bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold focus:ring-2 focus:ring-gold/20'
      : 'bg-surface dark:bg-surface-dark border-border dark:border-border-dark text-navy dark:text-white placeholder:text-muted dark:placeholder:text-muted-dark focus:border-gold focus:ring-2 focus:ring-gold/20'
  );

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-success py-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Welcome aboard! Check your inbox for a confirmation.</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className={cn(
              variant === 'inline'
                ? 'flex flex-col sm:flex-row gap-3'
                : 'flex flex-col gap-3'
            )}
          >
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Enter your email address"
                className={cn(inputClasses, errorMessage && 'border-error')}
                aria-describedby={errorMessage ? 'newsletter-error' : undefined}
              />
              {errorMessage && (
                <p id="newsletter-error" className="text-xs text-error mt-1">
                  {errorMessage}
                </p>
              )}
            </div>
            <motion.button
              type="submit"
              disabled={status === 'submitting'}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                'px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer',
                'bg-gold text-navy hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed',
                'flex items-center justify-center gap-2'
              )}
            >
              {status === 'submitting' ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-error mt-2"
        >
          Something went wrong. Please try again later.
        </motion.p>
      )}
    </div>
  );
}
