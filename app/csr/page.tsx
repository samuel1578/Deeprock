import type { Metadata } from 'next';
import Link from 'next/link';
import { buildSeoMetadata } from '@/lib/seo/metadata';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { ImageWithFallback } from '@/components/media/ImageWithFallback';
import { BrandText } from '@/components/ui/BrandText';
import { csrEvents, csrListingIntro } from '@/content/csr';

export const metadata: Metadata = buildSeoMetadata({
  title: 'Corporate Social Responsibility',
  description: csrListingIntro,
  path: '/csr',
});

export default function CsrPage() {
  const featured = csrEvents.find((event) => event.featured);
  const otherEvents = csrEvents.filter((event) => !event.featured);

  return (
    <>
      <PageHero
        eyebrow="CORPORATE SOCIAL RESPONSIBILITY"
        title="Our Corporate Social Responsibility"
        summary={<BrandText text={csrListingIntro} />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'CSR' },
        ]}
        path="/csr"
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            {featured && (
              <Link
                href={`/csr/${featured.slug}`}
                className="group block overflow-hidden rounded-lg bg-limestone transition-shadow hover:shadow-lg"
              >
                <div className="grid md:grid-cols-2">
                  <div className="overflow-hidden">
                    <ImageWithFallback
                      src={featured.coverImages[0]}
                      alt={featured.title}
                      width={1200}
                      height={900}
                      category="CSR"
                      className="aspect-[4/3] h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-copper">
                      {featured.category}
                    </p>
                    <h2 className="mb-4 font-display text-3xl text-basalt transition-colors group-hover:text-copper">
                      {featured.title}
                    </h2>
                    <p className="mb-4 text-graphite">
                      <BrandText text={featured.excerpt} />
                    </p>
                    <span className="text-sm font-medium text-copper">
                      Read the story →
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {otherEvents.length > 0 && (
              <div className="grid gap-6 md:grid-cols-3">
                {otherEvents.map((event) => (
                  <Link
                    key={event.slug}
                    href={`/csr/${event.slug}`}
                    className="group block overflow-hidden rounded-lg bg-limestone transition-shadow hover:shadow-lg"
                  >
                    <div className="overflow-hidden">
                      <ImageWithFallback
                        src={event.coverImages[0]}
                        alt={event.title}
                        width={1200}
                        height={900}
                        category="CSR"
                        className="aspect-video h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="p-6">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-copper">
                        {event.category}
                      </p>
                      <h3 className="mb-2 line-clamp-2 font-display text-xl text-basalt transition-colors group-hover:text-copper">
                        {event.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-sm text-graphite">
                        <BrandText text={event.excerpt} />
                      </p>
                      {event.date && (
                        <p className="text-xs text-stone">{event.date}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Stack>
        </Container>
      </Section>
    </>
  );
}
