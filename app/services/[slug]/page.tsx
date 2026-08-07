import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildSeoMetadata } from '@/lib/seo/metadata';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { BrandText } from '@/components/ui/BrandText';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal';
import {
  fadeUpVariants,
  homepageSectionVariants,
} from '@/components/motion/motion-tokens';
import { getServiceBySlug } from '@/content/services';
import { siteConfig } from '@/lib/seo/site-config';

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return buildSeoMetadata({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export async function generateStaticParams() {
  const { services } = await import('@/content/services');
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero
        motion
        eyebrow={service.category.toUpperCase()}
        title={service.name}
        summary={<BrandText text={service.summary} />}
        image={service.image}
        imageAlt={`${service.name} in Ghana — ${siteConfig.shortName} services`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
        path={`/services/${service.slug}`}
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <Reveal variants={fadeUpVariants}>
              <div>
                <h2 className="font-display text-3xl text-basalt mb-6">
                  Overview
                </h2>
                <p className="text-lg text-graphite leading-relaxed">
                  <BrandText text={service.overview} />
                </p>
              </div>
            </Reveal>

            {service.capabilities.length > 0 && (
              <StaggerReveal staggerBy={0.06} delayChildren={0.05}>
                <StaggerItem variants={homepageSectionVariants}>
                  <h3 className="font-display text-2xl text-basalt mb-4">
                    Capabilities
                  </h3>
                </StaggerItem>
                <ul className="grid md:grid-cols-2 gap-3">
                  {service.capabilities.map((capability) => (
                    <li key={capability}>
                      <StaggerItem className="flex items-start gap-3 text-graphite">
                        <span className="text-copper font-bold mt-1">•</span>
                        <span>
                          <BrandText text={capability} />
                        </span>
                      </StaggerItem>
                    </li>
                  ))}
                </ul>
              </StaggerReveal>
            )}

            {service.targetAudience.length > 0 && (
              <StaggerReveal staggerBy={0.06} delayChildren={0.05}>
                <StaggerItem variants={homepageSectionVariants}>
                  <h3 className="font-display text-2xl text-basalt mb-4">
                    Who This Service Is For
                  </h3>
                </StaggerItem>
                <ul className="grid md:grid-cols-2 gap-3">
                  {service.targetAudience.map((audience) => (
                    <li key={audience}>
                      <StaggerItem className="flex items-start gap-3 text-graphite">
                        <span className="text-copper font-bold mt-1">•</span>
                        <span>{audience}</span>
                      </StaggerItem>
                    </li>
                  ))}
                </ul>
              </StaggerReveal>
            )}

            {service.engagementSteps.length > 0 && (
              <StaggerReveal staggerBy={0.08} delayChildren={0.05}>
                <StaggerItem variants={homepageSectionVariants}>
                  <h3 className="font-display text-2xl text-basalt mb-6">
                    Engagement Process
                  </h3>
                </StaggerItem>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {service.engagementSteps.map((step, idx) => (
                    <StaggerItem key={idx} className="h-full">
                      <div className="bg-limestone p-4 rounded-lg text-center h-full">
                        <div className="font-display text-copper text-2xl mb-2">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-graphite">{step}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerReveal>
            )}

            <Reveal variants={fadeUpVariants}>
              <div className="bg-copper text-white p-8 md:p-12 rounded-lg">
                <h3 className="font-display text-2xl mb-4">
                  {service.ctaHeading}
                </h3>
                <ButtonLink
                  href={service.ctaLink}
                  variant="secondary"
                  size="lg"
                >
                  Make an Enquiry
                </ButtonLink>
              </div>
            </Reveal>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
