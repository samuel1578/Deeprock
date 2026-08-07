import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo/metadata';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { BrandText } from '@/components/ui/BrandText';
import { ServiceGlyph } from '@/components/icons/ServiceGlyph';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal';
import { fadeUpVariants } from '@/components/motion/motion-tokens';
import { services, servicesOverviewIntro } from '@/content/services';

export const metadata: Metadata = buildSeoMetadata({
  title: 'Our Services',
  description:
    "Explore Deep Rock's integrated services in Ghana — gold trading, gold aggregation, mining operations, mineral exploration, equipment supply, geological consulting, environmental services and mining support.",
  path: '/services',
});

export default function ServicesPage() {
  const categories = Array.from(new Set(services.map(s => s.category)));

  return (
    <>
      <PageHero
        motion
        eyebrow="SERVICES"
        title="Integrated Services Across Trading, Mining and Technical Operations."
        summary={
          <BrandText text="Explore Deep Rock's service portfolio across gold trading, aggregation, mining, exploration, equipment, technical consulting, environmental responsibility and mining support." />
        }
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
        path="/services"
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <Reveal variants={fadeUpVariants}>
              <p className="max-w-2xl text-lg text-graphite">
                {servicesOverviewIntro}
              </p>
            </Reveal>

            {categories.map((category) => {
              const categoryServices = services.filter(s => s.category === category);
              return (
                <div key={category}>
                  <h3 className="font-display text-2xl text-basalt mb-6">
                    {category}
                  </h3>
                  <StaggerReveal
                    staggerBy={0.08}
                    delayChildren={0.05}
                    className="grid md:grid-cols-2 gap-6 mb-12"
                  >
                    {categoryServices.map((service) => (
                      <StaggerItem key={service.id} className="h-full">
                        <article className="group relative bg-limestone p-6 md:p-8 rounded-lg flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-white">
                          {/* Geological Texture Layer */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-[url('/images/patterns/deeprock-card-grid.svg')] bg-repeat bg-[length:260px_auto] opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]"
                          />

                          <div className="relative z-10 flex flex-col h-full">
                            <div className="relative inline-block mb-6">
                              {/* Copper Glow Effect */}
                              <div className="absolute inset-0 bg-copper/20 blur-2xl rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                              <ServiceGlyph
                                serviceSlug={service.slug}
                                className="relative z-10 transition-transform duration-300 motion-safe:group-hover:rotate-[4deg] motion-safe:group-hover:scale-[1.04]"
                              />
                            </div>

                            <h4 className="font-display text-xl text-basalt mb-3 transition-colors duration-300 group-hover:text-copper">
                              {service.name}
                            </h4>
                            <p className="text-graphite mb-4">
                              <BrandText text={service.summary} />
                            </p>
                            <div className="mt-auto pt-6">
                              <ButtonLink
                                href={`/services/${service.slug}`}
                                variant="dark-pattern"
                                size="sm"
                              >
                                Learn More
                              </ButtonLink>
                            </div>
                          </div>
                        </article>
                      </StaggerItem>
                    ))}
                  </StaggerReveal>
                </div>
              );
            })}
          </Stack>
        </Container>
      </Section>
    </>
  );
}
