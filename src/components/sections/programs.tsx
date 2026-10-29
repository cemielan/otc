"use client";

import { Card } from "@heroui/react";
import type { LucideIcon } from "lucide-react";
import { GraduationCap, Landmark, Languages, Target } from "lucide-react";

import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { toneAt, toneBlock } from "@/components/primitives/tones";
import { curricula, type CurriculumId } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const curriculumIcons: Record<CurriculumId, LucideIcon> = {
  cambridge: GraduationCap,
  national: Landmark,
  nationalPlus: Languages,
  tka: Target,
};

export function Programs() {
  const { t } = useI18n();

  return (
    <Section id="programs">
      <SectionHeading
        eyebrow={t.programs.eyebrow}
        title={t.programs.title}
        description={t.programs.description}
        align="center"
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
        {curricula.map((curriculum, index) => {
          const copy = t.programs.items[curriculum.id];
          const Icon = curriculumIcons[curriculum.id];

          return (
            <Reveal key={curriculum.id} delay={index * 0.08} className="h-full">
              <Card
                /*
                  HeroUI's `render` prop takes a function and requires props
                  (including the ref) to be forwarded to the element.
                */
                render={(props) => <article {...props} />}
                className={cn(
                  "flex h-full flex-col gap-4 rounded-3xl border-transparent p-5 transition-transform duration-300 hover:-translate-y-1.5 sm:p-6",
                  toneBlock[toneAt(index)],
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="bg-brand-cream/70 grid size-10 shrink-0 place-items-center rounded-xl">
                    <Icon className="size-5" strokeWidth={2.2} aria-hidden="true" />
                  </span>
                  <Card.Title className="font-display text-brand-ink text-lg leading-tight font-semibold tracking-[-0.01em]">
                    {copy.name}
                  </Card.Title>
                </div>

                {/* Description under the title; levels pinned to the bottom, as in Subjects. */}
                <Card.Description className="text-brand-ink/75 text-sm leading-relaxed">
                  {copy.tagline}
                </Card.Description>

                <div className="mt-auto pt-2">
                  <p className="text-brand-ink/60 text-[0.65rem] font-bold tracking-[0.16em] uppercase">
                    {t.programs.levelsLabel}
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {copy.levels.map((level) => (
                      <li
                        key={level}
                        className="bg-brand-cream/80 text-brand-ink rounded-full px-2.5 py-1 text-xs font-medium"
                      >
                        {level}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
