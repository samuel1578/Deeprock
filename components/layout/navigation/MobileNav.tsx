'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import Image from 'next/image';
import { primaryNavigation, ctaPrimary } from '@/content/navigation';
import { companyContact } from '@/content/site';
import type { RefObject } from 'react';

interface MobileNavProps {
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export function MobileNav({ onClose, triggerRef }: MobileNavProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    onClose();
    triggerRef.current?.focus();
  }, [onClose, triggerRef]);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleClose();
      }

      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className="fixed inset-0 w-[100vw] min-h-[100dvh] bg-white z-50 flex flex-col overflow-y-auto animate-in fade-in slide-in-from-top duration-300"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-limestone">
        <Link
          href="/"
          onClick={handleClose}
          className="flex items-center shrink-0"
          aria-label="DeepRock Mining Ltd homepage"
        >
          <Image
            src="/deeplogo.png"
            alt="DeepRock Mining Ltd"
            width={175}
            height={95}
            className="w-[175px] h-auto object-contain"
            priority
          />
        </Link>

        <button
          ref={closeButtonRef}
          onClick={handleClose}
          className="p-2 text-graphite hover:text-copper transition-colors"
          aria-label="Close navigation menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 container mx-auto px-4 py-3">
        <div className="flex flex-col">
          {primaryNavigation.map((item, index) => (
            <div key={item.href}>
              {index > 0 && !item.children && (
                <div className="border-t border-limestone/60" />
              )}
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenAccordion(
                        openAccordion === item.href ? null : item.href
                      )
                    }
                    aria-expanded={openAccordion === item.href}
                    className={`w-full flex items-center justify-between px-3 py-3.5 text-base font-medium transition-colors duration-200 rounded-md ${
                      openAccordion === item.href
                        ? 'text-copper bg-quartz/60'
                        : 'text-graphite hover:text-copper hover:bg-quartz/40'
                    }`}
                  >
                    <span className={openAccordion === item.href ? 'text-copper' : ''}>
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-all duration-200 ${
                        openAccordion === item.href
                          ? 'rotate-180 text-copper'
                          : 'text-stone'
                      }`}
                    />
                  </button>
                  {openAccordion === item.href && (
                    <div className="mt-1 mb-2 pl-3">
                      <div className="border-l-2 border-copper/40 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={handleClose}
                            className="flex items-center gap-2 px-2 py-2.5 text-sm text-graphite hover:text-copper hover:bg-quartz/30 transition-colors duration-150 rounded-md"
                          >
                            <span className="w-3 h-px bg-copper/60 shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={handleClose}
                  className="block px-3 py-3.5 text-base font-medium text-graphite hover:text-copper hover:bg-quartz/40 transition-colors duration-150 rounded-md"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-limestone">
          <Link
            href={ctaPrimary.href}
            onClick={handleClose}
            className="block w-full px-4 py-3 bg-copper text-white font-medium rounded-md hover:bg-copper-hover transition-colors text-center text-base"
          >
            {ctaPrimary.label}
          </Link>
        </div>

        <div className="mt-5 pt-4 border-t border-limestone">
          <p className="px-3 text-label text-graphite/60 mb-2">CONTACT</p>
          <div className="flex flex-col gap-1.5 px-3">
            <a
              href={companyContact.phoneLink}
              className="text-sm text-graphite hover:text-copper transition-colors"
            >
              {companyContact.phone}
            </a>
            <a
              href={companyContact.emailLink}
              className="text-sm text-graphite hover:text-copper transition-colors"
            >
              {companyContact.email}
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
