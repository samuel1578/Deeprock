'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface BrandGlowTextProps {
  children: React.ReactNode;
  className?: string;
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export function BrandGlowText({ children, className }: BrandGlowTextProps) {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  if (typeof children !== 'string') {
    // This component is designed to work on strings.
    // If children is not a string, we can't process it.
    return <>{children}</>;
  }

  const regex = /(DeepRock(?:['’]s)?(?:\s+Mining\s+(?:Ltd\.?|Limited))?)/gi;
  const parts = children.split(regex);

  if (parts.length <= 1) {
    return <>{children}</>;
  }

  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) { // This is a match
          return (
            <span
              key={index}
              className={cn(
                'relative inline-block font-semibold tracking-[-0.015em] text-[#f26522]',
                className
              )}
              style={{
                textShadow:
                  '0 0 8px rgba(242, 101, 34, 0.3), 0 0 18px rgba(242, 101, 34, 0.12)',
              }}
            >
              {prefersReducedMotion ? (
                part
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative inline-block overflow-hidden"
                >
                  {part}
                  <motion.span
                    className="absolute inset-0 -skew-x-12 bg-white/20"
                    initial={{ x: '-150%' }}
                    whileInView={{ x: '150%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.6, 0.01, -0.05, 0.95], delay: 0.2 }}
                  />
                </motion.span>
              )}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}
