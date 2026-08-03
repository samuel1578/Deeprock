'use client';

import { useState } from 'react';
import Link from 'next/link';
import { primaryNavigation } from '@/content/navigation';
import { NavigationDropdown } from './NavigationDropdown';

export function DesktopNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="flex items-center gap-1">
      {primaryNavigation.map((item) => (
        <div key={item.href} className="relative">
          {item.children ? (
            <NavigationDropdown
              label={item.label}
              href={item.href}
              isOpen={openDropdown === item.href}
              onOpen={() => setOpenDropdown(item.href)}
              onClose={() => setOpenDropdown(null)}
            >
              {item.children}
            </NavigationDropdown>
          ) : (
            <Link
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-graphite hover:text-copper transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}