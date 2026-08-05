# Sprint 17 — Critical Mobile Fix: Homepage Motion Visibility & Padding

Stabilization only. No redesign, no copy changes, no section reordering.

---

## 1. Root Cause Analysis

### 1.1 Primary defect — post-hydration variant swap against a torn-down observer

`components/motion/Reveal.tsx` decides which variant set to use with a client-only hook:

```tsx
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)   // false on server AND on first client render
  useEffect(() => { ...setIsMobile(mq.matches)... }, [])
  return isMobile
}
```

Three facts combine into a permanent failure:

1. **`isMobile` is always `false` for the first render.** On a phone, render #1 uses the *desktop* variant (`imageRevealVariants` → `hidden: { opacity: 0, x: 36, scale: 0.985 }`), then `useEffect` flips it to `fadeUpVariants` → `hidden: { opacity: 0, y: 24 }`.
2. **The variants object is rebuilt inline on every render.** `const active: Variants = { hidden: base.hidden, visible: {...} }` is a new object identity each pass, with a *different set of animatable keys* before and after the flip (`x`/`scale` → `y`).
3. **`revealViewport` sets `once: true`.** Framer Motion **disconnects the IntersectionObserver as soon as it has fired once**.

So on mobile: the observer fires (or is armed and consumed) against variant set A, hydration then swaps in variant set B, the element re-resolves against B, and because the observer is already gone **nothing can ever drive it to `visible` again**. It settles on `opacity: 0` permanently.

The `aspect-[4/3]` wrapper still reserves layout — which is precisely the reported symptom: **a correctly sized, permanently blank 4:3 region.**

### 1.2 Same mechanism → Leadership "translated beyond the left viewport edge"

The Leadership text column (`app/page.tsx:200`) first-renders with `fadeLeftVariants` → `hidden: { opacity: 0, x: -32 }`.

`-32px` is larger than the container's mobile padding (`Container` uses `px-4` = 16px). A column stuck in `hidden` therefore sits **16px outside the left viewport edge**. Because that Section already carries `overflow-x-clip`, the overflow is clipped rather than scrolled — producing exactly the reported "first letters clipped / heading and paragraph start outside the container" bug.

### 1.3 Contributing defect — `items-center` on the mobile flex column

`CompanyIntroSection.tsx:27`:

```
flex flex-col gap-12 lg:grid lg:grid-cols-12 ... items-center
```

`items-center` is **unprefixed**, so on mobile the column is `flex flex-col; align-items: center`. Children no longer stretch to full width — they are shrink-to-fit and centred. The image wrapper (`aspect-[4/3]` with no explicit width) then depends entirely on the intrinsic width of the `<img>` to resolve its box. This is fragile sizing and contributes to the "clipped / insufficiently padded" symptom.

### 1.4 Contributing defect — nested viewport owners

Four places create a second, independent `whileInView` observer inside a section that already has one. Each inner observer can stall while the outer one has already consumed its `once: true`:

| Location | Outer owner | Nested owner |
| --- | --- | --- |
| `CompanyIntroSection.tsx:55` | `StaggerReveal` | `Reveal` (image) |
| `app/page.tsx:200` | `Reveal` | `StaggerReveal` (text stack) |
| `app/page.tsx:236` | `Reveal` | `StaggerReveal` (name/role) |
| `GallerySection.tsx:46` | `Reveal` | `StaggerReveal` (swiper) |
| `app/about/page.tsx:95` | `Reveal` | `StaggerReveal` (business model) |

### 1.5 Contributing defect — threshold too high

`revealViewport` = `{ amount: 0.22, margin: '0px 0px -8% 0px' }`. Large blocks must be 22% visible inside a root already shrunk 8% at the bottom. Combined with fast scrolling this widens the window in which 1.1 can bite.

### 1.6 Contributing defect — padding

`Section className="... pt-16 pb-0 sm:py-24 lg:py-32"` gives Company Introduction **zero bottom padding on mobile**, collapsing it into the Gold Price section.

### 1.7 Structural swap on reduced motion

