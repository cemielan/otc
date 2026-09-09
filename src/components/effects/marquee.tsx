"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const SPEEDS = {
  fast: "22s",
  normal: "42s",
  slow: "68s",
} as const;

interface MarqueeProps {
  children: ReactNode;
  /** Rendered twice so the CSS translate can loop seamlessly. */
  speed?: keyof typeof SPEEDS;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Seamless marquee row. The track holds two identical copies of the content and
 * translates by exactly -50%, which is why the loop has no visible seam. The
 * duplication happens in React rather than by cloning DOM nodes in an effect,
 * so the row renders correctly on the server as well.
 */
export function Marquee({
  children,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max animate-marquee-x gap-4",
          direction === "right" && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{ ["--marquee-duration" as string]: SPEEDS[speed] }}
      >
        <div className="flex shrink-0 gap-4">{children}</div>
        <div className="flex shrink-0 gap-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
