# Sprint 16 — Premium Homepage Motion System (Implementation Plan)

## 0. Findings from inspection (what already exists)

**Motion primitives (`components/motion/`)**

| File | Status | Notes |
| --- | --- | --- |
| `motion-tokens.ts` | Canonical tokens | `motionEase [0.22,1,0.36,1]`, `revealTransition (0.72)`, `revealViewport {once:true, amount:0.22, margin:'0px 0px -8% 0px'}`, `fadeUpVariants (y24)`, `fadeLeftVariants (x-32)`, `fadeRightVariants (x32)`, `imageRevealVariants (x36, scale .985, .82)`, `cardRevealVariants (y28, scale .99, .78)`, `valueCardVariants (y24, scale .99, .62)`, `visionCardVariants`, `missionCardVariants`, `adinkraSymbolVariants`, `mobileCardVariants` |
| `Reveal.tsx` | Reuse | Client. Props `variants`, `mobileVariants`, `delay`, `className`. Internal `useIsMobile()` (`max-width: 1023px`) + `useReducedMotion()` → opacity-only. Uses `whileInView` + `revealViewport`. |
| `StaggerReveal.tsx` | Reuse | Client. `StaggerReveal` (one observer, `staggerBy`, `delayChildren`) + `StaggerItem` (`variants`, `className`). Both reduced-motion aware. |
| `FadeReveal.tsx` / `ImageReveal.tsx` / `StaggerGroup.tsx` | Legacy, do not extend | Kept for compatibility, use the newer trio instead. |
| `motion-config.ts` | Legacy tokens | Only used by the legacy trio. Leave untouched. |

**Homepage state**

- `app/page.tsx` — Server Component exporting `metadata` (must stay server). Contains Services Overview, Core Values, Leadership Feature, Partnership CTA inline.
- `components/sections/CompanyIntroSection.tsx` — already `'use client'` but defines **local duplicate variants** (`containerVariants`, `itemVariants`, `imageVariants` inside the render function) and uses `viewport={{once:true, margin:'-100px'}}`. Must be refactored onto shared primitives/tokens.
- `components/sections/home/GoldPriceSection.tsx` — `async` Server Component. No motion. `GoldBarDecoration` already owns time-based drift via `useAnimationControls` + `useInView` (not scroll-linked) and settles to base rotation when out of view; **preserve unchanged**.
- `components/market/GoldPriceLiveRegion.tsx` — client, self-refreshing (5 min, pauses on hidden tab). Price figures live here.
- `components/sections/home/GallerySection.tsx` — client, Swiper (`Navigation`, `A11y`), 8 images, external nav buttons via class selectors. No motion yet.
- `components/sections/home/MobileServicesCarousel.tsx` — Swiper, no motion, no `animated` prop.
- `components/sections/home/MobileValuesCarousel.tsx` — Swiper, already supports an opt-in `animated` prop (activeIndex-driven `mobileCardVariants`, reduced-motion safe). Homepage currently does **not** pass it; the MVV page does. Grouping 2+2+2+1 comes from 7 values.
- `HeroCarousel` — untouched by this sprint.

**Layout facts that constrain the wrappers**

- `Container variant="wide"` = `max-w-wide (90rem)` with `px-4 / sm:px-6 / lg:px-8 / xl:px-10`. At 1024–1279px the padding is 32px, so a **+36px rightward transform can create ~4px of horizontal overflow**. Negative-x (leftward) transforms cannot create a horizontal scrollbar in LTR. `CompanyIntroSection` already has `overflow-hidden`; the Leadership section does not.
- `Stack` = `flex flex-col`, so a bare `ButtonLink` (`inline-flex`) currently **stretches to full column width** (align-items: stretch). Wrapping it in a plain block div would shrink it → wrappers around those buttons must be `flex flex-col`.
- Value cards in the desktop grid currently rely on grid-item stretch for equal heights; once wrapped in a `StaggerItem` the `<article>` needs `h-full` (same as the MVV page already does). Service cards already have `h-full`.
- `GalleryImage` renders `absolute inset-0`; a transformed wrapper becomes its containing block → the wrapper must be `absolute inset-0` itself.

---

## 1. Motion tokens — `components/motion/motion-tokens.ts`

Add only what is missing; alias where an equivalent already exists (no duplicate variant definitions).

