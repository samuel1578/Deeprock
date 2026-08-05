'use client'

import { Fragment, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  createHighlightPattern,
  defaultBrandHighlights,
} from '@/lib/brand-highlight'

interface BrandGlowTextProps {
  text?: string
  highlights?: readonly string[]
  animate?: boolean
  className?: string
  children?: React.ReactNode
}

export function BrandGlowText({
  text,
  children,
  highlights = defaultBrandHighlights,
  animate = true,
  className,
}: BrandGlowTextProps) {
  const prefersReducedMotion = useReducedMotion()

  const sourceText =
    typeof text === 'string'
      ? text
      : typeof children === 'string'
        ? children
        : ''

  if (!sourceText) {
    if (children && typeof children !== 'string') {
      return <>{children}</>
    }
    return null
  }

  const pattern = useMemo(
    () => createHighlightPattern(highlights),
    [highlights],
  )

  const highlightSet = useMemo(
    () => new Set(highlights.map((item) => item.toLowerCase())),
    [highlights],
  )

  const parts = sourceText.split(pattern)

  return (
    <>
      {parts.map((part, index) => {
        const isHighlighted = highlightSet.has(part.toLowerCase())

        if (!isHighlighted) {
          return (
            <Fragment key={`${part}-${index}`}>
              {part}
            </Fragment>
          )
        }

        const classes = cn(
          'inline align-baseline leading-[inherit]',
          'font-semibold tracking-[-0.015em]',
          'text-[#f26522]',
          className,
        )

        const style = {
          textShadow:
            '0 0 8px rgba(242, 101, 34, 0.3), 0 0 18px rgba(242, 101, 34, 0.12)',
        }

        if (!animate || prefersReducedMotion) {
          return (
            <span
              key={`${part}-${index}`}
              className={classes}
              style={style}
            >
              {part}
            </span>
          )
        }

        return (
          <motion.span
            key={`${part}-${index}`}
            className={classes}
            style={style}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {part}
          </motion.span>
        )
      })}
    </>
  )
}
