"use client"

import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { Container, Section } from "@/components/layout/Container"
import { ImageWithFallback } from "@/components/media/ImageWithFallback"
import {
  leadershipFeaturedPerson,
  leadershipFeatureHeading,
  leadershipFeatureBody,
} from "@/content/leadership"
import {
  motionDistance,
  motionDuration,
  motionEase,
} from "@/components/motion/motion-config"

export function IntroSection() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const textVariant = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -motionDistance.standard,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: motionDuration.normal, ease: motionEase },
    },
  }

  const imageVariant = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : motionDistance.strong,
      scale: shouldReduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: motionDuration.slow, ease: motionEase },
    },
  }

  const captionVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: shouldReduceMotion ? 0 : motionDuration.normal,
        duration: motionDuration.normal,
      },
    },
  }

  return (
    <Section className="bg-white overflow-hidden py-16 lg:py-24">
      <Container variant="wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center"
        >
          <motion.div variants={containerVariants} className="space-y-6">
            <motion.p
              variants={textVariant}
              className="text-sm font-bold uppercase tracking-widest text-copper"
            >
              Our Leadership
            </motion.p>
            <motion.h1
              variants={textVariant}
              className="font-display text-4xl md:text-5xl text-basalt"
            >
              {leadershipFeatureHeading}
            </motion.h1>
            <motion.p
              variants={textVariant}
              className="max-w-prose text-lg text-graphite"
            >
              {leadershipFeatureBody}
            </motion.p>
            <motion.div variants={textVariant}>
              <Link
                href="#team"
                className="text-copper font-bold tracking-wide hover:underline"
              >
                Meet the team
              </Link>
            </motion.div>
          </motion.div>
          <div className="text-center">
            <motion.div variants={imageVariant} className="inline-block">
              <ImageWithFallback
                src={leadershipFeaturedPerson.image}
                alt={`Portrait of ${leadershipFeaturedPerson.name}`}
                width={600}
                height={800}
                className="h-auto w-full object-contain rounded-lg"
                priority
              />
            </motion.div>
            <motion.div variants={captionVariant}>
              <p className="mt-4 text-sm text-graphite font-semibold">
                {leadershipFeaturedPerson.name}
              </p>
              <p className="text-xs text-copper uppercase tracking-wider">
                {leadershipFeaturedPerson.role}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
