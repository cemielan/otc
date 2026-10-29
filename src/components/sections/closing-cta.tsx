"use client";

import { ArrowRight, BookOpen, GraduationCap, MessageCircle, Sparkle } from "lucide-react";

import { LoopRibbon } from "@/components/icons";
import { CtaLink } from "@/components/primitives/cta-link";
import { Reveal } from "@/components/primitives/reveal";
import { siteConfig } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { whatsappUrl } from "@/lib/utils";

export function ClosingCta() {
  const { t } = useI18n();
  const waLink = whatsappUrl(
    siteConfig.contact.whatsappE164,
    t.contact.form.template.intro,
  );

  return (
    <section className="py-14 sm:py-20">
      <div className="shell">
        <Reveal>
          {/* The lime closing band, with floating badge icons from tablet up. */}
          <div className="bg-brand-lime text-brand-ink relative isolate overflow-hidden rounded-4xl px-5 py-12 text-center sm:px-10 sm:py-16 lg:py-20">
            <LoopRibbon className="text-brand-ink/[0.06] absolute -bottom-10 -left-10 -z-10 h-64 w-auto" />
            <LoopRibbon className="text-brand-ink/[0.06] absolute -top-12 -right-12 -z-10 h-56 w-auto rotate-180" />

            <span
              aria-hidden="true"
              className="border-brand-orange bg-brand-cream text-brand-orange absolute top-1/2 left-8 hidden size-14 -translate-y-1/2 place-items-center rounded-full border-2 md:grid lg:left-14"
            >
              <GraduationCap className="size-6" strokeWidth={2} />
            </span>
            <span
              aria-hidden="true"
              className="bg-brand-lavender absolute top-8 right-10 hidden size-12 place-items-center rounded-full md:grid lg:right-16"
            >
              <BookOpen className="size-5" strokeWidth={2} />
            </span>
            <Sparkle
              aria-hidden="true"
              className="text-brand-ink/40 absolute right-1/4 bottom-8 hidden size-5 md:block"
              strokeWidth={2}
            />

            <h2 className="font-display mx-auto max-w-2xl text-[1.85rem] leading-[1.1] font-semibold tracking-[-0.02em] text-balance sm:text-4xl lg:text-[2.75rem]">
              {t.cta.title}
            </h2>
            <p className="text-brand-ink/75 mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-pretty sm:text-base">
              {t.cta.description}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CtaLink href={waLink} external size="lg" className="w-full sm:w-auto">
                <MessageCircle className="size-4" strokeWidth={2.2} />
                {t.cta.primary}
              </CtaLink>
              <CtaLink
                href="#packages"
                variant="outline"
                size="lg"
                className="bg-brand-cream border-brand-ink/15 w-full sm:w-auto"
              >
                {t.cta.secondary}
                <ArrowRight className="size-4" strokeWidth={2.2} />
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
