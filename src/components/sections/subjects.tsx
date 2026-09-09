"use client";

import type { LucideIcon } from "lucide-react";
import { Atom, FlaskConical, Languages, Sigma } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { HoverEffect } from "@/components/ui/hover-effect";
import { subjects, type SubjectId } from "@/content/site";
import { useI18n } from "@/i18n/provider";

const subjectIcons: Record<SubjectId, LucideIcon> = {
  mathematics: Sigma,
  physics: Atom,
  chemistry: FlaskConical,
  english: Languages,
};

export function Subjects() {
  const { t } = useI18n();

  return (
    <Section id="subjects">
      <SectionHeading
        eyebrow={t.subjects.eyebrow}
        title={t.subjects.title}
        description={t.subjects.description}
      />

      <HoverEffect
        items={subjects}
        keyFor={(subject) => subject.id}
        className="mt-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {(subject) => {
          const copy = t.subjects.items[subject.id];
          const Icon = subjectIcons[subject.id];

          return (
            <>
              <span className="grid size-12 place-items-center rounded-2xl bg-panel text-accent">
                <Icon className="size-[1.35rem]" strokeWidth={2} />
              </span>

              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground">
                {copy.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {copy.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {copy.topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-line bg-surface-muted px-2.5 py-1 text-[0.7rem] font-medium text-foreground-muted"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </>
          );
        }}
      </HoverEffect>
    </Section>
  );
}
