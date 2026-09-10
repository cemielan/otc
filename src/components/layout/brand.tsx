import { siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The OMICRON wordmark: heavy, oblique, tightly tracked uppercase — matching
 * the centre's logo. This is the only mark; there is no separate icon glyph.
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

export function Brand({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "panel";
}) {
  return (
    <span className={cn("inline-flex flex-col gap-1", className)}>
      <Wordmark
        className={cn(
          "text-lg",
          tone === "panel" ? "text-panel-foreground" : "text-foreground",
        )}
      />
      <span
        className={cn(
          "hidden text-[0.6rem] font-semibold tracking-[0.2em] uppercase min-[22rem]:block",
          tone === "panel" ? "text-panel-foreground/55" : "text-muted",
        )}
      >
        Tuition Centre
      </span>
    </span>
  );
}
