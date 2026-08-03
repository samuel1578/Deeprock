import type { Metadata } from 'next';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { CompanyIntroSection } from '@/components/sections/CompanyIntroSection';
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
                  className="bg-white p-6 md:p-8 rounded-lg hover:shadow-lg transition-shadow flex h-full flex-col"
                >
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-copper mb-3">
                      {service.category}
                    </p>
                    <h3 className="font-display text-2xl text-basalt mb-3">
                      {service.name}
                    </h3>
                    <p className="text-graphite mb-6 line-clamp-2">
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
              featured={coreValuesContent.featured}
              supporting={coreValuesContent.supporting}
            />

            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured Value */}
              <div className="md:col-span-2 lg:col-span-1 bg-copper text-white p-8 rounded-lg">
                <h3 className="font-display text-3xl mb-4">
                  {coreValuesContent.featured.title}
                </h3>
                <p className="text-clay">{coreValuesContent.featured.description}</p>
              </div>

              {/* Supporting Values */}
              {coreValuesContent.supporting.map((value) => (
                <div key={value.title} className="bg-limestone p-6 rounded-lg">
                  <h3 className="font-display text-xl text-basalt mb-3">
                    {value.title}
                  </h3>
                  <p className="text-graphite text-sm">{value.description}</p>
                </div>
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
              <TextLink href="/about/leadership" className="text-copper">
                Meet the team
              </TextLink>
            </Stack>

            {leadershipFeaturedPerson && (
              <div className="flex flex-col">
                <ImageWithFallback
                  src={leadershipFeaturedPerson.image}
                  alt={leadershipFeaturedPerson.name}
                  width={500}
                  height={600}
                  category="Team"
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
