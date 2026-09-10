"use client";

import type { ReactNode } from "react";
import { Card, Separator } from "@heroui/react";
import { ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";

import { InstagramGlyph } from "@/components/icons";
import { CtaLink } from "@/components/primitives/cta-link";
import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { toneAt, toneBlock } from "@/components/primitives/tones";
import { mapDirectionsUrl, mapEmbedSrc, siteConfig } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { cn, whatsappUrl } from "@/lib/utils";

const { contact, location } = siteConfig;

export function Location() {
  const { t } = useI18n();

  const waLink = whatsappUrl(
    contact.whatsappE164,
    `${t.contact.form.template.intro}\n${t.location.contactCta}`,
  );

  return (
    <Section id="location">
      <SectionHeading
        eyebrow={t.location.eyebrow}
        title={t.location.title}
        description={t.location.description}
      />

      <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="h-full">
          {/* The map sits inside a colour block, framed like every other tile. */}
          <div className="bg-brand-purple h-full rounded-4xl p-2.5 sm:p-4">
            <Card className="relative h-full overflow-hidden rounded-3xl border-transparent p-0">
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
                className="bg-brand-ink text-brand-cream absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold no-underline"
              >
                {t.location.directionsCta}
                <ExternalLink className="size-3.5" strokeWidth={2.4} />
              </a>
            </Card>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <Card className="ink-frame bg-surface flex h-full flex-col gap-6 rounded-4xl p-6 sm:p-8">
            <div>
              <p className="text-muted text-[0.65rem] font-bold tracking-[0.16em] uppercase">
                {t.location.addressLabel}
              </p>
              <p className="font-display text-foreground mt-3 flex items-start gap-2.5 text-base leading-snug font-bold sm:text-lg">
                <MapPin
                  aria-hidden="true"
                  className="text-brand-coral mt-0.5 size-5 shrink-0"
                  strokeWidth={2.4}
                />
                {location.city}, {location.region}, {location.country}
              </p>
              <p className="text-muted mt-3 text-sm leading-relaxed">
                {t.location.addressNote}
              </p>
            </div>

            <div>
              <Separator className="bg-border/25 mb-5" />
              <p className="text-muted text-[0.65rem] font-bold tracking-[0.16em] uppercase">
                {t.location.detailsLabel}
              </p>
              <ul className="mt-3 space-y-2">
                {t.location.details.map((detail) => (
                  <li
                    key={detail}
                    className="text-foreground flex items-start gap-2 text-sm font-medium"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-brand-ink mt-1.5 size-1.5 shrink-0 rounded-full dark:bg-brand-yellow"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Separator className="bg-border/25 mb-5" />
              <ul className="grid gap-1.5">
                <ContactRow
                  index={0}
                  icon={<MessageCircle className="size-4" strokeWidth={2.2} />}
                  label={t.contact.channels.whatsappLabel}
                  value={contact.whatsappDisplay}
                  href={waLink}
                  external
                />
                <ContactRow
                  index={1}
                  icon={<Phone className="size-4" strokeWidth={2.2} />}
                  label={t.contact.channels.phoneLabel}
                  value={contact.officePhoneDisplay}
                  href={contact.officePhoneHref}
                />
                <ContactRow
                  index={2}
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
              <CtaLink href={waLink} external className="flex-1">
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
  index,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  index: number;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
        className="group hover:bg-surface-secondary flex min-h-12 items-center gap-3 rounded-2xl px-2 py-2 no-underline transition-colors"
      >
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-xl",
            toneBlock[toneAt(index)],
          )}
        >
          {icon}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-muted text-[0.65rem] font-bold tracking-[0.12em] uppercase">
            {label}
          </span>
          <span className="text-foreground text-sm font-bold">{value}</span>
        </span>
      </a>
    </li>
  );
}
