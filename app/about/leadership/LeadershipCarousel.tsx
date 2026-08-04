"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCreative, Pagination, A11y, Controller } from "swiper/modules"
import { motion, AnimatePresence } from "framer-motion"
import { leadershipTeam, LeadershipMember } from "@/content/leadership"
import { ImageWithFallback } from "@/components/media/ImageWithFallback"

import "swiper/css"
import "swiper/css/effect-creative"
import "swiper/css/pagination"

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.9,
    rotate: direction > 0 ? 5 : -5,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.9,
    rotate: direction < 0 ? 5 : -5,
    transition: {
      duration: 0.5,
    },
  }),
}

function LeadershipCard({ member }: { member: LeadershipMember }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full">
      <ImageWithFallback
        src={member.image}
        alt={member.name}
        width={900}
        height={1200}
        category="Team"
        objectFit="contain"
        layout="intrinsic"
        className="rounded-t-lg"
      />
      <div className="p-6 text-center flex-grow flex flex-col">
        <h3 className="font-display text-2xl text-basalt mb-1 font-bold">
          {member.name}
        </h3>
        <p className="text-sm text-copper font-bold mb-4 uppercase tracking-wide">
          {member.role}
        </p>
        <p className="text-base text-graphite flex-grow">{member.biography}</p>
      </div>
    </div>
  )
}

export function LeadershipCarousel() {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0])

  const paginate = (newDirection: number) => {
    let newIndex = activeIndex + newDirection
    if (newIndex < 0) {
      newIndex = leadershipTeam.length - 1
    } else if (newIndex >= leadershipTeam.length) {
      newIndex = 0
    }
    setActiveIndex([newIndex, newDirection])
  }

  const member = leadershipTeam[activeIndex]
  const cardDirection = activeIndex % 2 === 0 ? 1 : -1

  return (
    <div className="md:hidden relative h-[700px]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute w-full h-full p-4"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x
            if (swipe < -10000) {
              paginate(1)
            } else if (swipe > 10000) {
              paginate(-1)
            }
          }}
        >
          <LeadershipCard member={member} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {leadershipTeam.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex([i, i > activeIndex ? 1 : -1])}
            className={`w-2 h-2 rounded-full ${
              i === activeIndex ? "bg-copper" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
