"use client";

import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { toneAt, toneBlock } from "@/components/primitives/tones";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

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

      <ol className="relative mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5">
        {t.steps.items.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.1} className="h-full">
            <li className="ink-frame bg-surface flex h-full flex-col gap-4 rounded-3xl p-6">
              <span
                className={cn(
                  "font-display grid size-14 place-items-center rounded-2xl text-2xl font-bold",
                  toneBlock[toneAt(index)],
                )}
              >
                {index + 1}
              </span>
              <h3 className="font-display text-foreground text-lg leading-tight font-bold tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{step.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
