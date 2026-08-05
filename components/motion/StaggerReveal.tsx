'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { motionEase, revealViewport } from './motion-tokens'

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

  return (
    <motion.div
      className={className}
      variants={shouldReduceMotion ? reducedContainerVariants : containerVariants(staggerBy, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
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

  return (
    <motion.div
      className={className}
      variants={shouldReduceMotion ? reducedItemVariants : (variants ?? itemVariants)}
    >
      {children}
    </motion.div>
  )
}
