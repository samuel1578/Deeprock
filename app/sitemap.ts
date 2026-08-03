import { MetadataRoute } from 'next'
import { newsArticles } from '@/content/news'
import { services } from '@/content/services'
import { sustainabilityPillars } from '@/content/sustainability'

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deeprockmining.com'

    const staticRoutes = [
        '',
        '/about',
        '/about/leadership',
        '/about/mission-vision-values',
        '/contact',
        '/news',
        '/privacy-policy',
        '/services',
        '/sustainability',
        '/terms-of-use',
    ].map((route) => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const newsRoutes = newsArticles.map((article) => ({
        url: `${siteUrl}/news/${article.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    const serviceRoutes = services.map((service) => ({
        url: `${siteUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const sustainabilityRoutes = sustainabilityPillars.map((pillar) => ({
        url: `${siteUrl}/sustainability/${pillar.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [
        ...staticRoutes,
        ...newsRoutes,
        ...serviceRoutes,
        ...sustainabilityRoutes,
    ]
}