```ts
// --- Homepage section rhythm -------------------------------------------------
export const homepageSectionVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: motionEase } },
}

// Named homepage aliases: intentionally reuse existing definitions instead of
// duplicating near-identical variants.
export const homepageImageVariants = imageRevealVariants   // x36, scale .985→1
export const homepageCardVariants = valueCardVariants      // y24, scale .99→1, .62

// Shared editorial intro rhythm (eyebrow → heading → body → cta)
export const homepageEyebrowVariants: Variants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5,  ease: motionEase } } }
export const homepageHeadingVariants: Variants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7,  ease: motionEase } } }
export const homepageBodyVariants:    Variants = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: motionEase } } }
export const homepageCtaVariants:     Variants = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: motionEase } } }

// Gallery slide media: opacity + scale only (Swiper owns horizontal movement)
export const homepageGalleryImageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.68, ease: motionEase } },
}
```

No changes to `motion-config.ts`, `Reveal.tsx`, `StaggerReveal.tsx`, `FadeReveal.tsx`, `ImageReveal.tsx`, `StaggerGroup.tsx` (primitives are sufficient as-is; `Reveal` already provides the mobile-variant swap needed for every horizontal entrance).

---

## 2. Section 1 — `components/sections/CompanyIntroSection.tsx`

Refactor to shared primitives; delete the three local variant objects. **Two observers.**

```
<Section className="bg-white overflow-hidden pt-16 pb-0 sm:py-24 lg:py-32">   // unchanged
  <Container variant="wide">
    <StaggerReveal className="flex flex-col gap-12 lg:grid lg:grid-cols-12 lg:gap-x-16 lg:gap-y-8 items-center"
                   staggerBy={0.1} delayChildren={0.04}>            // observer 1 (all copy)
      <div className="lg:col-span-5 order-1">
        <StaggerItem variants={homepageEyebrowVariants}><p …>BrandGlowText "DEEPROCK MINING LIMITED"</p></StaggerItem>
        <StaggerItem variants={homepageHeadingVariants}><h2 …>BrandGlowText heading</h2></StaggerItem>
        <StaggerItem variants={homepageBodyVariants}><div className="space-y-6"><p …>lead</p></div></StaggerItem>
      </div>

      <Reveal className="lg:col-span-7 order-2 lg:row-span-2"        // observer 2 (image)
              variants={homepageImageVariants} mobileVariants={fadeUpVariants} delay={0.12}>
        …existing figure markup unchanged…
      </Reveal>

      <div className="lg:col-span-5 order-3">
        <StaggerItem variants={homepageBodyVariants} className="space-y-6 mb-10">…supporting paragraphs…</StaggerItem>
        <StaggerItem variants={homepageCtaVariants} className="flex flex-col items-start gap-8">…trust badge + license link + CTA…</StaggerItem>
      </div>
    </StaggerReveal>
```

- Sequence ≈ eyebrow 0 → heading +100 → lead +200 → supporting +300 → CTA +400 ms, image on its own observer at +120 ms (matches the requested rhythm; `staggerChildren` follows tree order).
- `motion.p` / `motion.h2` become `StaggerItem` **wrapping** the original `<p>` / `<h2>`, so semantics and classes are unchanged.
- `BrandGlowText` usage untouched → normalized inline glow preserved, no raised glow reintroduced.
- Mobile: image uses `fadeUpVariants` (no x), and the section already clips overflow.

## 3. Section 2 — Gold Price

`components/sections/home/GoldPriceSection.tsx` (stays an async Server Component):

```
<div className="grid lg:grid-cols-[1fr_1.5fr] …">
  <StaggerReveal staggerBy={0.09} delayChildren={0.04}>      // observer 1: intro copy
    <Stack gap="sm"><div>
      <StaggerItem variants={homepageEyebrowVariants}><p>GOLD MARKET</p></StaggerItem>
      <StaggerItem variants={homepageHeadingVariants}><h2>…</h2></StaggerItem>
      <StaggerItem variants={homepageBodyVariants}><p>…</p></StaggerItem>
    </div></Stack>
  </StaggerReveal>

  <Reveal className="relative" variants={cardRevealVariants} mobileVariants={fadeUpVariants}>  // observer 2: card shell (y28, scale .99)
    …decorative pattern + dark card + <GoldBarDecoration /> + <GoldPriceLiveRegion /> unchanged…
  </Reveal>
</div>
```

`components/market/GoldPriceLiveRegion.tsx` — make the existing root a `StaggerReveal` (observer 3, price group only) and wrap the three blocks as items:

```
<StaggerReveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative"
               staggerBy={0.09} delayChildren={0.14}>
  <div aria-live="polite" className="sr-only">…</div>            // untouched
  <div className="space-y-6">
    <StaggerItem variants={homepageHeadingVariants}> XAU/USD label + ounce price </StaggerItem>
    <StaggerItem variants={homepageBodyVariants}>    gram price + market status row </StaggerItem>
  </div>
  <StaggerItem variants={homepageBodyVariants} className="text-left md:text-right space-y-1"> last-updated block </StaggerItem>
</StaggerReveal>
```

