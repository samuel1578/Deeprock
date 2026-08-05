'use client'

import { Container, Section, Stack } from '@/components/layout/Container'
import { BrandGlowText } from '@/components/ui/BrandGlowText'
import { galleryImages } from '@/content/gallery'
import { MediaGallery } from '@/components/gallery/MediaGallery'
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal'
import {
  homepageEyebrowVariants,
  homepageHeadingVariants,
  homepageBodyVariants,
  homepageGalleryImageVariants,
} from '@/components/motion/motion-tokens'

export function GallerySection() {
  return (
    <Section id="gallery" className="bg-limestone scroll-mt-24 lg:scroll-mt-32">
      <Container variant="wide">
        <Stack gap="xl">
          <StaggerReveal staggerBy={0.1} delayChildren={0.04}>
            <div className="max-w-2xl">
              <StaggerItem variants={homepageEyebrowVariants}>
                <p className="text-sm font-medium uppercase tracking-wide text-copper mb-4">
                  Gallery
                </p>
              </StaggerItem>
              <StaggerItem variants={homepageHeadingVariants}>
                <h2 className="font-display text-4xl md:text-5xl text-basalt mb-6">
                  A Closer Look at Our Operations.
                </h2>
              </StaggerItem>
              <StaggerItem variants={homepageBodyVariants}>
                <p className="text-lg text-graphite">
                  <BrandGlowText text="A visual record of Deep Rock's trading, aggregation and mining activity across the World." />
                </p>
              </StaggerItem>
            </div>
          </StaggerReveal>

          {/* Shared gallery: portrait cards, clickable images, dots + desktop arrows */}
          <StaggerReveal className="relative" staggerBy={0.06} delayChildren={0.12}>
            <MediaGallery
              images={galleryImages}
              slidesPerView={1}
              spaceBetween={24}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
              slideButtonClassName="relative aspect-[3/4] overflow-hidden rounded-lg border border-stone/40 bg-quartz shadow-sm"
              slideMediaMotionClassName="absolute inset-0"
              slideVariants={homepageGalleryImageVariants}
              slideMediaClassName="h-full w-full object-cover"
              objectFit="cover"
              objectPosition={(image) => image.focus ?? 'center center'}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          </StaggerReveal>
        </Stack>
      </Container>
    </Section>
  )
}
