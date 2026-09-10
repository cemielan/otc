"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Atom, FlaskConical, Languages, MessageCircle, Sigma } from "lucide-react";

import { Wordmark } from "@/components/layout/brand";
import { Marquee } from "@/components/effects/marquee";
import { CtaLink } from "@/components/primitives/cta-link";
import { TextReveal } from "@/components/effects/text-reveal";
import { toneBlock } from "@/components/primitives/tones";
import { siteConfig, subjects, type SubjectId } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { cn, whatsappUrl } from "@/lib/utils";

/** One coloured tile per subject, in the order the palette runs. */
const subjectTiles: Record<SubjectId, { icon: LucideIcon; tone: keyof typeof toneBlock }> = {
  mathematics: { icon: Sigma, tone: "yellow" },
  physics: { icon: Atom, tone: "purple" },
  chemistry: { icon: FlaskConical, tone: "pink" },
  english: { icon: Languages, tone: "coral" },
};

export function Hero() {
  const { t } = useI18n();
  const waLink = whatsappUrl(
    siteConfig.contact.whatsappE164,
    t.contact.form.template.intro,
  );

  return (
    <section id="top" className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16">
      <div
        aria-hidden="true"
        className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_75%)]"
      />

      <div className="shell relative flex flex-col items-center gap-5 text-center sm:gap-6">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="ink-frame bg-surface inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2"
        >
          <span aria-hidden="true" className="flex -space-x-1.5">
            <span className="ring-surface size-4 rounded-full bg-brand-coral ring-2" />
            <span className="ring-surface size-4 rounded-full bg-brand-purple ring-2" />
            <span className="ring-surface size-4 rounded-full bg-brand-yellow ring-2" />
          </span>
          <span className="text-foreground text-[0.7rem] font-bold tracking-[0.1em] uppercase sm:text-xs">
            {t.hero.badge}
          </span>
        </motion.span>

        <h1 className="font-display max-w-4xl text-[2.1rem] leading-[1.05] font-bold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.75rem]">
          <TextReveal
            segments={[
              { text: t.hero.titleLead },
              {
                text: t.hero.titleAccent,
                /* Highlighter marks, word by word — the marker pass of the brand. */
                className: "bg-brand-yellow text-brand-ink rounded-lg px-1.5",
              },
              { text: t.hero.titleTail },
            ]}
            delay={0.15}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-muted max-w-2xl text-[0.95rem] leading-relaxed text-pretty sm:text-lg"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <CtaLink href={waLink} external size="lg" className="w-full sm:w-auto">
            <MessageCircle className="size-4" strokeWidth={2.2} />
            {t.hero.primaryCta}
          </CtaLink>

          <CtaLink
            href="#packages"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            {t.hero.secondaryCta}
            <ArrowRight className="size-4" strokeWidth={2.2} />
          </CtaLink>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-muted text-sm"
        >
          {t.hero.note}
        </motion.p>
      </div>

      <HeroMosaic />
      <StatsRibbon />
    </section>
  );
}

/**
 * The full-bleed colour mosaic. Deliberately edge to edge and square-gridded:
 * two columns on phones, four from the small breakpoint up, with the copy tile
 * spanning the full width of the first row.
 */
function HeroMosaic() {
  const { t } = useI18n();

  return (
    <div className="relative mt-10 grid grid-cols-2 sm:mt-14 sm:grid-cols-4">
      <div className="col-span-2 flex flex-col justify-center gap-3 bg-brand-coral px-6 py-10 text-brand-cream sm:px-8">
        <p className="font-display text-[1.75rem] leading-[1.05] font-bold tracking-[-0.02em] text-balance sm:text-4xl lg:text-5xl">
          {t.hero.floatingCard.title}
        </p>
        <p className="max-w-sm text-sm leading-relaxed sm:text-base">
          {t.hero.floatingCard.body}
        </p>
      </div>

      {subjects.map((subject) => {
        const tile = subjectTiles[subject.id];
        const Icon = tile.icon;

        return (
          <div
            key={subject.id}
            className={cn(
              "flex aspect-square flex-col justify-between p-4 sm:p-5",
              toneBlock[tile.tone],
            )}
          >
            <Icon className="size-7 sm:size-9" strokeWidth={2.2} aria-hidden="true" />
            <span className="font-display text-sm leading-tight font-bold sm:text-lg">
              {t.subjects.items[subject.id].name}
            </span>
          </div>
        );
      })}

      <div className="bg-brand-ink text-brand-cream col-span-2 flex aspect-[2/1] flex-col items-center justify-center gap-2 p-4 sm:aspect-auto">
        <Wordmark className="text-2xl sm:text-3xl" />
        <span className="text-[0.6rem] font-bold tracking-[0.22em] uppercase opacity-60">
          {siteConfig.shortName}
        </span>
      </div>
    </div>
  );
}

/**
 * The tilted dark ribbon carrying the headline numbers. It is intentionally
 * wider than the viewport so the rotation leaves no bare corners; the parent
 * clips the overflow.
 */
function StatsRibbon() {
  const { t } = useI18n();

  return (
    <div className="relative mt-12 overflow-hidden py-5 sm:mt-16 sm:py-7">
      <div className="bg-panel text-panel-foreground -mx-[6%] w-[112%] -rotate-2 py-3.5 sm:py-5">
        <Marquee speed="normal" className="[mask-image:none]">
          {t.hero.stats.map((stat) => (
            <span key={stat.label} className="flex items-center gap-4 px-3 sm:gap-6 sm:px-5">
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full bg-brand-yellow sm:size-2.5"
              />
              <span className="font-display flex items-baseline gap-2 text-lg font-bold whitespace-nowrap sm:gap-3 sm:text-2xl">
                {stat.value}
                <span className="text-panel-foreground/70 text-xs font-semibold tracking-[0.08em] uppercase sm:text-sm">
                  {stat.label}
                </span>
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
