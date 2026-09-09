"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { whatsappUrl } from "@/lib/utils";

/**
 * Floating WhatsApp shortcut. Hidden until the visitor has scrolled past the
 * hero so it never competes with the primary hero call-to-action.
 */
export function WhatsappFab() {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setVisible(value > 640);
  });

  const waLink = whatsappUrl(
    siteConfig.contact.whatsappE164,
    t.contact.form.template.intro,
  );

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.nav.cta}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-lift transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
        >
          <MessageCircle className="size-6" strokeWidth={2.2} />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
