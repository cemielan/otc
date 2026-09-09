"use client";

import { Card, Chip, Separator } from "@heroui/react";
import type { LucideIcon } from "lucide-react";
import { GraduationCap, Landmark, Languages, Target } from "lucide-react";

import { Marquee } from "@/components/effects/marquee";
import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
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

      <Reveal className="mt-8 sm:mt-10" delay={0.05}>
        <Marquee speed="slow">
          {marqueeChips.map((chip, index) => (
            <Chip
              key={`${chip}-${index}`}
              variant="secondary"
              size="md"
              className="whitespace-nowrap"
            >
              <Chip.Label>{chip}</Chip.Label>
            </Chip>
          ))}
        </Marquee>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
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
                className="hover:border-accent/50 hover:shadow-card flex h-full flex-col gap-4 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="bg-accent-soft text-accent grid size-11 place-items-center rounded-2xl">
                  <Icon className="size-5" strokeWidth={2} />
                </span>

                <div>
                  <Card.Title className="font-display text-foreground text-lg font-semibold tracking-tight">
                    {copy.name}
                  </Card.Title>
                  <Card.Description className="text-muted mt-1.5 text-sm leading-relaxed">
                    {copy.tagline}
                  </Card.Description>
                </div>

                <div className="mt-auto">
                  <Separator className="mb-4" />
                  <p className="text-muted text-[0.7rem] font-semibold tracking-[0.14em] uppercase">
                    {t.programs.levelsLabel}
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {copy.levels.map((level) => (
                      <li
                        key={level}
                        className="text-foreground flex items-start gap-2 text-sm"
                      >
                        <span
                          aria-hidden="true"
                          className="bg-accent mt-1.5 size-1.5 shrink-0 rounded-full"
                        />
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