- Error / `!data` early returns stay unwrapped (content must never be hidden behind motion).
- `GoldBarDecoration` is **not** touched: drift is time-based, `useInView`-gated, settles to base rotation off-screen, and static under reduced motion. No scroll-linking added anywhere; the drift is not restarted by the new reveals (separate component, `once` reveals only).

## 4. Section 3 — Services Overview (`app/page.tsx`)

- **Intro (observer 1):** wrap the `max-w-2xl` div in `StaggerReveal staggerBy={0.1}`; eyebrow → `homepageEyebrowVariants` (12px), heading → `homepageHeadingVariants` (24px), summary → `homepageBodyVariants` (18px). `BrandGlowText` unchanged.
- **Mobile carousel:** `<Reveal className="md:hidden" variants={fadeUpVariants}>` around `<MobileServicesCarousel …/>`. No Swiper props change, no drag replacement.
- **Desktop grid (observer 2):** convert the grid div to `<StaggerReveal className="hidden md:grid md:grid-cols-2 gap-6" staggerBy={0.1} delayChildren={0.05}>`; each card becomes `<StaggerItem key={service.id} className="h-full" variants={homepageCardVariants}>` wrapping the **unchanged** `<article>`. Tailwind hover (shadow, texture opacity, copper glow, `ServiceGlyph` rotate/scale, heading color) is untouched and not re-implemented in Motion.
- **CTA (observer 3):** `<Reveal className="flex flex-col" variants={homepageCtaVariants}>` around `View All Services` (the `flex flex-col` wrapper preserves the current full-width stretch).

## 5. Section 4 — Core Values (`app/page.tsx`)

- **Intro (observer 1):** `StaggerReveal` around the `max-w-2xl` div → eyebrow + heading items.
- **Mobile carousel:** pass `animated` to `<MobileValuesCarousel …/>` (existing, reduced-motion-safe, activeIndex-driven). Grouping logic, Swiper ownership and 2+2+2+1 output are unchanged.
- **Desktop grid (observer 2):** `<StaggerReveal className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerBy={0.09} delayChildren={0.05}>`; each value → `<StaggerItem key={value.key} className="h-full" variants={homepageCardVariants}>` and add `h-full` to the existing `<article>` class list to preserve today's equal-height cards. Card order, copper/slate sequence and colors unchanged; **no** background-color animation.
- The optional ±10px copper/slate horizontal offset is **skipped**: at 1024–1279px it risks right-edge overflow for the last column, and the sprint marks it optional/only-if-controlled.

## 6. Section 5 — Leadership Feature (`app/page.tsx`)

Add `overflow-x-clip` to this `Section` (motion-safety only; `clip` does not create a scroll container, so anchors/sticky are unaffected) because the portrait uses a +36px entrance.

