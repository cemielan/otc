"use client";

import { Compass } from "lucide-react";

import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { toneAt, toneBlock } from "@/components/primitives/tones";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function About() {
  const { t } = useI18n();

  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="flex flex-col gap-7">
          <SectionHeading
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            description={t.about.description}
          />

          <Reveal delay={0.08}>
            <div className="bg-brand-yellow text-brand-ink rounded-3xl p-6 sm:p-8">
              <span className="inline-flex items-center gap-2.5">
                <Compass className="size-5" strokeWidth={2.3} aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase">
                  {t.about.vision.label}
                </span>
              </span>
              <p className="font-display mt-4 text-lg leading-snug font-bold tracking-[-0.01em] text-pretty sm:text-2xl">
                {t.about.vision.body}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="flex flex-wrap gap-2">
              {t.about.values.map((value) => (
                <li
                  key={value}
                  className="ink-frame text-foreground rounded-full px-3.5 py-1.5 text-xs font-semibold"
                >
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex flex-col gap-4">
          <p className="text-muted text-[0.65rem] font-bold tracking-[0.18em] uppercase">
            {t.about.mission.label}
          </p>

          {/* The mission reads as a four-block mosaic, the motif of the design. */}
          <ol className="grid gap-4 sm:grid-cols-2">
            {t.about.mission.items.map((item, index) => (
              <li
                key={item.title}
                className={cn(
                  "flex flex-col gap-2 rounded-3xl p-5 sm:p-6",
                  toneBlock[toneAt(index)],
                )}
              >
                <span className="font-display text-2xl leading-none font-bold opacity-60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base leading-tight font-bold sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-90">{item.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}
