'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageWithFallbackProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down'
  objectPosition?: string
  category?: string
  priority?: boolean
  sizes?: string
  aspectRatio?: 'auto' | '16/9' | '4/3' | '3/2' | '1/1' | '21/9'
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className = '',
  objectFit = 'cover',
  objectPosition = 'center center',
  category = 'Image',
  priority = false,
  sizes,
  aspectRatio = 'auto',
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false)

  const aspectRatioMap: Record<string, string> = {
    auto: `${width} / ${height}`,
    '16/9': '16 / 9',
    '4/3': '4 / 3',
    '3/2': '3 / 2',
    '1/1': '1 / 1',
    '21/9': '21 / 9',
  }

  const computedAspectRatio = aspectRatioMap[aspectRatio] || aspectRatioMap['auto']

  if (imageError || !src) {
    return (
      <div
        className={`bg-gradient-to-br from-basalt to-slate flex items-center justify-center ${className}`}
        style={{
          aspectRatio: computedAspectRatio,
        }}
      >
        <div className="text-center">
          <p className="text-limestone text-sm font-medium">DeepRock</p>
          <p className="text-stone text-xs mt-1 max-w-[200px] truncate">
            {category}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: computedAspectRatio,
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        style={{
          objectFit,
          objectPosition,
        }}
        onError={() => setImageError(true)}
        priority={priority}
        sizes={sizes}
      />
    </div>
  )
}