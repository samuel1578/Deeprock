'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { X } from '@phosphor-icons/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { ImageWithFallback } from '@/components/media/ImageWithFallback'
import { motionEase } from '@/components/motion/motion-tokens'
import { GalleryArrow } from './GalleryControls'
import type { GalleryImage } from '@/content/gallery'

interface MediaLightboxProps {
  images: GalleryImage[]
  initialIndex: number
  triggerElement: HTMLElement | null
  onClose: () => void
}

/**
 * Shared full-screen image slideshow for the CSR gallery and the homepage
 * Gallery section. Swiper owns slide movement (direct API buttons + a single
 * document keyboard handler); Framer Motion owns the entrance (opacity +
 * restrained scale; opacity only under reduced motion).
 *
 * Desktop: arrows + pagination dots + counter.
 * Mobile: pagination dots only + swipe (no arrows).
 */
export function MediaLightbox({
  images,
  initialIndex,
  triggerElement,
  onClose,
}: MediaLightboxProps) {
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)

  // Reset the local index on open — never preserve a stale index.
  useEffect(() => {
    setActiveIndex(initialIndex)
  }, [initialIndex])

  // Focus moves to the close button on open; returns to the trigger on close.
  useEffect(() => {
    closeButtonRef.current?.focus()
    return () => {
      triggerElement?.focus()
    }
  }, [triggerElement])

  // Body scroll lock — always restored on cleanup.
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Single keyboard owner: Escape closes, arrows navigate. No Swiper Keyboard
  // module here — Swiper's Keyboard module listens on document with no focus
  // gate and would double-fire against this handler.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'ArrowLeft') swiperRef.current?.slidePrev()
      if (e.key === 'ArrowRight') swiperRef.current?.slideNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Tab containment within the dialog.
  useEffect(() => {
    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleTab)
    return () => document.removeEventListener('keydown', handleTab)
  }, [])

  const overlayTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.25, ease: motionEase }
  const dialogTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: motionEase }

  const closeClasses =
    'pointer-events-auto relative z-30 inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:border-copper hover:bg-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-basalt'

  return (
    <motion.div
      className="deep-rock-lightbox fixed inset-0 z-[70] flex items-center justify-center bg-basalt/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={overlayTransition}
      onClick={(e) => {
        // Backdrop closes only when the backdrop itself is clicked.
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Image slideshow"
        className="relative flex h-[100dvh] w-full flex-col bg-basalt"
        initial={{
          opacity: 0,
          scale: shouldReduceMotion ? 1 : 0.985,
        }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          scale: shouldReduceMotion ? 1 : 0.985,
        }}
        transition={dialogTransition}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: counter + close */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <p className="text-sm font-medium tabular-nums text-white/80">
            {activeIndex + 1} / {images.length}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Close image slideshow"
            className={closeClasses}
          >
            <X className="h-5 w-5" weight="bold" aria-hidden="true" />
          </button>
        </div>

        {/* Slides */}
        <div className="relative min-h-0 flex-1">
          <Swiper
            modules={[Pagination, A11y]}
            initialSlide={initialIndex}
            slidesPerView={1}
            watchOverflow
            pagination={{
              clickable: true,
              dynamicBullets: images.length > 6,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onActiveIndexChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="h-full !pb-10"
          >
            {images.map((image) => (
              <SwiperSlide
                key={image.id ?? image.src}
                className="flex h-full items-center justify-center"
              >
                <div className="flex h-full w-full items-center justify-center px-4 sm:px-16">
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    category="Gallery"
                    objectFit="contain"
                    sizes="100vw"
                    quality={95}
                    className="max-h-[84vh] h-auto w-auto max-w-[92vw] object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {images.length > 1 && (
            <>
              <GalleryArrow
                direction="previous"
                label="Show previous image"
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-4 top-1/2 z-30 -translate-y-1/2 sm:left-8"
              />
              <GalleryArrow
                direction="next"
                label="Show next image"
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-4 top-1/2 z-30 -translate-y-1/2 sm:right-8"
              />
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
