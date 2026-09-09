# Omicron Tuition Centre — Landing Page

Marketing landing page for **Omicron Tuition Centre (OTC)**, a Cambridge, National and
National+ tuition centre in West Jakarta teaching Mathematics, Physics, Chemistry and
English.

Fully static (no server runtime, no database), trilingual, light/dark themed, and ready to
deploy on Vercel.

## Stack

| Concern    | Choice                                                           |
| ---------- | ---------------------------------------------------------------- |
| Framework  | Next.js 15.5 (App Router) — the 15.x long-term backport line     |
| Language   | TypeScript (strict)                                              |
| Styling    | Tailwind CSS 3.4 with CSS-variable design tokens                 |
| Animation  | Framer Motion 12                                                 |
| Theming    | `next-themes` (system / light / dark, persisted)                 |
| i18n       | Hand-rolled client-side dictionaries (English, Indonesian, 简体中文) |
| Icons      | `lucide-react`, plus one hand-drawn Instagram glyph              |
| UI effects | Aceternity-style components, re-implemented locally (see below)   |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint (next/core-web-vitals + next/typescript)
npm run typecheck  # tsc --noEmit
```

Node 20.9+ is required (see `engines` in `package.json`).

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, JSON-LD, theme + i18n providers
│   ├── page.tsx            # section composition only
│   ├── globals.css         # design tokens (light/dark), base + component layers
│   ├── icon.svg            # favicon
│   ├── robots.ts           # generated /robots.txt
│   └── sitemap.ts          # generated /sitemap.xml
├── components/
│   ├── layout/             # navbar, footer, brand, theme toggle, language switcher, WhatsApp FAB
│   ├── primitives/         # Section, SectionHeading, Reveal, ButtonLink
│   ├── sections/           # one file per landing-page block
│   └── ui/                 # Aceternity-style effects + brand glyph
├── content/site.ts         # all locale-independent facts (contacts, pricing, map, nav)
├── i18n/
│   ├── config.ts           # locale list, metadata, browser matching
│   ├── provider.tsx        # <I18nProvider> + useI18n()
│   └── dictionaries/       # en.ts (canonical shape), id.ts, zh.ts
└── lib/utils.ts            # cn(), formatRupiah(), whatsappUrl()
```

Page order is declared in one place — [`src/app/page.tsx`](src/app/page.tsx). Each section
reads its own copy from the dictionary and its own data from `content/site.ts`, so sections
can be reordered or removed without touching anything else.

### Content model

- **Facts** (phone numbers, Instagram handle, prices, class sizes, map query) live in
  [`src/content/site.ts`](src/content/site.ts).
- **Copy** lives in [`src/i18n/dictionaries`](src/i18n/dictionaries). `en.ts` is the
  canonical shape: `id.ts` and `zh.ts` are typed as `Dictionary`, so a missing or renamed
  key fails `npm run typecheck` rather than silently rendering `undefined`.

To edit a price, a class size or a phone number, change `content/site.ts` only. To edit
wording, change all three dictionaries.

### Aceternity UI components

The effects are re-implemented in [`src/components/ui`](src/components/ui) rather than
pulled from the Aceternity registry, because that registry targets Tailwind v4 while this
project runs the more stable Tailwind v3 line. The patterns used are Spotlight,
Moving Border, Card Hover Effect, Infinite Moving Cards, Meteors and Text Generate Effect.
Their keyframes live in [`tailwind.config.ts`](tailwind.config.ts).

Two deliberate differences from the originals:

- `InfiniteMovingCards` duplicates its children in React instead of cloning DOM nodes in an
  effect, so the marquee renders correctly on the server.
- `Meteors` derives positions and delays from the item index instead of `Math.random()`, so
  server and client markup match and hydration stays clean.

### Theming

Every colour is a CSS variable holding an RGB channel triplet
(`--accent: 237 133 100`), consumed by Tailwind as
`rgb(var(--accent) / <alpha-value>)`. One set of variables in `:root` and `.dark`
(see [`globals.css`](src/app/globals.css)) drives the whole palette, and opacity modifiers
like `bg-accent/10` keep working. `next-themes` sets the `class` on `<html>` before paint,
so there is no flash of the wrong theme.

### Contact form

The form in the Contact section has **no backend**. It composes a WhatsApp message from the
fields and opens `wa.me` in a new tab. Nothing is stored or transmitted to any server,
which also means the site holds no personal data.

## Before going live

`src/content/site.ts` contains a `TODO` block listing the placeholder values. Replace all
of them:

1. **`packages[].priceIDR`** — the pricelist is a **placeholder** (Normal Rp 500.000,
   Semi-Private Rp 900.000 per subject per month; Private is "consult with us" by design).
   Confirm the real figures, and `schedule` (sessions per month, minutes per session), which
   is also reflected in the feature bullets of all three dictionaries.
2. **`location`** — currently district-level only. Add the street address and swap
   `mapEmbedSrc` for a real place embed (Google Maps → Share → Embed a map → copy the
   iframe `src`).
3. **`contact.officePhoneDisplay` / `officePhoneHref`** — currently the WhatsApp number.
   Point these at the landline / home number if it differs.
4. **`siteConfig.url`** — the production domain. It feeds the canonical URL, the sitemap,
   `robots.txt` and the Open Graph tags.
5. **Open Graph image** — none is set yet. Add `src/app/opengraph-image.png`
   (1200×630) for link previews.

## Deployment (Vercel)

The app needs no environment variables and no Vercel configuration file — the framework is
auto-detected.

1. Push this repository to GitHub/GitLab.
2. In Vercel: **Add New → Project**, import the repository.
3. Confirm the defaults: Framework **Next.js**, build `npm run build`, output `.next`.
   No environment variables are required.
4. Deploy, then attach the custom domain and update `siteConfig.url` to match.

Notes:

- Every route prerenders to static HTML (`npm run build` reports `○ (Static)` for all
  routes), so the page is served from Vercel's CDN edge.
- Security headers, including a Content-Security-Policy, are set in
  [`next.config.ts`](next.config.ts). `frame-src` whitelists only the Google Maps embed —
  if another third-party embed is added later, that directive has to be widened, otherwise
  the embed silently fails to load.
- `X-Powered-By` is disabled and HSTS is preloaded-ready.

## Licence and third-party review

Third-party packages in use: `next`, `react`, `framer-motion` (MIT), `tailwindcss` (MIT),
`next-themes` (MIT), `lucide-react` (ISC), `clsx` / `tailwind-merge` (MIT). The Aceternity
UI patterns were re-implemented locally rather than vendored. Before production use, run
these through the standard IT Division licence check and technology review.
