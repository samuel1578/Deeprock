import type { MetadataRoute } from 'next'
import { publicStaticRoutes, absoluteUrl } from '@/lib/seo/routes'
import { services } from '@/content/services'
import { sustainabilityPillars } from '@/content/sustainability'
import { newsArticles } from '@/content/news'
import { csrEvents } from '@/content/csr'

/**
 * Sitemap (https://deeprockminingh.com/sitemap.xml).
 *
 * Includes only canonical, public, indexable production routes. API routes,
 * internals and the removed Community Impact route are not included. No
 * fabricated per-request lastModified timestamps; changeFrequency/priority are
 * conservative guidance only.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = publicStaticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    ...(route.priority !== undefined ? { priority: route.priority } : {}),
    ...(route.changeFrequency ? { changeFrequency: route.changeFrequency } : {}),
  }))

  const serviceRoutes = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const sustainabilityRoutes = sustainabilityPillars.map((pillar) => ({
    url: absoluteUrl(pillar.route),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const newsRoutes = newsArticles.map((article) => ({
    url: absoluteUrl(`/news/${article.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const csrRoutes = csrEvents.map((event) => ({
    url: absoluteUrl(`/csr/${event.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...sustainabilityRoutes,
    ...newsRoutes,
    ...csrRoutes,
  ]
}
