'use client'

import { cn } from '@/lib/utils'
import { serviceIconMap } from './service-icons'

interface ServiceGlyphProps {
  serviceSlug: string
  featured?: boolean
  className?: string
}

export function ServiceGlyph({
  serviceSlug,
  featured = false,
  className,
}: ServiceGlyphProps) {
  const Icon = serviceIconMap[serviceSlug as keyof typeof serviceIconMap]

  if (!Icon) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative inline-flex items-center justify-center',
        className,
      )}
    >
      <Icon
        weight="duotone"
        className={cn(
          'w-10 h-10 md:w-11 md:h-11',
          featured ? 'text-white' : 'text-copper',
        )}
      />
    </div>
  )
}
