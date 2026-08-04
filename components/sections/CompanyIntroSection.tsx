'use client'

import { motion } from 'framer-motion'
import { Container, Section } from '@/components/layout/Container'
import { ImageWithFallback } from '@/components/media/ImageWithFallback'
import { ButtonLink } from '@/components/ui/Button'
import { BrandGlowText } from '@/components/ui/BrandGlowText'
import { companyIntroductionContent } from '@/content/homepage'
import { SealCheck } from '@phosphor-icons/react'

export function CompanyIntroSection() {
  const [leadText, ...supportingText] = companyIntroductionContent.body.split('\n\n')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2 },
    },
  }

  return (
    <Section className="bg-white overflow-hidden pt-16 pb-0 sm:py-24 lg:py-32">
      <Container variant="wide">
        <motion.div
          className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-x-16 lg:gap-y-8 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Text Content Part 1: Eyebrow, Heading, Lead */}
          <div className="lg:col-span-5 order-1">
            <motion.p
              variants={itemVariants}
              className="text-sm font-bold uppercase tracking-widest text-copper mb-6"
            >
              <BrandGlowText>DEEPROCK MINING LIMITED</BrandGlowText>
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl text-basalt mb-6 leading-tight"
            >
              <BrandGlowText>{companyIntroductionContent.heading}</BrandGlowText>
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg sm:text-xl text-graphite leading-relaxed max-w-prose">
                <BrandGlowText>{leadText}</BrandGlowText>
              </p>
            </motion.div>
          </div>

          {/* Image Content */}
          <motion.div
            className="lg:col-span-7 order-2 lg:row-span-2"
            variants={imageVariants}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <ImageWithFallback
                src={companyIntroductionContent.image}
                alt="Gold bars being weighed, representing DeepRock Mining's operations."
                width={1200}
                height={900}
                category="Company Overview"
                className="w-full h-full object-cover object-center"
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-lg" />
            </div>
          </motion.div>
          
          {/* Text Content Part 2: Supporting, Trust, CTA */}
          <div className="lg:col-span-5 order-3">
            <motion.div variants={itemVariants} className="space-y-6 mb-10">
              {supportingText.map((para, idx) => (
                <p key={idx} className="text-base text-graphite/90 leading-relaxed max-w-prose">
                  <BrandGlowText>{para}</BrandGlowText>
                </p>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col items-start gap-8">
              {/* Trust Indicator */}
              <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-3 py-2 px-4 bg-limestone/50 rounded-full border border-limestone">
                      <SealCheck className="w-6 h-6 text-copper shrink-0" weight="bold" aria-hidden="true" />
                      <span className="text-sm font-semibold tracking-wider text-basalt/80">
                          Ghana Licensed Aggregator
                      </span>
                  </div>

                  <a
                      href="https://goldbod.gov.gh/license-registry/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-copper underline decoration-copper/40 underline-offset-4 hover:decoration-copper hover:text-copper-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 rounded-sm"
                  >
                      Verify
                  </a>
              </div>

              {/* CTA */}
              <ButtonLink href="/about" variant="bright-pattern" size="lg" className="w-full sm:w-auto">
                About DeepRock Mining
              </ButtonLink>
            </motion.div>
          </div>

        </motion.div>
      </Container>
    </Section>
  )
}
