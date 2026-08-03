import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deeprockmining.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DeepRock Mining Ltd',
    template: '%s | DeepRock Mining Ltd',
  },
  description:
    'DeepRock Mining Ltd is a Ghanaian precious minerals trading, gold aggregation and responsible mining company delivering integrated services across trading, exploration, operations and technical support.',
  applicationName: 'DeepRock Mining Ltd',
  authors: [
    {
      name: 'DeepRock Mining Ltd',
    },
  ],
  creator: 'DeepRock Mining Ltd',
  publisher: 'DeepRock Mining Ltd',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: '/',
    siteName: 'DeepRock Mining Ltd',
    title: 'DeepRock Mining Ltd',
    description:
      'Responsible gold trading, aggregation, mining, exploration and technical services in Ghana.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'DeepRock Mining Ltd — Responsible Gold Trading and Mining',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeepRock Mining Ltd',
    description:
      'Responsible gold trading, aggregation, mining, exploration and technical services in Ghana.',
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/favicon.png',
        type: 'image/png',
      },
    ],
    shortcut: ['/favicon.png'],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#161B1E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-quartz" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen">
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
