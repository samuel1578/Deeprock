'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, Thumbs, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper/types'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Container } from '@/components/layout/Container'
import { BrandGlowText } from '@/components/ui/BrandGlowText'
import { GalleryImage } from '@/components/media/GalleryImage'
import { galleryImages } from '@/content/gallery'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const pad = (n: number) => String(n).padStart(2, '0')

export default function GalleryPage() {
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [thumbs, setThumbs] = useState<SwiperClass | null>(null)
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null)

  const goTo = (idx: number) => {
    setActiveIndex(idx)
    mainSwiper?.slideToLoop(idx)
  }

  const entrance = reduceMotion
    ? { initial: false as const, animate: {} }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
      }

  const counterMotion = reduceMotion
    ? { initial: false as const, animate: {} }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.35, ease: 'easeOut' as const },
      }

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="bg-white py-16 sm:py-24 lg:py-32">
          <Container variant="standard">
            <motion.div
              {...entrance}
              className="mx-auto mb-12 max-w-2xl text-center"
            >
              <p className="mb-4 text-sm font-medium uppercase tracking-wide text-copper">
                Gallery
              </p>
              <h1 className="font-display text-4xl text-basalt sm:text-5xl">
                A Closer Look at Our Operations.
              </h1>
              <p className="mt-6 text-lg text-graphite">
                <BrandGlowText>
                  A visual record of DeepRock&apos;s trading, aggregation and mining activity across Ghana.
                </BrandGlowText>
              </p>
            </motion.div>

            <div className="mx-auto max-w-5xl">
              <motion.div
                {...(reduceMotion
                  ? { initial: false as const, animate: {} }
                  : {
                      initial: { opacity: 0, y: 32 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
                    })}
              >
                <div className="relative">
                  <Swiper
                    modules={[Navigation, A11y, Thumbs, Keyboard]}
                    slidesPerView={1.15}
                    centeredSlides
                    spaceBetween={24}
                    grabCursor
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    watchOverflow
                    navigation={{ prevEl: '.gallery-main-prev', nextEl: '.gallery-main-next' }}
                    thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
                    onSwiper={setMainSwiper}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  >
                    {galleryImages.map((image) => (
                      <SwiperSlide key={image.id} className="h-auto">
                        <figure className="relative aspect-[4/5] overflow-hidden rounded-lg border border-stone/40 bg-quartz shadow-lg">
                          <GalleryImage
                            image={image}
                            sizes="(min-width: 1024px) 640px, 90vw"
                            priority={image.id === galleryImages[0].id}
                          />
                        </figure>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <button
                    type="button"
                    aria-label="Previous image"
                    className="gallery-main-prev absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-stone/40 bg-white/95 text-basalt shadow-md transition-colors hover:border-copper hover:text-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2"
                  >
                    <ArrowLeft className="h-6 w-6" weight="bold" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    className="gallery-main-next absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-stone/40 bg-white/95 text-basalt shadow-md transition-colors hover:border-copper hover:text-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2"
                  >
                    <ArrowRight className="h-6 w-6" weight="bold" />
                  </button>
                </div>

                <div className="mt-5 flex items-center justify-center gap-3 text-sm text-graphite">
                  <span className="font-display text-lg text-basalt" aria-hidden="true">
                    {pad(activeIndex + 1)}
                  </span>
                  <span className="text-stone" aria-hidden="true">
                    /
                  </span>
                  <span className="font-display text-lg text-basalt" aria-hidden="true">
                    {pad(galleryImages.length)}
                  </span>
                  <span className="sr-only" aria-live="polite">
                    Image {activeIndex + 1} of {galleryImages.length}: {galleryImages[activeIndex]?.caption ?? galleryImages[activeIndex]?.alt}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span key={activeIndex} {...counterMotion} className="ml-3 max-w-[420px] truncate text-graphite">
                      {galleryImages[activeIndex]?.caption ?? galleryImages[activeIndex]?.alt}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              <div className="mt-8">
                <Swiper
                  onSwiper={setThumbs}
                  modules={[Thumbs]}
                  slidesPerView={4}
                  spaceBetween={16}
                  watchOverflow
                  breakpoints={{
                    640: { slidesPerView: 5, spaceBetween: 16 },
                    768: { slidesPerView: 6, spaceBetween: 16 },
                    1024: { slidesPerView: 7, spaceBetween: 16 },
                  }}
                  className="gallery-thumbs"
                >
                  {galleryImages.map((image, idx) => (
                    <SwiperSlide key={image.id} className="h-auto">
                      <button
                        type="button"
                        onClick={() => goTo(idx)}
                        aria-label={`Show image ${idx + 1}: ${image.caption ?? image.alt}`}
                        aria-current={activeIndex === idx}
                        className={`relative block aspect-[4/5] w-full overflow-hidden rounded-md border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 ${
                          activeIndex === idx
                            ? 'border-copper opacity-100'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <GalleryImage image={image} sizes="(min-width: 1024px) 120px, 18vw" />
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
