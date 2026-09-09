"use client";

import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { useI18n } from "@/i18n/provider";

export function Steps() {
  const { t } = useI18n();

  return (
    <Section>
      <SectionHeading
        eyebrow={t.steps.eyebrow}
        title={t.steps.title}
        align="center"
        className="mx-auto items-center text-center"
      />

      <ol className="relative mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-6">
        {/* Connector drawn once, behind the step markers, on wide screens only. */}
        <span
          aria-hidden="true"
          className="from-border via-accent/50 to-border absolute top-6 right-[16.66%] left-[16.66%] hidden h-px bg-gradient-to-r sm:block"
        />

        {t.steps.items.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.1}>
            <li className="relative flex flex-col items-center gap-3 text-center">
              <span className="border-border bg-surface font-display text-accent shadow-card grid size-12 place-items-center rounded-full border text-base font-semibold">
                {index + 1}
              </span>
              <h3 className="font-display text-foreground text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="text-muted max-w-xs text-sm leading-relaxed">
                {step.body}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
