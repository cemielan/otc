"use client";

import { Card, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Atom, FlaskConical, Languages, Sigma } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
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

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {subjects.map((subject, index) => {
          const copy = t.subjects.items[subject.id];
          const Icon = subjectIcons[subject.id];

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
              <Card className="hover:border-accent/50 hover:shadow-card flex h-full flex-col rounded-3xl p-6 transition-colors duration-300">
                <span className="bg-panel text-accent grid size-12 place-items-center rounded-2xl">
                  <Icon className="size-[1.35rem]" strokeWidth={2} />
                </span>

                <Card.Title className="font-display text-foreground mt-5 text-xl font-semibold tracking-tight">
                  {copy.name}
                </Card.Title>
                <Card.Description className="text-muted mt-2 text-sm leading-relaxed">
                  {copy.description}
                </Card.Description>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {copy.topics.map((topic) => (
                    <li key={topic}>
                      <Chip variant="secondary" size="sm">
                        <Chip.Label>{topic}</Chip.Label>
                      </Chip>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}
