"use client";

import { Card, Separator } from "@heroui/react";
import { Check, MessageCircle, Users } from "lucide-react";

import { CtaLink } from "@/components/primitives/cta-link";
import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { packages, siteConfig, type PackagePlan } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { cn, whatsappUrl } from "@/lib/utils";

export function Packages() {
  const { t } = useI18n();

  return (
    <Section id="packages" tone="surface">
      <SectionHeading
        eyebrow={t.packages.eyebrow}
        title={t.packages.title}
        description={t.packages.description}
        align="center"
        className="mx-auto items-center text-center"
      />

      <div className="mx-auto mt-10 grid max-w-3xl items-stretch gap-4 sm:gap-5 lg:mt-14 lg:grid-cols-2">
        {packages.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 0.08} className="h-full">
            <PlanCard plan={plan} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <p className="text-muted mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed">
          {t.packages.footnote}
        </p>
      </Reveal>
    </Section>
  );
}

function PlanCard({ plan }: { plan: PackagePlan }) {
  const { t } = useI18n();
  const copy = t.packages.plans[plan.id];

  /**
   * Both CTAs open WhatsApp with the plan already named, so an enquiry arrives
   * with enough context to answer in one reply.
   */
  const waLink = whatsappUrl(
    siteConfig.contact.whatsappE164,
    `${t.contact.form.template.intro}\n${t.contact.form.template.plan}: ${copy.name}`,
  );

  /** The chosen plan is a solid colour block; the other is a plain framed card. */
  const featured = plan.featured;

  return (
    <Card
      render={(props) => <article {...props} />}
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-4xl p-6 transition-transform duration-300 sm:p-8",
        featured
          ? "bg-brand-purple text-brand-cream border-transparent"
          : "ink-frame bg-surface text-foreground hover:-translate-y-1.5",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <Card.Title
          className={cn(
            "font-display text-xl leading-tight font-bold tracking-[-0.01em]",
            featured ? "text-brand-cream" : "text-foreground",
          )}
        >
          {copy.name}
        </Card.Title>

        {featured ? (
          <span className="bg-brand-cream text-brand-ink shrink-0 rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-[0.12em] uppercase">
            {t.packages.popular}
          </span>
        ) : null}
      </div>

      <Card.Description
        className={cn(
          "mt-2 text-sm leading-relaxed",
          featured ? "text-brand-cream/85" : "text-muted",
        )}
      >
        {copy.tagline}
      </Card.Description>

      <Separator
        className={cn("my-6", featured ? "bg-brand-cream/25" : "bg-border/25")}
      />

      <div>
        <p className="font-display text-2xl leading-tight font-bold tracking-[-0.01em] sm:text-3xl">
          {t.packages.consultPrice}
        </p>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed",
            featured ? "text-brand-cream/85" : "text-muted",
          )}
        >
          {t.packages.consultNote}
        </p>

        <span
          className={cn(
            "mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
            featured
              ? "bg-brand-cream/15 text-brand-cream"
              : "bg-brand-yellow text-brand-ink",
          )}
        >
          <Users className="size-3.5" strokeWidth={2.4} aria-hidden="true" />
          {t.packages.capacityLabel}: {plan.capacity} {t.packages.studentsUnit}
        </span>
      </div>

      <div className="mt-6 flex-1">
        <p
          className={cn(
            "text-[0.65rem] font-bold tracking-[0.16em] uppercase",
            featured ? "text-brand-cream/70" : "text-muted",
          )}
        >
          {t.packages.includesLabel}
        </p>

        <ul className="mt-3 space-y-2.5">
          {copy.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm font-medium">
              <Check
                aria-hidden="true"
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  featured ? "text-brand-yellow" : "text-brand-purple",
                )}
                strokeWidth={2.8}
              />
              <span className={featured ? "text-brand-cream/90" : "text-foreground"}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <CtaLink
        href={waLink}
        external
        size="lg"
        fullWidth
        className={cn(
          "mt-8",
          featured && "bg-brand-cream text-brand-ink hover:bg-white",
        )}
      >
        <MessageCircle className="size-4" strokeWidth={2.2} />
        {t.packages.consultCta}
      </CtaLink>
    </Card>
  );
}
