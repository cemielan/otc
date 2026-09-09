import { cn } from "@/lib/utils";
import { siteConfig } from "@/content/site";

/** The Omicron mark: an open ring with the orbiting dot from the centre's logo. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid size-9 shrink-0 place-items-center rounded-xl bg-panel",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none">
        <circle
          cx="10.5"
          cy="12"
          r="6.25"
          stroke="rgb(var(--brand-yellow))"
          strokeWidth="2.25"
        />
        <circle cx="20" cy="7.5" r="2" fill="rgb(var(--accent))" />
      </svg>
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
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-semibold tracking-tight",
            tone === "panel" ? "text-panel-foreground" : "text-foreground",
          )}
        >
          {siteConfig.name.replace(" Tuition Centre", "")}
        </span>
        <span
          className={cn(
            "text-[0.65rem] font-medium uppercase tracking-[0.18em]",
            tone === "panel"
              ? "text-panel-foreground/60"
              : "text-foreground-muted",
          )}
        >
          Tuition Centre
        </span>
      </span>
    </span>
  );
}
