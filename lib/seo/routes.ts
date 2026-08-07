import type { MetadataRoute } from 'next'
import { absoluteUrl } from './site-config'

export { absoluteUrl }

export interface RouteMeta {
  path: string
  priority?: number
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency']
}

/**
 * Indexable static routes. Dynamic routes (services/[slug], sustainability/
 * [slug], news/[slug], csr/[slug]) are derived from their content modules in
 * app/sitemap.ts. Priorities are conservative guidance only — they do not
 * control ranking. Legal pages are included but given low priority.
 */
export const publicStaticRoutes: RouteMeta[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about/mission-vision-values', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about/leadership', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/sustainability', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/gallery', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/news', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/csr', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-of-use', priority: 0.3, changeFrequency: 'yearly' },
]
