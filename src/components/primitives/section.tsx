import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionTone = "default" | "surface" | "panel";

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background text-foreground",
  surface: "bg-surface-secondary text-foreground",
  panel: "bg-panel text-panel-foreground",
};

/**
 * Every landing-page block is wrapped in this so vertical rhythm, the shell
 * width and the light/dark tone bands stay consistent. Padding steps up from
 * phones (py-14) through tablets to desktop.
 */
export function Section({
  id,
  tone = "default",
  className,
  innerClassName,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-14 sm:py-20 lg:py-28",
        toneClasses[tone],
        className,
      )}
    >
      <div className={cn("shell", innerClassName)}>{children}</div>
    </section>
  );
}
