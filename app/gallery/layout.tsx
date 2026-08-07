import type { Metadata } from 'next'
import { buildSeoMetadata } from '@/lib/seo/metadata'

/**
 * The Gallery page is a Client Component and therefore cannot export metadata.
 * This route-level layout provides the SEO metadata for /gallery instead.
 */
export const metadata: Metadata = buildSeoMetadata({
  title: 'Gallery',
  description:
    "A visual record of Deep Rock's gold trading, aggregation and mining activity across Ghana.",
  path: '/gallery',
})

export default function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
