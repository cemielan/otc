# Omicron Tuition Centre — Landing Page

Marketing landing page for **Omicron Tuition Centre (OTC)**, a Cambridge, National and
National+ tuition centre in West Jakarta teaching Mathematics, Physics, Chemistry and
English.

Fully static (no server runtime, no database), trilingual, light/dark themed, mobile-first,
and ready to deploy on Vercel.

## Stack

| Concern    | Choice                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| Framework  | Next.js 15.5 (App Router) — the 15.x long-term backport line           |
| Language   | TypeScript (strict)                                                    |
| Components | HeroUI v3 (`@heroui/react`, `@heroui/styles`) on React Aria            |
| Styling    | Tailwind CSS v4, CSS-first config, HeroUI theme tokens                 |
| Animation  | Framer Motion 12                                                       |
| Theming    | `next-themes` (system / light / dark, persisted)                       |
| i18n       | Client-side dictionaries (English, Indonesian, 简体中文)                  |
| Icons      | `lucide-react`, plus one hand-drawn Instagram glyph                    |

HeroUI v3 requires Tailwind CSS v4, so there is **no `tailwind.config.ts`** — the theme
lives in [`src/app/globals.css`](src/app/globals.css) via `@theme`, and PostCSS uses
`@tailwindcss/postcss`.

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
│   ├── globals.css         # HeroUI import, Tailwind theme, OTC palette
│   ├── icon.svg            # favicon
│   ├── robots.ts           # generated /robots.txt
│   └── sitemap.ts          # generated /sitemap.xml
├── components/
│   ├── layout/             # navbar (+ mobile drawer), footer, brand, theme toggle,
│   │                       # language switcher, WhatsApp FAB
│   ├── primitives/         # Section, SectionHeading, Reveal, CtaLink
│   ├── sections/           # one file per landing-page block
│   ├── effects/            # local Framer Motion decoration (see below)
│   └── icons.tsx           # Instagram glyph
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

## Working with HeroUI v3

### Theming

HeroUI is driven entirely by CSS variables, so the OTC palette is applied by **overriding
its semantic tokens** rather than restyling components. `globals.css` sets `--background`,
`--foreground`, `--surface`, `--muted`, `--border`, `--accent`, the `--field-*` group and
friends in `:root`, and restates them in `.dark`. Every HeroUI component — buttons, cards,
chips, the select popover, the drawer — picks the brand colours up from there.

Two details worth knowing before editing the palette:

- HeroUI declares its own theme inside `@layer base`. Unlayered declarations beat layered
  ones regardless of order, so **every token set in `:root` must also be restated in
  `.dark`**, or the light value will leak into dark mode.
- Tokens HeroUI does not have (`--panel`, `--panel-muted`, `--panel-foreground`, the logo
  yellow/red) are declared as plain variables and exposed to Tailwind through
  `@theme inline`, which keeps the `var()` reference alive so the `.dark` overrides apply.
  `accent-soft` is deliberately *not* redefined — HeroUI already derives it from `--accent`
  per theme.

`globals.css` also redefines the `dark` variant as class-only
(`@custom-variant dark (&:where(.dark, .dark *))`). HeroUI's own definition also falls back
to `prefers-color-scheme`, which would apply dark-only utilities on an OS-dark device even
when the visitor has explicitly chosen light.

### Two API details that are easy to get wrong

- **`Drawer.Trigger` and `Dropdown.Trigger` wrap React Aria's Button, not HeroUI's**, so
  they reject `variant` / `isIconOnly`. Style them with the exported `buttonVariants()`
  instead. The same helper is how [`CtaLink`](src/components/primitives/cta-link.tsx) gives
  button styling to a real `<a>` — HeroUI's `Button` always renders a `<button>`, and its
  `Link` carries a `.link` base class that fights the `.button` classes.
- **`Card`, `Chip` and friends are polymorphic through a `render` *function***, not an `as`
  prop: `render={(props) => <article {...props} />}`, forwarding props and ref.

### Bundle size

The page ships ~272 kB of first-load JS and ~43 kB of gzipped CSS. Two things were measured
and deliberately left alone:

- Per-component imports (`@heroui/react/card`) produce a **byte-identical** bundle to the
  barrel import, so the barrel is used for readability.
- The CSS is HeroUI's full precompiled stylesheet. `@heroui/styles` does expose
  per-component CSS, but composing it by hand means maintaining two order-sensitive import
  lists that must track HeroUI's documented ordering rules on every upgrade — not worth
  ~25 kB gzipped on a single-page site.

### Local effects

[`src/components/effects/`](src/components/effects/) holds four small Framer Motion
decorations HeroUI has no equivalent for: the hero spotlight, the marquee strip, the
featured-card meteors and the word-by-word heading reveal. All are decoration only — the
copy is in the server-rendered HTML regardless. `Meteors` derives positions from the item
index instead of `Math.random()`, and `Marquee` duplicates its children in React rather
than cloning DOM nodes, so both hydrate cleanly.

## Mobile

The layout is mobile-first: single-column sections, `py-14` rising to `py-28`, type scales
that start at `text-[2rem]` for the hero, full-width call-to-action buttons on phones, and
tap targets of at least 44px throughout.

Specifics worth keeping in mind when editing:

- The mobile navigation is a **HeroUI Drawer** (bottom sheet), so the focus trap, scroll
  lock, Escape handling and swipe-to-dismiss come from React Aria.
- The header row is tuned to fit a 320px viewport: below `22rem` the brand subtitle and the
  language code collapse, leaving the mark, the globe icon, the theme toggle and the menu
  button.
- `html` has `overflow-x: hidden` so the decorative blurs and the hero's floating formula
  chips can never produce a horizontal scrollbar.
- The WhatsApp floating button respects `env(safe-area-inset-bottom)` on notched phones.
- The footer is two columns on phones and four from `lg` up.

## Contact form

The form in the Contact section has **no backend**. It is a HeroUI/React Aria `Form` with
`TextField`, `Select` and `TextArea`, and on submit it composes a WhatsApp message from the
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
`@heroui/react` / `@heroui/styles` (MIT, pulling `react-aria-components` — Apache-2.0 —
and `tailwind-variants` / `tw-animate-css`), `next-themes` (MIT), `lucide-react` (ISC),
`clsx` / `tailwind-merge` (MIT). Before production use, run these through the standard IT
Division licence check and technology review.
