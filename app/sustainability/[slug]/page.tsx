import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { TextLink } from '@/components/ui/TextLink';
import { getSustainabilityPageBySlug, sustainabilityPillars } from '@/content/sustainability';

interface SustainabilityPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: SustainabilityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSustainabilityPageBySlug(slug);
  const pillar = sustainabilityPillars.find(p => p.slug === slug);

  if (!page || !pillar) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: pillar.title,
    description: pillar.summary,
  };
}

export async function generateStaticParams() {
  return sustainabilityPillars.map((pillar) => ({
    slug: pillar.slug,
  }));
}

export default async function SustainabilityDetailPage({
  params,
}: SustainabilityPageProps) {
  const { slug } = await params;
  const page = getSustainabilityPageBySlug(slug);
  const pillar = sustainabilityPillars.find(p => p.slug === slug);

  if (!page || !pillar) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="SUSTAINABILITY"
        title={page.heading}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sustainability', href: '/sustainability' },
          { label: pillar.title },
        ]}
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <p className="text-lg text-graphite leading-relaxed max-w-3xl">
              {page.body}
            </p>

            {page.points.length > 0 && (
              <div>
                <h2 className="font-display text-3xl text-basalt mb-6">
                  Key Principles
                </h2>
                <ul className="space-y-3">
                  {page.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-graphite text-lg"
                    >
                      <span className="text-copper font-bold mt-1 flex-shrink-0">
                        •
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {sustainabilityPillars
                .filter(p => p.slug !== slug)
                .map((otherPillar) => (
                  <TextLink
                    key={otherPillar.slug}
                    href={otherPillar.route}
                    className="text-base"
                    showIcon
                  >
                    {otherPillar.title}
                  </TextLink>
                ))}
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
