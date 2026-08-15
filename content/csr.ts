// Deep Rock CSR Content

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
    slug: 'community-donation',
    title:
      "Deep Rock Mining Ltd Demonstrates Commitment to Community Welfare Through CSR Initiative at Children's Hospital, Accra",
    excerpt:
      "Deep Rock Mining Ltd donated essential items — including food, provisions, oxygen cylinders and other hospital supplies — to the Children's Hospital in Accra, reaffirming its commitment to community welfare and corporate social responsibility.",
    category: 'Donation',
    date: '11 July',
    location: 'Accra, Ghana',
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
    body: [
      "Deep Rock Mining Ltd has reaffirmed its commitment to improving lives and supporting vulnerable communities through a Corporate Social Responsibility (CSR) outreach at the Children's Hospital in Accra.",
      'As part of its ongoing commitment to giving back to society, the company donated a wide range of essential items to support healthcare delivery and improve the well-being of children receiving treatment at the hospital. The donation included food items, provisions, oxygen cylinders, and other essential hospital supplies aimed at enhancing patient care and supporting the work of healthcare professionals.',
      "Beyond the presentation of the items, representatives of Deep Rock Mining Ltd spent quality time interacting with the children, their families, and hospital staff. The visit brought moments of joy, encouragement, and hope to the young patients, reflecting the company's belief that compassion and community support are integral to sustainable business success.",
      'Speaking during the presentation, the Managing Director of Deep Rock Mining Ltd stated:',
      '“At Deep Rock Mining Ltd, we believe that businesses have a responsibility to contribute meaningfully to the communities in which they operate. Supporting healthcare institutions and bringing hope to children and their families is one of the ways we demonstrate our commitment to social responsibility. We are honoured to support the Children’s Hospital and commend the remarkable work of its healthcare professionals.”',
      "Management of the Children's Hospital expressed sincere appreciation to Deep Rock Mining Ltd for the generous donation and thoughtful gesture. The hospital noted that the donated items, particularly the oxygen cylinders and other medical supplies, would contribute significantly to improving patient care while easing some of the operational challenges faced by the facility.",
      "Corporate Social Responsibility remains a core pillar of Deep Rock Mining Ltd's values. The company recognizes that sustainable business growth goes hand in hand with investing in the health, well-being, and development of the communities it serves. Through initiatives such as healthcare support, community development, education, and environmental stewardship, Deep Rock Mining Ltd continues to make meaningful contributions toward Ghana's socio-economic development.",
      'As the visit concluded, smiles filled the faces of the children, caregivers, and members of staff, serving as a reminder that acts of kindness and generosity can inspire hope and make a meaningful difference in the lives of those who need it most.',
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
