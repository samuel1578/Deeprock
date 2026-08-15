"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { leadershipTeam, LeadershipMember } from "@/content/leadership"
import { ImageWithFallback } from "@/components/media/ImageWithFallback"
import { motionDuration, motionEase } from "@/components/motion/motion-config"

type NavigationDirection = 1 | -1

const leaderVariants = {
  enter: (direction: NavigationDirection) => ({
    opacity: 0,
    x: direction * 28,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: NavigationDirection) => ({
    opacity: 0,
    x: direction * -20,
  }),
}

const reducedMotionVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

function ActiveLeader({ member, onPrevious, onNext }: { member: LeadershipMember; onPrevious: () => void; onNext: () => void }) {
  const memberIndex = leadershipTeam.findIndex((m) => m.name === member.name)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="order-2 md:order-1">
        <h3 className="font-display text-4xl text-basalt mb-2 font-bold">
          {member.name}
        </h3>
        <p className="text-lg text-copper font-bold mb-6 uppercase tracking-wide">
          {member.role}
        </p>
        <div className="flex items-center gap-3 mt-6">
          <button
            type="button"
            aria-label="Show previous leader"
            onClick={onPrevious}
            className="inline-flex size-12 items-center justify-center rounded-[var(--radius-button)] border border-copper/30 bg-white text-basalt shadow-sm transition-all duration-200 hover:border-copper hover:bg-copper hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft size={20} weight="bold" />
          </button>
          <button
            type="button"
            aria-label="Show next leader"
            onClick={onNext}
            className="inline-flex size-12 items-center justify-center rounded-[var(--radius-button)] border border-copper/30 bg-white text-basalt shadow-sm transition-all duration-200 hover:border-copper hover:bg-copper hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRight size={20} weight="bold" />
          </button>
          <span
            className="tabular-nums text-sm text-graphite"
            aria-live="polite"
          >
            {String(memberIndex + 1).padStart(2, "0")}{" "}
            /{" "}
            {String(leadershipTeam.length).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <ImageWithFallback
          src={member.image}
          alt={member.name}
          width={900}
          height={1200}
          category="Team"
          objectFit="contain"
          layout="intrinsic"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  )
}

export function LeadershipDesktop() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<NavigationDirection>(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const leader = leadershipTeam[activeIndex]

  const showPreviousLeader = useCallback(() => {
    setDirection(-1)
    setActiveIndex((current) =>
      current === 0 ? leadershipTeam.length - 1 : current - 1,
    )
  }, [])

  const showNextLeader = useCallback(() => {
    setDirection(1)
    setActiveIndex((current) =>
      current === leadershipTeam.length - 1 ? 0 : current + 1,
    )
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target instanceof HTMLInputElement) return
      if (target instanceof HTMLTextAreaElement) return
      if (target instanceof HTMLSelectElement) return
      if (target.isContentEditable) return

      if (e.key === "ArrowLeft") {
        e.preventDefault()
        showPreviousLeader()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        showNextLeader()
      }
    }

    container.addEventListener("keydown", handleKeyDown)
    return () => {
      container.removeEventListener("keydown", handleKeyDown)
    }
  }, [showPreviousLeader, showNextLeader])

  const variants = reducedMotion ? reducedMotionVariants : leaderVariants
  const transition = reducedMotion
    ? { duration: 0.1 }
    : { duration: motionDuration.normal, ease: motionEase }

  return (
    <div ref={containerRef} className="hidden md:block">
      <div className="mb-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={leader.name}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <ActiveLeader member={leader} onPrevious={showPreviousLeader} onNext={showNextLeader} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {leadershipTeam.map((member, index) => (
          <button
            key={member.name}
            onClick={() => {
              setDirection(index > activeIndex ? 1 : -1)
              setActiveIndex(index)
            }}
            className="text-left p-4 rounded-lg hover:bg-limestone focus:bg-limestone focus:outline-none relative"
          >
            <h4 className="font-bold text-basalt">{member.name}</h4>
            <p className="text-sm text-copper">{member.role}</p>
            {activeIndex === index && (
              <motion.span
                layoutId="active-leader-indicator"
                className="absolute inset-x-0 bottom-0 h-1 bg-copper"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}