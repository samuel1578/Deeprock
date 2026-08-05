'use client'

import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { motionEase, revealViewport } from './motion-tokens'
import { useSafeInView } from './useSafeInView'

const containerVariants = (
  staggerBy: number,
  delayChildren: number,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerBy,
      delayChildren,
    },
  },
})

const reducedContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: motionEase },
  },
}

const reducedItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: motionEase },
  },
}

type StaggerRevealProps = {
  children: React.ReactNode
  className?: string
  staggerBy?: number
  delayChildren?: number
}

export function StaggerReveal({
  children,
  className,
  staggerBy = 0.11,
  delayChildren = 0.08,
}: StaggerRevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const [ref, isRevealed] = useSafeInView(revealViewport)

  const active = useMemo<Variants>(
    () =>
      shouldReduceMotion
        ? reducedContainerVariants
        : containerVariants(staggerBy, delayChildren),
    [shouldReduceMotion, staggerBy, delayChildren],
  )

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

type StaggerItemProps = {
  children: React.ReactNode
  className?: string
  variants?: Variants
}

export function StaggerItem({ children, className, variants }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion()

  const active = useMemo<Variants>(
    () => (shouldReduceMotion ? reducedItemVariants : (variants ?? itemVariants)),
    [shouldReduceMotion, variants],
  )

  return (
    <motion.div className={className} variants={active}>
      {children}
    </motion.div>
  )
}
