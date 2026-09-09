"use client";

import { Card, Chip, Separator } from "@heroui/react";
import { Check, MessageCircle, Users } from "lucide-react";

import { Meteors } from "@/components/effects/meteors";
import { CtaLink } from "@/components/primitives/cta-link";
import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { packages, siteConfig, type PackagePlan } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { cn, formatRupiah, whatsappUrl } from "@/lib/utils";

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

      <div className="mt-10 grid items-stretch gap-4 sm:gap-5 lg:mt-12 lg:grid-cols-3">
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
  const price = plan.priceIDR;
  const isConsult = price === null;

  /**
   * Both CTAs open WhatsApp with the plan already named, so an enquiry arrives
   * with enough context to answer in one reply.
   */
  const waLink = whatsappUrl(
    siteConfig.contact.whatsappE164,
    `${t.contact.form.template.intro}\n${t.contact.form.template.plan}: ${copy.name}`,
  );

  const mutedText = plan.featured ? "text-panel-foreground/70" : "text-muted";

  return (
    <Card
      render={(props) => <article {...props} />}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-4xl p-6 transition-all duration-300 sm:p-8",
        plan.featured
          ? "border-accent/40 bg-panel text-panel-foreground shadow-lift"
          : "text-foreground hover:border-accent/50 hover:shadow-card hover:-translate-y-1",
      )}
    >
      {plan.featured ? <Meteors number={12} /> : null}

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Card.Title
            className={cn(
              "font-display text-xl font-semibold tracking-tight",
              plan.featured ? "text-panel-foreground" : "text-foreground",
            )}
          >
            {copy.name}
          </Card.Title>

          {plan.featured ? (
            <Chip color="accent" variant="primary" size="sm" className="shrink-0">
              <Chip.Label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase">
                {t.packages.popular}
              </Chip.Label>
            </Chip>
          ) : null}
        </div>

        <Card.Description className={cn("mt-2 text-sm leading-relaxed", mutedText)}>
          {copy.tagline}
        </Card.Description>

        <Separator
          className={cn("my-6", plan.featured && "bg-panel-muted")}
        />

        <div>
          {isConsult ? (
            <>
              <p className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {t.packages.consultPrice}
              </p>
              <p className={cn("mt-1.5 text-sm", mutedText)}>
                {t.packages.consultNote}
              </p>
            </>
          ) : (
            <>
              <p className="flex flex-wrap items-baseline gap-1.5">
                <span className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {formatRupiah(price)}
                </span>
                <span className={cn("text-sm font-medium", mutedText)}>
                  {t.packages.perMonth}
                </span>
              </p>
              <p className={cn("mt-1.5 text-sm", mutedText)}>
                {t.packages.perSubject}
              </p>
            </>
          )}

          <Chip
            variant={plan.featured ? "tertiary" : "secondary"}
            size="sm"
            className={cn("mt-5 gap-2", plan.featured && "text-panel-foreground/80")}
          >
            <Users className="size-3.5" strokeWidth={2.2} />
            <Chip.Label>
              {t.packages.capacityLabel}: {plan.capacity} {t.packages.studentsUnit}
            </Chip.Label>
          </Chip>
        </div>

        <div className="mt-6 flex-1">
          <p
            className={cn(
              "text-[0.7rem] font-semibold tracking-[0.14em] uppercase",
              plan.featured ? "text-panel-foreground/60" : "text-muted",
            )}
          >
            {t.packages.includesLabel}
          </p>

          <ul className="mt-3 space-y-2.5">
            {copy.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <Check
                  aria-hidden="true"
                  className="text-accent mt-0.5 size-4 shrink-0"
                  strokeWidth={2.6}
                />
                <span
                  className={
                    plan.featured ? "text-panel-foreground/85" : "text-foreground"
                  }
                >
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
          variant={plan.featured || isConsult ? "primary" : "outline"}
          className="mt-8"
        >
          <MessageCircle className="size-4" strokeWidth={2.2} />
          {isConsult ? t.packages.consultCta : t.packages.selectCta}
        </CtaLink>
      </div>
    </Card>
  );
}
