# Deep Rock Website — DESIGN.md

## Design Intent

The Deep Rock website should communicate:

```text
credibility
technical capability
responsible operations
commercial maturity
Ghanaian ownership
long-term value
```

The visual system should feel premium and editorial without becoming decorative or theatrical.

---

# Brand Name

All visible brand references use:

```text
Deep Rock
```

Never use `DeepRock` in user-facing copy.

Approved forms:

```text
Deep Rock
Deep Rock's
Deep Rock’s
Deep Rock Co. Ltd
Deep Rock Co. Ltd.
Deep Rock Mining Ltd
Deep Rock Mining Ltd.
Deep Rock Mining Limited
```

Technical identifiers, repository names, imports, and routes do not need to be renamed unless they are visible content.

---

# Typography

## Display Font

Use the local display font for:

```text
hero headings
section headings
card titles
important labels
editorial emphasis
```

## Body Font

Use the local body font for:

```text
paragraphs
navigation
metadata
buttons
supporting copy
```

Do not force the display font inside body-copy brand highlights.

---

# Color System

## Copper

Use for:

```text
brand emphasis
eyebrows
primary patterned buttons
important headings
icons
inline glow text
```

## Basalt

Use for:

```text
dark surfaces
primary text
footer
deep navigation states
```

## Slate

Use for:

```text
secondary dark cards
alternating value cards
deep patterned buttons
```

## Limestone

Use for:

```text
light cards
section contrast
soft editorial backgrounds
```

## Graphite

Use for:

```text
body copy
secondary text
descriptions
```

---

# Inline Brand Glow

The inline brand glow must:

```text
remain on the same baseline
preserve natural wrapping
use the body font
stay orange
keep the approved glow
```

Do not use:

```text
inline-block + overflow-hidden
vertical transforms
leading-none
top offsets
```

Recommended usage:

```tsx
<BrandGlowText text="Explore Deep Rock's service portfolio." />
```

---

# Layout

## Containers

Use shared `Container` variants.

Do not create arbitrary max-width systems per page.

## Sections

Use shared `Section`.

Recommended rhythm:

```text
large top/bottom padding
clear section contrast
controlled whitespace
strong visual hierarchy
```

## Grids

Desktop:

```text
editorial asymmetry
2-column or 3-column card systems
balanced visual weight
```

Mobile:

```text
single-column reading order
full-width media
natural stacking
no forced fixed heights
```

---

# Buttons

Approved variants:

```text
bright-pattern
dark-pattern
```

Use:

```text
bright-pattern → primary action
dark-pattern   → secondary action
```

Do not create one-off CTA styling.

---

# Images

## General

- use intrinsic dimensions
- preserve aspect ratio
- avoid layout shift
- use descriptive alt text
- use object-contain when full content matters
- use object-cover only when crop is intentional

## Portraits

Leadership portraits must remain uncropped.

## CSR Images

CSR event content should support:

```text
cover image
detail hero image
multi-image gallery
responsive mobile carousel
```

---

# Icons

Use:

```text
@phosphor-icons/react
```

Use semantic icons.

Avoid mixing icon libraries in new components.

---

# Cards

Cards should feel:

```text
clean
technical
editorial
structured
```

Use:

```text
controlled radius
clear spacing
minimal shadow
strong title hierarchy
restrained pattern
```

Avoid:

```text
excessive glassmorphism
heavy blur
random gradients
floating badges
large decorative overlays
```

---

# Motion

Use the shared system in:

```text
MOTION.md
```

General rules:

```text
one-time viewport reveals
transform + opacity only
reduced-motion support
native scroll preserved
Swiper owns swipe
Motion owns internal choreography
```

---

# Homepage Section Pattern

Every major homepage section should follow:

```text
eyebrow
heading
supporting copy
content modules
primary action
```

Motion should vary by section:

```text
paired text/image reveal
staggered cards
single card rise
centered CTA reveal
```

Do not animate every element identically.

---

# CSR Design Pattern

The homepage CSR section should appear as a dedicated editorial module.

Recommended visual structure:

```text
CSR eyebrow
Our Corporate Social Responsibility heading
short introduction
large featured CSR story
smaller supporting CSR cards
View All CSR CTA
```

The first CSR entry will be a donation event.

## Featured CSR Card

Recommended:

```text
large image
category
date
title
short excerpt
Read More CTA
```

Desktop:

```text
image left / text right
```

Mobile:

```text
image above / text below
```

## CSR Supporting Cards

Use:

```text
2–3 cards
consistent image ratio
short excerpts
clear dates
category label
```

## CSR Detail Page

Use:

```text
hero image
event heading
metadata
story body
gallery
related events
```

The event gallery should be responsive and swipeable on mobile.

---

# Accessibility

Required:

```text
semantic headings
visible focus states
keyboard-accessible controls
reduced motion
descriptive alt text
sufficient contrast
logical DOM order
```

---

# Responsive QA

Always test:

```text
320px
375px
390px
430px
768px
1024px
1440px
```

Check:

```text
horizontal overflow
tap target size
image crop
line wrapping
focus order
Swiper behavior
reduced motion
```

---

# Design Anti-Patterns

Do not:

```text
redesign approved sections without a requirement
add duplicate systems
use fixed mobile heights
crop important portraits
introduce scroll-jacking
mix icon libraries
create one-off buttons
animate every element
turn pages into Client Components unnecessarily
```
