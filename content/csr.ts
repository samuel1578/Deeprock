// Deep Rock CSR Content
//
// NOTE: All copy in this file is TEMPORARY and pending approval.
// No dates, locations, beneficiaries or donation quantities have been
// invented. Replace the flagged placeholders once final event details
// are approved.

import type { GalleryImage } from './gallery'

export interface CsrEvent {
  slug: string
  title: string
  excerpt: string
  category: string
  date?: string
  location?: string
  coverImages: string[]
  // Shared gallery image type (src, real width/height, alt) — same type the
  // homepage Gallery uses, so both open the same shared lightbox.
  galleryImages: GalleryImage[]
  body: string[]
  featured?: boolean
}

export const csrSectionContent = {
  eyebrow: 'CORPORATE SOCIAL RESPONSIBILITY',
  heading: 'Our Corporate Social Responsibility',
  introduction:
    'Deep Rock supports communities through practical initiatives, partnerships and targeted social-impact activities.',
}

// The approved inline glow in the CSR section must highlight "Deep Rock"
// (with a space) and its possessive forms. The BrandGlowText defaults only
// match the legacy "DeepRock" spellings, so the CSR section passes this list
// explicitly to guarantee the glow actually renders.
export const csrBrandHighlights = ['Deep Rock’s', "Deep Rock's", 'Deep Rock'] as const

export const csrListingIntro =
  'A record of Deep Rock’s donations, community programmes and targeted social-impact activities.'

export const csrEvents: CsrEvent[] = [
  {
    // TODO: replace with the approved production slug once the final event name is confirmed
    slug: 'community-donation',
    // TODO: replace with the approved final event title
    title: 'Community Donation Initiative',
    // TODO: replace with approved copy; deliberately avoids specifics
    excerpt:
      'A donation initiative supporting practical community development in the communities connected to Deep Rock’s operations.',
    category: 'Donation',
    // NOTE: date and location intentionally omitted until approved.
    coverImages: ['/images/csr/csr-1.jpg', '/images/csr/csr-2.jpg'],
    // NOTE: every real image discovered in public/images/csr/ (verified paths and
    // dimensions). There is no csr-7.jpg in the folder.
    galleryImages: [
      {
        src: '/images/csr/csr-1.jpg',
        width: 1080,
        height: 719,
        alt: 'Deep Rock corporate social responsibility donation activity',
      },
      {
        src: '/images/csr/csr-2.jpg',
        width: 1080,
        height: 719,
        alt: 'Deep Rock corporate social responsibility donation activity — additional view',
      },
      {
        src: '/images/csr/csr-3.jpg',
        width: 1080,
        height: 850,
        alt: 'Deep Rock CSR donation event photograph',
      },
      {
        src: '/images/csr/csr-4.jpg',
        width: 1080,
        height: 789,
        alt: 'Deep Rock CSR donation event photograph',
      },
      {
        src: '/images/csr/csr-5.jpg',
        width: 1080,
        height: 719,
        alt: 'Deep Rock CSR donation event photograph',
      },
      {
        src: '/images/csr/csr-6.jpg',
        width: 1080,
        height: 719,
        alt: 'Deep Rock CSR donation event photograph',
      },
      {
        src: '/images/csr/csr-8.jpg',
        width: 1080,
        height: 719,
        alt: 'Deep Rock CSR donation event photograph',
      },
      {
        src: '/images/csr/csr-9.jpg',
        width: 1080,
        height: 850,
        alt: 'Deep Rock CSR donation event photograph',
      },
    ],
    // TODO: placeholder story copy — replace with the approved event story
    body: [
      'Deep Rock supports communities connected to its operations through practical, targeted social-impact activities. This donation initiative is one part of that ongoing commitment.',
      'The initiative focuses on community development priorities identified together with local stakeholders, helping to strengthen the relationships that responsible mining and trading depend on.',
      'Further details of the event, its beneficiaries and the full story will be published here once the final programme has been approved.',
    ],
    featured: true,
  },
]

export function getFeaturedCsrEvent(): CsrEvent | undefined {
  return csrEvents.find((event) => event.featured)
}

export function getCsrEventBySlug(slug: string): CsrEvent | undefined {
  return csrEvents.find((event) => event.slug === slug)
}
