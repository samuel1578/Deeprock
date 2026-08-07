import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo/metadata';
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { CompanyIntroSection } from '@/components/sections/CompanyIntroSection';
import { GoldPriceSection } from '@/components/sections/home/GoldPriceSection';
import { MobileServicesCarousel } from '@/components/sections/home/MobileServicesCarousel';
import { MobileValuesCarousel } from '@/components/sections/home/MobileValuesCarousel';
import { CsrSection } from '@/components/sections/home/CsrSection';
import { GallerySection } from '@/components/sections/home/GallerySection';
import { Container, Section, Stack, Inline } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { ImageWithFallback } from '@/components/media/ImageWithFallback';
import { heroSlides, companyIntroductionContent, partnershipCTAContent, coreValuesContent } from '@/content/homepage';
import { services } from '@/content/services';
import { leadershipFeaturedPerson, leadershipCompanyDirectionStatement } from '@/content/leadership';
import { BrandGlowText } from '@/components/ui/BrandGlowText';
import { ServiceGlyph } from '@/components/icons/ServiceGlyph'
import { ValueGlyph } from '@/components/icons/ValueGlyph'
import { Reveal } from '@/components/motion/Reveal'
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal'
import {
  homepageEyebrowVariants,
  homepageHeadingVariants,
  homepageBodyVariants,
  homepageCtaVariants,
  homepageCardVariants,
  homepageImageVariants,
  fadeUpVariants,
} from '@/components/motion/motion-tokens'
import { cn } from '@/lib/utils'
import { WhatsappIcon } from '@/components/icons/WhatsappIcon'

/**
 * Caching: static shell with a revalidating data dependency.
 *
 * Every section on this page is built from local content modules and local images
 * except <GoldPriceSection />, which awaits `fetchGoldMarketData()`. That fetch opts
 * into the Next.js Data Cache with `next: { revalidate: 300 }` (see
 * `GOLD_REVALIDATE_SECONDS` in `lib/market/gold-api.ts`), which already gives this
 * route a 5-minute revalidation window.
 *
 * The literal below only restates that inherited window so the intent is explicit in
 * the route and so the page still self-heals on a 5-minute cycle if the gold provider
 * is unreachable during a build. Keep it in sync with `GOLD_REVALIDATE_SECONDS`
 * (route config must be a static literal, so it cannot import the constant).
 *
 * `dynamic = 'force-static'` is deliberately NOT used here: it would pin the segment
 * to `revalidate: false` and freeze the server-rendered gold price at build time.
 */
export const revalidate = 300;

export const metadata: Metadata = buildSeoMetadata({
  // No title: the root layout's default title applies (avoids template double-append).
  description:
    'Deep Rock Mining Co. Ltd is a Ghana-based mining company providing gold aggregation, precious minerals trading, mining operations, mineral exploration, equipment supply, geological consulting and responsible mining services.',
  path: '/',
});

