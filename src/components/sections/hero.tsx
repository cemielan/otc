"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

import { Brand } from "@/components/layout/brand";
import { ButtonLink } from "@/components/primitives/button-link";
import { MovingBorderLink } from "@/components/ui/moving-border";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { siteConfig } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { whatsappUrl } from "@/lib/utils";

/** Formula chips that float around the hero visual, one per core subject. */
const formulaChips = [
  { label: "∫ f(x) dx", position: "left-0 top-6", delay: "0s" },
  { label: "F = m · a", position: "right-2 top-0", delay: "1.1s" },
  { label: "H₂O", position: "-left-2 bottom-24", delay: "2.2s" },
  { label: "Aa", position: "right-0 bottom-10", delay: "1.7s" },
];

export function Hero() {
  const { t } = useI18n();
  const waLink = whatsappUrl(
    siteConfig.contact.whatsappE164,
    t.contact.form.template.intro,
  );

  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16">
      {/* Decorative background: blueprint grid, spotlight sweep, accent bloom. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-backdrop absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]" />
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="rgb(var(--accent))"
        />
        <div className="absolute -right-24 top-10 size-[26rem] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow"
            >
              <Sparkles className="size-3.5 text-accent" strokeWidth={2.4} />
              {t.hero.badge}
            </motion.span>

            <h1 className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-balance sm:text-5xl lg:text-[3.75rem]">
              <TextGenerateEffect
                segments={[
                  { text: t.hero.titleLead },
                  { text: t.hero.titleAccent, className: "text-accent" },
                  { text: t.hero.titleTail },
                ]}
                delay={0.15}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-xl text-base leading-relaxed text-foreground-muted text-pretty sm:text-lg"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <MovingBorderLink href={waLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="size-4" strokeWidth={2.2} />
                {t.hero.primaryCta}
              </MovingBorderLink>

              <ButtonLink href="#packages" variant="outline" size="lg">
                {t.hero.secondaryCta}
                <ArrowRight className="size-4" strokeWidth={2.2} />
              </ButtonLink>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-sm text-foreground-muted"
            >
              {t.hero.note}
            </motion.p>
          </div>

          <HeroVisual />
        </div>

        <HeroStats />
      </div>
    </section>
  );
}

function HeroVisual() {
  const { t } = useI18n();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      <div className="relative aspect-[4/3.4] w-full">
        <div className="grid-backdrop absolute inset-6 rounded-4xl border border-line bg-surface/60" />

        <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 rounded-3xl bg-panel p-6 shadow-lift sm:inset-x-14">
          <Brand tone="panel" />
          <p className="mt-5 font-display text-xl font-semibold leading-snug text-panel-foreground">
            {t.hero.floatingCard.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-panel-foreground/70">
            {t.hero.floatingCard.body}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {Object.values(t.subjects.items).map((subject) => (
              <span
                key={subject.name}
                className="rounded-full bg-panel-muted px-2.5 py-1 text-[0.7rem] font-medium text-panel-foreground/80"
              >
                {subject.name}
              </span>
            ))}
          </div>
        </div>

        {formulaChips.map((chip) => (
          <span
            key={chip.label}
            aria-hidden="true"
            style={{ animationDelay: chip.delay }}
            className={`absolute ${chip.position} animate-float rounded-2xl border border-line bg-surface px-3.5 py-2 font-display text-sm font-semibold text-foreground shadow-card`}
          >
            {chip.label}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function HeroStats() {
  const { t } = useI18n();

  return (
    <motion.dl
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.9 }}
      className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 rounded-4xl border border-line bg-surface/70 p-7 backdrop-blur-sm sm:mt-20 sm:grid-cols-4 sm:divide-x sm:divide-line sm:p-8"
    >
      {t.hero.stats.map((stat) => (
        <div key={stat.label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
          <dt className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {stat.value}
          </dt>
          <dd className="mt-1 text-sm text-foreground-muted">{stat.label}</dd>
        </div>
      ))}
    </motion.dl>
  );
}
