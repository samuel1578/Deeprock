import { companyContact } from '@/content/site'

/**
 * Canonical production origin + brand identity.
 *
 * Single source of truth for technical SEO: the root layout metadata,
 * sitemap.xml, robots.txt, canonical URLs and JSON-LD all derive from here.
 *
 * - `url` is the canonical production origin. Override at deploy time with
 *   `NEXT_PUBLIC_SITE_URL` only if the production domain ever changes — never
 *   point this at localhost, preview or `*.vercel.app` URLs.
 * - The official company name used across metadata, structured data, manifest
 *   and footer is `name`. `shortName`/alternateName are the natural short
 *   brand forms of the same entity.
 */
export const siteConfig = {
  name: 'Deep Rock Mining Co. Ltd',
  shortName: 'Deep Rock',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://deeprockminingh.com',
  locale: 'en_GH',
  description:
    'Deep Rock Mining Co. Ltd is a Ghana-based mining company providing gold aggregation, precious minerals trading, mining operations, mineral exploration, equipment supply, geological consulting and responsible mining services.',
  defaultTitle: 'Deep Rock Mining Co. Ltd | Mining & Gold Services in Ghana',
  // Shared social/share image: the homepage hero photo (JPEG — safe for all
  // social scrapers). Platforms crop to their own card ratios, so the 2000x1332
  // source is fine; swap for a dedicated 1200x630 branded design whenever one
  // is produced — one line, here.
  ogImage: '/images/home/hero/technical-support-desktop.jpeg',
  ogImageWidth: 2000,
  ogImageHeight: 1332,
  ogImageAlt: 'Deep Rock Mining Co. Ltd technical support services',
  // Official logo asset used by Organization structured data.
  logo: '/deeplogo.png',
  // Representative company-operations image (used by Organization `image`).
  organizationImage: '/images/overview.webp',
} as const

/** Absolute production URL for a site path (e.g. '/services' → 'https://deeprockminingh.com/services'). */
export const absoluteUrl = (path: string): string =>
  new URL(path, siteConfig.url).toString()

export { companyContact }
