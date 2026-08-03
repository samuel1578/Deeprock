import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { companyInfo, coreValues } from '@/content/site';

export const metadata: Metadata = {
  title: 'Mission, Vision & Values',
  description: 'DeepRock Mining Ltd is guided by a clear vision, a focused mission and core values that place responsibility alongside operational progress.',
};

export default function MissionVisionValuesPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT"
        title="The Direction and Principles Behind DeepRock."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Mission, Vision & Values' },
        ]}
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            {/* Vision */}
            <div className="bg-limestone p-8 md:p-12 rounded-lg">
              <h2 className="font-display text-3xl text-basalt mb-4">Vision</h2>
              <p className="text-lg text-graphite leading-relaxed">
                {companyInfo.vision}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-copper text-white p-8 md:p-12 rounded-lg">
              <h2 className="font-display text-3xl mb-4">Mission</h2>
              <p className="text-lg text-clay leading-relaxed">
                {companyInfo.mission}
              </p>
            </div>

            {/* Values */}
            <div>
              <h2 className="font-display text-3xl text-basalt mb-8">
                Core Values
              </h2>
              <p className="text-lg text-graphite mb-8">
                Our values guide how we communicate, make decisions, manage risk and build relationships. They should be visible in everyday conduct, not limited to statements on a page.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {coreValues.map((value) => (
                  <div key={value} className="bg-limestone p-6 rounded-lg text-center">
                    <h3 className="font-display text-lg text-basalt">
                      {value}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
