"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Atom, FlaskConical, Languages, MessageCircle, Sigma } from "lucide-react";

import { LogoMark, Wordmark } from "@/components/layout/brand";
import { LoopRibbon } from "@/components/icons";
import { CtaLink } from "@/components/primitives/cta-link";
import { TextReveal } from "@/components/effects/text-reveal";
import { toneBlock, type Tone } from "@/components/primitives/tones";
import { siteConfig, subjects, type SubjectId } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { cn, whatsappUrl } from "@/lib/utils";

/** One pastel disc per subject, stacked like the avatar row of the design. */
const subjectDiscs: Record<SubjectId, { icon: LucideIcon; tone: Tone }> = {
  mathematics: { icon: Sigma, tone: "lime" },
  physics: { icon: Atom, tone: "lavender" },
  chemistry: { icon: FlaskConical, tone: "peach" },
  english: { icon: Languages, tone: "apricot" },
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const { t } = useI18n();
  const waLink = whatsappUrl(
    siteConfig.contact.whatsappE164,
    t.contact.form.template.intro,
  );
  const [subjectStat, curriculaStat, formatsStat, sizeStat] = t.hero.stats;

  return (
    <section
      id="top"
      className="band-lines relative overflow-hidden rounded-b-[2rem] pt-6 pb-12 sm:rounded-b-[2.5rem] sm:pt-10 sm:pb-16 lg:pb-20"
    >
      <div className="shell flex flex-col items-center gap-5 text-center sm:gap-6">
        <motion.span
          {...fadeUp(0)}
          className="soft-frame bg-surface inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2"
        >
          <span aria-hidden="true" className="flex -space-x-1.5">
            <span className="bg-brand-lime ring-surface size-4 rounded-full ring-2" />
            <span className="bg-brand-lavender ring-surface size-4 rounded-full ring-2" />
            <span className="bg-brand-orange ring-surface size-4 rounded-full ring-2" />
          </span>
          <span className="text-foreground text-xs font-semibold">
            {t.hero.badge}
          </span>
        </motion.span>

        <h1 className="font-display max-w-4xl text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.6rem]">
          <TextReveal
            segments={[
              { text: t.hero.titleLead },
              {
                text: t.hero.titleAccent,
                /* A lime marker stroke under the accent phrase, word by word. */
                className:
                  "bg-[linear-gradient(transparent_58%,var(--color-brand-lime)_58%)] px-0.5",
              },
              { text: t.hero.titleTail },
            ]}
            delay={0.15}
          />
        </h1>

        <motion.p
          {...fadeUp(0.5)}
          className="text-muted max-w-2xl text-[0.95rem] leading-relaxed text-pretty sm:text-base"
        >
          {t.hero.description}
        </motion.p>
      </div>

      {/*
        Three columns on desktop (story · visual · action). Tablets put the
        visual on its own full-width row; phones stack everything with the
        visual first so the page opens on colour.
      */}
      <div className="shell mt-10 grid gap-8 sm:mt-14 md:grid-cols-2 md:gap-10 lg:grid-cols-[1fr_1.35fr_1fr] lg:items-center">
        <motion.div
          {...fadeUp(0.6)}
          className="order-2 flex flex-col gap-5 lg:order-1"
        >
          <div>
            <p className="font-display text-foreground text-2xl leading-tight font-semibold tracking-[-0.01em] text-balance">
              {t.hero.floatingCard.title}
            </p>
            <p className="text-muted mt-2 max-w-xs text-sm leading-relaxed">
              {t.hero.floatingCard.body}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span aria-hidden="true" className="flex -space-x-2.5">
              {subjects.map((subject) => {
                const disc = subjectDiscs[subject.id];
                const Icon = disc.icon;
                return (
                  <span
                    key={subject.id}
                    className={cn(
                      "ring-brand-band grid size-11 place-items-center rounded-full ring-[3px]",
                      toneBlock[disc.tone],
                    )}
                  >
                    <Icon className="size-5" strokeWidth={2.2} />
                  </span>
                );
              })}
            </span>
            <p className="font-display text-foreground text-lg font-semibold">
              {subjectStat.value} {subjectStat.label}
            </p>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.45)}
          className="order-1 md:col-span-2 lg:order-2 lg:col-span-1"
        >
          <HeroVisual
            sinceLabel={t.hero.established}
            sizeLabel={`${sizeStat.value} ${sizeStat.label}`}
          />
        </motion.div>

        <motion.div
          {...fadeUp(0.7)}
          className="order-3 flex flex-col gap-5"
        >
          <span aria-hidden="true" className="flex items-center gap-1.5">
            <span className="bg-brand-lavender h-6 w-11 rounded-full" />
            <span className="bg-brand-lime h-6 w-11 rounded-full" />
            <span className="bg-brand-lavender h-6 w-3 rounded-full" />
            <span className="bg-brand-lime h-6 w-11 rounded-full" />
          </span>

          <dl className="flex gap-6">
            {[curriculaStat, formatsStat].map((stat) => (
              /* Label first in the markup, value shown on top. */
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="text-muted text-xs">{stat.label}</dt>
                <dd className="font-display text-foreground text-2xl leading-none font-semibold">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="text-muted max-w-xs text-sm leading-relaxed">
            {t.hero.note}
          </p>

          {/* Side by side only where the column is wide enough for both pills. */}
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col xl:flex-row">
            <CtaLink
              href={waLink}
              external
              size="lg"
              className="w-full sm:w-auto md:w-full xl:w-auto"
            >
              <MessageCircle className="size-4" strokeWidth={2.2} />
              {t.hero.primaryCta}
            </CtaLink>
            <CtaLink
              href="#packages"
              variant="outline"
              size="lg"
              className="bg-surface w-full sm:w-auto md:w-full xl:w-auto"
            >
              {t.hero.secondaryCta}
              <ArrowRight className="size-4" strokeWidth={2.2} />
            </CtaLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * The centre-piece card: the wordmark and motto on lavender, with the orange
 * loop ribbon and two label chips laid over it, in place of a photo.
 */
function HeroVisual({
  sinceLabel,
  sizeLabel,
}: {
  sinceLabel: string;
  sizeLabel: string;
}) {
  return (
    <div className="bg-brand-lavender text-brand-ink relative isolate mx-auto flex aspect-[4/3] w-full max-w-xl flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl p-6 sm:aspect-[16/10] lg:aspect-[4/3.4]">
      <span
        aria-hidden="true"
        className="bg-brand-cream/45 absolute -top-16 -right-14 -z-10 size-56 rounded-full"
      />
      <span
        aria-hidden="true"
        className="bg-brand-lime/60 absolute -bottom-20 -left-12 -z-10 size-52 rounded-full"
      />
      <LoopRibbon className="text-brand-orange absolute -bottom-3 -left-4 -z-10 h-[78%] w-auto opacity-90" />

      <span className="bg-brand-lime absolute top-4 left-4 rounded-full px-3 py-1.5 text-xs font-semibold sm:top-5 sm:left-5">
        {sinceLabel}
      </span>

      <LogoMark className="size-12 sm:size-14" />
      <Wordmark className="text-3xl sm:text-4xl" />
      <p className="font-display text-center text-xl leading-tight font-semibold tracking-[-0.01em] italic sm:text-2xl">
        “{siteConfig.motto}”
      </p>

      <span className="bg-surface absolute right-4 bottom-4 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm sm:right-5 sm:bottom-5">
        {sizeLabel}
      </span>
    </div>
  );
}
