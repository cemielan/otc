"use client";

import { ArrowRight, MessageCircle } from "lucide-react";

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
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="grid-backdrop pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />

      <div className="shell relative">
        <Reveal>
          {/* Oversized closing headline, with the palette as punctuation. */}
          <h2 className="font-display text-foreground max-w-5xl text-[2.4rem] leading-[0.98] font-bold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.5rem]">
            {t.cta.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-6 sm:mt-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="flex flex-col gap-5">
              <span aria-hidden="true" className="flex gap-2">
                <span className="bg-brand-coral size-3.5 rounded-full" />
                <span className="bg-brand-pink size-3.5 rounded-full" />
                <span className="bg-brand-purple size-3.5 rounded-full" />
                <span className="bg-brand-yellow size-3.5 rounded-full" />
              </span>
              <p className="text-muted max-w-xl text-[0.95rem] leading-relaxed text-pretty sm:text-lg">
                {t.cta.description}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0">
              <CtaLink
                href={waLink}
                external
                size="lg"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="size-4" strokeWidth={2.2} />
                {t.cta.primary}
              </CtaLink>
              <CtaLink
                href="#packages"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
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
