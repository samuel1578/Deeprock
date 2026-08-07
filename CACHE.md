# Caching Strategy — Deep Rock Mining Ltd

How this site is rendered, cached and refreshed.

- Framework: Next.js `16.2.6` (App Router, Turbopack build)
- Hosting: Vercel
- Last audited: Sprint 19 (homepage + About routes)

---

## 1. Caching principle

The site follows a strict hierarchy. Pick the *lowest* level that satisfies the freshness
requirement:

| Content type | Strategy | Refreshed by |
| --- | --- | --- |
| Static editorial pages | Build-time prerendering → Vercel CDN | The next deployment |
| Changing external data | Explicit data-level revalidation (Next.js Data Cache) | Time-based expiry (or, later, cache tags) |
| User / request-specific content | No shared public cache | Every request |

Consequences of this hierarchy:

- Editorial pages get **no ISR interval**. Their content lives in the repository, so a
  deployment is the only event that can change them, and a deployment already replaces the
  static output.
- A page is never converted to dynamic rendering just because one nested section shows
  changing data.
- Request-time APIs (`cookies()`, `headers()`, `draftMode()`, `connection()`,
  `searchParams`) are not introduced into editorial routes.

---

## 2. Route matrix

Taken from the `pnpm build` route table (`○` static, `●` SSG with `generateStaticParams`,
`ƒ` dynamic / server-rendered on demand).

| Route | Rendering | Revalidate | Freshness |
| --- | --- | --- | --- |
| `/` | `○` Static shell | `5m` | Deployment (shell) + ~5 min (gold price data) |
| `/about` | `○` Static (`force-static`) | — | Deployment |
| `/about/mission-vision-values` | `○` Static (`force-static`) | — | Deployment |
| `/about/leadership` | `○` Static (`force-static`) | — | Deployment |
| Gold Price data (inside `/`) | Cached dynamic data | `300s` | Approximately 5 minutes |
| `/api/market/gold` | `ƒ` Dynamic route handler | — (no shared cache) | Data Cache, ~5 minutes upstream |

Other routes, for context (unchanged by this sprint):

| Route | Rendering | Freshness |
| --- | --- | --- |
| `/contact`, `/gallery`, `/news`, `/csr`, `/services`, `/sustainability`, `/privacy-policy`, `/terms-of-use`, `/_not-found` | `○` Static | Deployment |
| `/news/[slug]`, `/csr/[slug]`, `/services/[slug]`, `/sustainability/[slug]` | `●` SSG (prerendered params) | Deployment |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | `○` Static | Deployment |

---

## 3. Rendering audit (target routes)

The four target routes and every component they import were scanned for dynamic triggers:
`cookies()`, `headers()`, `draftMode()`, `connection()`, `unstable_noStore()`,
`cache: 'no-store'`, `revalidate: 0`, request-time `searchParams`, uncached server fetches,
and `Date.now()` / `Math.random()` during server rendering.

**Result: no dynamic trigger was found on any target route.** Details:

| Route | Server data | Client-only interactivity | Verdict |
| --- | --- | --- | --- |
| `/` | One cached `fetch` to the gold provider (`revalidate: 300`) | Hero carousel, mobile carousels, CSR Swiper, Gallery + lightbox, gold price live region, all Framer Motion reveals | Static shell, ISR window inherited from the gold fetch |
| `/about` | None — `@/content/site` module import | `Reveal`, `StaggerReveal`, `ImageWithFallback` | Fully static |
| `/about/mission-vision-values` | None — `@/content/site`, `@/content/homepage` | `Reveal`, `StaggerReveal`, `DirectionCard`, `MobileValuesCarousel` | Fully static |
| `/about/leadership` | None — `@/content/leadership` | `LeadershipCarousel` (Swiper + Motion drag), `LeadershipDesktop` | Fully static |

### Explicit route configuration added

| File | Directive | Why |
| --- | --- | --- |
| `app/about/page.tsx` | `export const dynamic = 'force-static'` | Documents intent; every imported server dependency was confirmed free of request-time APIs |
| `app/about/mission-vision-values/page.tsx` | `export const dynamic = 'force-static'` | Same |
| `app/about/leadership/page.tsx` | `export const dynamic = 'force-static'` | Same |
| `app/page.tsx` | `export const revalidate = 300` | Restates the window the route already inherits from the gold fetch, and guarantees the page still self-heals every 5 minutes if the provider is unreachable during a build |

