"use client";

import { ArrowRight, MessageCircle } from "lucide-react";

import { ButtonLink } from "@/components/primitives/button-link";
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
    <section className="pb-20 sm:pb-24">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl border border-line bg-panel px-7 py-14 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="grid-backdrop pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
            />

            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-panel-foreground text-balance sm:text-4xl">
                {t.cta.title}
              </h2>
              <p className="text-base leading-relaxed text-panel-foreground/70 text-pretty">
                {t.cta.description}
              </p>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={waLink} external variant="primary" size="lg">
                  <MessageCircle className="size-4" strokeWidth={2.2} />
                  {t.cta.primary}
                </ButtonLink>
                <ButtonLink href="#packages" variant="panel" size="lg">
                  {t.cta.secondary}
                  <ArrowRight className="size-4" strokeWidth={2.2} />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
