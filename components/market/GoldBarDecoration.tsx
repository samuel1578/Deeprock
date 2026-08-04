'use client'

import { useRef, useEffect, memo } from 'react'
import Image from 'next/image'
import {
    motion,
    useReducedMotion,
    useInView,
    useAnimationControls,
} from 'framer-motion'
import { cn } from '@/lib/utils'

interface GoldBarMotionConfig {
    src: string
    className: string
    mobileVisible: boolean
    baseRotate: number
    float: {
        x: number[]
        y: number[]
        rotate: number[]
        duration: number
        delay: number
    }
}

const BARS_CONFIG_DESKTOP: GoldBarMotionConfig[] = [
    {
        src: '/images/market/gold-bar-1.webp',
        className: 'absolute -top-[12%] -right-[3%] w-[38%] opacity-[0.82] z-0',
        mobileVisible: true,
        baseRotate: 12,
        float: {
            x: [0, 8, 0, -4, 0],
            y: [0, -12, 0, 6, 0],
            rotate: [12, 14, 12, 10, 12],
            duration: 16,
            delay: 0,
        },
    },
    {
        src: '/images/market/gold-bar-2.webp',
        className: 'absolute -bottom-[18%] right-[12%] w-[32%] opacity-[0.72] z-0',
        mobileVisible: true,
        baseRotate: -18,
        float: {
            x: [0, -10, 0, 6, 0],
            y: [0, 14, 0, -8, 0],
            rotate: [-18, -22, -18, -15, -18],
            duration: 18,
            delay: 1.2,
        },
    },
    {
        src: '/images/market/gold-bar-3.webp',
        className: 'absolute top-[30%] -left-[8%] w-[24%] opacity-[0.55] blur-[1px] z-0',
        mobileVisible: true,
        baseRotate: 15,
        float: {
            x: [0, 6, 0, -5, 0],
            y: [0, -9, 0, 7, 0],
            rotate: [15, 18, 15, 12, 15],
            duration: 14,
            delay: 0.5,
        },
    },
    {
        src: '/images/market/gold-bar-4.webp',
        className: 'hidden md:block absolute -top-[10%] left-[18%] w-[20%] opacity-[0.28] blur-[4px] z-0',
        mobileVisible: false,
        baseRotate: -8,
        float: {
            x: [0, 5, 0, -6, 0],
            y: [0, -10, 0, 8, 0],
            rotate: [-8, -6, -8, -11, -8],
            duration: 20,
            delay: 2.1,
        },
    },
    {
        src: '/images/market/gold-bar-5.webp',
        className: 'hidden md:block absolute top-[36%] right-[24%] w-[22%] opacity-[0.32] blur-[3px] z-0',
        mobileVisible: false,
        baseRotate: 20,
        float: {
            x: [0, -7, 0, 4, 0],
            y: [0, 11, 0, -6, 0],
            rotate: [20, 23, 20, 17, 20],
            duration: 17,
            delay: 1.5,
        },
    },
]

const BARS_CONFIG_MOBILE: GoldBarMotionConfig[] = [
    {
        src: '/images/market/gold-bar-1.webp',
        className: 'absolute top-[4%] -right-[1%] w-[38%] opacity-[0.78] z-0',
        mobileVisible: true,
        baseRotate: 11,
        float: {
            x: [0, -4, 2, 0],
            y: [0, 5, -3, 0],
            rotate: [10, 12, 9, 10],
            duration: 20,
            delay: 0,
        },
    },
    {
        src: '/images/market/gold-bar-2.webp',
        className: 'absolute bottom-[5%] right-[11%] w-[30%] opacity-[0.60] z-0',
        mobileVisible: true,
        baseRotate: -23,
        float: {
            x: [0, 5, -2, 0],
            y: [0, -6, 4, 0],
            rotate: [-22, -19, -24, -22],
            duration: 22,
            delay: 1.2,
        },
    },
    {
        src: '/images/market/gold-bar-3.webp',
        className: 'absolute left-[-3%] top-[43%] w-[26%] opacity-[0.29] blur-[1.5px] z-0',
        mobileVisible: true,
        baseRotate: 14,
        float: {
            x: [0, 3, -3, 0],
            y: [0, 4, -2, 0],
            rotate: [14, 12, 16, 14],
            duration: 24,
            delay: 0.5,
        },
    },
]

const FloatingGoldBar = memo(({ config, active, shouldReduceMotion }: {
    config: GoldBarMotionConfig,
    active: boolean,
    shouldReduceMotion: boolean | null
}) => {
    const controls = useAnimationControls()

    useEffect(() => {
        if (shouldReduceMotion) {
            controls.set({ x: 0, y: 0, rotate: config.baseRotate })
            return
        }

        if (active) {
            controls.start({
                x: config.float.x,
                y: config.float.y,
                rotate: config.float.rotate,
                transition: {
                    duration: config.float.duration,
                    delay: config.float.delay,
                    repeat: Infinity,
                    ease: [0.45, 0, 0.55, 1],
                },
            })
        } else {
            // Settle to base position when not active
            controls.start({
                x: 0,
                y: 0,
                rotate: config.baseRotate,
                transition: { duration: 2, ease: 'easeOut' }
            })
        }
    }, [active, controls, config, shouldReduceMotion])

    return (
        <div className={config.className}>
            <motion.div
                animate={controls}
                initial={{ x: 0, y: 0, rotate: config.baseRotate }}
                className="will-change-transform"
            >
                <Image
                    src={config.src}
                    alt=""
                    width={400}
                    height={400}
                    className="w-full h-auto brightness-110 saturate-125 contrast-110 drop-shadow-[0_12px_24px_rgba(0,0,0,0.38)] drop-shadow-[0_0_16px_rgba(212,160,45,0.20)] drop-shadow-[0_0_18px_rgba(255,196,64,0.18)]"
                    draggable={false}
                />
            </motion.div>
        </div>
    )
})

FloatingGoldBar.displayName = 'FloatingGoldBar'

export function GoldBarDecoration() {
    const containerRef = useRef<HTMLDivElement>(null)
    const shouldReduceMotion = useReducedMotion()
    const isInView = useInView(containerRef, { margin: '20% 0px 20% 0px' })

    return (
        <div
            ref={containerRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden select-none"
        >
            {/* Content Protection Layer: Localized Black Readability Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/94 via-black/62 to-black/8 md:from-black/84 md:via-black/42 md:to-black/5 z-[2]" />

            {/* Local protection for right-side metadata (timestamp) */}
            <div className="absolute right-4 top-1/2 h-32 w-56 -translate-y-1/2 rounded-full bg-black/35 blur-2xl z-[1]" />

            {/* Desktop Composition */}
            <div className="hidden md:contents">
                {BARS_CONFIG_DESKTOP.map((config, index) => (
                    <FloatingGoldBar
                        key={`desktop-${index}`}
                        config={config}
                        active={isInView}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                ))}
            </div>

            {/* Mobile Composition */}
            <div className="md:hidden">
                {BARS_CONFIG_MOBILE.map((config, index) => (
                    <FloatingGoldBar
                        key={`mobile-${index}`}
                        config={config}
                        active={isInView}
                        shouldReduceMotion={shouldReduceMotion}
                    />
                ))}
            </div>
        </div>
    )
}
