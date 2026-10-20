# Omicron Tuition Centre — Landing Page

Single-page marketing site for **Omicron Tuition Centre (OTC)**, a tuition centre in West
Jakarta that teaches Mathematics, Physics, Chemistry and English to Cambridge (Checkpoint,
IGCSE, AS/A Level), National and National+ students.

The page covers Programs, Subjects, About, class Packages, enrolment Steps, Location and a
Contact section, with WhatsApp as the main call to action. It is fully static, available in
English, Bahasa Indonesia and 简体中文, and has a light/dark theme switch.

## Tech stack

| Concern    | Choice                                                                  |
| ---------- | ----------------------------------------------------------------------- |
| Framework  | Next.js 15.5.25 (App Router)                                            |
| UI         | React 19.1.9                                                            |
| Language   | TypeScript 5.7.3                                                        |
| Styling    | Tailwind CSS 4 via `@tailwindcss/postcss` (PostCSS 8.5.3)               |
| Components | HeroUI v3 (`@heroui/react`, `@heroui/styles` 3.2.4)                     |
| Animation  | Framer Motion 12.43.0                                                   |
| Theming    | `next-themes` 0.4.6; the light/dark switch crossfades via the View Transitions API, falling back to an instant switch when it is unsupported or reduced motion is requested |
| Icons      | `lucide-react` 1.43.0                                                   |

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## License

[MIT](LICENSE)
