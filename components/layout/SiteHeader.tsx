'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { ctaPrimary } from '@/content/navigation';
import { DesktopNav } from './navigation/DesktopNav';
import { ButtonLink } from '@/components/ui/Button';
import { MobileNav } from './navigation/MobileNav';

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeMobileNav = useCallback(() => {
    setIsMobileNavOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileNavOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="border-b border-stone/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-3">
              <Link
                href="/"
                className="flex items-center shrink-0"
                aria-label="DeepRock Mining Ltd homepage"
              >
                <Image
                  src="/deeplogo.png"
                  alt="DeepRock Mining Ltd"
                  width={145}
                  height={78}
                  className="w-[105px] lg:w-[145px] h-auto object-contain"
                  priority
                />
              </Link>

              <div className="hidden lg:flex items-center gap-8">
                <DesktopNav />
              </div>

              <div className="flex items-center gap-4">
                <ButtonLink
                  href={ctaPrimary.href}
                  variant="bright-pattern"
                  size="md"
                  className="hidden md:inline-flex"
                >
                  {ctaPrimary.label}
                </ButtonLink>

                <button
                  ref={hamburgerRef}
                  onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                  className="lg:hidden p-2 text-graphite hover:text-copper transition-colors"
                  aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={isMobileNavOpen}
                >
                  {isMobileNavOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isMobileNavOpen && (
        <MobileNav onClose={closeMobileNav} triggerRef={hamburgerRef} />
      )}

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed top-0 left-0 z-50 p-4 bg-copper text-white"
      >
        Skip to main content
      </a>
    </>
  );
}
