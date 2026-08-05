'use client'

import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface GalleryArrowProps {
  direction: 'previous' | 'next'
  label: string
  onClick: () => void
  className?: string
}

/**
 * Shared gallery arrow. Desktop-only (hidden below md), 44px tap target,
 * direct onClick (callers drive the Swiper API), stops propagation so a
 * backdrop handler above it can never fire.
 */
export function GalleryArrow({
  direction,
  label,
  onClick,
  className,
}: GalleryArrowProps) {
  const Icon = direction === 'previous' ? CaretLeft : CaretRight

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      aria-label={label}
      className={cn(
        'hidden md:inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2',
        className,
      )}
    >
      <Icon className="h-5 w-5" weight="bold" aria-hidden="true" />
    </button>
  )
}