`Reveal` early-`return`s a *structurally different* `motion.div` when `useReducedMotion()` is truthy. `useReducedMotion()` also resolves after mount, so this is a second server/client divergence in the same component.

---

## 2. Strategy (confirmed with user)

- **Fail-safe approach:** keep `initial="hidden"` so desktop and mobile entrance choreography survives, but drive the animation from **React state** via a shared `useSafeInView` hook that cannot get stuck. This satisfies Step 3's alternative clause ("an implementation where essential content does not depend on IntersectionObserver") without deleting the site's motion.
- **`app/about/page.tsx`:** fixed the same way, not just made to compile.
- **Device testing:** I run `tsc --noEmit` + `pnpm build` and produce a manual test script; the user executes the iOS Safari / Android Chrome matrix. Device results will be reported as *not verified by me*.

---

## 3. Implementation

### Step 3.1 — New file: `components/motion/useSafeInView.ts`

Single source of truth for "is this block revealed yet". Guarantees content can never remain hidden.

```tsx
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
```

Listeners detach as soon as the block is revealed, so steady-state cost is zero.

### Step 3.2 — `components/motion/motion-tokens.ts`

**a. Lower the thresholds and add the large-section token.** Use `satisfies UseInViewOptions` so `margin` keeps its literal type — Framer Motion types `margin` as a template-literal union (`MarginType`), and a widened `string` will fail `tsc` when passed to `useInView`.

```ts
import type { UseInViewOptions } from 'framer-motion'

export const revealViewport = {
  once: true,
  amount: 0.08,
  margin: '0px 0px -4% 0px',
} satisfies UseInViewOptions

export const largeSectionViewport = {
  once: true,
  amount: 0.05,
} satisfies UseInViewOptions
```

**b. Decouple `homepageImageVariants` from the horizontal `imageRevealVariants`** so homepage images use safe vertical motion while other pages' tokens are untouched:

```ts
// was: export const homepageImageVariants = imageRevealVariants
export const homepageImageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, ease: motionEase },
  },
}
```

Duration/easing preserved, so the desktop feel is unchanged apart from axis.

`imageRevealVariants`, `fadeLeftVariants`, `fadeRightVariants` remain exported as design tokens (they become unreferenced but this is a token module, not dead application code).

### Step 3.3 — `components/motion/Reveal.tsx` (rewrite)

- Delete `useIsMobile` and the `isMobile` call site entirely.
- Delete the `mobileVariants` prop → API becomes exactly the one specified in the brief.
- Delete the structural early-`return` for reduced motion; select the variant set instead, keeping **one** mounted `motion.div`.
- `useMemo` the composed variants so the object identity is stable across renders.
- Drive with `animate={isRevealed ? 'visible' : 'hidden'}` from `useSafeInView` instead of `whileInView`. This also makes `Reveal` a clean variant-tree boundary.
- Add `data-reveal` for the no-JS hardening in Step 3.10.

```tsx
'use client'

import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { motionEase, revealViewport, fadeUpVariants } from './motion-tokens'
import { useSafeInView } from './useSafeInView'

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: motionEase } },
}

type RevealProps = {
  children: React.ReactNode
  className?: string
  variants?: Variants
  delay?: number
}

export function Reveal({ children, className, variants, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const [ref, isRevealed] = useSafeInView(revealViewport)

  const active = useMemo<Variants>(() => {
    const base = shouldReduceMotion ? reducedVariants : (variants ?? fadeUpVariants)
    return {
      hidden: base.hidden,
      visible: {
        ...(base.visible as object),
        transition: {
          ...(base.visible as { transition?: object }).transition,
          delay: shouldReduceMotion ? 0 : delay,
        },
      },
    }
  }, [shouldReduceMotion, variants, delay])

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      variants={active}
      initial="hidden"
      animate={isRevealed ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}
```

### Step 3.4 — `components/motion/StaggerReveal.tsx`

Same treatment, so the parent that now owns every section entrance carries the same guarantee:

- Use `useSafeInView(revealViewport)` + `animate={...}` in place of `whileInView` / `viewport`.
- `useMemo` the container variants.
- Add `data-reveal`.
- `StaggerItem` is unchanged in behaviour (it has no `animate`, so it correctly inherits from the parent) — only memoise its variant selection.