`force-static` is **deliberately not** applied to `/`: it pins the segment to
`revalidate: false` and would freeze the server-rendered gold price at build time.

### Non-blocking observations (no code change made)

- `components/layout/SiteFooter.tsx` computes `new Date().getFullYear()` during server
  rendering. This does **not** make any route dynamic — the value is evaluated once during
  prerendering and baked into the static HTML. It does mean the copyright year is
  deployment-dependent: a site that is not redeployed across a New Year boundary keeps the
  previous year until the next deployment.
- `lib/market/gold-api.ts` uses `new Date()` / `Date.now()` for `servedAt` and the
  `freshness` flag. These run inside the render that consumes the cached fetch, not inside
  the cached fetch itself, so they do not affect cacheability.
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `pnpm build` will not fail
  on type errors. Always run `pnpm exec tsc --noEmit` as a separate gate.

---

## 4. Gold Price data cache

The Gold Price is the only changing data on the site. Its architecture is intentionally
layered so that one changing section never forces the whole homepage to be dynamic.

```
Provider (api.gold-api.com/price/XAU)
  │
  │  fetch(..., { next: { revalidate: 300 } })      ← Next.js Data Cache, ~5 minutes
  ▼
lib/market/gold-api.ts  ── fetchGoldMarketData()
  │                                   │
  │ (server, build/ISR)               │ (server, per request)
  ▼                                   ▼
components/sections/home/       app/api/market/gold/route.ts   ← ƒ dynamic, no shared cache
GoldPriceSection.tsx                  ▲
  │ initial HTML                      │ client poll every 5 min
  ▼                                   │
components/market/GoldPriceLiveRegion.tsx  (Client Component)
```

| Layer | Setting | Location |
| --- | --- | --- |
| Data Cache | `revalidate: 300` (`GOLD_REVALIDATE_SECONDS`) | `lib/market/gold-api.ts` |
| Homepage ISR window | `revalidate = 300` | `app/page.tsx` |
| Client poll | `CLIENT_REFRESH_MS = 5 * 60 * 1000`, paused while the tab is hidden | `components/market/GoldPriceLiveRegion.tsx` |
| Stale badge | `STALE_AFTER_MS = 15 min` on the provider timestamp | `lib/market/gold-api.ts`, `GoldPriceLiveRegion.tsx` |
| Request timeout | `FETCH_TIMEOUT_MS = 8000` (failure degrades to "temporarily unavailable") | `lib/market/gold-api.ts` |

Rules for this data:

- **`/api/market/gold` must never be publicly cached.** It sets no `Cache-Control` header on
  purpose, so neither the browser nor the CDN keeps a shared copy. Adding `s-maxage` or
  `immutable` there would pin one quote for all visitors and break the 5-minute contract.
  Upstream call volume is already bounded by the Data Cache, not by an HTTP cache.
- Keep the literal in `app/page.tsx` in sync with `GOLD_REVALIDATE_SECONDS`. Route segment
  config must be a static literal, so it cannot import the constant.
- The client polling architecture is intentional and is preserved. Do not redesign it into a
  server-only or streaming section without a confirmed defect.

---

## 5. Client interactivity does not affect caching

The following are Client Components (`'use client'`) that hydrate in the browser. None of
them causes request-time server rendering, and none of them fetches local content at
runtime — their content is imported from `content/*.ts` and bundled statically:

- Swiper carousels — `HeroCarousel`, `CsrSection`, `MediaGallery`, `MediaLightbox`,
  `LeadershipCarousel`, `MobileServicesCarousel`, `MobileValuesCarousel`
- Lightbox state, focus management (focus-in/focus-return, Tab containment) and
  body-scroll locking — `MediaLightbox`
- Framer Motion reveals — `Reveal`, `StaggerReveal`, and per-page motion variants

Animations are a hydration-time concern only. Never remove motion, and never convert a page
to a Client Component, in order to influence caching.

---

## 6. Images and static assets

