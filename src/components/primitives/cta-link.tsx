import type { AnchorHTMLAttributes, ReactNode } from "react";
import { buttonVariants, type ButtonProps } from "@heroui/react";

import { cn } from "@/lib/utils";

interface CtaLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  fullWidth?: boolean;
  /** Adds the safe `target`/`rel` pair for links that leave the site. */
  external?: boolean;
  children: ReactNode;
}

/**
 * Every call to action on this page navigates somewhere — WhatsApp, Google Maps
 * or an in-page anchor — so it has to be an anchor element.
 *
 * HeroUI's `Button` wraps React Aria's Button, which always renders a
 * `<button>`, and its `Link` carries its own `.link` base class that fights the
 * `.button` classes for height, background and underline. The supported way to
 * get button styling onto a link is therefore HeroUI's exported
 * `buttonVariants`, so this is a real HeroUI button visually while staying a
 * correct link semantically.
 */
export function CtaLink({
  href,
  variant = "primary",
  size = "md",
  fullWidth,
  external,
  className,
  children,
  ...rest
}: CtaLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        buttonVariants({ variant, size, fullWidth }),
        // Every action in this design is a pill; touch targets stay 44px tall.
        "min-h-11 rounded-full font-semibold no-underline",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      {...rest}
    >
      {children}
    </a>
  );
}
