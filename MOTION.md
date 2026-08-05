# DeepRock Motion System

This document defines the shared Framer Motion architecture used across DeepRock.
It is the single source of truth for how entrance/reveal motion is implemented so
that pages stay consistent, accessible, performant, and native-scroll friendly.

## Principles

- **Viewport-triggered only.** Motion is entrance reveal, not scroll-linked.
  We never animate in response to live scroll position.
- **Transform and opacity only.** Continuous animation of `filter`, `blur`,
  `box-shadow`, `width`, `height`, `top`, `left`, or `background-position` is
  prohibited.
- **Once is enough.** Every reveal uses `viewport.once = true` so content does
  not re-trigger or re-announce on scroll-up.
- **Reduced motion is first-class.** Every primitive honors `useReducedMotion()`
  and degrades to opacity-only or immediate rendering.
- **No duplicate primitives.** Reusable components live in `components/motion`.
  Page code wraps content; it does not invent new animation logic.
- **Server Components stay server.** Pages that export `metadata` remain Server
  Components. Motion is added by wrapping content in the Client Components below.

## Shared tokens — `components/motion/motion-tokens.ts`

- `motionEase` — `[0.22, 1, 0.36, 1]`, the project easing curve.
- `revealTransition` — `{ duration: 0.72, ease: motionEase }`.
- `revealViewport` — `{ once: true, amount: 0.22, margin: '0px 0px -8% 0px' }`.
- `fadeUpVariants` — `opacity 0→1`, `y 24→0`.
- `fadeLeftVariants` / `fadeRightVariants` — horizontal entrances (`x ±32`).
- `imageRevealVariants` — image entrance (`x 36`, `scale 0.985→1`, 0.82s).
- `cardRevealVariants` — card entrance (`y 28`, `scale 0.99→1`, 0.78s).
- `visionCardVariants` — Vision card (`x -36`, `y 16`, `scale 0.985→1`, 0.82s).
- `missionCardVariants` — Mission card (`x 36`, `y 16`, `scale 0.985→1`,
  0.82s, `delay 0.08`).
- `valueCardVariants` — Core Value card (`y 24`, `scale 0.99→1`, 0.62s).
- `adinkraSymbolVariants` — Adinkra symbol (`opacity 0→1`, `scale 0.94→1`,
  `rotate -2→0`, 1s). Used once, never looped.
- `mobileCardVariants` — mobile carousel card; function variant
  `hidden: (direction) => ({ opacity: 0, x: direction * 28, y: 8 })`,
  `visible` resolves to `x 0, y 0` over 0.48s.

## Component ownership — `components/motion`

| Component | Role | Client? |
| --- | --- | --- |
| `motion-config.ts` | Legacy ease/duration/distance tokens | n/a |
| `motion-tokens.ts` | Canonical variants + viewport (above) | n/a |
| `Reveal.tsx` | Single-element entrance. Accepts `variants`, `mobileVariants`, `delay`, `className`. Swaps to `fadeUp`-style (or provided `mobileVariants`) below 1024px and to opacity-only under reduced motion. | yes |
| `StaggerReveal.tsx` | Container for a staggered group (`staggerChildren`, `delayChildren` configurable). One viewport observer per group. | yes |
| `StaggerReveal.tsx` → `StaggerItem` | Child item; accepts optional `variants` (defaults to the shared item variant). Reduced motion → opacity-only. | yes |
| `FadeReveal.tsx` | Older simple fade-up primitive (kept for compatibility). | yes |
| `ImageReveal.tsx` | Older image reveal primitive (kept for compatibility). | yes |
| `StaggerGroup.tsx` | Older stagger container (kept for compatibility). | yes |

## Page entrance patterns

- Hero sections are not animated by this system (owned by `PageHero`).
- The first content section uses `Reveal` with a directional variant on desktop
  and `fadeUpVariants` on mobile.

## Section reveal patterns

- Each logical section is wrapped in its own `StaggerReveal` (one observer).
- Heading + intro paragraph are `StaggerItem`s inside that group.
- Cards inside a section are `StaggerItem`s of a single grid-level
  `StaggerReveal` — not one observer per card.

## Card patterns

