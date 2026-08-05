'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { StaggerReveal, StaggerItem } from '@/components/motion/StaggerReveal';
import {
  adinkraSymbolVariants,
  revealViewport,
} from '@/components/motion/motion-tokens';

const reducedSymbolVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

interface DirectionCardProps {
  variant: 'vision' | 'mission';
  title: string;
  statement: string;
  supportingSentence: string;
  backgroundImage: string;
}

export function DirectionCard({
  variant,
  title,
  statement,
  supportingSentence,
  backgroundImage,
}: DirectionCardProps) {
  const isMission = variant === 'mission';
  const shouldReduceMotion = useReducedMotion();

  const symbolVariants = shouldReduceMotion
    ? reducedSymbolVariants
    : adinkraSymbolVariants;

  return (
    <article
      className={`
        relative overflow-hidden rounded-lg
        p-7 md:p-10 lg:p-12
        ${isMission ? 'bg-copper text-white' : 'bg-limestone'}
      `}
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-8 -top-8
          size-44
          opacity-[0.70]
          sm:size-52
          md:-right-6 md:-top-6 md:size-64
          lg:size-72
        "
      >
        <motion.div
          className="h-full w-full"
          variants={symbolVariants}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="(max-width: 767px) 176px, (max-width: 1023px) 256px, 288px"
            className="object-contain"
          />
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute inset-0
          ${
            isMission
              ? 'bg-gradient-to-r from-copper via-copper/90 to-copper/55'
              : 'bg-gradient-to-r from-limestone via-limestone/92 to-limestone/50'
          }
        `}
      />

      <StaggerReveal className="relative z-10" staggerBy={0.09} delayChildren={0.12}>
        <StaggerItem>
          <h2
            className={`
              mb-4 font-display text-[30px] leading-[1.15] md:text-[34px]
              ${isMission ? 'text-white' : 'text-copper'}
            `}
          >
            {title}
          </h2>
        </StaggerItem>

        <StaggerItem>
          <p
            className={`
              text-lg leading-relaxed
              ${isMission ? 'text-white' : 'text-graphite'}
            `}
          >
            {statement}
          </p>
        </StaggerItem>

        <StaggerItem>
          <p
            className={`
              mt-4 text-base leading-relaxed md:text-lg
              ${isMission ? 'text-white/85' : 'text-graphite/80'}
            `}
          >
            {supportingSentence}
          </p>
        </StaggerItem>
      </StaggerReveal>
    </article>
  );
}
