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
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span
        className={cn(
          "eyebrow",
          onPanel &&
            "border-panel-muted bg-panel-muted/60 text-panel-foreground/70",
        )}
      >
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-accent"
        />
        {eyebrow}
      </span>

      <h2
        className={cn(
          "max-w-3xl font-display text-3xl font-semibold leading-[1.12] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          onPanel ? "text-panel-foreground" : "text-foreground",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-pretty sm:text-lg",
            onPanel ? "text-panel-foreground/70" : "text-foreground-muted",
          )}
        >
          {description}
        </p>
      ) : null}

      {children}
    </Reveal>
  );
}
