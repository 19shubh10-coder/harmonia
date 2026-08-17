'use client';

import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-navy hover:bg-gold-light shadow-md hover:shadow-lg hover:shadow-gold/20 font-semibold',
  secondary:
    'bg-navy text-white hover:bg-accent dark:bg-accent dark:hover:bg-accent-light shadow-md hover:shadow-lg font-semibold',
  outline:
    'border-2 border-gold text-gold hover:bg-gold hover:text-navy dark:text-gold-light dark:border-gold-light dark:hover:bg-gold-light dark:hover:text-navy font-semibold',
  ghost:
    'text-navy hover:bg-navy/5 dark:text-white dark:hover:bg-white/5 font-medium',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-base rounded-lg gap-2',
  lg: 'px-8 py-4 text-lg rounded-xl gap-2.5',
};

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center transition-all duration-300 cursor-pointer select-none whitespace-nowrap',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantStyles[variant],
    sizeStyles[size],
    loading && 'pointer-events-none opacity-70',
    className
  );

  const motionProps: HTMLMotionProps<'button'> = {
    whileHover: loading ? {} : { scale: 1.03 },
    whileTap: loading ? {} : { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  };

  if ('href' in props && props.href) {
    const { href, target, rel, ...rest } = props;
    return (
      <motion.div
        whileHover={loading ? {} : { scale: 1.03 }}
        whileTap={loading ? {} : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={cn("inline-block", className?.includes('w-full') && "w-full flex")}
      >
        <Link
          href={href}
          target={target}
          rel={rel}
          className={cn(baseClasses, className?.includes('w-full') && "w-full flex-1")}
          {...(rest as Record<string, unknown>)}
        >
          {loading && <LoadingSpinner />}
          {children}
        </Link>
      </motion.div>
    );
  }

  const { ...buttonProps } = props as ButtonAsButton;

  return (
    <motion.button
      className={baseClasses}
      disabled={loading || buttonProps.disabled}
      {...motionProps}
      {...(buttonProps as Record<string, unknown>)}
    >
      {loading && <LoadingSpinner />}
      {children}
    </motion.button>
  );
}
