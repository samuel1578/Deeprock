'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y } from 'swiper/modules'
import 'swiper/css'
import { Container, Section, Stack } from '@/components/layout/Container'
import { ButtonLink } from '@/components/ui/Button'
import { BrandGlowText } from '@/components/ui/BrandGlowText'
import { ImageWithFallback } from '@/components/media/ImageWithFallback'
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal'
import {
  homepageEyebrowVariants,
  homepageHeadingVariants,
  homepageBodyVariants,
  homepageCtaVariants,
  csrImageVariants,
  homepageGalleryImageVariants,
} from '@/components/motion/motion-tokens'
import { cn } from '@/lib/utils'
import {
  csrSectionContent,
  csrBrandHighlights,
  getFeaturedCsrEvent,
} from '@/content/csr'

const CSR_IMAGE_ALT = 'Deep Rock corporate social responsibility donation activity'
const CSR_IMAGE_ALT_SECONDARY = `${CSR_IMAGE_ALT} — additional view`

export function CsrSection() {
  const featured = getFeaturedCsrEvent()

  if (!featured) return null

  const images = featured.coverImages.slice(0, 2)

  return (
    <Section className="overflow-x-clip bg-white">
      <Container variant="wide">
        <Stack gap="xl">
          {/* Section intro */}
          <StaggerReveal staggerBy={0.09} delayChildren={0.05}>
            <div className="max-w-2xl">
              <StaggerItem variants={homepageEyebrowVariants}>
                <p className="text-sm font-medium uppercase tracking-wide text-copper mb-4">
                  {csrSectionContent.eyebrow}
                </p>
              </StaggerItem>
              <StaggerItem variants={homepageHeadingVariants}>
                <h2 className="font-display text-4xl md:text-5xl text-basalt mb-6">
                  {csrSectionContent.heading}
                </h2>
              </StaggerItem>
              <StaggerItem variants={homepageBodyVariants}>
                <p className="text-lg text-graphite">
                  <BrandGlowText
                    text={csrSectionContent.introduction}
                    highlights={csrBrandHighlights}
                  />
                </p>
              </StaggerItem>
            </div>
          </StaggerReveal>

          {/* Featured donation event */}
          <div className="grid min-w-0 gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            {/* Copy column */}
            <StaggerReveal className="min-w-0 lg:col-span-5" staggerBy={0.09} delayChildren={0.1}>
              <Stack gap="lg" className="min-w-0">
                <StaggerItem variants={homepageHeadingVariants}>
                  <h3 className="font-display text-2xl text-basalt md:text-3xl">
                    {featured.title}
                  </h3>
                </StaggerItem>
                <StaggerItem variants={homepageBodyVariants}>
                  <p className="text-lg text-graphite">
                    <BrandGlowText
                      text={featured.excerpt}
                      highlights={csrBrandHighlights}
                    />
                  </p>
                </StaggerItem>
                <StaggerItem variants={homepageCtaVariants} className="flex flex-col sm:flex-row">
                  <ButtonLink
                    href={`/csr/${featured.slug}`}
                    variant="bright-pattern"
                    size="lg"
                    className="w-full justify-center px-8 sm:w-auto"
                  >
                    Learn More
                  </ButtonLink>
                </StaggerItem>
              </Stack>
            </StaggerReveal>

            {/* Image column */}
            <StaggerReveal className="min-w-0 lg:col-span-7" staggerBy={0.1} delayChildren={0.15}>
              {/* Mobile: swipeable carousel — next image stays partially visible */}
              <div className="md:hidden">
                <Swiper
                  modules={[A11y]}
                  slidesPerView={1.08}
                  spaceBetween={14}
                  centeredSlides={false}
                  watchOverflow
                >
                  {images.map((image, idx) => (
                    <SwiperSlide key={image} className="h-auto">
                      <figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-limestone shadow-sm">
                        <StaggerItem
                          className="absolute inset-0"
                          variants={homepageGalleryImageVariants}
                        >
                          <ImageWithFallback
                            src={image}
                            alt={idx === 0 ? CSR_IMAGE_ALT : CSR_IMAGE_ALT_SECONDARY}
                            width={1200}
                            height={900}
                            category="CSR"
                            className="h-full w-full object-cover"
                          />
                        </StaggerItem>
                        <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
                      </figure>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Desktop: editorial two-image composition */}
              <div className="hidden grid-cols-2 items-start gap-4 md:grid">
                {images.map((image, idx) => (
                  <figure
                    key={image}
                    className={cn(
                      'relative aspect-[4/3] overflow-hidden rounded-lg bg-limestone shadow-sm',
                      idx === 1 && 'md:mt-10',
                    )}
                  >
                    <StaggerItem
                      className="absolute inset-0"
                      variants={csrImageVariants}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={idx === 0 ? CSR_IMAGE_ALT : CSR_IMAGE_ALT_SECONDARY}
                        width={1200}
                        height={900}
                        category="CSR"
                        className="h-full w-full object-cover"
                      />
                    </StaggerItem>
                    <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
                  </figure>
                ))}
              </div>
            </StaggerReveal>
          </div>
        </Stack>
      </Container>
    </Section>
  )
}
