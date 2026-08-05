'use client'

import { useRef, useState } from 'react'
import { ImageWithFallback } from '@/components/media/ImageWithFallback'
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal'
import {
  csrGalleryVariants,
  homepageCardVariants,
} from '@/components/motion/motion-tokens'
import { MediaGallery } from '@/components/gallery/MediaGallery'
import type { GalleryImage } from '@/content/gallery'

interface CsrEventGalleryProps {
  images: GalleryImage[]
}

/**
 * CSR event gallery: shared MediaGallery for the main carousel + a thumbnail
 * grid that opens the SAME shared lightbox (controlled via lifted state).
 */
export function CsrEventGallery({ images }: CsrEventGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const handleLightboxChange = (index: number | null, trigger?: HTMLElement) => {
    if (trigger) triggerRef.current = trigger
    setLightboxIndex(index)
  }

  return (
    <StaggerReveal staggerBy={0.06} delayChildren={0.12}>
      {/* Main gallery frame — fade-up + scale 0.99 → 1 */}
      <StaggerItem variants={csrGalleryVariants}>
        <MediaGallery
          images={images}
          slidesPerView={1}
          spaceBetween={12}
          slideButtonClassName="rounded-lg bg-limestone"
          slideMediaClassName="h-auto max-h-[78vh] w-full object-contain"
          objectFit="contain"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 90vw, 1200px"
          quality={90}
          keyboardEnabled
          lightboxIndex={lightboxIndex}
          onLightboxIndexChange={handleLightboxChange}
          lightboxTriggerElement={triggerRef.current}
        />
      </StaggerItem>

      {/* Thumbnail grid — staggered card reveal, 2 / 3 / 4 columns */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <StaggerItem key={image.src} variants={homepageCardVariants} className="h-full">
            <button
              type="button"
              onClick={(e) => handleLightboxChange(index, e.currentTarget)}
              aria-label={`Open image ${index + 1} of ${images.length}`}
              className="group block h-full w-full cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2"
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                category="CSR"
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                className="aspect-[4/3] h-auto w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </button>
          </StaggerItem>
        ))}
      </div>
    </StaggerReveal>
  )
}