| Asset class | Served from | Caching |
| --- | --- | --- |
| Next.js build chunks | `/_next/static/*` | Content-hashed; framework-managed immutable caching. **Do not override.** |
| Local images | `public/images/**` | Part of the deployment snapshot; replaced on deploy |
| Self-hosted fonts | `public/fonts/**` (`@font-face` in `app/globals.css`) | Part of the deployment snapshot; replaced on deploy |
| Brand/icon files | `public/*.png`, `public/*.svg` | Part of the deployment snapshot; replaced on deploy |

Findings and rules:

- **`next.config.mjs` sets `images: { unoptimized: true }`.** The Vercel Image Optimizer
  (`/_next/image`) is therefore bypassed: `next/image` emits a plain `<img>` that points at
  the original file in `public/`, and no `srcset` is generated (so the `sizes` values that
  are present on gallery, CSR, footer and DirectionCard images are inert while this flag is
  set). Enabling the optimizer would add per-size variants and optimizer-level cache TTLs,
  but it also changes image URLs, delivery format and Vercel usage. **That flag was left
  untouched in this sprint** — it is a delivery decision that needs explicit sign-off, not a
  caching bug.
- Intrinsic `width` and `height` are supplied everywhere (`ImageWithFallback`,
  `GalleryImage`, `next/image` in the footer), including real source dimensions in
  `content/gallery.ts`. Keep them: they prevent layout shift and are required by
  `next/image`.
- **No query-string cache busting** exists on any image URL, and none must be added.
  Deployments already replace the files.
- Only above-the-fold media is prioritised: the first hero slide uses
  `loading="eager"` + `fetchPriority="high"`, and the header/mobile-nav logo uses
  `priority`. Everything below the fold stays lazy. Do not add `priority` to
  below-the-fold images.
- Files under `public/` are **not** filename-fingerprinted. Do not give them long-lived
  `immutable` cache headers unless the filenames are versioned; otherwise a replaced file
  would keep serving the old bytes to returning visitors.

---

## 7. Cache header policy

- No global `headers()` rules exist in `next.config.mjs`, and there is no `vercel.json`.
  This is intentional: the framework/CDN defaults are correct for this site.
- **Never** apply `public, max-age=31536000, immutable` to an HTML route.
- **Never** override `/_next/static/*` headers — those files are content-hashed and already
  managed by the framework.
- Do not add a broad global `Cache-Control` before confirming Vercel's generated behaviour
  for the specific route with real response headers.
- If a single non-versioned asset under `public/` ever needs a custom header, document the
  invalidation consequence first: the only way to purge it is to rename the file or ship a
  new deployment.

---

## 8. Revalidation and content updates

### Static local content (all editorial pages)

```
edit content/*.ts or the page component
  → commit
  → push / deploy
  → Vercel builds new static output
  → new deployment replaces the CDN copy
```

There is no other invalidation path, and none is needed. A deployment is a full invalidation.

### Gold Price data

```
Data Cache entry expires after ~300s
  → next request triggers a background refresh (stale-while-revalidate)
  → homepage ISR output is regenerated within its 5-minute window
  → already-open tabs also poll /api/market/gold every 5 minutes
```

### Future CMS content (not implemented — do not pre-build this)

When and only when a CMS exists:

- Tag the source fetches, e.g. `fetch(url, { next: { tags: ['gold-price'] } })` or the
  content-specific tag.
- Add a webhook route that calls `revalidateTag('<tag>')` for content-type-level purges.
- Use `revalidatePath('/about/leadership')` for single-route purges.
- Protect the webhook with a secret and keep it out of any shared cache.

Do not implement CMS invalidation, Redis, service workers, offline caching or
browser-local-storage caching before there is a confirmed requirement.

---

## 9. Verification

```powershell
pnpm exec tsc --noEmit   # type gate (pnpm build ignores type errors by config)
pnpm build               # inspect the route table
```

Expected markers in the route table:

```
┌ ○ /                                5m   1y
├ ○ /about
├ ○ /about/leadership
├ ○ /about/mission-vision-values
├ ƒ /api/market/gold
```

Post-deployment checks (performed manually against the live site):

- Repeat visits to `/about*` should be served from the CDN and only change after a
  deployment.
- `/` HTML should be served from the CDN with a ~5-minute revalidation window.
- `/api/market/gold` should return no shared-cache header.
