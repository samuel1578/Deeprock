'use client'

import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { motionEase, revealViewport, fadeUpVariants } from './motion-tokens'
import { useSafeInView } from './useSafeInView'

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: motionEase } },
}

type RevealProps = {
  children: React.ReactNode
  className?: string
  variants?: Variants
  delay?: number
}

export function Reveal({ children, className, variants, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const [ref, isRevealed] = useSafeInView(revealViewport)

  const active = useMemo<Variants>(() => {
    const base = shouldReduceMotion ? reducedVariants : (variants ?? fadeUpVariants)
    return {
      hidden: base.hidden,
      visible: {
        ...(base.visible as object),
        transition: {
          ...(base.visible as { transition?: object }).transition,
          delay: shouldReduceMotion ? 0 : delay,
        },
      },
    }
  }, [shouldReduceMotion, variants, delay])

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      variants={active}
      initial="hidden"
      animate={isRevealed ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}
