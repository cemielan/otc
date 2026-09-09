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
    <section className="pb-16 sm:pb-24">
      <div className="shell">
        <Reveal>
          <div className="border-border bg-panel relative overflow-hidden rounded-4xl border px-5 py-12 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="grid-backdrop pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
            />
            <div
              aria-hidden="true"
              className="bg-accent/20 pointer-events-none absolute top-0 left-1/2 size-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:size-[24rem]"
            />

            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 sm:gap-5">
              <h2 className="font-display text-panel-foreground text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
                {t.cta.title}
              </h2>
              <p className="text-panel-foreground/70 text-[0.95rem] leading-relaxed text-pretty sm:text-base">
                {t.cta.description}
              </p>

              <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <CtaLink
                  href={waLink}
                  external
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle className="size-4" strokeWidth={2.2} />
                  {t.cta.primary}
                </CtaLink>
                <CtaLink
                  href="#packages"
                  variant="tertiary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {t.cta.secondary}
                  <ArrowRight className="size-4" strokeWidth={2.2} />
                </CtaLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
