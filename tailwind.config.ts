import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Every colour is exposed as an `rgb(var(--token) / <alpha-value>)` channel triplet
 * so that a single set of CSS variables (see globals.css) drives both light and
 * dark themes, and Tailwind opacity modifiers (e.g. `bg-accent/10`) keep working.
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--bg) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          muted: "rgb(var(--surface-2) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "rgb(var(--fg) / <alpha-value>)",
          muted: "rgb(var(--fg-muted) / <alpha-value>)",
        },
        line: "rgb(var(--border) / <alpha-value>)",
        panel: {
          DEFAULT: "rgb(var(--panel) / <alpha-value>)",
          foreground: "rgb(var(--panel-fg) / <alpha-value>)",
          muted: "rgb(var(--panel-2) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
          foreground: "rgb(var(--accent-fg) / <alpha-value>)",
        },
        brand: {
          yellow: "rgb(var(--brand-yellow) / <alpha-value>)",
          red: "rgb(var(--brand-red) / <alpha-value>)",
        },
      },
      fontFamily: {
        /**
         * Outfit and Plus Jakarta Sans carry no CJK glyphs, so the Simplified
         * Chinese locale falls through to a system CJK face rather than to a
         * default serif.
         */
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "Noto Sans SC",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "var(--font-sans)",
          "Noto Sans SC",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        shell: "80rem",
      },
      boxShadow: {
        card: "0 1px 2px rgb(20 17 15 / 0.04), 0 12px 32px -12px rgb(20 17 15 / 0.12)",
        lift: "0 24px 60px -24px rgb(20 17 15 / 0.28)",
      },
      keyframes: {
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - 0.5rem))" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        spotlight: "spotlight 2s ease 0.3s 1 forwards",
        "marquee-x": "marquee-x var(--marquee-duration, 40s) linear infinite",
        meteor: "meteor var(--meteor-duration, 5s) linear infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
