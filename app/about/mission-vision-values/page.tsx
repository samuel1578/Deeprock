import type { Metadata } from 'next';
import { buildSeoMetadata } from '@/lib/seo/metadata';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { DirectionCard } from '@/components/sections/about/DirectionCard';
import { MobileValuesCarousel } from '@/components/sections/home/MobileValuesCarousel';
import { ValueGlyph } from '@/components/icons/ValueGlyph';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal';
import { cn } from '@/lib/utils';
import { companyInfo } from '@/content/site';
import { coreValuesContent, type ValueItem } from '@/content/homepage';
import {
  valueCardVariants,
  fadeUpVariants,
} from '@/components/motion/motion-tokens';

/**
 * Caching: fully static editorial route.
 * Content is sourced from local modules (`@/content/site`, `@/content/homepage`) and
 * local pattern images. The Framer Motion pieces are Client Components and do not
 * make this route server-rendered on demand. Refreshed by deployment only.
 */
export const dynamic = 'force-static';

export const metadata: Metadata = buildSeoMetadata({
  title: 'Mission, Vision & Values',
  description:
    'The vision, mission and core values guiding Deep Rock Mining Co. Ltd — responsibility, safety, transparency and long-term value across trading and mining in Ghana.',
  path: '/about/mission-vision-values',
});

type DirectionCardVariant = 'vision' | 'mission';

interface DirectionCardConfig {
  key: DirectionCardVariant;
  title: string;
  statement: string;
  supportingSentence: string;
  backgroundImage: string;
}

const directionCards: DirectionCardConfig[] = [
  {
    key: 'vision',
    title: 'Vision',
    statement: companyInfo.vision,
    supportingSentence:
      'We aim to build enduring value through responsible growth, trusted partnerships and disciplined operations.',
    backgroundImage: '/images/patterns/aya.png',
  },
  {
    key: 'mission',
    title: 'Mission',
    statement: companyInfo.mission,
    supportingSentence:
      'We translate this purpose into practical action through accountable service delivery, technical capability and responsible market participation.',
    backgroundImage: '/images/patterns/bi.png',
  },
];

const coreValueItems: ValueItem[] = [
  coreValuesContent.featured,
  ...coreValuesContent.supporting,
];

export default function MissionVisionValuesPage() {
  return (
    <>
      <PageHero
        title="The Direction and Principles Behind Deep Rock."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Mission, Vision & Values' },
        ]}
        path="/about/mission-vision-values"
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              {directionCards.map((card) => (
                <Reveal
                  key={card.key}
                  variants={fadeUpVariants}
                  delay={card.key === 'mission' ? 0.08 : 0}
                >
                  <DirectionCard
                    variant={card.key}
                    title={card.title}
                    statement={card.statement}
                    supportingSentence={card.supportingSentence}
                    backgroundImage={card.backgroundImage}
                  />
                </Reveal>
              ))}
            </div>

            {/* Values */}
            <div>
              <StaggerReveal>
                <StaggerItem>
                  <h2 className="mb-8 font-display text-3xl text-basalt">
                    Core Values
                  </h2>
                </StaggerItem>
                <StaggerItem>
                  <p className="mb-8 max-w-3xl text-lg leading-relaxed text-graphite">
                    Our values guide how we communicate, make decisions, manage risk and build relationships. They should be visible in everyday conduct, not limited to statements on a page.
                  </p>
                </StaggerItem>
              </StaggerReveal>

              <MobileValuesCarousel values={coreValueItems} animated />

              <StaggerReveal
                className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3"
                staggerBy={0.1}
                delayChildren={0.05}
              >
                {coreValueItems.map((value) => (
                  <StaggerItem key={value.key} variants={valueCardVariants}>
                    <article
                      className={cn(
                        'relative flex h-full flex-col overflow-hidden rounded-lg p-6 md:p-8',
                        value.variant === 'copper'
                          ? 'bg-copper text-white'
                          : 'bg-slate-card text-white',
                      )}
                    >
                      <ValueGlyph valueKey={value.key} variant={value.variant} />

                      <h3 className="mt-5 font-display text-[24px] leading-[1.2] text-white md:text-[26px]">
                        {value.title}
                      </h3>

                      <p
                        className={cn(
                          'mt-3 text-base leading-[1.6] md:text-lg',
                          value.variant === 'copper'
                            ? 'text-white/90'
                            : 'text-white/85',
                        )}
                      >
                        {value.description}
                      </p>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
