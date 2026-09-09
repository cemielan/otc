"use client";

import { cn } from "@/lib/utils";

/**
 * Aceternity-style meteor shower for the featured pricing card.
 *
 * Positions and delays are derived deterministically from the index rather than
 * `Math.random()` so the server and client render identical markup (no
 * hydration mismatch).
 */
export function Meteors({
  number = 14,
  className,
}: {
  number?: number;
  className?: string;
}) {
  const meteors = Array.from({ length: number }, (_, index) => {
    const spread = 100 / number;
    return {
      left: `${Math.round(index * spread - 30)}%`,
      delay: `${((index * 0.37) % 1.4).toFixed(2)}s`,
      duration: `${(3.2 + ((index * 0.53) % 3)).toFixed(2)}s`,
    };
  });

  return (
    <span aria-hidden="true">
      {meteors.map((meteor, index) => (
        <span
          key={index}
          className={cn(
            "absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-full bg-accent shadow-[0_0_0_1px_rgb(var(--accent)/0.12)]",
            "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-accent before:to-transparent before:content-['']",
            className,
          )}
          style={{
            top: 0,
            left: meteor.left,
            animationDelay: meteor.delay,
            ["--meteor-duration" as string]: meteor.duration,
          }}
        />
      ))}
    </span>
  );
}
