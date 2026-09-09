"use client";

import type { ReactNode } from "react";
import { Link, Separator } from "@heroui/react";
import { ArrowUp, MapPin, MessageCircle, Phone } from "lucide-react";

import { Brand } from "@/components/layout/brand";
import { InstagramGlyph } from "@/components/icons";
import { navSections, siteConfig, subjects } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { whatsappUrl } from "@/lib/utils";

const { contact, location } = siteConfig;

/** Fixed at module scope so the server and client render the same year. */
const currentYear = new Date().getFullYear();

export function Footer() {
  const { t } = useI18n();
  const waLink = whatsappUrl(
    contact.whatsappE164,
    t.contact.form.template.intro,
  );

  return (
    <footer className="border-panel-muted bg-panel text-panel-foreground border-t">
      <div className="shell py-12 sm:py-16">
        {/*
          Two columns on phones, four from large screens up, so the link lists
          stay scannable without a long single-column scroll.
        */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          <div className="col-span-2 flex flex-col gap-5 lg:col-span-1">
            <Brand tone="panel" />
            <p className="text-panel-foreground/70 max-w-xs text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <p className="text-panel-foreground/70 flex items-start gap-2 text-sm">
              <MapPin
                aria-hidden="true"
                className="text-accent mt-0.5 size-4 shrink-0"
                strokeWidth={2.2}
              />
              {location.city}, {location.region}
            </p>
          </div>

          <nav aria-label={t.footer.exploreLabel} className="flex flex-col gap-4">
            <h2 className="text-panel-foreground/50 text-[0.7rem] font-semibold tracking-[0.16em] uppercase">
              {t.footer.exploreLabel}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {navSections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={section.href}
                    className="text-panel-foreground/75 hover:text-accent text-sm"
                  >
                    {t.nav[section.id]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h2 className="text-panel-foreground/50 text-[0.7rem] font-semibold tracking-[0.16em] uppercase">
              {t.footer.subjectsLabel}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {subjects.map((subject) => (
                <li key={subject.id}>
                  <Link
                    href="#subjects"
                    className="text-panel-foreground/75 hover:text-accent text-sm"
                  >
                    {t.subjects.items[subject.id].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
            <h2 className="text-panel-foreground/50 text-[0.7rem] font-semibold tracking-[0.16em] uppercase">
              {t.footer.reachLabel}
            </h2>
            <ul className="flex flex-col gap-3">
              <FooterContact
                icon={<MessageCircle className="size-4" strokeWidth={2.2} />}
                srLabel={t.contact.channels.whatsappLabel}
                value={contact.whatsappDisplay}
                href={waLink}
                external
              />
              <FooterContact
                icon={<Phone className="size-4" strokeWidth={2.2} />}
                srLabel={t.contact.channels.phoneLabel}
                value={contact.officePhoneDisplay}
                href={contact.officePhoneHref}
              />
              <FooterContact
                icon={<InstagramGlyph className="size-4" />}
                srLabel={t.contact.channels.instagramLabel}
                value={`@${contact.instagramHandle}`}
                href={contact.instagramUrl}
                external
              />
            </ul>
          </div>
        </div>

        <Separator className="bg-panel-muted my-8" />

        <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-panel-foreground/55 text-xs">
            © {currentYear} {siteConfig.name}. {t.footer.rights}
          </p>

          <Link
            href="#top"
            className="border-panel-muted text-panel-foreground/75 hover:border-accent/60 hover:text-accent inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 text-xs font-semibold no-underline hover:no-underline"
          >
            <ArrowUp className="size-3.5" strokeWidth={2.4} />
            {t.common.backToTop}
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterContact({
  icon,
  srLabel,
  value,
  href,
  external,
}: {
  icon: ReactNode;
  srLabel: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
        className="text-panel-foreground/75 hover:text-accent inline-flex min-h-8 items-center gap-2.5 text-sm"
      >
        <span aria-hidden="true" className="text-accent">
          {icon}
        </span>
        <span>
          <span className="sr-only">{srLabel}: </span>
          {value}
        </span>
      </Link>
    </li>
  );
}
