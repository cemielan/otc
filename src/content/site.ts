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
 *   2. `location.coords` — the centre's real latitude/longitude (from the
 *      Google Maps share link, the numbers after the `@`), for a pin that
 *      lines up exactly. The map already centers on `streetAddress`, which
 *      avoids Google's business info card (see `mapEmbedSrc` below).
 *   3. `schedule.*` — the actual session format.
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
    whatsappE164: "62816747502",
    whatsappDisplay: "0816-747-502",
    /** PLACEHOLDER — same as WhatsApp until the landline is confirmed. */
    officePhoneDisplay: "0816-747-502",
    officePhoneHref: "tel:+62816747502",
    instagramHandle: "bimbelomicron",
    instagramUrl: "https://www.instagram.com/bimbelomicron/",
  },
  location: {
    /** Business name — used for the "Open in Google Maps" deep link, where its full listing (reviews, photos) is the point. */
    mapQuery: "Bimbel Omicron",
    /**
     * Full street address — used to center the in-page map embed instead of
     * `mapQuery`. Centering on the business name makes Google's client-side
     * script try to load a "place info" card inside the iframe, which fails
     * and leaves a stuck "Place info couldn't load" box; an address is just
     * a geocoded point with no card to fetch.
     */
    streetAddress:
      "Jl. Taman Surya 5 DD2 No.23, RT.5/RW.17, Pegadungan, Kalideres, Jakarta Barat 11830",
    /**
     * PLACEHOLDER — real lat/lng, once known, gives an exact pin instead of
     * the address-geocoded approximation. Get these from the Google Maps
     * share link: Share > Copy link > the two numbers after `@`.
     */
    coords: null as { lat: number; lng: number } | null,
    city: "Jakarta Barat",
    region: "DKI Jakarta",
    country: "Indonesia",
  },
  schedule: {
    sessionsPerMonth: 8,
    minutesPerSession: 90,
  },
} as const;

/**
 * Keyless Google Maps embed, centered on `location.coords` if set, else the
 * street address — either way a plain geocoded point, not the business name,
 * so Google's script never tries (and fails) to load a place-info card.
 */
export const mapEmbedSrc = (() => {
  const { coords, streetAddress } = siteConfig.location;
  const query = coords ? `${coords.lat},${coords.lng}` : streetAddress;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
})();

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

export type PackageId = "semiPrivate" | "private";

export interface PackagePlan {
  id: PackageId;
  /** Students sharing one class. Pricing is always quoted case-by-case on WhatsApp. */
  capacity: string;
  featured: boolean;
  /** Number of feature bullets to read from the dictionary for this plan. */
  featureCount: number;
}

export const packages: readonly PackagePlan[] = [
  {
    id: "semiPrivate",
    capacity: "2-5",
    featured: true,
    featureCount: 5,
  },
  {
    id: "private",
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
