"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Drives a glow along the perimeter of an invisible rounded rect by sampling
 * points on an SVG path (the Aceternity "moving border" technique).
 */
function MovingBorder({
  children,
  duration = 3200,
  rx = "30%",
  ry = "30%",
}: {
  children: ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (!length) return;
    const pixelsPerMillisecond = length / duration;
    progress.set((time * pixelsPerMillisecond) % length);
  });

  const x = useTransform(
    progress,
    (value) => pathRef.current?.getPointAtLength(value).x ?? 0,
  );
  const y = useTransform(
    progress,
    (value) => pathRef.current?.getPointAtLength(value).y ?? 0,
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translate(-50%, -50%)`;

  return (
    <>
      <svg
        aria-hidden="true"
        className="absolute h-full w-full"
        preserveAspectRatio="none"
      >
        <rect
          ref={pathRef}
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
        />
      </svg>
      <motion.div
        aria-hidden="true"
        className="absolute inline-block"
        style={{ top: 0, left: 0, transform }}
      >
        {children}
      </motion.div>
    </>
  );
}

interface MovingBorderLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  duration?: number;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

/**
 * Primary call-to-action: an anchor wrapped in an animated gradient border.
 * Rendered as a link (not a polymorphic component) because every CTA on this
 * page navigates — to WhatsApp or to an in-page section.
 */
export function MovingBorderLink({
  href,
  children,
  className,
  containerClassName,
  borderRadius = "9999px",
  duration,
  ...anchorProps
}: MovingBorderLinkProps) {
  return (
    <a
      href={href}
      {...anchorProps}
      className={cn(
        "relative inline-flex h-12 overflow-hidden bg-transparent p-[1.5px] text-sm font-semibold transition-transform hover:-translate-y-0.5",
        containerClassName,
      )}
      style={{ borderRadius }}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div className="h-24 w-24 bg-[radial-gradient(circle_at_center,rgb(var(--accent))_0%,transparent_65%)] opacity-90" />
        </MovingBorder>
      </div>

      <span
        className={cn(
          "relative z-10 inline-flex h-full w-full items-center justify-center gap-2 border border-line/60 bg-panel px-6 text-panel-foreground backdrop-blur-xl",
          className,
        )}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </span>
    </a>
  );
}
