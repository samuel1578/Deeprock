'use client'

import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { TextLink } from '@/components/ui/TextLink'
import { motionEase, revealViewport } from '@/components/motion/motion-tokens'
import { useSafeInView } from '@/components/motion/useSafeInView'

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: motionEase },
  },
}

const locationVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: motionEase },
  },
}

const connectorVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.45, ease: motionEase },
  },
}

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: motionEase } },
}

export function OfficesColumn() {
  const shouldReduceMotion = useReducedMotion()
  const [ref, isRevealed] = useSafeInView(revealViewport)

  const choreo = useMemo(
    () => (shouldReduceMotion ? reducedVariants : undefined),
    [shouldReduceMotion],
  )

  const pick = (full: Variants) => (choreo ?? full)

  const stagger = shouldReduceMotion ? 0 : 0.12

  return (
    <div ref={ref} className="flex gap-4">
      <MapPin className="w-6 h-6 text-copper shrink-0" />
      <motion.div
        className="flex flex-col gap-0"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger, delayChildren: shouldReduceMotion ? 0 : 0.05 } },
        }}
        initial="hidden"
        animate={isRevealed ? 'visible' : 'hidden'}
      >
        <motion.h3
          className="font-display text-lg text-basalt mb-2"
          variants={pick(headingVariants)}
        >
          Our Offices
        </motion.h3>

        {/* Ghana */}
        <motion.div variants={pick(locationVariants)}>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-copper mt-1 mb-1">
            Ghana
          </p>
          <div className="text-graphite">
            <p>The Emporium, 3rd Floor, Mövenpick Ambassador Hotel,</p>
            <p>Independence Avenue, Ridge, Accra, Ghana</p>
            <p className="text-sm mt-1">P.O. Box CT 3621, Cantonments, Accra</p>
          </div>
        </motion.div>

        {/* Connector rail */}
        <motion.div
          className="origin-top w-px bg-stone/50 my-3"
          style={{ height: '1.25rem' }}
          variants={pick(connectorVariants)}
          aria-hidden="true"
        />

        {/* United States */}
        <motion.div variants={pick(locationVariants)}>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-copper mt-1 mb-1">
            United States
          </p>
          <div className="text-graphite">
            <p>2463 Griffin Gate Ln,</p>
            <p>Columbus, Ohio 43219</p>
            <p className="mt-1">
              <TextLink href="tel:+16147870881" variant="copper">
                +1 (614) 787-0881
              </TextLink>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