export default function HomePage() {
  const featuredServices = services.slice(0, 4);

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
            <StaggerReveal staggerBy={0.1} delayChildren={0.04}>
              <div className="max-w-2xl">
                <StaggerItem variants={homepageEyebrowVariants}>
                  <p className="text-sm font-medium uppercase tracking-wide text-copper mb-4">
                    SERVICES
                  </p>
                </StaggerItem>
                <StaggerItem variants={homepageHeadingVariants}>
                  <h2 className="font-display text-4xl md:text-5xl text-basalt mb-6">
                    Integrated Services Across Trading, Mining and Technical Operations.
                  </h2>
                </StaggerItem>
                <StaggerItem variants={homepageBodyVariants}>
                  <p className="text-lg text-graphite">
                    <BrandGlowText text="Explore Deep Rock's service portfolio across gold trading, aggregation, mining, exploration, equipment, technical consulting, environmental responsibility and mining support." />
                  </p>
                </StaggerItem>
              </div>
            </StaggerReveal>

            <Reveal className="md:hidden" variants={fadeUpVariants}>
              <MobileServicesCarousel services={featuredServices} />
            </Reveal>

            <StaggerReveal
              className="hidden md:grid md:grid-cols-2 gap-6"
              staggerBy={0.1}
              delayChildren={0.05}
            >
              {featuredServices.map((service) => (
                <StaggerItem key={service.id} className="h-full" variants={homepageCardVariants}>
                  <article
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
                </StaggerItem>
              ))}
            </StaggerReveal>

            <Reveal className="flex flex-col" variants={homepageCtaVariants}>
              <ButtonLink href="/services" variant="bright-pattern" size="lg">
                View All Services
              </ButtonLink>
            </Reveal>
          </Stack>
        </Container>
      </Section>

      {/* Core Values */}
      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <StaggerReveal staggerBy={0.1} delayChildren={0.04}>
              <div className="max-w-2xl">
                <StaggerItem variants={homepageEyebrowVariants}>
                  <p className="text-sm font-medium uppercase tracking-wide text-copper mb-4">
                    {coreValuesContent.eyebrow}
                  </p>
                </StaggerItem>
                <StaggerItem variants={homepageHeadingVariants}>
                  <h2 className="font-display text-4xl md:text-5xl text-basalt">
                    {coreValuesContent.heading}
                  </h2>
                </StaggerItem>
              </div>
            </StaggerReveal>

            <MobileValuesCarousel
              values={[coreValuesContent.featured, ...coreValuesContent.supporting]}
              animated
            />

            <StaggerReveal
              className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              staggerBy={0.09}
              delayChildren={0.05}
            >
              {[coreValuesContent.featured, ...coreValuesContent.supporting].map((value) => (
                <StaggerItem key={value.key} className="h-full" variants={homepageCardVariants}>
                  <article
                    className={cn(
                      'group h-full p-8 rounded-lg flex flex-col transition-all duration-300 hover:shadow-lg',
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
                </StaggerItem>
              ))}
            </StaggerReveal>
          </Stack>
        </Container>
      </Section>

      {/* Leadership Feature */}
      <Section className="overflow-x-clip bg-white">
        <Container variant="wide">
          <div className="grid min-w-0 gap-10 md:grid-cols-2 md:items-center md:gap-12">
            <StaggerReveal className="min-w-0" staggerBy={0.1} delayChildren={0.04}>
              <Stack gap="lg" className="min-w-0">
                <StaggerItem variants={homepageEyebrowVariants}>
                  <p className="text-sm font-medium uppercase tracking-wide text-clay">
                    LEADERSHIP
                  </p>
                </StaggerItem>
                <StaggerItem variants={homepageHeadingVariants}>
                  <h2 className="break-words font-display text-4xl leading-tight text-basalt md:text-5xl">
                    Experienced Leadership Across Trading, Operations and Technical Services.
                  </h2>
                </StaggerItem>
                <StaggerItem variants={homepageBodyVariants}>
                  <p className="text-lg text-black">
                    {leadershipCompanyDirectionStatement}
                  </p>
                </StaggerItem>
                <StaggerItem variants={homepageCtaVariants} className="flex flex-col">
                  <ButtonLink
                    href="/about/leadership"
                    variant="bright-pattern"
                    size="lg"
                    className="w-full justify-center px-8 sm:w-auto"
                  >
                    Meet the team
                  </ButtonLink>
                </StaggerItem>
              </Stack>
            </StaggerReveal>

            {leadershipFeaturedPerson && (
              <StaggerReveal className="flex min-w-0 flex-col" staggerBy={0.1} delayChildren={0.08}>
                <StaggerItem variants={homepageImageVariants}>
                  <ImageWithFallback
                    src={leadershipFeaturedPerson.image}
                    alt={leadershipFeaturedPerson.name}
                    width={900}
                    height={1200}
                    category="Team"
                    objectFit="contain"
                    layout="intrinsic"
                    className="mb-6 rounded-lg"
                  />
                </StaggerItem>
                <StaggerItem variants={homepageBodyVariants}>
                  <h3 className="mb-1 font-display text-2xl font-bold text-basalt">
                    {leadershipFeaturedPerson.name}
                  </h3>
                  <p className="text-sm font-bold uppercase tracking-wide text-copper">
                    {leadershipFeaturedPerson.role}
                  </p>
                </StaggerItem>
              </StaggerReveal>
            )}
          </div>
        </Container>
      </Section>

      {/* CSR */}
      <CsrSection />

      {/* Gallery */}
      <GallerySection />

      {/* Partnership CTA */}
      <Section className="bg-copper text-white">
        <Container variant="reading">
          <StaggerReveal staggerBy={0.11} delayChildren={0.06}>
            <Stack gap="lg" className="text-center">
              <StaggerItem variants={homepageHeadingVariants}>
                <h2 className="font-display text-4xl md:text-5xl">
                  {partnershipCTAContent.heading}
                </h2>
              </StaggerItem>
              <StaggerItem variants={homepageBodyVariants}>
                <p className="text-xl text-clay max-w-2xl">
                  {partnershipCTAContent.body}
                </p>
              </StaggerItem>
              <Inline className="justify-center" gap="lg">
                <StaggerItem variants={homepageCtaVariants}>
                  <ButtonLink
                    href={partnershipCTAContent.primaryCTA.href}
                    variant="bright-pattern"
                    size="lg"
                  >
                    {partnershipCTAContent.primaryCTA.label}
                  </ButtonLink>
                </StaggerItem>
                <StaggerItem variants={homepageCtaVariants}>
                  <ButtonLink
                    href={partnershipCTAContent.secondaryCTA.href}
                    variant="whatsapp-pattern"
                    size="lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    iconLeft={<WhatsappIcon className="size-5 shrink-0" />}
                    className="w-full justify-center sm:w-auto"
                  >
                    {partnershipCTAContent.secondaryCTA.label}
                  </ButtonLink>
                </StaggerItem>
              </Inline>
            </Stack>
          </StaggerReveal>
        </Container>
      </Section>
    </>
  );
}
