/**
 * Single source of truth for every locale-independent fact about the centre.
 * Copy (headings, descriptions, feature bullets) lives in `src/i18n/dictionaries`
 * and is joined to this data by the ids below.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * TODO (Omicron team) before going live — the values marked PLACEHOLDER are
 * stand-ins so the page renders completely. Replace them with the real ones:
 *   1. `contact.officePhoneDisplay` — the landline / home number, if it differs
 *      from the WhatsApp number.
 *   2. `location.*` — the full street address and a real Google Maps place
 *      embed (Maps > Share > Embed a map > copy the iframe `src`).
 *   3. `packages[].priceIDR` and `schedule.*` — the actual pricelist and
 *      session format.
 *   4. `url` — the production domain (also used for canonical + sitemap URLs).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  name: "Omicron Tuition Centre",
  shortName: "OTC",
  /** PLACEHOLDER — production domain, used for canonical URLs, sitemap, robots. */
  url: "https://omicrontuitioncentre.com",
  contact: {
    /** International format, no "+" and no separators — required by wa.me. */
    whatsappE164: "6285147283429",
    whatsappDisplay: "0851-4728-3429",
    /** PLACEHOLDER — same as WhatsApp until the landline is confirmed. */
    officePhoneDisplay: "0851-4728-3429",
    officePhoneHref: "tel:+6285147283429",
    instagramHandle: "bimbelomicron",
    instagramUrl: "https://www.instagram.com/bimbelomicron/",
  },
  location: {
    /** PLACEHOLDER — district-level only; add the street address when confirmed. */
    mapQuery: "Bimbel Omicron",
    city: "Jakarta Barat",
    region: "DKI Jakarta",
    country: "Indonesia",
  },
  schedule: {
    sessionsPerMonth: 8,
    minutesPerSession: 90,
  },
} as const;

/** Keyless Google Maps embed derived from `location.mapQuery`. */
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  siteConfig.location.mapQuery,
)}&output=embed`;

/** "Open in Google Maps" deep link for the directions button. */
export const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.location.mapQuery,
)}`;

export type SubjectId = "mathematics" | "physics" | "chemistry" | "english";

export const subjects: readonly { id: SubjectId }[] = [
  { id: "mathematics" },
  { id: "physics" },
  { id: "chemistry" },
  { id: "english" },
] as const;

export type CurriculumId = "cambridge" | "national" | "nationalPlus" | "tka";

export const curricula: readonly { id: CurriculumId; stages: number }[] = [
  { id: "cambridge", stages: 4 },
  { id: "national", stages: 3 },
  { id: "nationalPlus", stages: 3 },
  { id: "tka", stages: 1 },
] as const;

export type PackageId = "normal" | "semiPrivate" | "private";

export interface PackagePlan {
  id: PackageId;
  /** Monthly fee per subject in IDR — `null` means "consult with us". */
  priceIDR: number | null;
  /** Students sharing one class. */
  capacity: string;
  featured: boolean;
  /** Number of feature bullets to read from the dictionary for this plan. */
  featureCount: number;
}

/** PLACEHOLDER PRICING — confirm with the Omicron team before publishing. */
export const packages: readonly PackagePlan[] = [
  {
    id: "normal",
    priceIDR: 500_000,
    capacity: "6-10",
    featured: false,
    featureCount: 4,
  },
  {
    id: "semiPrivate",
    priceIDR: 900_000,
    capacity: "2-4",
    featured: true,
    featureCount: 5,
  },
  {
    id: "private",
    priceIDR: null,
    capacity: "1",
    featured: false,
    featureCount: 5,
  },
] as const;

export const navSections = [
  { id: "programs", href: "#programs" },
  { id: "subjects", href: "#subjects" },
  { id: "about", href: "#about" },
  { id: "packages", href: "#packages" },
  { id: "location", href: "#location" },
  { id: "contact", href: "#contact" },
] as const;

export type NavSectionId = (typeof navSections)[number]["id"];
