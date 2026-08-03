'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import type { NavLink } from '@/content/navigation';

interface NavigationDropdownProps {
  label: string;
  href?: string;
  children: NavLink[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function NavigationDropdown({
  label,
  href,
  children,
  isOpen,
  onOpen,
  onClose,
}: NavigationDropdownProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  }, [isOpen, onOpen, onClose]);

  const handleOpen = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    onClose();
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleClose();
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = dropdownRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
        if (!items || items.length === 0) return;

        const currentIndex = focusedIndex;
        let nextIndex: number;

        if (e.key === 'ArrowDown') {
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }

        setFocusedIndex(nextIndex);
        items[nextIndex]?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, focusedIndex]);

  useEffect(() => {
    if (!isOpen) return;

    function handleFocusOutside(e: FocusEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener('focusin', handleFocusOutside);
    return () => document.removeEventListener('focusin', handleFocusOutside);
  }, [isOpen, onClose]);

  const panelId = `dropdown-panel-${href || label}`;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        ref={triggerRef}
        onClick={handleToggle}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-haspopup="menu"
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-graphite hover:text-copper transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded whitespace-nowrap"
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="menu"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className="absolute left-0 top-full z-50 w-max min-w-[14rem] max-w-[90vw] bg-white rounded-md shadow-md border border-limestone py-1 mt-1"
        >
          {children.map((child, index) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              onClick={onClose}
              onFocus={() => setFocusedIndex(index)}
              className="block px-4 py-2 text-sm text-graphite hover:bg-quartz hover:text-copper transition-colors whitespace-nowrap"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}