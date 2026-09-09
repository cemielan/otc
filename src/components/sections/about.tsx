"use client";

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
        className="pointer-events-none absolute -right-20 -top-24 size-[28rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative">
        <SectionHeading
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          description={t.about.description}
          tone="panel"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="h-full">
            <article className="flex h-full flex-col gap-5 rounded-4xl border border-panel-muted bg-panel-muted/50 p-7 sm:p-9">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <Compass className="size-5" strokeWidth={2.1} />
              </span>

              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-panel-foreground/60">
                {t.about.vision.label}
              </p>

              <p className="font-display text-xl font-medium leading-snug text-panel-foreground text-pretty sm:text-2xl">
                {t.about.vision.body}
              </p>

              <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                {t.about.values.map((value) => (
                  <li
                    key={value}
                    className="rounded-full border border-panel-muted px-3 py-1.5 text-xs font-medium text-panel-foreground/75"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <article className="flex h-full flex-col gap-6 rounded-4xl border border-panel-muted bg-panel p-7 sm:p-9">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-panel-muted text-accent">
                  <Target className="size-5" strokeWidth={2.1} />
                </span>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-panel-foreground/60">
                  {t.about.mission.label}
                </p>
              </div>

              <ol className="grid gap-5 sm:grid-cols-2">
                {t.about.mission.items.map((item, index) => (
                  <li key={item.title} className="flex flex-col gap-2">
                    <span className="font-display text-sm font-semibold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-base font-semibold text-panel-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-panel-foreground/70">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>
            </article>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
