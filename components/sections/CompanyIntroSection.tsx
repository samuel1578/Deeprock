'use client'

import { Container, Section } from '@/components/layout/Container'
import { ImageWithFallback } from '@/components/media/ImageWithFallback'
import { ButtonLink } from '@/components/ui/Button'
import { BrandGlowText } from '@/components/ui/BrandGlowText'
import { companyIntroductionContent } from '@/content/homepage'
import { SealCheck } from '@phosphor-icons/react'
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal'
import {
  homepageEyebrowVariants,
  homepageHeadingVariants,
  homepageBodyVariants,
  homepageCtaVariants,
  homepageImageVariants,
} from '@/components/motion/motion-tokens'

export function CompanyIntroSection() {
  const [leadText, ...supportingText] = companyIntroductionContent.body.split('\n\n')

  return (
    <Section className="overflow-x-clip bg-white pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32">
      <Container variant="wide">
        <StaggerReveal
          className="flex flex-col gap-10 sm:gap-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:gap-y-8"
          staggerBy={0.1}
          delayChildren={0.04}
        >
          {/* Text Content Part 1: Eyebrow, Heading, Lead */}
          <div className="min-w-0 lg:col-span-5 order-1">
            <StaggerItem variants={homepageEyebrowVariants}>
              <p className="text-sm font-bold uppercase tracking-widest text-copper mb-6">
                <BrandGlowText text="DEEPROCK MINING LIMITED" />
              </p>
            </StaggerItem>

            <StaggerItem variants={homepageHeadingVariants}>
              <h2 className="font-display text-4xl sm:text-5xl text-basalt mb-6 leading-tight">
                <BrandGlowText text={companyIntroductionContent.heading} />
              </h2>
            </StaggerItem>

            <StaggerItem variants={homepageBodyVariants}>
              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-graphite leading-relaxed max-w-prose">
                  <BrandGlowText text={leadText} />
                </p>
              </div>
            </StaggerItem>
          </div>

          {/* Image Content */}
          <StaggerItem
            variants={homepageImageVariants}
            className="order-2 min-w-0 lg:col-span-7 lg:row-span-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-limestone shadow-lg">
              <ImageWithFallback
                src={companyIntroductionContent.image}
                alt="Gold bars being weighed, representing Deep Rock Mining's operations."
                width={1200}
                height={900}
                category="Company Overview"
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
            </div>
          </StaggerItem>

          {/* Text Content Part 2: Supporting, Trust, CTA */}
          <div className="min-w-0 lg:col-span-5 order-3">
            <StaggerItem variants={homepageBodyVariants} className="space-y-6 mb-10">
              {supportingText.map((para, idx) => (
                <p key={idx} className="text-base text-graphite/90 leading-relaxed max-w-prose">
                  <BrandGlowText text={para} />
                </p>
              ))}
            </StaggerItem>

            <StaggerItem variants={homepageCtaVariants} className="flex flex-col items-start gap-8">
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
                      Verify Our License
                  </a>
              </div>

              {/* CTA */}
              <ButtonLink href="/about" variant="bright-pattern" size="lg" className="w-full sm:w-auto">
                About Deep Rock Mining
              </ButtonLink>
            </StaggerItem>
          </div>
        </StaggerReveal>
      </Container>
    </Section>
  )
}
