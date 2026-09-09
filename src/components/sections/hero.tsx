"use client";

import { Card, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

import { Brand } from "@/components/layout/brand";
import { CtaLink } from "@/components/primitives/cta-link";
import { Spotlight } from "@/components/effects/spotlight";
import { TextReveal } from "@/components/effects/text-reveal";
import { siteConfig } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { whatsappUrl } from "@/lib/utils";

/** Formula chips that float around the hero visual, one per core subject. */
const formulaChips = [
  { label: "∫ f(x) dx", position: "left-0 top-4 sm:top-6", delay: "0s" },
  { label: "F = m · a", position: "right-1 top-0", delay: "1.1s" },
  { label: "H₂O", position: "left-0 bottom-16 sm:bottom-24", delay: "2.2s" },
  { label: "Aa", position: "right-0 bottom-8 sm:bottom-10", delay: "1.7s" },
];

export function Hero() {
  const { t } = useI18n();
  const waLink = whatsappUrl(
    siteConfig.contact.whatsappE164,
    t.contact.form.template.intro,
  );

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20"
    >
      {/* Decorative background: blueprint grid, spotlight sweep, accent bloom. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-backdrop absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_72%)]" />
        <Spotlight
          className="top-[-10rem] left-0 md:top-[-5rem] md:left-60"
          fill="var(--color-accent)"
        />
        <div className="bg-accent/10 absolute top-10 -right-24 size-[20rem] rounded-full blur-3xl sm:size-[26rem]" />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col items-start gap-5 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Chip color="accent" variant="soft" size="sm" className="gap-1.5">
                <Sparkles className="text-accent size-3.5" strokeWidth={2.4} />
                <Chip.Label className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase sm:text-xs">
                  {t.hero.badge}
                </Chip.Label>
              </Chip>
            </motion.div>

            <h1 className="font-display text-[2rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]">
              <TextReveal
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
              className="text-muted max-w-xl text-[0.95rem] leading-relaxed text-pretty sm:text-lg"
            >
              {t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <CtaLink
                href={waLink}
                external
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
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
      className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
    >
      <div className="relative aspect-[4/3.6] w-full sm:aspect-[4/3.4]">
        <div className="grid-backdrop border-border bg-surface/60 absolute inset-4 rounded-4xl border sm:inset-6" />

        <Card
          variant="transparent"
          className="bg-panel shadow-lift absolute inset-x-6 top-1/2 -translate-y-1/2 rounded-3xl p-5 sm:inset-x-14 sm:p-6"
        >
          <Brand tone="panel" />
          <p className="font-display text-panel-foreground mt-4 text-lg leading-snug font-semibold sm:mt-5 sm:text-xl">
            {t.hero.floatingCard.title}
          </p>
          <p className="text-panel-foreground/70 mt-2 text-sm leading-relaxed">
            {t.hero.floatingCard.body}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5">
            {Object.values(t.subjects.items).map((subject) => (
              <span
                key={subject.name}
                className="bg-panel-muted text-panel-foreground/80 rounded-full px-2.5 py-1 text-[0.7rem] font-medium"
              >
                {subject.name}
              </span>
            ))}
          </div>
        </Card>

        {formulaChips.map((chip) => (
          <span
            key={chip.label}
            aria-hidden="true"
            style={{ animationDelay: chip.delay }}
            className={`absolute ${chip.position} animate-float border-border bg-surface text-foreground shadow-card font-display rounded-2xl px-3 py-1.5 text-xs font-semibold sm:px-3.5 sm:py-2 sm:text-sm`}
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
      className="border-border bg-surface/70 mt-10 grid grid-cols-2 gap-x-4 gap-y-6 rounded-4xl border p-5 backdrop-blur-sm sm:mt-16 sm:grid-cols-4 sm:divide-border sm:divide-x sm:gap-x-6 sm:p-8"
    >
      {t.hero.stats.map((stat) => (
        <div key={stat.label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
          <dt className="font-display text-foreground text-2xl font-semibold tracking-tight sm:text-4xl">
            {stat.value}
          </dt>
          <dd className="text-muted mt-1 text-[0.8rem] sm:text-sm">
            {stat.label}
          </dd>
        </div>
      ))}
    </motion.dl>
  );
}
