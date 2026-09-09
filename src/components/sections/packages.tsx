"use client";

import { Check, MessageCircle, Users } from "lucide-react";

import { ButtonLink } from "@/components/primitives/button-link";
import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Meteors } from "@/components/ui/meteors";
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

      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
        {packages.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 0.08} className="h-full">
            <PlanCard plan={plan} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-foreground-muted">
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

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-4xl border p-7 transition-all duration-300 sm:p-8",
        plan.featured
          ? "border-accent/40 bg-panel text-panel-foreground shadow-lift"
          : "border-line bg-surface text-foreground hover:-translate-y-1 hover:border-accent/50 hover:shadow-card",
      )}
    >
      {plan.featured ? <Meteors number={12} /> : null}

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={cn(
              "font-display text-xl font-semibold tracking-tight",
              plan.featured ? "text-panel-foreground" : "text-foreground",
            )}
          >
            {copy.name}
          </h3>

          {plan.featured ? (
            <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-accent-foreground">
              {t.packages.popular}
            </span>
          ) : null}
        </div>

        <p
          className={cn(
            "mt-2 text-sm leading-relaxed",
            plan.featured
              ? "text-panel-foreground/70"
              : "text-foreground-muted",
          )}
        >
          {copy.tagline}
        </p>

        <div
          className={cn(
            "mt-6 border-t pt-6",
            plan.featured ? "border-panel-muted" : "border-line",
          )}
        >
          {isConsult ? (
            <>
              <p className="font-display text-3xl font-semibold tracking-tight">
                {t.packages.consultPrice}
              </p>
              <p
                className={cn(
                  "mt-1.5 text-sm",
                  plan.featured
                    ? "text-panel-foreground/70"
                    : "text-foreground-muted",
                )}
              >
                {t.packages.consultNote}
              </p>
            </>
          ) : (
            <>
              <p className="flex flex-wrap items-baseline gap-1.5">
                <span className="font-display text-4xl font-semibold tracking-tight">
                  {formatRupiah(price)}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    plan.featured
                      ? "text-panel-foreground/70"
                      : "text-foreground-muted",
                  )}
                >
                  {t.packages.perMonth}
                </span>
              </p>
              <p
                className={cn(
                  "mt-1.5 text-sm",
                  plan.featured
                    ? "text-panel-foreground/70"
                    : "text-foreground-muted",
                )}
              >
                {t.packages.perSubject}
              </p>
            </>
          )}

          <p
            className={cn(
              "mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium",
              plan.featured
                ? "bg-panel-muted text-panel-foreground/80"
                : "bg-surface-muted text-foreground-muted",
            )}
          >
            <Users className="size-3.5" strokeWidth={2.2} />
            {t.packages.capacityLabel}: {plan.capacity} {t.packages.studentsUnit}
          </p>
        </div>

        <div className="mt-6 flex-1">
          <p
            className={cn(
              "text-[0.7rem] font-semibold uppercase tracking-[0.14em]",
              plan.featured
                ? "text-panel-foreground/60"
                : "text-foreground-muted",
            )}
          >
            {t.packages.includesLabel}
          </p>

          <ul className="mt-3 space-y-2.5">
            {copy.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-accent"
                  strokeWidth={2.6}
                />
                <span
                  className={
                    plan.featured
                      ? "text-panel-foreground/85"
                      : "text-foreground"
                  }
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ButtonLink
          href={waLink}
          external
          size="lg"
          variant={plan.featured || isConsult ? "primary" : "outline"}
          className="mt-8 w-full"
        >
          <MessageCircle className="size-4" strokeWidth={2.2} />
          {isConsult ? t.packages.consultCta : t.packages.selectCta}
        </ButtonLink>
      </div>
    </article>
  );
}
