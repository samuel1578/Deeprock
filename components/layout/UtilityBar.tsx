'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { companyContact } from '@/content/site';

export function UtilityBar() {
  return (
    <div className="border-b border-stone bg-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-6 text-xs">
          <a
            href={companyContact.phoneLink}
            className="flex items-center gap-1.5 text-graphite hover:text-copper transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span>{companyContact.phone}</span>
          </a>
          <a
            href={companyContact.emailLink}
            className="flex items-center gap-1.5 text-graphite hover:text-copper transition-colors"
          >
            <Mail className="w-3 h-3" />
            <span>{companyContact.email}</span>
          </a>
          <Link
            href={companyContact.locationLink}
            className="flex items-center gap-1.5 text-graphite hover:text-copper transition-colors"
          >
            <MapPin className="w-3 h-3" />
            <span>{companyContact.location}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
