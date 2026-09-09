"use client";

import { Card, Chip } from "@heroui/react";
import { Compass, Target } from "lucide-react";

import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";

import { useI18n } from "@/i18n/provider";

export function About() {
  const { t } = useI18n();

  return (
    <Section id="about" tone="panel" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-accent/10 pointer-events-none absolute -top-24 -right-20 size-[22rem] rounded-full blur-3xl sm:size-[28rem]"
      />

      <div className="relative">
        <SectionHeading
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          description={t.about.description}
          tone="panel"
        />

        <div className="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="h-full">
            <Card
              variant="transparent"
              render={(props) => <article {...props} />}
              className="border-panel-muted bg-panel-muted/50 flex h-full flex-col gap-5 rounded-4xl border p-6 sm:p-9"
            >
              <span className="bg-accent text-accent-foreground inline-flex size-11 items-center justify-center rounded-2xl">
                <Compass className="size-5" strokeWidth={2.1} />
              </span>

              <p className="text-panel-foreground/60 text-[0.7rem] font-semibold tracking-[0.16em] uppercase">
                {t.about.vision.label}
              </p>

              <p className="font-display text-panel-foreground text-lg leading-snug font-medium text-pretty sm:text-2xl">
                {t.about.vision.body}
              </p>

              <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                {t.about.values.map((value) => (
                  <li key={value}>
                    <Chip
                      variant="soft"
                      color="accent"
                      size="sm"
                      className="text-panel-foreground/85"
                    >
                      <Chip.Label>{value}</Chip.Label>
                    </Chip>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <Card
              variant="transparent"
              render={(props) => <article {...props} />}
              className="border-panel-muted bg-panel flex h-full flex-col gap-6 rounded-4xl border p-6 sm:p-9"
            >
              <div className="flex items-center gap-3">
                <span className="bg-panel-muted text-accent inline-flex size-11 items-center justify-center rounded-2xl">
                  <Target className="size-5" strokeWidth={2.1} />
                </span>
                <p className="text-panel-foreground/60 text-[0.7rem] font-semibold tracking-[0.16em] uppercase">
                  {t.about.mission.label}
                </p>
              </div>

              <ol className="grid gap-5 sm:grid-cols-2">
                {t.about.mission.items.map((item, index) => (
                  <li key={item.title} className="flex flex-col gap-2">
                    <span className="font-display text-accent text-sm font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-panel-foreground text-base font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-panel-foreground/70 text-sm leading-relaxed">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
