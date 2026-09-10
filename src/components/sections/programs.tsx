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
        className="mx-auto items-center text-center"
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
        {curricula.map((curriculum, index) => {
          const copy = t.programs.items[curriculum.id];
          const Icon = curriculumIcons[curriculum.id];
          const tone = toneAt(index);

          return (
            <Reveal key={curriculum.id} delay={index * 0.08} className="h-full">
              <Card
                /*
                  HeroUI's `render` prop takes a function and requires props
                  (including the ref) to be forwarded to the element.
                */
                render={(props) => <article {...props} />}
                className="ink-frame bg-surface flex h-full flex-col overflow-hidden rounded-3xl p-0 transition-transform duration-300 hover:-translate-y-1.5"
              >
                {/* The colour block that frames each card, as in the design. */}
                <div
                  className={cn(
                    "flex aspect-[4/3] items-end justify-between p-5",
                    toneBlock[tone],
                  )}
                >
                  <Icon className="size-10" strokeWidth={2.2} aria-hidden="true" />
                  <span className="font-display text-3xl leading-none font-bold opacity-70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-3.5 p-5 sm:p-6">
                  <div>
                    <Card.Title className="font-display text-foreground text-lg leading-tight font-bold tracking-[-0.01em]">
                      {copy.name}
                    </Card.Title>
                    <Card.Description className="text-muted mt-2 text-sm leading-relaxed">
                      {copy.tagline}
                    </Card.Description>
                  </div>

                  <div>
                    <p className="text-muted text-[0.65rem] font-bold tracking-[0.16em] uppercase">
                      {t.programs.levelsLabel}
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      {copy.levels.map((level) => (
                        <li
                          key={level}
                          className="text-foreground flex items-start gap-2 text-sm font-medium"
                        >
                          <span
                            aria-hidden="true"
                            className="bg-brand-ink mt-1.5 size-1.5 shrink-0 rounded-full dark:bg-brand-yellow"
                          />
                          {level}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
