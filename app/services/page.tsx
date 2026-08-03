import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { BrandGlowText } from '@/components/ui/BrandGlowText';
import { services, servicesOverviewIntro } from '@/content/services';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'DeepRock Mining Ltd provides integrated services across gold trading, aggregation, mining operations, exploration and technical support.',
};

export default function ServicesPage() {
  const categories = Array.from(new Set(services.map(s => s.category)));

  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title="Integrated Services Across Trading, Mining and Technical Operations."
        summary={<BrandGlowText>Explore DeepRock&apos;s service portfolio across gold trading, aggregation, mining, exploration, equipment, technical consulting, environmental responsibility and mining support.</BrandGlowText>}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <p className="max-w-2xl text-lg text-graphite">
              {servicesOverviewIntro}
            </p>

            {categories.map((category) => {
              const categoryServices = services.filter(s => s.category === category);
              return (
                <div key={category}>
                  <h3 className="font-display text-2xl text-basalt mb-6">
                    {category}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {categoryServices.map((service) => (
                      <article
                        key={service.id}
                        className="bg-limestone p-6 md:p-8 rounded-lg flex h-full flex-col"
                      >
                        <div>
                          <h4 className="font-display text-xl text-basalt mb-3">
                            {service.name}
                          </h4>
                          <p className="text-graphite mb-4">
                            {service.summary}
                          </p>
                        </div>
                        <div className="mt-auto pt-6">
                          <ButtonLink
                            href={`/services/${service.slug}`}
                            variant="dark-pattern"
                            size="sm"
                          >
                            Learn More
                          </ButtonLink>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </Stack>
        </Container>
      </Section>
    </>
  );
}
