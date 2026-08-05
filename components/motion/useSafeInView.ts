'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import type { UseInViewOptions } from 'framer-motion'

const FAILSAFE_MS = 900

/**
 * Viewport-triggered reveal with a hard visibility guarantee.
 *
 * Returns [ref, isRevealed]. Once `isRevealed` is true it never returns to
 * false, and it is React state — not Framer Motion internal state — so a
 * re-render (variant swap, prop change, reduced-motion resolution) can never
 * push the element back into `hidden` after the observer has been released.
 *
 * Reveal is forced when:
 *  - IntersectionObserver is unavailable;
 *  - the element is inside the viewport but the observer has not fired within
 *    FAILSAFE_MS (covers a lost initial callback);
 *  - the page is restored from bfcache (`pageshow`) — an iOS Safari failure mode;
 *  - the tab returns to the foreground (`visibilitychange`) — covers
 *    "backgrounding Safari and returning" in the required test matrix.
 */
export function useSafeInView(options: UseInViewOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, options)
  const [forced, setForced] = useState(false)

  useEffect(() => {
    if (inView || forced) return

    if (typeof IntersectionObserver === 'undefined') {
      setForced(true)
      return
    }

    const revealIfOnScreen = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < vh && rect.bottom > 0) setForced(true)
    }

    const timer = window.setTimeout(revealIfOnScreen, FAILSAFE_MS)
    window.addEventListener('pageshow', revealIfOnScreen)
    document.addEventListener('visibilitychange', revealIfOnScreen)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('pageshow', revealIfOnScreen)
      document.removeEventListener('visibilitychange', revealIfOnScreen)
    }
  }, [inView, forced])

  return [ref, inView || forced] as const
}
