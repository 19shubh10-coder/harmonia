'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useTheme } from '@/components/ThemeProvider';
import { mainNavLinks, type NavLink } from '@/data/navigation';
import Button from '@/components/ui/Button';

/* ── SVG Icons ─────────────────────────────────────────────── */

const MusicNoteLogo = () => (
  <svg className="w-12 h-12 text-gold" viewBox="0 0 36 36" fill="currentColor" aria-hidden="true">
    <path d="M14 4v18.5c-1.2-.6-2.5-.8-3.8-.5C7.2 22.6 5 24.5 5 26.5c0 2 1.7 3.3 3.8 3 2.2-.3 3.8-2 3.8-4V12h9V8h-9V4h-1z" />
    <path d="M24 2v16.5c-1.2-.6-2.5-.8-3.8-.5-3 .5-5 2.3-5 4.3 0 2 1.7 3.3 3.8 3 2.2-.3 3.8-2 3.8-4V10h6V6h-6V2h1z" opacity="0.5" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 006.963-2.978c.071-.065.138-.134.202-.205l.027-.031a.125.125 0 00-.19-.164z" />
  </svg>
);

const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="w-6 h-6 relative flex items-center justify-center">
    <span className={cn(
      'absolute h-0.5 w-6 bg-current transition-all duration-300',
      open ? 'rotate-45' : '-translate-y-2'
    )} />
    <span className={cn(
      'absolute h-0.5 w-6 bg-current transition-all duration-300',
      open ? 'opacity-0 scale-0' : 'opacity-100'
    )} />
    <span className={cn(
      'absolute h-0.5 w-6 bg-current transition-all duration-300',
      open ? '-rotate-45' : 'translate-y-2'
    )} />
  </div>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

/* ── Mega Menu Component ───────────────────────────────────── */

function MegaMenu({ link, onClose }: { link: NavLink; onClose: () => void }) {
  if (!link.megaMenu) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] max-w-[95vw] mt-2 z-50"
    >
      <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-xl p-8">
        <div className="grid grid-cols-3 gap-8">
          {link.megaMenu.map((category) => (
            <div key={category.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group/item block p-2 -mx-2 rounded-lg hover:bg-background dark:hover:bg-navy transition-colors duration-200"
                    >
                      <span className="block text-sm font-medium text-navy dark:text-white group-hover/item:text-gold transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-xs text-muted dark:text-muted-dark mt-0.5">
                        {item.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Mobile Menu Component ─────────────────────────────────── */

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-surface dark:bg-surface-dark z-50 overflow-y-auto lg:hidden shadow-2xl"
          >
            <div className="p-6">
              {/* Close button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-background dark:hover:bg-navy text-navy dark:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="space-y-1">
                {mainNavLinks.map((link) => (
                  <div key={link.label}>
                    {link.megaMenu ? (
                      <>
                        <button
                          onClick={() => setExpandedItem(expandedItem === link.label ? null : link.label)}
                          className="flex items-center justify-between w-full px-4 py-3 text-left text-navy dark:text-white hover:text-gold dark:hover:text-gold rounded-lg hover:bg-background dark:hover:bg-navy transition-all duration-200"
                        >
                          <span className="font-medium">{link.label}</span>
                          <motion.span
                            animate={{ rotate: expandedItem === link.label ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDownIcon />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {expandedItem === link.label && link.megaMenu && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-2 space-y-4">
                                {link.megaMenu.map((category) => (
                                  <div key={category.title}>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-2 px-4">
                                      {category.title}
                                    </h4>
                                    {category.items.map((item) => (
                                      <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onClose}
                                        className="block px-4 py-2 text-sm text-muted dark:text-muted-dark hover:text-gold dark:hover:text-gold transition-colors"
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          'block px-4 py-3 font-medium rounded-lg transition-all duration-200',
                          pathname === link.href
                            ? 'text-gold bg-gold/5'
                            : 'text-navy dark:text-white hover:text-gold dark:hover:text-gold hover:bg-background dark:hover:bg-navy'
                        )}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="mt-8 pt-6 border-t border-border dark:border-border-dark">
                <Button href="/admissions" variant="primary" size="md" className="w-full">
                  Apply Now
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Main Navbar Component ─────────────────────────────────── */

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { scrollDirection, isAtTop } = useScrollDirection({ threshold: 10 });
  const { resolvedTheme, toggleTheme } = useTheme();

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navbarClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
    isAtTop
      ? 'bg-transparent'
      : 'bg-surface/95 dark:bg-navy/95 backdrop-blur-xl shadow-lg border-b border-border/50 dark:border-border-dark/50',
    scrollDirection === 'down' && !isAtTop && '-translate-y-full'
  );

  const linkTextColor = isAtTop
    ? 'text-white hover:text-gold'
    : 'text-navy dark:text-white hover:text-gold dark:hover:text-gold';

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={navbarClasses}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 z-10"
              aria-label="Harmonic Learning Studio Home"
            >
              <MusicNoteLogo />
              <div className="flex flex-col">
                <span className={cn(
                  'text-2xl font-heading font-bold leading-none transition-colors duration-300',
                  isAtTop ? 'text-white' : 'text-navy dark:text-white'
                )}>
                  Harmonic
                </span>
                <span className={cn(
                  'text-xs uppercase tracking-[0.2em] leading-none mt-1 transition-colors duration-300',
                  isAtTop ? 'text-white/60' : 'text-muted dark:text-muted-dark'
                )}>
                  Learning Studio
                </span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav
              ref={megaMenuRef}
              className="hidden lg:flex items-center gap-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {mainNavLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                const hasMegaMenu = !!link.megaMenu;

                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => hasMegaMenu && setMegaMenuOpen(link.label)}
                    onMouseLeave={() => hasMegaMenu && setMegaMenuOpen(null)}
                  >
                    {hasMegaMenu ? (
                      <button
                        className={cn(
                          'flex items-center gap-1 px-3 py-2 text-lg font-medium rounded-lg transition-all duration-200',
                          linkTextColor,
                          isActive && 'text-gold',
                          megaMenuOpen === link.label && 'text-gold'
                        )}
                        aria-expanded={megaMenuOpen === link.label}
                        aria-haspopup="true"
                      >
                        {link.label}
                        <motion.span
                          animate={{ rotate: megaMenuOpen === link.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDownIcon />
                        </motion.span>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          'px-3 py-2 text-lg font-medium rounded-lg transition-all duration-200 block',
                          linkTextColor,
                          isActive && 'text-gold'
                        )}
                      >
                        {link.label}
                      </Link>
                    )}

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gold rounded-full"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}

                    {/* Mega menu */}
                    <AnimatePresence>
                      {hasMegaMenu && megaMenuOpen === link.label && (
                        <MegaMenu link={link} onClose={() => setMegaMenuOpen(null)} />
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={cn(
                  'p-2 rounded-lg transition-colors duration-200',
                  isAtTop
                    ? 'text-white/80 hover:text-gold hover:bg-white/10'
                    : 'text-navy dark:text-white hover:text-gold dark:hover:text-gold hover:bg-background dark:hover:bg-navy'
                )}
                aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {resolvedTheme === 'dark' ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <SunIcon />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MoonIcon />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* CTA Button - Desktop */}
              <div className="hidden lg:block">
                <Button href="/admissions" variant="primary" size="sm">
                  Apply Now
                </Button>
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  'lg:hidden p-2 rounded-lg transition-colors duration-200',
                  isAtTop
                    ? 'text-white hover:bg-white/10'
                    : 'text-navy dark:text-white hover:bg-background dark:hover:bg-navy'
                )}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                <HamburgerIcon open={mobileMenuOpen} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
