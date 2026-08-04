import type { Metadata } from 'next';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { CompanyIntroSection } from '@/components/sections/CompanyIntroSection';
import { GoldPriceSection } from '@/components/sections/home/GoldPriceSection';
import { MobileServicesCarousel } from '@/components/sections/home/MobileServicesCarousel';
import { MobileValuesCarousel } from '@/components/sections/home/MobileValuesCarousel';
import { MobileNewsCarousel } from '@/components/sections/home/MobileNewsCarousel';
import { Container, Section, Stack, Inline } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { TextLink } from '@/components/ui/TextLink';
import { ImageWithFallback } from '@/components/media/ImageWithFallback';
import { heroSlides, companyIntroductionContent, partnershipCTAContent, coreValuesContent } from '@/content/homepage';
import { services } from '@/content/services';
import { leadershipFeaturedPerson, leadershipCompanyDirectionStatement } from '@/content/leadership';
import { getLatestArticles } from '@/content/news';
import { BrandGlowText } from '@/components/ui/BrandGlowText';
import { ServiceGlyph } from '@/components/icons/ServiceGlyph'
import { ValueGlyph } from '@/components/icons/ValueGlyph'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'DeepRock Mining Ltd — Responsible Gold Trading & Mining',
  description: 'DeepRock Mining Ltd provides responsible gold trading, aggregation, mining, exploration and technical support services in Ghana.',
};

export default function HomePage() {
  const featuredServices = services.slice(0, 4);
  const latestNews = getLatestArticles(3);

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel slides={heroSlides} />

      {/* Company Introduction */}
      <CompanyIntroSection />

      {/* Gold Price Section */}
      <GoldPriceSection />

      {/* Services Overview */}
      <Section className="bg-limestone">
        <Container variant="wide">
          <Stack gap="xl">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-wide text-copper mb-4">
                SERVICES
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-basalt mb-6">
                Integrated Services Across Trading, Mining and Technical Operations.
              </h2>
              <p className="text-lg text-graphite">
                <BrandGlowText>Explore DeepRock&apos;s service portfolio across gold trading, aggregation, mining, exploration, equipment, technical consulting, environmental responsibility and mining support.</BrandGlowText>
              </p>
            </div>

            <MobileServicesCarousel services={featuredServices} />

            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {featuredServices.map((service) => (
                <article
                  key={service.id}
                  className="group relative bg-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 flex h-full flex-col overflow-hidden"
                >
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

                    <h3 className="font-display text-2xl text-basalt mb-3 transition-colors duration-300 group-hover:text-copper">
                      {service.name}
                    </h3>
                    <p className="text-graphite mb-6 line-clamp-2">
                      {service.summary}
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
              ))}
            </div>

            <ButtonLink href="/services" variant="bright-pattern" size="lg">
              View All Services
            </ButtonLink>
          </Stack>
        </Container>
      </Section>

      {/* Core Values */}
      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-wide text-copper mb-4">
                {coreValuesContent.eyebrow}
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-basalt">
                {coreValuesContent.heading}
              </h2>
            </div>

            <MobileValuesCarousel
              values={[coreValuesContent.featured, ...coreValuesContent.supporting]}
            />

            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[coreValuesContent.featured, ...coreValuesContent.supporting].map((value) => (
                <article
                  key={value.key}
                  className={cn(
                    'group p-8 rounded-lg flex flex-col transition-all duration-300 hover:shadow-lg',
                    value.variant === 'copper' ? 'bg-copper text-white' : 'bg-slate-card text-white'
                  )}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <ValueGlyph
                      valueKey={value.key}
                      variant={value.variant}
                    />
                    <h3 className="font-display text-white text-2xl lg:text-[26px] leading-tight pt-1">
                      {value.title}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      'text-base leading-relaxed',
                      value.variant === 'copper' ? 'text-white/90' : 'text-white/85'
                    )}
                  >
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </Stack>
        </Container>
      </Section>

      {/* Leadership Feature */}
      <Section className="bg-white">
        <Container variant="wide">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Stack gap="lg">
              <p className="text-sm font-medium uppercase tracking-wide text-clay">
                LEADERSHIP
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-basalt">
                Experienced Leadership Across Trading, Operations and Technical Services.
              </h2>
              <p className="text-lg text-black">
                {leadershipCompanyDirectionStatement}
              </p>
              <ButtonLink href="/about/leadership" variant="primary">
                Meet the team
              </ButtonLink>
            </Stack>

            {leadershipFeaturedPerson && (
              <div className="flex flex-col">
                <ImageWithFallback
                  src={leadershipFeaturedPerson.image}
                  alt={leadershipFeaturedPerson.name}
                  width={900}
                  height={1200}
                  category="Team"
                  objectFit="contain"
                  layout="intrinsic"
                  className="rounded-lg mb-6"
                />
                <h3 className="font-display text-2xl text-basalt mb-1 font-bold">
                  {leadershipFeaturedPerson.name}
                </h3>
                <p className="text-copper font-bold uppercase tracking-wide text-sm">
                  {leadershipFeaturedPerson.role}
                </p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Latest News */}
      {latestNews.length > 0 && (
        <Section className="bg-limestone">
          <Container variant="wide">
            <Stack gap="xl">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-wide text-copper mb-4">
                  INSIGHTS
                </p>
                <h2 className="font-display text-4xl md:text-5xl text-basalt">
                  Latest News & Insights
                </h2>
              </div>

              <MobileNewsCarousel articles={latestNews} />

              <div className="hidden md:grid md:grid-cols-3 gap-6">
                {latestNews.map((article) => (
                  <a
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className="group bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-stone overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-medium uppercase tracking-wide text-copper mb-2">
                        {article.category}
                      </p>
                      <h3 className="font-display text-xl text-basalt mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-graphite line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <TextLink href="/news" className="text-base">
                View all insights
              </TextLink>
            </Stack>
          </Container>
        </Section>
      )}

      {/* Partnership CTA */}
      <Section className="bg-copper text-white">
        <Container variant="reading">
          <Stack gap="lg" className="text-center">
            <h2 className="font-display text-4xl md:text-5xl">
              {partnershipCTAContent.heading}
            </h2>
            <p className="text-xl text-clay max-w-2xl">
              {partnershipCTAContent.body}
            </p>
            <Inline className="justify-center" gap="lg">
              <ButtonLink
                href={partnershipCTAContent.primaryCTA.href}
                variant="bright-pattern"
                size="lg"
              >
                {partnershipCTAContent.primaryCTA.label}
              </ButtonLink>
              <a
                href={partnershipCTAContent.secondaryCTA.href}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white hover:text-clay transition-colors"
              >
                {partnershipCTAContent.secondaryCTA.label}
              </a>
            </Inline>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
