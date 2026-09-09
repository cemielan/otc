"use client";

import { ArrowUp, MapPin, MessageCircle, Phone } from "lucide-react";

import { Brand } from "@/components/layout/brand";
import { InstagramGlyph } from "@/components/ui/brand-icons";
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
    <footer className="border-t border-panel-muted bg-panel text-panel-foreground">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Brand tone="panel" />
            <p className="max-w-xs text-sm leading-relaxed text-panel-foreground/70">
              {t.footer.tagline}
            </p>
            <p className="flex items-start gap-2 text-sm text-panel-foreground/70">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-accent"
                strokeWidth={2.2}
              />
              {location.city}, {location.region}
            </p>
          </div>

          <nav aria-label={t.footer.exploreLabel} className="flex flex-col gap-4">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-panel-foreground/50">
              {t.footer.exploreLabel}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {navSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={section.href}
                    className="text-sm text-panel-foreground/75 transition-colors hover:text-accent"
                  >
                    {t.nav[section.id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-panel-foreground/50">
              {t.footer.subjectsLabel}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {subjects.map((subject) => (
                <li key={subject.id}>
                  <a
                    href="#subjects"
                    className="text-sm text-panel-foreground/75 transition-colors hover:text-accent"
                  >
                    {t.subjects.items[subject.id].name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-panel-foreground/50">
              {t.footer.reachLabel}
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm text-panel-foreground/75 transition-colors hover:text-accent"
                >
                  <MessageCircle
                    aria-hidden="true"
                    className="size-4 text-accent"
                    strokeWidth={2.2}
                  />
                  <span>
                    <span className="sr-only">
                      {t.contact.channels.whatsappLabel}:{" "}
                    </span>
                    {contact.whatsappDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={contact.officePhoneHref}
                  className="group inline-flex items-center gap-2.5 text-sm text-panel-foreground/75 transition-colors hover:text-accent"
                >
                  <Phone
                    aria-hidden="true"
                    className="size-4 text-accent"
                    strokeWidth={2.2}
                  />
                  <span>
                    <span className="sr-only">
                      {t.contact.channels.phoneLabel}:{" "}
                    </span>
                    {contact.officePhoneDisplay}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm text-panel-foreground/75 transition-colors hover:text-accent"
                >
                  <InstagramGlyph className="size-4 text-accent" />
                  <span>
                    <span className="sr-only">
                      {t.contact.channels.instagramLabel}:{" "}
                    </span>
                    @{contact.instagramHandle}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-panel-muted pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-panel-foreground/55">
            © {currentYear} {siteConfig.name}. {t.footer.rights}
          </p>

          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-panel-muted px-3.5 py-2 text-xs font-semibold text-panel-foreground/75 transition-colors hover:border-accent/60 hover:text-accent"
          >
            <ArrowUp className="size-3.5" strokeWidth={2.4} />
            {t.common.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
