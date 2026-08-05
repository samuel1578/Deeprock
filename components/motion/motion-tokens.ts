import type { Transition, Variants } from 'framer-motion'

export const motionEase = [0.22, 1, 0.36, 1] as const

export const revealTransition: Transition = {
  duration: 0.72,
  ease: motionEase,
}

export const revealViewport = {
  once: true,
  amount: 0.22,
  margin: '0px 0px -8% 0px',
}

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
