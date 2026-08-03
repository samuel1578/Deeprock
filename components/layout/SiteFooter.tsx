import Link from 'next/link';
import { siteConfig, companyContact, footerStatement } from '@/content/site';
import { footerSections } from '@/content/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-basalt text-white">
      {/* Main Footer Content */}
      <div className="border-b border-slate">
        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* Logo and Statement */}
          <div className="mb-12 max-w-sm">
            <h3 className="font-display text-xl mb-3">{siteConfig.shortName}</h3>
            <p className="text-sm text-stone">{footerStatement}</p>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-medium text-limestone mb-4 text-sm">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-stone hover:text-copper transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="border-t border-slate pt-8 pb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href={companyContact.phoneLink}
                className="flex items-start gap-3 group"
              >
                <Phone className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-stone text-xs mb-1">Phone</p>
                  <p className="group-hover:text-copper transition-colors">
                    {companyContact.phone}
                  </p>
                </div>
              </a>
              <a
                href={companyContact.emailLink}
                className="flex items-start gap-3 group"
              >
                <Mail className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-stone text-xs mb-1">Email</p>
                  <p className="group-hover:text-copper transition-colors">
                    {companyContact.email}
                  </p>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-copper flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-stone text-xs mb-1">Office</p>
                  <p>{companyContact.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-copper transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="hover:text-copper transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
