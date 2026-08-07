import { siteConfig, absoluteUrl, companyContact } from '@/lib/seo/site-config'

/**
 * Server-rendered Organization structured data (schema.org, application/ld+json).
 *
 * Rendered once in the root layout so every page carries the same entity
 * identity. Only verified facts are emitted: official name, alternate short
 * name, canonical URL, logo, description, public phone/email and the public
 * Accra office address already shown on the contact page.
 *
 * Deliberately omitted until verified: ratings, reviewCount, awards,
 * foundingDate, employeeCount, coordinates, business hours and sameAs
 * profiles.
 */
export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.organizationImage),
    description: siteConfig.description,
    telephone: companyContact.phone.replace(/[^+\d]/g, ''),
    email: companyContact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyContact.addressPlain.streetAddress,
      addressLocality: 'Accra',
      addressCountry: 'GH',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Ghana',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
