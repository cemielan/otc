"use client";

import type { LucideIcon } from "lucide-react";
import { GraduationCap, Landmark, Languages, Target } from "lucide-react";

import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { curricula, type CurriculumId } from "@/content/site";
import { useI18n } from "@/i18n/provider";

const curriculumIcons: Record<CurriculumId, LucideIcon> = {
  cambridge: GraduationCap,
  national: Landmark,
  nationalPlus: Languages,
  tka: Target,
};

export function Programs() {
  const { t } = useI18n();

  /** Every level across every curriculum, used for the marquee strip. */
  const marqueeChips = curricula.flatMap(
    (curriculum) => t.programs.items[curriculum.id].levels,
  );

  return (
    <Section id="programs" tone="surface">
      <SectionHeading
        eyebrow={t.programs.eyebrow}
        title={t.programs.title}
        description={t.programs.description}
      />

      <Reveal className="mt-10" delay={0.05}>
        <InfiniteMovingCards speed="slow">
          {marqueeChips.map((chip, index) => (
            <span
              key={`${chip}-${index}`}
              className="whitespace-nowrap rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-foreground-muted"
            >
              {chip}
            </span>
          ))}
        </InfiniteMovingCards>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {curricula.map((curriculum, index) => {
          const copy = t.programs.items[curriculum.id];
          const Icon = curriculumIcons[curriculum.id];

          return (
            <Reveal key={curriculum.id} delay={index * 0.08} className="h-full">
              <article className="flex h-full flex-col gap-4 rounded-3xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card">
                <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                  <Icon className="size-5" strokeWidth={2} />
                </span>

                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {copy.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                    {copy.tagline}
                  </p>
                </div>

                <div className="mt-auto border-t border-line pt-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                    {t.programs.levelsLabel}
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {copy.levels.map((level) => (
                      <li
                        key={level}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                        />
                        {level}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
