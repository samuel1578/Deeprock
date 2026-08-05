'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y } from 'swiper/modules'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Container, Section, Stack } from '@/components/layout/Container'
import { BrandGlowText } from '@/components/ui/BrandGlowText'
import { GalleryImage } from '@/components/media/GalleryImage'
import { galleryImages } from '@/content/gallery'

export function GallerySection() {
  return (
    <Section id="gallery" className="bg-limestone scroll-mt-24 lg:scroll-mt-32">
      <Container variant="wide">
        <Stack gap="xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-wide text-copper mb-4">
              Gallery
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-basalt mb-6">
              A Closer Look at Our Operations.
            </h2>
            <p className="text-lg text-graphite">
              <BrandGlowText text="A visual record of Deep Rock's trading, aggregation and mining activity across Ghana." />
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation, A11y]}
              slidesPerView={1}
              spaceBetween={24}
              watchOverflow
              navigation={{ prevEl: '.gallery-home-prev', nextEl: '.gallery-home-next' }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="!pb-1"
            >
              {galleryImages.map((image) => (
                <SwiperSlide key={image.id} className="h-auto">
                  <figure className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-stone/40 bg-quartz shadow-sm">
                    <GalleryImage
                      image={image}
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-widest text-graphite/50">
                Swipe to explore
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous gallery images"
                  className="gallery-home-prev flex h-11 w-11 items-center justify-center rounded-full border border-stone/50 bg-white text-basalt transition-colors hover:border-copper hover:text-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2"
                >
                  <CaretLeft className="h-5 w-5" weight="bold" />
                </button>
                <button
                  type="button"
                  aria-label="Next gallery images"
                  className="gallery-home-next flex h-11 w-11 items-center justify-center rounded-full border border-stone/50 bg-white text-basalt transition-colors hover:border-copper hover:text-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2"
                >
                  <CaretRight className="h-5 w-5" weight="bold" />
                </button>
              </div>
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  )
}
