"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { CalendarCheck, MessageCircle, MessagesSquare } from "lucide-react";

import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import type { Tone } from "@/components/primitives/tones";
import { toneBlock } from "@/components/primitives/tones";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

/** Lime, lavender, peach — the three-step run of the design. */
const stepStyles: readonly { tone: Tone; icon: LucideIcon }[] = [
  { tone: "lime", icon: MessageCircle },
  { tone: "lavender", icon: MessagesSquare },
  { tone: "peach", icon: CalendarCheck },
];

export function Steps() {
  const { t } = useI18n();

  return (
    <Section>
      <SectionHeading
        eyebrow={t.steps.eyebrow}
        title={t.steps.title}
        align="split"
      />

      <ol className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-3 md:gap-5">
        {t.steps.items.map((step, index) => {
          const style = stepStyles[index % stepStyles.length];
          const Icon = style.icon;

          return (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "flex h-full flex-col gap-3 rounded-3xl p-5 sm:p-6",
                toneBlock[style.tone],
              )}
            >
              <h3 className="font-display text-lg leading-tight font-semibold tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-brand-ink/75 text-sm leading-relaxed">{step.body}</p>

              {/* The inset panel stands in for the photo of the design. */}
              <div className="bg-brand-cream/70 relative mt-auto flex h-32 items-end justify-between overflow-hidden rounded-xl p-4">
                <span
                  aria-hidden="true"
                  className="font-display text-brand-ink/10 absolute -top-4 -right-1 text-[7rem] leading-none font-black"
                >
                  {index + 1}
                </span>
                <span className="bg-brand-ink text-brand-cream grid size-12 place-items-center rounded-2xl">
                  <Icon className="size-6" strokeWidth={2.1} aria-hidden="true" />
                </span>
                <span aria-hidden="true" className="bg-surface relative rounded-full px-3 py-1 text-xs font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
