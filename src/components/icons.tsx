import { cn } from "@/lib/utils";

/**
 * lucide-react v1 no longer ships brand marks, so the Instagram glyph is drawn
 * here as a plain geometric outline that matches the stroke weight of the
 * lucide icons used elsewhere.
 */
export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4", className)}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** The hand-drawn wave with a loop used as a divider ornament. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-20", className)}
    >
      <path d="M4 14c10 0 14-6 24-6s12 8 20 8c6 0 6-9 0-9s-6 9 2 9c10 0 12-6 22-6s12 4 20 4" />
    </svg>
  );
}

/** The loose looping ribbon drawn across the hero visual. */
export function LoopRibbon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 160"
      fill="none"
      stroke="currentColor"
      strokeWidth={12}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 148c30-6 52-30 60-58 8-30-8-56-30-50-24 6-14 46 18 52 38 8 70-30 92-66 14-22 34-26 54-14" />
    </svg>
  );
}
