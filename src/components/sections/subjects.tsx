"use client";

import { Card, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Atom, FlaskConical, Languages, Sigma } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { toneAt, toneBlock } from "@/components/primitives/tones";
import { subjects, type SubjectId } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

const subjectIcons: Record<SubjectId, LucideIcon> = {
  mathematics: Sigma,
  physics: Atom,
  chemistry: FlaskConical,
  english: Languages,
};

export function Subjects() {
  const { t } = useI18n();

  return (
    <Section id="subjects" tone="surface">
      <SectionHeading
        eyebrow={t.subjects.eyebrow}
        title={t.subjects.title}
        description={t.subjects.description}
        align="split"
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
        {subjects.map((subject, index) => {
          const copy = t.subjects.items[subject.id];
          const Icon = subjectIcons[subject.id];
          /* Offset so the palette runs differently from the programs row. */
          const tone = toneAt(index + 2);

          return (
            <motion.li
              key={subject.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              /*
                `whileHover` only fires for pointer devices, so touch users are
                not left with a stuck hover state after tapping a card.
              */
              whileHover={{ y: -6 }}
              className="h-full"
            >
              {/* A course card: inset colour "cover", then the details. */}
              <Card className="soft-frame bg-surface flex h-full flex-col gap-0 rounded-3xl p-2">
                <div
                  className={cn(
                    "relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl",
                    toneBlock[tone],
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="bg-brand-cream/40 absolute -top-8 -right-6 size-24 rounded-full"
                  />
                  <span
                    aria-hidden="true"
                    className="bg-brand-ink/5 absolute -bottom-10 -left-8 size-28 rounded-full"
                  />
                  <span className="bg-brand-cream/80 relative grid size-16 place-items-center rounded-2xl">
                    <Icon className="size-8" strokeWidth={2.1} aria-hidden="true" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-3 pt-4 pb-3 sm:px-4">
                  <Card.Title className="font-display text-foreground text-lg leading-tight font-semibold tracking-[-0.01em]">
                    {copy.name}
                  </Card.Title>
                  <Card.Description className="text-muted mt-1.5 text-sm leading-relaxed">
                    {copy.description}
                  </Card.Description>

                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {copy.topics.map((topic) => (
                      <li key={topic}>
                        <Chip
                          variant="secondary"
                          size="sm"
                          className="bg-surface-secondary soft-frame rounded-full"
                        >
                          <Chip.Label>{topic}</Chip.Label>
                        </Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}
