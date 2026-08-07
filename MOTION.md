# DeepRock Motion System

This document defines the shared Framer Motion architecture used across Deep Rock.
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

- Heroes are animated only where `PageHero` is passed `motion` (Services + Sustainability routes, Sprint 18). Other pages (About, News, Contact, legal) keep a static hero. The motion hero uses the shared `StaggerReveal` (eyebrow → title → summary) plus `Reveal` with `heroImageVariants` (scale-only at full opacity so the LCP image paints immediately).
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

## Homepage section rhythm (Sprint 16)

Shared tokens added to `components/motion/motion-tokens.ts` — no duplicate
variant definitions, only the genuinely-new ones plus aliases that reuse
existing variants:

- `homepageSectionVariants` — `opacity 0→1`, `y 32→0`, 0.78s (card/section rise).
- `homepageImageVariants` — alias of `imageRevealVariants` (`x 36`, `scale 0.985→1`, 0.82s).
- `homepageCardVariants` — alias of `valueCardVariants` (`y 24`, `scale 0.99→1`, 0.62s).
- `homepageEyebrowVariants` — `y 12`, 0.5s.
- `homepageHeadingVariants` — `y 24`, 0.7s.
- `homepageBodyVariants` — `y 18`, 0.62s.
- `homepageCtaVariants` — `y 16`, 0.55s.
- `homepageGalleryImageVariants` — `opacity 0→1`, `scale 0.985→1`, 0.68s (Swiper owns horizontal movement).

### Observer map (one per logical group)

- Company Intro → `StaggerReveal` (all copy) + `Reveal` (image). No local variants.
- Gold Price → `StaggerReveal` (intro copy) + `Reveal` (card shell) +
  `StaggerReveal` (price group inside `GoldPriceLiveRegion`). The independent
  gold-bar drift in `GoldBarDecoration` is untouched (time-based, not scroll-
  linked) and the price refresh interval is untouched.
- Services → `StaggerReveal` (intro) + `Reveal` (mobile carousel, `md:hidden`) +
  `StaggerReveal` (desktop grid) + `Reveal` (CTA). Tailwind hover effects on the
  cards are preserved, not re-implemented in Motion.
- Values → `StaggerReveal` (intro) + `MobileValuesCarousel animated` +
  `StaggerReveal` (desktop grid). The mobile carousel keeps its 2+2+2+1 grouping
  and Swiper ownership; the desktop grid keeps its copper/slate color sequence.
- Leadership → paired reveal: left text column = `Reveal(fadeLeftVariants,
  mobileVariants=fadeUpVariants)` wrapping a `StaggerReveal`; right portrait =
  `Reveal(homepageImageVariants, +16px delay)` wrapping the `ImageWithFallback`
  (`objectFit="contain"`, `layout="intrinsic"`) plus a `StaggerReveal` caption.
  The section carries `overflow-x-clip` to contain the +36px entrance.
- Gallery → `StaggerReveal` (intro) + `Reveal` (frame) wrapping a single
  `StaggerReveal` (Swiper + nav). Each slide's media is a `StaggerItem
  className="absolute inset-0"` using `homepageGalleryImageVariants`; variants
  propagate through Swiper's DOM via Motion context, so the whole frame shares
  one observer (no per-slide observers). Swiper config and touch interaction are
  unchanged.
- Partnership CTA → one `StaggerReveal` (heading → body → two buttons).

### Wrapper rules discovered during implementation

- A `StaggerItem` wrapping a grid card must be `h-full` and the inner `<article>`
  must also be `h-full` to preserve equal-height cards (matches the MVV page).
- A `Reveal`/`StaggerItem` wrapping a `ButtonLink` (which is `inline-flex` inside
  a `Stack` `flex flex-col`) must itself be `flex flex-col` so the button keeps
  its original full-width stretch.
- A `StaggerItem` wrapping a Swiper `GalleryImage` (which renders
  `absolute inset-0`) must be `absolute inset-0` itself so the image keeps its
  containing block.
- Horizontal entrances (`fadeLeftVariants`, `homepageImageVariants`) get
  `mobileVariants={fadeUpVariants}` to avoid horizontal overflow on small screens.
