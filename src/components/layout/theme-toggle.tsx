"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { flushSync } from "react-dom";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * A Document that supports the View Transitions API. Typed here rather than
 * relying on the DOM lib, which only gained `startViewTransition` recently.
 */
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => unknown;
};

/**
 * Light/dark switch. `resolvedTheme` is only known on the client, so the button
 * renders a neutral placeholder until mounted to avoid a hydration mismatch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? t.common.lightMode : t.common.darkMode;

  /**
   * The theme change is wrapped in a view transition, so the browser crossfades
   * one snapshot of the whole page into the next (timing in globals.css). This
   * is a single composited animation; transitioning colours on every element
   * instead means hundreds of simultaneous repaints, which is what stuttered.
   *
   * `flushSync` is required: `startViewTransition` captures the "after" state
   * as soon as its callback returns, so React has to have committed — and
   * next-themes has to have written the new class — inside that callback.
   * Browsers without the API (and visitors who asked for reduced motion) just
   * get the instant switch.
   */
  const toggle = useCallback(() => {
    const next = isDark ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof doc.startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  }, [isDark, setTheme]);

  return (
    <Button
      variant="outline"
      isIconOnly
      aria-label={label}
      onPress={toggle}
      className={cn("size-11 rounded-full sm:size-10", className)}
    >
      {mounted ? (
        <motion.span
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="grid place-items-center"
        >
          {isDark ? (
            <Sun className="size-[1.05rem]" strokeWidth={2} />
          ) : (
            <Moon className="size-[1.05rem]" strokeWidth={2} />
          )}
        </motion.span>
      ) : (
        <span className="bg-border size-[1.05rem] rounded-full" />
      )}
    </Button>
  );
}
