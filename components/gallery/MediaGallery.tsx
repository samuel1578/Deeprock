'use client'

import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import type { SwiperOptions } from 'swiper/types'
import type { Variants } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/pagination'
import { ImageWithFallback } from '@/components/media/ImageWithFallback'
import { StaggerItem } from '@/components/motion/StaggerReveal'
import { cn } from '@/lib/utils'
import { MediaLightbox } from './MediaLightbox'
import { GalleryArrow } from './GalleryControls'
import type { GalleryImage } from '@/content/gallery'

interface MediaGalleryProps {
  images: GalleryImage[]
  className?: string
  slidesPerView?: number
  spaceBetween?: number
  breakpoints?: SwiperOptions['breakpoints']
  /** Classes on the clickable slide button (aspect box, rounding, bg). */
  slideButtonClassName?: string
  /** Classes on the image box (fit / crop / caps). */
  slideMediaClassName?: string
  objectFit?: 'cover' | 'contain'
  objectPosition?: (image: GalleryImage, index: number) => string
  /** Optional per-slide reveal variant (propagates through Swiper via Motion context). */
  slideVariants?: Variants
  slideMediaMotionClassName?: string
  sizes?: string
  quality?: number
  keyboardEnabled?: boolean
  swiperClassName?: string
  /**
   * Controlled lightbox — required when the consumer also opens the lightbox
   * from outside the carousel (e.g. a thumbnail grid). Omit for self-contained
   * behaviour.
   */
  lightboxIndex?: number | null
  onLightboxIndexChange?: (index: number | null, trigger?: HTMLElement) => void
  lightboxTriggerElement?: HTMLElement | null
}

/**
 * Shared inline gallery carousel for the CSR gallery and the homepage Gallery
 * section. One place owns: Swiper setup, clickable slides, desktop arrows
 * (direct Swiper API), pagination dots, lightbox state, and the shared
 * MediaLightbox. Swiper owns all slide movement — never Framer Motion drag.
 *
 * Desktop: arrows + pagination dots. Mobile: pagination dots only + swipe.
 */
export function MediaGallery({
  images,
  className,
  slidesPerView = 1,
  spaceBetween = 16,
  breakpoints,
  slideButtonClassName,
  slideMediaClassName,
  objectFit = 'cover',
  objectPosition,
  slideVariants,
  slideMediaMotionClassName = 'absolute inset-0',
  sizes,
  quality,
  keyboardEnabled = false,
  swiperClassName,
  lightboxIndex: controlledIndex,
  onLightboxIndexChange,
  lightboxTriggerElement,
}: MediaGalleryProps) {
  const [internalIndex, setInternalIndex] = useState<number | null>(null)
  const internalTriggerRef = useRef<HTMLElement | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)

  const isControlled = controlledIndex !== undefined
  const lightboxIndex = isControlled ? controlledIndex : internalIndex

  // Inline keyboard yields while the lightbox is open. Swiper's Keyboard
  // module listens on document with no focus gate, and swiper/react does not
  // reliably call the module's disable() on a post-init param change — so we
  // drive enable()/disable() imperatively (both are guarded no-ops when the
  // module is already in the target state).
  useEffect(() => {
    const swiper = swiperRef.current
    if (!swiper?.keyboard) return
    if (keyboardEnabled && lightboxIndex === null) {
      swiper.keyboard.enable()
    } else {
      swiper.keyboard.disable()
    }
  }, [keyboardEnabled, lightboxIndex])

  const openLightbox = (index: number, trigger: HTMLElement) => {
    if (isControlled) {
      onLightboxIndexChange?.(index, trigger)
    } else {
      internalTriggerRef.current = trigger
      setInternalIndex(index)
    }
  }

  const closeLightbox = () => {
    if (isControlled) onLightboxIndexChange?.(null)
    else setInternalIndex(null)
  }

  return (
    <div className={cn('deep-rock-gallery', className)}>
      <div className="relative">
        <Swiper
          modules={[Pagination, A11y, Keyboard]}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          breakpoints={breakpoints}
          watchOverflow
          pagination={{
            clickable: true,
            dynamicBullets: images.length > 6,
          }}
          // Inline keyboard yields while the lightbox is open — Swiper's
          // Keyboard module listens on document with no focus gate, so keeping
          // it active would advance BOTH swipers on one arrow press.
          keyboard={{
            enabled: keyboardEnabled && lightboxIndex === null,
            onlyInViewport: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          className={cn('!pb-8', swiperClassName)}
        >
          {images.map((image, index) => {
            const media = (
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                category="Gallery"
                objectFit={objectFit}
                objectPosition={objectPosition?.(image, index) ?? 'center center'}
                sizes={sizes}
                quality={quality}
                className={cn('w-full', slideMediaClassName)}
              />
            )

            return (
              <SwiperSlide key={image.id ?? image.src} className="h-auto">
                <button
                  type="button"
                  onClick={(e) => openLightbox(index, e.currentTarget)}
                  aria-label={`Open image ${index + 1} of ${images.length}`}
                  className={cn(
                    'group relative block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2',
                    slideButtonClassName,
                  )}
                >
                  {slideVariants ? (
                    <StaggerItem
                      className={slideMediaMotionClassName}
                      variants={slideVariants}
                    >
                      {media}
                    </StaggerItem>
                  ) : (
                    media
                  )}
                </button>
              </SwiperSlide>
            )
          })}
        </Swiper>

        {images.length > 1 && (
          <>
            <GalleryArrow
              direction="previous"
              label="Show previous image"
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-3 top-1/2 z-30 -translate-y-1/2"
            />
            <GalleryArrow
              direction="next"
              label="Show next image"
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-3 top-1/2 z-30 -translate-y-1/2"
            />
          </>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <MediaLightbox
            key={`media-lightbox-${lightboxIndex}`}
            images={images}
            initialIndex={lightboxIndex}
            triggerElement={
              isControlled ? (lightboxTriggerElement ?? null) : internalTriggerRef.current
            }
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
