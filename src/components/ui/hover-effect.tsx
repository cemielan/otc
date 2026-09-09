"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface HoverEffectProps<T> {
  items: readonly T[];
  keyFor: (item: T) => string;
  children: (item: T) => ReactNode;
  className?: string;
  cardClassName?: string;
}

/**
 * Aceternity-style card hover effect: a single highlight block slides between
 * cards using a shared `layoutId`, so the fill appears to travel rather than
 * fade in place. Generic over the item type so each section can render its own
 * card body via the `children` render prop.
 */
export function HoverEffect<T>({
  items,
  keyFor,
  children,
  className,
  cardClassName,
}: HoverEffectProps<T>) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={cn("grid gap-4", className)}>
      {items.map((item) => {
        const key = keyFor(item);
        return (
          <div
            key={key}
            className="group relative block h-full w-full p-1"
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
          >
            <AnimatePresence>
              {hovered === key && (
                <motion.span
                  aria-hidden="true"
                  layoutId="hover-effect-highlight"
                  className="absolute inset-0 block rounded-3xl bg-accent-soft"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>

            <div
              className={cn(
                "relative z-10 flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-line bg-surface p-6 transition-colors duration-300 group-hover:border-accent/50",
                cardClassName,
              )}
            >
              {children(item)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