### Step 3.5 — `components/sections/CompanyIntroSection.tsx`

Target section wrapper:

```tsx
<Section className="overflow-x-clip bg-white pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-32">
```

Notes:
- **`pt-*` / `pb-*` pairs, not `py-*`.** `Section` already emits `py-[var(--section-default)]`; Tailwind orders `pt`/`pb` after `py`, so explicit `pt`/`pb` deterministically win. A bare `py-16` would collide with the base `py` utility and its precedence would be order-dependent. This yields the required 64 / 96 / 128px rhythm.
- **`overflow-x-clip`, not `overflow-hidden`** (Step 8) so the image's `shadow-lg` is not cropped vertically.

Grid wrapper — mobile stretch restored, gap per brief:

```tsx
<StaggerReveal
  className="flex flex-col gap-10 sm:gap-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:gap-y-8"
  staggerBy={0.1}
  delayChildren={0.04}
>
```

`items-center` → `lg:items-center` (fixes 1.3). Add `min-w-0` to the two text columns.

Replace the nested `Reveal` with a `StaggerItem` (removes observer, inherits parent stagger):

```tsx
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
```

- `bg-limestone` added (`--color-limestone: #E9E3D9` already exists in `globals.css`).
- `priority` **removed** — this is the second section, below the hero fold.
- `sizes` added so Next.js stops shipping the 1200px asset to a 375px phone (pure win, no visual change).
- The `ring-1 ring-inset` overlay is **kept** (the brief's snippet omits it, but removing it is a visual change and this is a stabilization task). `pointer-events-none` added.
- Remove the now-unused `Reveal` and `fadeUpVariants` imports.

**Asset verified:** `public/images/home/company/company-overview.jpeg` exists, 671,028 bytes, exact case match with `content/homepage.ts:115`.

Stagger order becomes eyebrow → heading → lead → image → supporting → CTA, which reads correctly on both mobile (stacked) and desktop (2-column).

### Step 3.6 — `app/page.tsx` Leadership Feature (lines 196–264)

Remove both `Reveal` wrappers; each column becomes a single `StaggerReveal` viewport owner.

```tsx
<Section className="overflow-x-clip bg-white">
  <Container variant="wide">
    <div className="grid min-w-0 gap-10 md:grid-cols-2 md:items-center md:gap-12">
      <StaggerReveal className="min-w-0" staggerBy={0.1} delayChildren={0.04}>
        <Stack gap="lg" className="min-w-0">
          <StaggerItem variants={homepageEyebrowVariants}>
            <p className="text-sm font-medium uppercase tracking-wide text-clay">LEADERSHIP</p>
          </StaggerItem>
          <StaggerItem variants={homepageHeadingVariants}>
            <h2 className="break-words font-display text-4xl leading-tight text-basalt md:text-5xl">
              Experienced Leadership Across Trading, Operations and Technical Services.
            </h2>
          </StaggerItem>
          <StaggerItem variants={homepageBodyVariants}>
            <p className="text-lg text-black">{leadershipCompanyDirectionStatement}</p>
          </StaggerItem>
          <StaggerItem variants={homepageCtaVariants} className="flex flex-col">
            <ButtonLink
              href="/about/leadership"
              variant="bright-pattern"
              size="lg"
              className="w-full justify-center px-8 sm:w-auto"
            >
              Meet the team
            </ButtonLink>
          </StaggerItem>
        </Stack>
      </StaggerReveal>

      {leadershipFeaturedPerson && (
        <StaggerReveal className="flex min-w-0 flex-col" staggerBy={0.1} delayChildren={0.08}>
          <StaggerItem variants={homepageImageVariants}>
            <ImageWithFallback
              src={leadershipFeaturedPerson.image}
              alt={leadershipFeaturedPerson.name}
              width={900}
              height={1200}
              category="Team"
              objectFit="contain"
              layout="intrinsic"
              className="mb-6 rounded-lg"
            />
          </StaggerItem>
          <StaggerItem variants={homepageBodyVariants}>
            <h3 className="mb-1 font-display text-2xl font-bold text-basalt">
              {leadershipFeaturedPerson.name}
            </h3>
            <p className="text-sm font-bold uppercase tracking-wide text-copper">
              {leadershipFeaturedPerson.role}
            </p>
          </StaggerItem>
        </StaggerReveal>
      )}
    </div>
  </Container>
</Section>
```

Deltas vs. current, all per Step 7:
- `fadeLeftVariants` (`x: -32`) eliminated → no negative-x on mobile-critical content.
- `min-w-0` on grid, both columns and the `Stack`.
- `break-words` + `leading-tight` on the `h2`.
- Grid gap `gap-12` → `gap-10 md:gap-12`; `items-center` → `md:items-center` (no vertical centring while stacked).
- CTA gains `w-full justify-center sm:w-auto`; **`px-8` retained** so the desktop button width is unchanged.
- Portrait keeps `layout="intrinsic"` + `objectFit="contain"` → remains full width and uncropped.

Then remove `Reveal` / `fadeLeftVariants` from the imports if unused elsewhere in the file (`Reveal` is still used at lines 74 and 125, so keep that import).

### Step 3.7 — `components/sections/home/GallerySection.tsx`

Delete the outer `Reveal` (lines 46–50) and hoist `className="relative"` onto the inner `StaggerReveal`. Drop the `Reveal`, `homepageSectionVariants` and `fadeUpVariants` imports. The gallery introduction copy already uses vertical `homepage*Variants` and needs no change.

### Step 3.8 — `components/sections/home/GoldPriceSection.tsx`

- Remove `mobileVariants={fadeUpVariants}` (required by the API change); keep `cardRevealVariants` — it is `y` + `scale` only, so it is already mobile-safe.
- Add `overflow-x-clip` to the `Section`: the decorative `absolute -inset-4` pattern extends 16px past its parent, exactly equalling `Container`'s mobile `px-4`, which is a real horizontal-overflow source for the "No horizontal overflow" check.
- Drop the unused `fadeUpVariants` import.

### Step 3.9 — `app/about/page.tsx`

- Line 40–44: `fadeLeftVariants` + `mobileVariants` → `variants={fadeUpVariants}`.
- Line 62–66: `imageRevealVariants` + `mobileVariants` → `variants={fadeUpVariants}`.
- Line 95: flatten `Reveal > StaggerReveal` into a single `StaggerReveal` owner, matching Step 3.6/3.7.
- Clean up the `fadeLeftVariants` / `imageRevealVariants` imports.

### Step 3.10 — No-JS hardening (`app/layout.tsx`)

`initial="hidden"` puts `opacity: 0` in the SSR HTML. `useSafeInView` covers every case where JS runs; this covers the case where it does not:

```tsx
<head>
  <noscript>
    <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
  </noscript>
</head>
```

### Step 3.11 — `components/motion/StaggerGroup.tsx`

**Delete the file.** It is unreferenced anywhere in the codebase (verified), declares `staggerBy?: number` but never destructures or uses it, hardcodes `staggerChildren: 0.1` and `viewport={{ once: true }}`, and directly duplicates `StaggerReveal`. Per Step 10, `StaggerReveal`/`StaggerItem` is the surviving system.

Also flag (do **not** delete without approval — outside stated scope): `components/motion/FadeReveal.tsx` and `components/motion/ImageReveal.tsx` are likewise unreferenced legacy duplicates that hardcode `viewport={{ once: true }}` and bypass `motion-tokens`. They will be reported, not touched.

---

## 4. Explicitly Not Changed

Per Scope Control: homepage copy, section order, card designs, button variants, portrait assets, hero animation (`HeroCarousel`), Gold Price API (`lib/market/gold-api`), Swiper configuration/interaction, Deep Rock glow styling (`BrandGlowText`), `MobileServicesCarousel`, `MobileValuesCarousel`, `ValueGlyph`/`ServiceGlyph`.

`Section` / `Container` are **not** converted to `tailwind-merge`. It would make className overrides deterministic, but it would silently change `GoldPriceSection`'s `py-12 md:py-24` precedence against the base `py-[var(--section-default)]`. Recorded as a follow-up, out of scope here.

---

## 5. Validation

### Automated (I run these)

```powershell
pnpm exec tsc --noEmit
pnpm build
```

Plus a static audit: confirm zero remaining `mobileVariants` references, zero `useIsMobile`, zero nested `whileInView` on the homepage, and no negative-`x` variant reachable from homepage or about.

### Manual device matrix (user runs)

Widths **320 / 375 / 390 / 430 / 768 / 1024 / 1440**, on iOS Safari, Android Chrome, Chrome responsive mode, Safari responsive mode.

For each width, per section, under: hard refresh · throttled network · fast scroll · scroll past then back · background Safari and return · `prefers-reduced-motion: reduce`.

| # | Check | Expected |
| --- | --- | --- |
| 1 | Company Intro image renders | Photo visible, never a blank 4:3 box |
| 2 | Company Intro image opacity | Computed `opacity` is `1` after scroll-in |
| 3 | Image load failure | Limestone `#E9E3D9` backdrop, not white |
| 4 | Supporting copy spacing | 64px below image on mobile |
| 5 | Licensed Aggregator badge | Visible, inside container |
| 6 | Leadership heading | Starts inside container, no clipped first letters |
| 7 | Leadership paragraph | Starts inside container |
| 8 | Leadership CTA | Full width on mobile, inside padding |
| 9 | Portrait | Full width, uncropped |
| 10 | Horizontal overflow | `document.documentElement.scrollWidth === clientWidth` at every width |
| 11 | Stuck hidden state | No element with `[data-reveal]` at `opacity: 0` after scrolling the full page |
| 12 | Native scrolling | Momentum scroll intact, no scroll-jacking |
| 13 | Desktop choreography | Stagger still visible at 1440px |

Quick console probe for #10/#11:

```js
console.log('overflow', document.documentElement.scrollWidth - document.documentElement.clientWidth)
console.log('stuck', [...document.querySelectorAll('[data-reveal]')]
  .filter(el => getComputedStyle(el).opacity === '0').length)
```

Both must print `0` after scrolling to the footer.

---

## 6. Final Report Template

1. **Cause of invisible Company Introduction image** — §1.1.
2. **`useIsMobile` removed from `Reveal`** — yes / no.
3. **Nested viewport observers removed** — list from §1.4.
4. **Final Company Introduction padding** — mobile / tablet / desktop values.
5. **Final Leadership mobile reveal behaviour.**
6. **Final viewport threshold** — `revealViewport` + `largeSectionViewport`.
7. **iOS Safari result** — *pending user device test; not verified by me.*
8. **Android Chrome result** — *pending user device test; not verified by me.*
9. **TypeScript result** — `pnpm exec tsc --noEmit`.
10. **Production build result** — `pnpm build`.

---

## 7. Change Manifest

| File | Action |
| --- | --- |
| `components/motion/useSafeInView.ts` | **new** — fail-safe in-view hook |
| `components/motion/motion-tokens.ts` | lower thresholds, add `largeSectionViewport`, de-alias `homepageImageVariants` |
| `components/motion/Reveal.tsx` | rewrite — drop `useIsMobile` + `mobileVariants`, memoised variants, state-driven `animate` |
| `components/motion/StaggerReveal.tsx` | state-driven `animate`, memoised variants, `data-reveal` |
| `components/motion/StaggerGroup.tsx` | **delete** — unused, broken `staggerBy` |
| `components/sections/CompanyIntroSection.tsx` | padding, `overflow-x-clip`, `lg:items-center`, `Reveal` → `StaggerItem`, `bg-limestone`, drop `priority`, add `sizes` |
| `app/page.tsx` | Leadership containment + de-nesting |
| `components/sections/home/GallerySection.tsx` | remove nested `Reveal` |
| `components/sections/home/GoldPriceSection.tsx` | drop `mobileVariants`, add `overflow-x-clip` |
| `app/about/page.tsx` | `fadeUpVariants`, de-nest, import cleanup |
| `app/layout.tsx` | `<noscript>` reveal override |
