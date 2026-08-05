'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { GalleryImage as GalleryImageType } from '@/content/gallery'

const BLUR_BASE64 =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMiI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEyIiBmaWxsPSIjZTllM2Q5Ii8+PC9zdmc+'

interface GalleryImageProps {
  image: GalleryImageType
  sizes: string
  priority?: boolean
  className?: string
}

export function GalleryImage({ image, sizes, priority = false, className = '' }: GalleryImageProps) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-basalt to-slate p-6 text-center"
      >
        <div>
          <p className="text-limestone text-sm font-medium">Deep Rock</p>
          <p className="mx-auto mt-1 max-w-[220px] truncate text-xs text-stone">
            {image.caption ?? 'Gallery image'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR_BASE64}
      onError={() => setErrored(true)}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ objectPosition: image.focus ?? 'center' }}
    />
  )
}
