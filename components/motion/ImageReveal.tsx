"use client"

import { motion, useReducedMotion } from "framer-motion"
import { motionDuration, motionEase } from "./motion-config"

type ImageRevealProps = {
  children: React.ReactNode
  className?: string
  x?: number
}

export function ImageReveal({ children, className, x = 36 }: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : x,
      scale: shouldReduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: motionDuration.slow,
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
