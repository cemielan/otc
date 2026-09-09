import type { ReactNode } from "react";
import { Chip } from "@heroui/react";

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
        "flex flex-col gap-3 sm:gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {/*
        HeroUI's soft accent chip derives its background from `--accent` per
        theme, so the same chip reads correctly on light, dark and panel bands.
      */}
      <Chip
        color="accent"
        variant="soft"
        size="sm"
        className={cn(
          "gap-2 text-[0.7rem] font-semibold tracking-[0.14em] uppercase",
          // On the dark band the default soft-accent foreground is too dark.
          onPanel && "text-accent",
        )}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
        <Chip.Label>{eyebrow}</Chip.Label>
      </Chip>

      <h2
        className={cn(
          "font-display max-w-3xl text-[1.75rem] leading-[1.15] font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
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
