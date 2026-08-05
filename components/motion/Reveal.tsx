'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { motionEase, revealViewport, fadeUpVariants } from './motion-tokens'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isMobile
}

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: motionEase },
  },
}

type RevealProps = {
  children: React.ReactNode
  className?: string
  variants?: Variants
  mobileVariants?: Variants
  delay?: number
}

export function Reveal({
  children,
  className,
  variants,
  mobileVariants,
  delay = 0,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (shouldReduceMotion) {
    return (
      <motion.div
        className={className}
        variants={reducedVariants}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        {children}
      </motion.div>
    )
  }

  const base = (isMobile && mobileVariants ? mobileVariants : variants) ?? fadeUpVariants

  const active: Variants = {
    hidden: base.hidden,
    visible: {
      ...base.visible,
      transition: {
        ...(base.visible as { transition?: object }).transition,
        delay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      variants={active}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </motion.div>
  )
}
