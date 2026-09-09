"use client";

import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * next-themes writes the `class` on <html> before paint, which is why
 * `suppressHydrationWarning` is set on <html> in the root layout.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="otc.theme"
    >
      {children}
    </NextThemesProvider>
  );
}
