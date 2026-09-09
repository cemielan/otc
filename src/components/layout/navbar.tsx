"use client";

import { useState } from "react";
import { Drawer, Separator, buttonVariants } from "@heroui/react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, MessageCircle } from "lucide-react";

import { Brand } from "@/components/layout/brand";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CtaLink } from "@/components/primitives/cta-link";
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

  const waLink = whatsappUrl(
    siteConfig.contact.whatsappE164,
    t.contact.form.template.intro,
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-border bg-background/85 border-b backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="focus-visible:not-sr-only focus-visible:bg-accent focus-visible:text-accent-foreground sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-full focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold"
      >
        {t.common.skipToContent}
      </a>

      <div className="shell flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-4">
        <a href="#top" className="rounded-xl" aria-label={siteConfig.name}>
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
              className="hover:bg-surface-secondary hover:text-foreground text-muted rounded-full px-3.5 py-2 text-sm font-medium no-underline transition-colors"
            >
              {t.nav[section.id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />

          <CtaLink
            href={waLink}
            external
            variant="primary"
            className="hidden sm:inline-flex"
          >
            <MessageCircle className="size-4" strokeWidth={2.2} />
            {t.nav.cta}
          </CtaLink>

          <MobileMenu
            isOpen={menuOpen}
            onOpenChange={setMenuOpen}
            waLink={waLink}
          />
        </div>
      </div>
    </header>
  );
}

/**
 * On phones the navigation lives in a HeroUI Drawer: React Aria handles the
 * focus trap, scroll locking, Escape-to-close and the swipe-down gesture, which
 * is a better small-screen experience than the collapsing panel it replaced.
 */
function MobileMenu({
  isOpen,
  onOpenChange,
  waLink,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  waLink: string;
}) {
  const { t } = useI18n();

  return (
    <Drawer.Root isOpen={isOpen} onOpenChange={onOpenChange}>
      {/*
        Drawer.Trigger wraps React Aria's Button rather than HeroUI's, so it
        takes no `variant`/`isIconOnly` props — the HeroUI button styling is
        applied through the exported `buttonVariants` instead.
      */}
      <Drawer.Trigger
        aria-label={isOpen ? t.common.closeMenu : t.common.openMenu}
        className={cn(
          buttonVariants({ variant: "outline", isIconOnly: true }),
          // See the language switcher for why `inline-flex items-center
          // justify-center` must be bare utility classes here, not just part
          // of buttonVariants: HeroUI's `.drawer__trigger` (inline-block)
          // would otherwise win the display property on a components-layer tie.
          "inline-flex size-11 items-center justify-center rounded-full lg:hidden",
        )}
      >
        <Menu className="size-[1.05rem]" />
      </Drawer.Trigger>

      <Drawer.Content placement="bottom" className="lg:hidden">
        <Drawer.Dialog>
          <Drawer.Header className="flex items-center justify-between">
            <Drawer.Heading className="font-display text-base font-semibold">
              {siteConfig.name}
            </Drawer.Heading>
            {/* CloseButton supplies its own dismiss icon. */}
            <Drawer.CloseTrigger aria-label={t.common.closeMenu} />
          </Drawer.Header>

          <Drawer.Body className="pb-2">
            <nav aria-label={siteConfig.name} className="flex flex-col">
              {navSections.map((section, index) => (
                <motion.a
                  key={section.id}
                  href={section.href}
                  onClick={() => onOpenChange(false)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="hover:bg-surface-secondary hover:text-foreground text-foreground flex min-h-12 items-center rounded-2xl px-4 text-base font-medium no-underline transition-colors"
                >
                  {t.nav[section.id]}
                </motion.a>
              ))}
            </nav>
          </Drawer.Body>

          <Separator />

          <Drawer.Footer className="pt-4">
            <CtaLink
              href={waLink}
              external
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => onOpenChange(false)}
            >
              <MessageCircle className="size-4" strokeWidth={2.2} />
              {t.nav.cta}
            </CtaLink>
          </Drawer.Footer>
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Root>
  );
}
