import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { ImageWithFallback } from '@/components/media/ImageWithFallback';
import { getServiceBySlug } from '@/content/services';

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

  return {
    title: `${service.name} | Deep Rock Mining`,
    description: service.summary,
  };
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
        eyebrow={service.category.toUpperCase()}
        title={service.name}
        summary={service.summary}
        image={service.image}
        imageAlt={service.name}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <div>
              <h2 className="font-display text-3xl text-basalt mb-6">
                Overview
              </h2>
              <p className="text-lg text-graphite leading-relaxed">
                {service.overview}
              </p>
            </div>

            {service.capabilities.length > 0 && (
              <div>
                <h3 className="font-display text-2xl text-basalt mb-4">
                  Capabilities
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {service.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-start gap-3 text-graphite"
                    >
                      <span className="text-copper font-bold mt-1">•</span>
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.targetAudience.length > 0 && (
              <div>
                <h3 className="font-display text-2xl text-basalt mb-4">
                  Who This Service Is For
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {service.targetAudience.map((audience) => (
                    <li
                      key={audience}
                      className="flex items-start gap-3 text-graphite"
                    >
                      <span className="text-copper font-bold mt-1">•</span>
                      {audience}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.engagementSteps.length > 0 && (
              <div>
                <h3 className="font-display text-2xl text-basalt mb-6">
                  Engagement Process
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {service.engagementSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="bg-limestone p-4 rounded-lg text-center"
                    >
                      <div className="font-display text-copper text-2xl mb-2">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-graphite">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
          </Stack>
        </Container>
      </Section>
    </>
  );
}
