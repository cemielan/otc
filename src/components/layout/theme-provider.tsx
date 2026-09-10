"use client";

import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * next-themes writes the `class` on <html> before paint, which is why
 * `suppressHydrationWarning` is set on <html> in the root layout.
 *
 * `disableTransitionOnChange` is omitted on purpose: the color transition in
 * globals.css is what makes a light/dark switch fade instead of snap.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="otc.theme"
    >
      {children}
    </NextThemesProvider>
  );
}
