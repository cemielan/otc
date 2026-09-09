"use client";

import type { ReactNode } from "react";
import { ExternalLink, MapPin, MessageCircle, Phone } from "lucide-react";

import { ButtonLink } from "@/components/primitives/button-link";
import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { InstagramGlyph } from "@/components/ui/brand-icons";
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

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="h-full">
          <div className="h-full overflow-hidden rounded-4xl border border-line bg-surface shadow-card">
            {/*
              Keyless Google Maps embed. `loading="lazy"` keeps the iframe out of
              the critical path; swap `mapEmbedSrc` for the centre's real place
              embed once the street address is confirmed.
            */}
            <iframe
              title={t.location.mapTitle}
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[22rem] w-full border-0 grayscale-[0.15] dark:grayscale-[0.35] dark:invert-[0.9] dark:hue-rotate-180 lg:h-full lg:min-h-[26rem]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="h-full">
          <div className="flex h-full flex-col gap-6 rounded-4xl border border-line bg-surface p-7 sm:p-8">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                {t.location.addressLabel}
              </p>
              <p className="mt-3 flex items-start gap-2.5 font-display text-lg font-semibold leading-snug text-foreground">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-accent"
                  strokeWidth={2.2}
                />
                {location.city}, {location.region}, {location.country}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {t.location.addressNote}
              </p>
            </div>

            <div className="border-t border-line pt-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                {t.location.detailsLabel}
              </p>
              <ul className="mt-3 space-y-2">
                {t.location.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <ul className="grid gap-2.5 border-t border-line pt-5">
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

            <div className="mt-auto flex flex-col gap-2.5 pt-2 sm:flex-row">
              <ButtonLink
                href={mapDirectionsUrl}
                external
                variant="outline"
                className="flex-1"
              >
                {t.location.directionsCta}
                <ExternalLink className="size-4" strokeWidth={2.2} />
              </ButtonLink>
              <ButtonLink href={waLink} external variant="primary" className="flex-1">
                <MessageCircle className="size-4" strokeWidth={2.2} />
                {t.location.contactCta}
              </ButtonLink>
            </div>
          </div>
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
        className="group flex items-center gap-3 rounded-2xl border border-transparent px-2 py-2 transition-colors hover:border-line hover:bg-surface-muted"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          {icon}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-foreground-muted">
            {label}
          </span>
          <span className="text-sm font-semibold text-foreground group-hover:text-accent">
            {value}
          </span>
        </span>
      </a>
    </li>
  );
}
