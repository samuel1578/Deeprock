'use client'

import { WhatsappLogo } from '@phosphor-icons/react'

interface WhatsappIconProps {
  className?: string
}

/**
 * Client wrapper around the Phosphor WhatsappLogo icon (mirrors the
 * ServiceGlyph / ValueGlyph pattern) so server pages can render it without
 * importing @phosphor-icons/react into the RSC server bundle.
 */
export function WhatsappIcon({ className }: WhatsappIconProps) {
  return (
    <WhatsappLogo
      aria-hidden="true"
      weight="fill"
      className={className}
    />
  )
}
