"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  defaultLocale,
  dictionaries,
  isLocale,
  LOCALE_STORAGE_KEY,
  localeMeta,
  matchBrowserLocale,
  type Dictionary,
  type Locale,
} from "./config";

interface I18nValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** The active dictionary — read copy as `t.hero.title`. */
  t: Dictionary;
  /** False until the stored preference has been applied on the client. */
  ready: boolean;
}

const I18nContext = createContext<I18nValue | null>(null);

/**
 * Language state lives entirely on the client so the page can stay a single
 * statically rendered route (no locale segments, no server round-trip on
 * switch). The first paint always uses `defaultLocale` to keep server and
 * client markup identical; the stored or browser-matched locale is applied in
 * an effect immediately afterwards.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let next: Locale | null = null;

    try {
      const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (isLocale(stored)) next = stored;
    } catch {
      // Storage can be blocked (private mode, hardened browsers) — ignore.
    }

    if (!next) {
      next = matchBrowserLocale(navigator.languages ?? [navigator.language]);
    }

    if (next && next !== defaultLocale) setLocaleState(next);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = localeMeta[locale].htmlLang;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Preference simply will not persist — the UI still switches.
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, t: dictionaries[locale], ready }),
    [locale, setLocale, ready],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside an <I18nProvider>.");
  }
  return context;
}
