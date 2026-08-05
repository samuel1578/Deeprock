import type { Transition, Variants, UseInViewOptions } from 'framer-motion'

export const motionEase = [0.22, 1, 0.36, 1] as const

export const revealTransition: Transition = {
  duration: 0.72,
  ease: motionEase,
}

export const revealViewport = {
  once: true,
  amount: 0.08,
  margin: '0px 0px -4% 0px',
} satisfies UseInViewOptions

export const largeSectionViewport = {
  once: true,
  amount: 0.05,
} satisfies UseInViewOptions

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: revealTransition,
  },
}

export const fadeLeftVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: revealTransition,
  },
}

export const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: revealTransition,
  },
}

export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 36,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.82,
      ease: motionEase,
    },
  },
}

export const cardRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.99,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.78,
      ease: motionEase,
    },
  },
}

export const visionCardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -36,
    y: 16,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.82,
      ease: motionEase,
    },
  },
}

export const missionCardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 36,
    y: 16,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.82,
      delay: 0.08,
      ease: motionEase,
    },
  },
}

export const valueCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.99,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.62,
      ease: motionEase,
    },
  },
}

export const adinkraSymbolVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    rotate: -2,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: motionEase,
    },
  },
}

export const mobileCardVariants: Variants = {
  hidden: (direction: number = 1) => ({
    opacity: 0,
    x: direction * 28,
    y: 8,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.48,
      ease: motionEase,
    },
  },
}

// --- Homepage section rhythm (Sprint 16) -----------------------------------
// Named homepage variants plus aliases that intentionally reuse existing
// definitions rather than duplicating near-identical variants.

export const homepageSectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: motionEase,
    },
  },
}

export const homepageImageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, ease: motionEase },
  },
}

export const homepageCardVariants = valueCardVariants

export const homepageEyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: motionEase },
  },
}

export const homepageHeadingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: motionEase },
  },
}

export const homepageBodyVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: motionEase },
  },
}

export const homepageCtaVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: motionEase },
  },
}

export const homepageGalleryImageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.68,
      ease: motionEase,
    },
  },
}

// --- CSR system (Sprint 17.2) -------------------------------------------------
// CSR-specific tokens only where the shared set does not already cover the
// approved choreography. Both are y/x restrained and reduced-motion safe via
// the shared primitives.

export const csrImageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 28,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.78,
      ease: motionEase,
    },
  },
}

export const csrGalleryVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.99,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.72,
      ease: motionEase,
    },
  },
}
