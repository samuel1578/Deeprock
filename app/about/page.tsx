import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { TextLink } from '@/components/ui/TextLink';
import { companyInfo } from '@/content/site';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'DeepRock Mining Ltd is a Ghanaian company focused on responsible precious minerals trading, operational excellence and sustainable value.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT DEEPROCK"
        title="Responsible Trading. Capable Operations. Long-Term Value."
        summary="DeepRock Mining Ltd is a wholly Ghanaian precious minerals trading and mining company focused on responsible commercial relationships, operational excellence and sustainable value."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl md:text-5xl text-basalt mb-6">
                Company Overview
              </h2>
              <div className="space-y-4 text-lg text-graphite">
                <p>
                  {companyInfo.businessFocus}
                </p>
                <p>
                  We work closely with licensed small-scale miners, mining communities, investors, technical partners and institutions. Our aim is to provide reliable market access and responsible service solutions while operating with integrity, transparency and respect for applicable requirements.
                </p>
              </div>
            </div>

            <div className="bg-limestone p-8 md:p-12 rounded-lg">
              <h3 className="font-display text-3xl text-basalt mb-6">
                Our Business Model
              </h3>
              <p className="text-lg text-graphite mb-6">
                DeepRock combines commercial trading and aggregation with mining, exploration and support services. This integrated model allows prospective partners to begin with one clearly defined need and understand the related capabilities available across the company.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-display text-xl text-basalt mb-3">Vision</h4>
                  <p className="text-graphite">{companyInfo.vision}</p>
                </div>
                <div>
                  <h4 className="font-display text-xl text-basalt mb-3">Mission</h4>
                  <p className="text-graphite">{companyInfo.mission}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <TextLink href="/about/mission-vision-values" showIcon>
                Our Mission, Vision & Values
              </TextLink>
              <TextLink href="/about/leadership" showIcon>
                Meet Our Leadership
              </TextLink>
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
