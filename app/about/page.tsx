import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Container, Section, Stack } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';
import { ImageWithFallback } from '@/components/media/ImageWithFallback';
import { Reveal } from '@/components/motion/Reveal';
import {
  StaggerReveal,
  StaggerItem,
} from '@/components/motion/StaggerReveal';
import {
  fadeLeftVariants,
  imageRevealVariants,
  cardRevealVariants,
  fadeUpVariants,
} from '@/components/motion/motion-tokens';
import { companyInfo } from '@/content/site';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Deep Rock Mining Ltd is a Ghanaian company focused on responsible precious minerals trading, operational excellence and sustainable value.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Responsible Trading. Capable Operations. Long-Term Value."
        summary="Deep Rock Mining Ltd is a wholly Ghanaian precious minerals trading and mining company focused on responsible commercial relationships, operational excellence and sustainable value."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
      />

      <Section className="bg-white">
        <Container variant="wide">
          <Stack gap="xl">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
              <Reveal
                variants={fadeLeftVariants}
                mobileVariants={fadeUpVariants}
                className="lg:col-span-5"
              >
                <h2 className="mb-6 font-display text-4xl text-basalt md:text-5xl">
                  Company Overview
                </h2>

                <div className="space-y-4 text-lg leading-relaxed text-graphite">
                  <p>{companyInfo.businessFocus}</p>

                  <p>
                    We work closely with licensed small-scale miners, mining communities,
                    investors, technical partners and institutions. Our aim is to provide
                    reliable market access and responsible service solutions while
                    operating with integrity, transparency and respect for applicable
                    requirements.
                  </p>
                </div>
              </Reveal>

              <Reveal
                variants={imageRevealVariants}
                mobileVariants={fadeUpVariants}
                delay={0.08}
                className="lg:col-span-7"
              >
                <div
                  className="
                    relative overflow-hidden rounded-lg bg-limestone
                    shadow-[0_20px_55px_rgba(49,59,69,0.14)]
                  "
                >
                  <ImageWithFallback
                    src="/images/overview.webp"
                    alt="Deep Rock Mining company operations overview"
                    width={1200}
                    height={900}
                    category="Company Overview"
                    layout="intrinsic"
                    className="block h-auto w-full object-contain"
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none absolute inset-x-0 bottom-0 h-1/3
                      bg-gradient-to-t from-black/20 to-transparent
                    "
                  />
                </div>
              </Reveal>
            </div>

            <Reveal variants={cardRevealVariants}>
              <div className="mt-3 bg-limestone p-8 md:p-12 rounded-lg lg:mt-0">
                <StaggerReveal>
                  <StaggerItem>
                    <h3 className="font-display text-3xl text-basalt mb-6">
                      Our Business Model
                    </h3>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="text-lg text-graphite mb-6">
                      Deep Rock combines commercial trading and aggregation with mining, exploration and support services. This integrated model allows prospective partners to begin with one clearly defined need and understand the related capabilities available across the company.
                    </p>
                  </StaggerItem>
                  <div className="grid md:grid-cols-2 gap-6">
                    <StaggerItem>
                      <div>
                        <h4 className="mb-3 font-display text-[23px] leading-[1.2] text-copper">
                          Vision
                        </h4>
                        <p className="leading-relaxed text-graphite">{companyInfo.vision}</p>
                      </div>
                    </StaggerItem>
                    <StaggerItem>
                      <div>
                        <h4 className="mb-3 font-display text-[23px] leading-[1.2] text-copper">
                          Mission
                        </h4>
                        <p className="leading-relaxed text-graphite">{companyInfo.mission}</p>
                      </div>
                    </StaggerItem>
                  </div>
                </StaggerReveal>
              </div>
            </Reveal>

            <nav
              aria-label="About Deep Rock"
              className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <StaggerReveal
                className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
                staggerBy={0.12}
                delayChildren={0.06}
              >
                <StaggerItem className="w-full sm:w-auto">
                  <ButtonLink
                    href="/about/mission-vision-values"
                    variant="bright-pattern"
                    size="lg"
                    className="w-full justify-center sm:w-auto"
                  >
                    Our Mission, Vision & Values
                  </ButtonLink>
                </StaggerItem>

                <StaggerItem className="w-full sm:w-auto">
                  <ButtonLink
                    href="/about/leadership"
                    variant="dark-pattern"
                    size="lg"
                    className="w-full justify-center sm:w-auto"
                  >
                    Meet Our Leadership
                  </ButtonLink>
                </StaggerItem>
              </StaggerReveal>
            </nav>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
