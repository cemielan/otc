"use client";

import type { ReactNode } from "react";
import { Card, Separator } from "@heroui/react";
import { ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";

import { InstagramGlyph } from "@/components/icons";
import { CtaLink } from "@/components/primitives/cta-link";
import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { mapDirectionsUrl, mapEmbedSrc, siteConfig } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { whatsappUrl } from "@/lib/utils";

const { contact, location } = siteConfig;

export function Location() {
  const { t } = useI18n();

  const waLink = whatsappUrl(
    contact.whatsappE164,
    `${t.contact.form.template.intro}\n${t.location.contactCta}`,
  );

  return (
    <Section id="location" tone="surface">
      <SectionHeading
        eyebrow={t.location.eyebrow}
        title={t.location.title}
        description={t.location.description}
      />

      <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="h-full">
          <Card className="shadow-card relative h-full overflow-hidden rounded-4xl p-0">
            {/*
              Keyless Google Maps embed. `loading="lazy"` keeps the iframe out of
              the critical path; once `location.coords` is filled in (see
              site.ts), this centers on the pin directly instead of searching
              for the business by name, which drops Google's info-card popup.
            */}
            <iframe
              title={t.location.mapTitle}
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 grayscale-[0.15] sm:h-[22rem] lg:h-full lg:min-h-[26rem] dark:grayscale-[0.35] dark:invert-[0.9] dark:hue-rotate-180"
            />

            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface/95 text-foreground hover:bg-surface shadow-card absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold no-underline backdrop-blur-sm transition-colors"
            >
              {t.location.directionsCta}
              <ExternalLink className="size-3.5" strokeWidth={2.4} />
            </a>
          </Card>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <Card className="flex h-full flex-col gap-6 rounded-4xl p-6 sm:p-8">
            <div>
              <p className="text-muted text-[0.7rem] font-semibold tracking-[0.14em] uppercase">
                {t.location.addressLabel}
              </p>
              <p className="font-display text-foreground mt-3 flex items-start gap-2.5 text-base leading-snug font-semibold sm:text-lg">
                <MapPin
                  aria-hidden="true"
                  className="text-accent mt-0.5 size-5 shrink-0"
                  strokeWidth={2.2}
                />
                {location.city}, {location.region}, {location.country}
              </p>
              <p className="text-muted mt-3 text-sm leading-relaxed">
                {t.location.addressNote}
              </p>
            </div>

            <div>
              <Separator className="mb-5" />
              <p className="text-muted text-[0.7rem] font-semibold tracking-[0.14em] uppercase">
                {t.location.detailsLabel}
              </p>
              <ul className="mt-3 space-y-2">
                {t.location.details.map((detail) => (
                  <li
                    key={detail}
                    className="text-foreground flex items-start gap-2 text-sm"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-accent mt-1.5 size-1.5 shrink-0 rounded-full"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Separator className="mb-5" />
              <ul className="grid gap-1.5">
                <ContactRow
                  icon={<MessageCircle className="size-4" strokeWidth={2.2} />}
                  label={t.contact.channels.whatsappLabel}
                  value={contact.whatsappDisplay}
                  href={waLink}
                  external
                />
                <ContactRow
                  icon={<Phone className="size-4" strokeWidth={2.2} />}
                  label={t.contact.channels.phoneLabel}
                  value={contact.officePhoneDisplay}
                  href={contact.officePhoneHref}
                />
                <ContactRow
                  icon={<InstagramGlyph className="size-4" />}
                  label={t.contact.channels.instagramLabel}
                  value={`@${contact.instagramHandle}`}
                  href={contact.instagramUrl}
                  external
                />
              </ul>
            </div>

            <div className="mt-auto flex flex-col gap-2.5 pt-2 sm:flex-row">
              <CtaLink
                href={mapDirectionsUrl}
                external
                variant="outline"
                className="flex-1"
              >
                {t.location.directionsCta}
                <ExternalLink className="size-4" strokeWidth={2.2} />
              </CtaLink>
              <CtaLink
                href={waLink}
                external
                variant="primary"
                className="flex-1"
              >
                <MessageCircle className="size-4" strokeWidth={2.2} />
                {t.location.contactCta}
              </CtaLink>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
        className="group hover:border-border hover:bg-surface-secondary flex min-h-12 items-center gap-3 rounded-2xl border border-transparent px-2 py-2 no-underline transition-colors"
      >
        <span className="bg-accent-soft text-accent grid size-9 shrink-0 place-items-center rounded-xl">
          {icon}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-muted text-[0.7rem] font-medium tracking-[0.1em] uppercase">
            {label}
          </span>
          <span className="text-foreground group-hover:text-accent text-sm font-semibold">
            {value}
          </span>
        </span>
      </a>
    </li>
  );
}
