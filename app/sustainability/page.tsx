import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo/metadata';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { TextLink } from '@/components/ui/TextLink';
import { BrandText } from '@/components/ui/BrandText';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal';
import { fadeUpVariants } from '@/components/motion/motion-tokens';
import { sustainabilityPillars, sustainabilityOverviewContent } from '@/content/sustainability';

export const metadata: Metadata = buildSeoMetadata({
  title: 'Sustainability',
  description:
    'How Deep Rock Mining Co. Ltd integrates responsible sourcing, operational safety, environmental awareness and long-term community relationships across its Ghana operations.',
  path: '/sustainability',
});

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        motion
        eyebrow="SUSTAINABILITY"
        title={sustainabilityOverviewContent.heading}
        summary={<BrandText text={sustainabilityOverviewContent.summary} />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Sustainability' },
        ]}
        path="/sustainability"
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <Reveal variants={fadeUpVariants}>
              <p className="max-w-2xl text-lg text-graphite">
                <BrandText text={sustainabilityOverviewContent.introduction} />
              </p>
            </Reveal>

            <StaggerReveal
              staggerBy={0.1}
              delayChildren={0.05}
              className="grid md:grid-cols-3 gap-6"
            >
              {sustainabilityPillars.map((pillar) => (
                <StaggerItem key={pillar.slug} className="h-full">
                  <a
                    href={pillar.route}
                    className="group flex h-full flex-col bg-limestone p-8 rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-display text-2xl text-basalt mb-3 group-hover:text-copper transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-graphite mb-6">{pillar.summary}</p>
                    <span className="mt-auto">
                      <TextLink href={pillar.route}>Learn more</TextLink>
                    </span>
                  </a>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
