import type { ReactNode } from "react";

import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use "panel" inside dark bands so the muted text keeps enough contrast. */
  tone?: "default" | "panel";
  className?: string;
  children?: ReactNode;
}

/**
 * Section opener: the small marked-up eyebrow, then the heavy display heading
 * that carries this design. The eyebrow is plain text next to the logo tile
 * rather than a coloured chip — in this theme colour belongs to the blocks.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
  children,
}: SectionHeadingProps) {
  const onPanel = tone === "panel";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4 sm:gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span
        className={cn(
          "text-[0.7rem] font-bold tracking-[0.18em] uppercase",
          onPanel ? "text-panel-foreground/60" : "text-muted",
        )}
      >
        {eyebrow}
      </span>

      <h2
        className={cn(
          "font-display max-w-3xl text-[1.9rem] leading-[1.08] font-bold tracking-[-0.02em] text-balance sm:text-4xl lg:text-[2.9rem]",
          onPanel ? "text-panel-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-[0.95rem] leading-relaxed text-pretty sm:text-lg",
            onPanel ? "text-panel-foreground/70" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}

      {children}
    </Reveal>
  );
}
