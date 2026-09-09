"use client";

import { Dropdown, buttonVariants } from "@heroui/react";
import { Check, Globe } from "lucide-react";

import { locales, localeMeta, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * Language menu (English / Bahasa Indonesia / 简体中文).
 *
 * HeroUI's Dropdown is built on React Aria's Menu, so keyboard navigation,
 * Escape-to-close, focus restoration and click-outside behaviour come from the
 * library instead of being hand-rolled here.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <Dropdown.Root>
      {/*
        Dropdown.Trigger renders a button but is typed against React Aria's, so
        the HeroUI button styling comes from the exported `buttonVariants`.
        HeroUI's own `.dropdown__trigger` class sets `display: inline-block`
        and is imported after `button.css`, so on a same-specificity tie it
        silently wins over `buttonVariants()`'s `inline-flex` and collapses the
        icon/label into stacked inline content. `inline-flex items-center
        justify-center` are added here as bare utility classes (not folded into
        buttonVariants) so they land in Tailwind's `utilities` layer, which
        outranks HeroUI's `components` layer regardless of import order.
      */}
      <Dropdown.Trigger
        aria-label={t.common.language}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "inline-flex h-11 items-center justify-center gap-1.5 rounded-full px-3 sm:h-10",
          className,
        )}
      >
        <Globe className="size-4" strokeWidth={2} />
        <span className="hidden text-xs font-semibold min-[22rem]:inline">
          {localeMeta[locale].short}
        </span>
      </Dropdown.Trigger>

      <Dropdown.Popover placement="bottom end" className="min-w-48">
        <Dropdown.Menu
          aria-label={t.common.language}
          selectionMode="single"
          selectedKeys={[locale]}
          onAction={(key) => setLocale(key as Locale)}
        >
          {locales.map((option) => (
            <Dropdown.Item
              key={option}
              id={option}
              textValue={localeMeta[option].label}
              className="justify-between gap-3"
            >
              <span lang={localeMeta[option].htmlLang}>
                {localeMeta[option].label}
              </span>
              {option === locale ? (
                <Check className="text-accent size-4" strokeWidth={2.5} />
              ) : null}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}
