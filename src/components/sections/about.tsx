"use client";

import { Compass, Sparkles } from "lucide-react";

import { Squiggle } from "@/components/icons";
import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { toneAt, toneBlock } from "@/components/primitives/tones";
import { siteConfig } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

export function About() {
  const { t } = useI18n();

  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow={t.about.eyebrow}
            title={t.about.title}
            description={t.about.description}
          />

          {/* Founding year and motto, side by side from small screens up. */}
          <Reveal delay={0.05}>
            <div className="soft-frame bg-surface grid overflow-hidden rounded-3xl sm:grid-cols-[auto_1fr]">
              <div className="bg-brand-ink text-brand-cream flex flex-col justify-center gap-1.5 px-6 py-5 sm:px-7">
                <span className="text-brand-cream/70 text-xs font-medium">
                  {t.about.established}
                </span>
                <span className="font-display text-4xl leading-none font-semibold tracking-[-0.02em]">
                  {siteConfig.foundedYear}
                </span>
              </div>
              <div className="flex flex-col justify-center gap-1.5 px-6 py-5 sm:px-7">
                <span className="text-muted inline-flex items-center gap-2 text-xs font-semibold">
                  <Sparkles className="text-brand-orange size-4" strokeWidth={2.2} aria-hidden="true" />
                  {t.about.mottoLabel}
                </span>
                <p className="font-display text-foreground text-xl leading-tight font-semibold tracking-[-0.01em] italic sm:text-2xl">
                  “{siteConfig.motto}”
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="bg-brand-lime text-brand-ink relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <Squiggle className="text-brand-ink/25 absolute top-5 right-5 h-6 w-24" />
              <span className="inline-flex items-center gap-2.5">
                <Compass className="size-5" strokeWidth={2.3} aria-hidden="true" />
                <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase">
                  {t.about.vision.label}
                </span>
              </span>
              <p className="font-display mt-4 text-lg leading-snug font-semibold tracking-[-0.01em] text-pretty sm:text-[1.4rem]">
                {t.about.vision.body}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="flex flex-wrap gap-2">
              {t.about.values.map((value) => (
                <li
                  key={value}
                  className="soft-frame bg-surface text-foreground rounded-full px-3.5 py-1.5 text-xs font-semibold"
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

          <ol className="grid gap-4 sm:grid-cols-2">
            {t.about.mission.items.map((item, index) => (
              <li
                key={item.title}
                className={cn(
                  "flex flex-col gap-2 rounded-3xl p-5 sm:min-h-52 sm:p-6",
                  toneBlock[toneAt(index)],
                )}
              >
                <span className="bg-brand-cream/70 font-display grid size-10 place-items-center rounded-xl text-base font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-auto pt-4 text-base leading-tight font-semibold sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-brand-ink/75 text-sm leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}
