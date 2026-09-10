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
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {subjects.map((subject, index) => {
          const copy = t.subjects.items[subject.id];
          const Icon = subjectIcons[subject.id];
          /* Offset by one so the palette does not repeat the programs row. */
          const tone = toneAt(index + 1);

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
              <Card className="ink-frame bg-surface flex h-full flex-col overflow-hidden rounded-3xl p-0">
                <div
                  className={cn(
                    "relative grid aspect-[4/3] place-items-center overflow-hidden",
                    toneBlock[tone],
                  )}
                >
                  {/* Two soft discs, the recurring backdrop shape of the design. */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-8 -right-6 size-24 rounded-full bg-brand-cream/25"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-10 -left-8 size-28 rounded-full bg-brand-ink/10"
                  />
                  <Icon className="relative size-11" strokeWidth={2.2} aria-hidden="true" />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <Card.Title className="font-display text-foreground text-xl leading-tight font-bold tracking-[-0.01em]">
                    {copy.name}
                  </Card.Title>
                  <Card.Description className="text-muted mt-2 text-sm leading-relaxed">
                    {copy.description}
                  </Card.Description>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {copy.topics.map((topic) => (
                      <li key={topic}>
                        <Chip variant="secondary" size="sm" className="rounded-full">
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
