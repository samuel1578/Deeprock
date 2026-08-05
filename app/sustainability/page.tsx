import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { TextLink } from '@/components/ui/TextLink';
import { sustainabilityPillars, sustainabilityOverviewContent } from '@/content/sustainability';

export const metadata: Metadata = {
  title: 'Sustainability',
  description: 'Deep Rock Mining Ltd is committed to responsible gold trading, operational safety, environmental responsibility and community relationships.',
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="SUSTAINABILITY"
        title={sustainabilityOverviewContent.heading}
        summary={sustainabilityOverviewContent.summary}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sustainability' },
        ]}
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <p className="max-w-2xl text-lg text-graphite">
              {sustainabilityOverviewContent.introduction}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {sustainabilityPillars.map((pillar) => (
                <a
                  key={pillar.slug}
                  href={pillar.route}
                  className="group bg-limestone p-8 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-display text-2xl text-basalt mb-3 group-hover:text-copper transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-graphite mb-6">{pillar.summary}</p>
                  <TextLink href={pillar.route}>Learn more</TextLink>
                </a>
              ))}
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
