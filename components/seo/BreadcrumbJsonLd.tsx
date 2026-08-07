import { absoluteUrl } from '@/lib/seo/routes'

interface BreadcrumbJsonLdItem {
  label: string
  href?: string
}

interface BreadcrumbJsonLdProps {
  /** Same items rendered by the visual <Breadcrumbs /> component. */
  items: BreadcrumbJsonLdItem[]
  /** Canonical path of the current page, used for the final (non-linked) crumb. */
  path?: string
}

/**
 * Server-rendered BreadcrumbList structured data. It mirrors the visual
 * breadcrumbs rendered by PageHero (same data source, same order), and item
 * URLs are absolute under the canonical origin.
 */
export function BreadcrumbJsonLd({ items, path }: BreadcrumbJsonLdProps) {
  const itemListElement = items.map((item, index) => {
    const itemUrl = item.href
      ? absoluteUrl(item.href)
      : path
        ? absoluteUrl(path)
        : undefined

    return {
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(itemUrl ? { item: itemUrl } : {}),
    }
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
