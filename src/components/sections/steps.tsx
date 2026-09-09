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

      <ol className="relative mt-12 grid gap-6 sm:grid-cols-3">
        {/* Connector drawn once, behind the step markers, on wide screens only. */}
        <span
          aria-hidden="true"
          className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-gradient-to-r from-line via-accent/50 to-line sm:block"
        />

        {t.steps.items.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.1}>
            <li className="relative flex flex-col items-center gap-3 text-center">
              <span className="grid size-12 place-items-center rounded-full border border-line bg-surface font-display text-base font-semibold text-accent shadow-card">
                {index + 1}
              </span>
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-foreground-muted">
                {step.body}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
