import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { siteConfig } from "@/content/site";
import { en } from "@/i18n/dictionaries/en";
import { I18nProvider } from "@/i18n/provider";

import "./globals.css";

/*
 * The CSS variable names are deliberately font-specific: `--font-sans` and
 * `--font-display` are Tailwind theme tokens (see globals.css) that reference
 * these, so reusing those names here would be self-referential.
 */
const display = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

/**
 * Static metadata uses the English copy: the language switcher runs on the
 * client, so the crawled document is the English one. `alternates.languages`
 * still advertises that the page serves all three languages at the same URL.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: en.meta.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: en.meta.description,
  applicationName: siteConfig.name,
  keywords: [
    "Omicron Tuition Centre",
    "OTC",
    "bimbel Jakarta Barat",
    "Cambridge tuition Jakarta",
    "IGCSE tutor Jakarta",
    "A Level tutor Jakarta",
    "TKA preparation",
    "les Matematika Fisika Kimia Bahasa Inggris",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      id: "/",
      "zh-Hans": "/",
    },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: en.meta.title,
    description: en.meta.description,
    url: siteConfig.url,
    locale: "en_US",
    alternateLocale: ["id_ID", "zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: en.meta.title,
    description: en.meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f5ef" },
    { media: "(prefers-color-scheme: dark)", color: "#100d0b" },
  ],
};

/** Structured data so search engines can read the centre's core details. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  description: en.meta.description,
  url: siteConfig.url,
  telephone: `+${siteConfig.contact.whatsappE164}`,
  sameAs: [siteConfig.contact.instagramUrl],
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.region,
    addressCountry: "ID",
  },
  areaServed: `${siteConfig.location.city}, ${siteConfig.location.region}`,
  knowsLanguage: ["en", "id", "zh-Hans"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          // Static, developer-authored JSON — no user input is interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
