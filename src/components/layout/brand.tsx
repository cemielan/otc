import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The OMICRON wordmark: heavy, oblique, tightly tracked uppercase — matching
 * the centre's logo.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display leading-none font-black tracking-[-0.03em] italic uppercase",
        className,
      )}
    >
      {siteConfig.wordmark}
    </span>
  );
}

/** The orange "O" tile — the same drawing as the favicon (src/app/icon.svg). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className={cn("size-9 shrink-0", className)}
    >
      <rect width="32" height="32" rx="9" fill="var(--color-brand-orange)" />
      <ellipse
        cx="16"
        cy="16"
        rx="6.5"
        ry="7.6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="4.5"
        transform="skewX(-12) translate(3.4 0)"
      />
    </svg>
  );
}

export function Brand({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "panel";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="inline-flex flex-col gap-1">
        <Wordmark
          className={cn(
            "text-lg",
            tone === "panel" ? "text-panel-foreground" : "text-foreground",
          )}
        />
        <span
          className={cn(
            "hidden text-[0.6rem] font-semibold tracking-[0.2em] whitespace-nowrap uppercase min-[22rem]:block",
            tone === "panel" ? "text-panel-foreground/55" : "text-muted",
          )}
        >
          Tuition Centre
        </span>
      </span>
    </span>
  );
}
