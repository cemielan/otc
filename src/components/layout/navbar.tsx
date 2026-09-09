"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";

import { Brand } from "@/components/layout/brand";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ButtonLink } from "@/components/primitives/button-link";
import { navSections, siteConfig } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { cn, whatsappUrl } from "@/lib/utils";

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 24);
  });

  // Prevent the page behind the mobile sheet from scrolling.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const waLink = whatsappUrl(
    siteConfig.contact.whatsappE164,
    t.contact.form.template.intro,
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-full focus-visible:bg-accent focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-accent-foreground"
      >
        {t.common.skipToContent}
      </a>

      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-20">
        <a
          href="#top"
          className="rounded-xl focus-visible:ring-offset-4"
          aria-label={siteConfig.name}
        >
          <Brand />
        </a>

        <nav
          aria-label={siteConfig.name}
          className="hidden items-center gap-1 lg:flex"
        >
          {navSections.map((section) => (
            <a
              key={section.id}
              href={section.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground-muted transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              {t.nav[section.id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <ButtonLink
            href={waLink}
            external
            variant="primary"
            className="hidden sm:inline-flex"
          >
            <MessageCircle className="size-4" strokeWidth={2.2} />
            {t.nav.cta}
          </ButtonLink>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? t.common.closeMenu : t.common.openMenu}
            aria-expanded={menuOpen}
            className="grid size-10 place-items-center rounded-full border border-line bg-surface text-foreground transition-colors hover:border-accent/60 lg:hidden"
          >
            {menuOpen ? (
              <X className="size-[1.05rem]" />
            ) : (
              <Menu className="size-[1.05rem]" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-background lg:hidden"
          >
            <nav className="shell flex flex-col gap-1 py-4" aria-label={siteConfig.name}>
              {navSections.map((section) => (
                <a
                  key={section.id}
                  href={section.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-foreground-muted transition-colors hover:bg-surface-muted hover:text-foreground"
                >
                  {t.nav[section.id]}
                </a>
              ))}
              <ButtonLink
                href={waLink}
                external
                variant="primary"
                size="lg"
                className="mt-2 w-full"
                onClick={() => setMenuOpen(false)}
              >
                <MessageCircle className="size-4" strokeWidth={2.2} />
                {t.nav.cta}
              </ButtonLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