- **DirectionCard (Vision/Mission):** wrapped in `Reveal`
  (`visionCardVariants`/`missionCardVariants` on desktop, `fadeUpVariants` on
  mobile). Inside the card, a per-card `StaggerReveal` (`staggerBy 0.09`,
  `delayChildren 0.12`) sequences Icon → Title → Statement → Supporting sentence
  via `StaggerItem`s. The Adinkra symbol uses `adinkraSymbolVariants` (one
  restrained entrance: `opacity`, `scale 0.94→1`, `rotate -2→0`, 1s).
- **Core Value cards:** the desktop grid is one `StaggerReveal`
  (`staggerBy 0.1`, `delayChildren 0.05`); each card is a `StaggerItem` using
  `valueCardVariants`. No background-color animation.
- Hover (desktop): cards may lift (`translateY -4px`), glyph `scale 1.03`, and
  gain a subtle shadow. No bounce, no continuous motion. Non-interactive cards
  are not made focusable for animation alone.

## Carousel rules

- `MobileValuesCarousel` keeps **Swiper as the interaction owner**. Framer Motion
  only animates card internals via the opt-in `animated` prop.
- When `animated` is set, each card animates with `mobileCardVariants`,
  direction derived from its global card index parity (even → from right, odd →
  from left). Direction alternates by global index across slides.
- Animation is driven by the Swiper `activeIndex` state; cards in the active
  slide animate to `visible`, others to `hidden`.
- No `useScroll`, no `useTransform`, no `preventDefault`, no touch/wheel
  listeners, no drag replacement. Vertical page scrolling is untouched.
- Under reduced motion the `animated` flag is ignored and cards render static.

## Reduced-motion rules

- `useReducedMotion()` is read in `Reveal`, `StaggerReveal`, `StaggerItem`,
  `DirectionCard`, and `MobileValuesCarousel`.
- Behavior: no `x`/`y` transforms, no `scale`, no symbol rotation, no stagger
  delay beyond what is necessary. Content uses opacity-only or immediate
  rendering. Swiper remains fully usable and all content stays visible.

## Performance rules

- Animate only `transform` and `opacity`.
- One viewport observer per logical section; never one per paragraph.
- `viewport.once = true` everywhere.
- No additional animation package is introduced (Framer Motion is the only
  dependency).

## Accessibility rules

- Heading order is preserved (`h1` hero → `h2` sections → `h3` cards).
- Icons and Adinkra symbols are `aria-hidden`.
- Swiper pagination is keyboard accessible (`A11y` module, clickable bullets).
- Motion never conveys essential meaning; reduced-motion content is complete.
- Focus is never moved during reveal; focus rings remain visible.

## Native-scroll isolation

Prohibited: `useScroll`, `useTransform`, wheel listeners, `touchmove`
interception, `preventDefault`, custom scroll containers, scroll snapping,
sticky animation scenes, and RAF-based page-scroll loops. All motion is
`whileInView` with `viewport.once = true`; the page scrolls natively.

## Anti-patterns

- Do not create a second `valueIconMap` / `ValueGlyph` or a second motion
  primitive for a page that already has one.
- Do not animate `filter`, `blur`, `box-shadow`, layout properties, or
  background position.
- Do not make non-interactive cards focusable only for animation.
- Do not add looping/floating/parallax motion to decorative symbols.
- Do not wrap a Server Component page in `'use client'` to add motion — wrap
  with the client primitives instead.

## Agent implementation checklist

1. Confirm the page is still a Server Component (exports `metadata`).
2. Reuse `Reveal` / `StaggerReveal` / `StaggerItem`; only extend
   `motion-tokens.ts` when new choreography is genuinely required.
3. Use `mobileVariants={fadeUpVariants}` on horizontal reveals to avoid mobile
   horizontal overflow.
4. Mark decorative layers `aria-hidden`.
5. Verify `useReducedMotion()` paths render content immediately/opacity-only.
6. Run `pnpm exec tsc --noEmit` and `pnpm build`.
7. Visually verify 375 / 390 / 430 / 768 / 1024 / 1440 px, plus reduced-motion,
   slow/fast scroll, touch swipe, keyboard nav, and hidden-tab return.
