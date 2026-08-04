"use client"

import { motion, useReducedMotion } from "framer-motion"
import { motionDistance, motionDuration, motionEase } from "./motion-config"

type FadeRevealProps = {
  children: React.ReactNode
  className?: string
}

export function FadeReveal({ children, className }: FadeRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : motionDistance.subtle,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionDuration.normal,
        ease: motionEase,
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