- **Text column (paired reveal 1):** `<Reveal variants={fadeLeftVariants} mobileVariants={fadeUpVariants}>` wrapping a `<StaggerReveal staggerBy={0.1}>` around the existing `Stack`, with items: eyebrow (`homepageEyebrowVariants`), heading (`homepageHeadingVariants`), direction statement (`homepageBodyVariants`), "Meet the team" (`homepageCtaVariants`, wrapper `className="flex flex-col"` to keep the button's current stretch).
- **Portrait column (paired reveal 2):** `<Reveal className="flex flex-col" variants={homepageImageVariants} mobileVariants={fadeUpVariants} delay={0.08}>` containing the **unchanged** `ImageWithFallback` (`objectFit="contain"`, `layout="intrinsic"`, `width 900 × height 1200`, `rounded-lg mb-6`) followed by a small `StaggerReveal delayChildren={0.2}` for name + role (caption follows portrait).
- Mobile (<1024px): both columns fall back to `fadeUpVariants` — no horizontal movement, no clipping, portrait never cropped (sizing untouched).

## 7. Section 6 — Gallery (`components/sections/home/GallerySection.tsx`)

- **Intro (observer 1):** `StaggerReveal` around the `max-w-2xl` div → eyebrow / heading / summary items. `BrandGlowText` (Deep Rock glow) untouched.
- **Frame (observer 2):** `<Reveal className="relative" variants={homepageSectionVariants} mobileVariants={fadeUpVariants}>` replacing the `div.relative`, containing a single `<StaggerReveal staggerBy={0.06} delayChildren={0.12}>` that wraps the `Swiper` **and** the nav row.
- **Slides:** inside each `SwiperSlide > figure`, wrap `GalleryImage` in `<StaggerItem className="absolute inset-0" variants={homepageGalleryImageVariants}>`. Variants propagate through Swiper's DOM via Motion context, so all 8 images share the **frame's single observer** (no per-slide observers). `absolute inset-0` on the wrapper keeps the image's absolute positioning correct under transform.
- Swiper config (`modules`, `slidesPerView`, `breakpoints`, `navigation` selectors, `watchOverflow`) is unchanged; no drag replacement, no touch handlers, no `preventDefault`. Nav buttons keep their classes and focus rings.

## 8. Section 7 — Partnership CTA (`app/page.tsx`)

One centered group (observer 1): `<StaggerReveal staggerBy={0.11} delayChildren={0.06}>` wrapping the existing `Stack gap="lg" className="text-center"`, with `StaggerItem`s for heading (`homepageHeadingVariants`), body (`homepageBodyVariants`), and one item per button inside `Inline` (`homepageCtaVariants`). Copper background and the buttons' SVG pattern backgrounds are never animated; the optional group scale is skipped to keep the reveal restrained and avoid text shimmer on the large display heading.

## 9. Documentation — `MOTION.md`

Append a "Homepage (Sprint 16)" section: new tokens + aliases, one-observer-per-group map, the `StaggerItem` + `h-full` grid rule, the `flex flex-col` wrapper rule for stretched `ButtonLink`s, the `absolute inset-0` rule for Swiper slide media, and the note that Gold-bar drift and Hero motion are owned elsewhere.

---

## 10. Files to modify

1. `components/motion/motion-tokens.ts` (add tokens/aliases)
2. `components/sections/CompanyIntroSection.tsx` (refactor onto primitives)
3. `components/sections/home/GoldPriceSection.tsx`
4. `components/market/GoldPriceLiveRegion.tsx`
5. `app/page.tsx` (Services, Values, Leadership, Partnership CTA wrappers only — stays a Server Component, no `'use client'`)
6. `components/sections/home/GallerySection.tsx`
7. `MOTION.md`

Untouched: `HeroCarousel.tsx`, `GoldBarDecoration.tsx`, `MobileServicesCarousel.tsx`, `MobileValuesCarousel.tsx` (only the `animated` prop is passed from the page), `Reveal.tsx`, `StaggerReveal.tsx`, legacy primitives, all `content/*`, all button/section/background styling.

## 11. Constraints honored

- Only `transform` + `opacity` animate. No height/width/padding/blur/background-position.
- No `useScroll`, `useTransform`, wheel/touch listeners, `preventDefault`, scroll containers, snapping, sticky scenes, or RAF page loops. Everything is `whileInView` + `viewport.once = true` via `revealViewport`.
- Observers: Company Intro 2 · Gold Price 3 (intro, card shell, price group) · Services 3 (intro, grid, CTA) + 1 mobile-only · Values 2 (+ carousel internal) · Leadership 4 (2 paired reveals, each with one nested sequencing group) · Gallery 2 · CTA 1. None per sentence/icon/label.
- Reduced motion: every primitive used (`Reveal`, `StaggerReveal`, `StaggerItem`, `MobileValuesCarousel`, `GoldBarDecoration`, `BrandGlowText`) already reads `useReducedMotion()` → opacity-only, no x/y/scale, no stagger, static gold bars, Swiper fully usable, all content present.
- No variants declared inside render functions or inside `.map()`.

## 12. Validation

```powershell
pnpm exec tsc --noEmit
pnpm build
```

Manual pass (dev server): 320 / 375 / 390 / 430 / 768 / 1024 / 1440 px; normal + `prefers-reduced-motion: reduce`; slow scroll, fast scroll, touch swipe on both carousels and the gallery, keyboard nav (tab order, focus rings, Swiper A11y), hidden tab → return (gold-bar drift resumes, price refresh interval resumes, no re-trigger of reveals). Check `document.documentElement.scrollWidth === clientWidth` at each width during reveals, and the console for hydration warnings.

## 13. Risks / mitigations

| Risk | Mitigation |
| --- | --- |
| +36px image entrance causing 4px horizontal overflow at 1024–1279px | `overflow-x-clip` on the Leadership section; Company Intro already `overflow-hidden`; Gallery uses scale-only |
| Wrapper divs breaking equal-height cards | `h-full` on `StaggerItem` + `h-full` on the value `<article>` (matches MVV page) |
| Wrapper div shrinking stretched `ButtonLink`s | `flex flex-col` wrappers for those two CTAs |
| Absolute gallery image collapsing under a transformed wrapper | `StaggerItem className="absolute inset-0"` |
| Content invisible if a reveal never fires | `viewport.once` + `amount 0.22` with `-8%` margin (existing shared token, already proven on About/MVV); reduced motion renders opacity-only |
