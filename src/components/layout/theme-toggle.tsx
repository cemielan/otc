"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

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

  return (
    <Button
      variant="outline"
      isIconOnly
      aria-label={label}
      onPress={() => setTheme(isDark ? "light" : "dark")}
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
