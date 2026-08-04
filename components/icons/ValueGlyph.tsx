'use client'

import { cn } from '@/lib/utils'
import { valueIconMap } from './value-icons'
import type { ValueCardVariant } from './value-icons'

interface ValueGlyphProps {
  valueKey: string
  variant: ValueCardVariant
  className?: string
}

export function ValueGlyph({
  valueKey,
  variant,
  className,
}: ValueGlyphProps) {
  const Icon = valueIconMap[valueKey as keyof typeof valueIconMap]

  if (!Icon) {
    return null
  }

  const iconColor = variant === 'copper' ? 'text-white/90' : 'text-white/95'

  return (
    <div
      aria-hidden="true"
      className={cn(
        'inline-flex items-center justify-center transition-transform duration-300 motion-safe:group-hover:rotate-[3deg] motion-safe:group-hover:scale-[1.03]',
        className,
      )}
    >
      <Icon
        weight="duotone"
        className={cn(
          'w-9 h-9 md:w-11 md:h-11 opacity-85 transition-all duration-300 motion-safe:group-hover:opacity-100',
          iconColor,
        )}
      />
    </div>
  )
}