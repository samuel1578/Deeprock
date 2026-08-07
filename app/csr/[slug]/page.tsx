import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildSeoMetadata } from '@/lib/seo/metadata';
import { PageHero } from '@/components/sections/PageHero';
import { CsrEventDetails } from '@/components/csr/CsrEventDetails';
import { getCsrEventBySlug, csrEvents } from '@/content/csr';

interface CsrEventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CsrEventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getCsrEventBySlug(slug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return buildSeoMetadata({
    title: event.title,
    description: event.excerpt,
    path: `/csr/${event.slug}`,
  });
}

export async function generateStaticParams() {
  return csrEvents.map((event) => ({
    slug: event.slug,
  }));
}

export default async function CsrEventPage({ params }: CsrEventPageProps) {
  const { slug } = await params;
  const event = getCsrEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={event.category}
        title={event.title}
        summary={event.excerpt}
        image={event.coverImages[0]}
        imageAlt={event.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'CSR', href: '/csr' },
          { label: event.title },
        ]}
        path={`/csr/${event.slug}`}
      />
      <CsrEventDetails event={event} />
    </>
  );
}
