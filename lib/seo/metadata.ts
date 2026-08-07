import type { Metadata } from 'next'
import { siteConfig } from './site-config'
import { absoluteUrl } from './routes'

interface BuildSeoMetadataArgs {
  /**
   * Page title. When omitted the root layout's `default` title is used
   * (intended for the homepage, so the template never double-appends).
   * Any provided title is expanded by the root template
   * ('%s | Deep Rock Mining Co. Ltd').
   */
  title?: string
  description: string
  /** Canonical path of the page, e.g. '/services/gold-aggregation'. */
  path: string
  noindex?: boolean
}

/**
 * Composes the per-page SEO metadata: canonical URL (absolute, built from the
 * canonical origin), Open Graph title/description/URL/image, Twitter card and
 * robots. Pages stay Server Components — this is pure data.
 */
export function buildSeoMetadata({
  title,
  description,
  path,
  noindex = false,
}: BuildSeoMetadataArgs): Metadata {
  const pageTitle = title ?? siteConfig.defaultTitle

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: siteConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
    ...(noindex
      ? { robots: { index: false, follow: false } }
      : {}),
  }
}
