import type { ReactNode } from "react";

import { Squiggle } from "@/components/icons";
import { Reveal } from "@/components/primitives/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  /**
   * "split" puts the title on the left and the description on the right, with
   * the squiggle ornament between them from large screens up.
   */
  align?: "left" | "center" | "split";
  className?: string;
  children?: ReactNode;
}

/**
 * Section opener: a small outlined eyebrow pill, then the display heading and
 * a muted description.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
}: SectionHeadingProps) {
  const eyebrowPill = (
    <span className="soft-frame bg-surface text-foreground inline-flex w-fit items-center gap-2 rounded-full py-1 pr-3.5 pl-2 text-xs font-semibold">
      <span aria-hidden="true" className="bg-brand-orange size-2 rounded-full" />
      {eyebrow}
    </span>
  );

  const heading = (
    <h2 className="font-display text-foreground max-w-3xl text-[1.85rem] leading-[1.1] font-semibold tracking-[-0.02em] text-balance sm:text-4xl lg:text-[2.75rem]">
      {title}
    </h2>
  );

  const body = description ? (
    <p className="text-muted max-w-2xl text-[0.95rem] leading-relaxed text-pretty sm:text-base">
      {description}
    </p>
  ) : null;

  if (align === "split") {
    return (
      <Reveal
        className={cn(
          "grid gap-4 sm:gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10",
          className,
        )}
      >
        <div className="flex flex-col gap-4">
          {eyebrowPill}
          {heading}
        </div>
        <span
          aria-hidden="true"
          className="border-brand-lime bg-surface text-brand-ink hidden h-11 items-center rounded-full border-2 px-4 lg:inline-flex"
        >
          <Squiggle />
        </span>
        {body}
        {children}
      </Reveal>
    );
  }

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrowPill}
      {heading}
      {body}
      {children}
    </Reveal>
  );
}
