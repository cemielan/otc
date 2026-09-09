import { en, type Dictionary } from "./dictionaries/en";
import { id } from "./dictionaries/id";
import { zh } from "./dictionaries/zh";

export const locales = ["en", "id", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const dictionaries: Record<Locale, Dictionary> = { en, id, zh };

/** Presentation data for the language switcher, plus the correct `lang` attribute. */
export const localeMeta: Record<
  Locale,
  { label: string; short: string; htmlLang: string }
> = {
  en: { label: "English", short: "EN", htmlLang: "en" },
  id: { label: "Bahasa Indonesia", short: "ID", htmlLang: "id" },
  zh: { label: "简体中文", short: "中文", htmlLang: "zh-Hans" },
};

/** localStorage key holding the visitor's chosen language. */
export const LOCALE_STORAGE_KEY = "otc.locale";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/**
 * Best-effort match of a browser language tag (e.g. "id-ID", "zh-Hans-CN")
 * to a supported locale. Returns `null` when there is no sensible match.
 */
export function matchBrowserLocale(languages: readonly string[]): Locale | null {
  for (const tag of languages) {
    const lower = tag.toLowerCase();
    if (lower.startsWith("id")) return "id";
    if (lower.startsWith("zh")) return "zh";
    if (lower.startsWith("en")) return "en";
  }
  return null;
}

export type { Dictionary };
