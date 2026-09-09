"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { MessageCircle, Phone, Send } from "lucide-react";

import { buttonClasses } from "@/components/primitives/button-link";
import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { InstagramGlyph } from "@/components/ui/brand-icons";
import { packages, siteConfig, subjects } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { whatsappUrl } from "@/lib/utils";

const { contact } = siteConfig;

const fieldClasses =
  "w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

const labelClasses =
  "text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground-muted";

interface FormState {
  name: string;
  grade: string;
  subject: string;
  plan: string;
  message: string;
}

const emptyForm: FormState = {
  name: "",
  grade: "",
  subject: "",
  plan: "",
  message: "",
};

export function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState<string | null>(null);

  const template = t.contact.form.template;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    if (error) setError(null);
  }

  /**
   * The form has no backend: it composes a WhatsApp message and hands the
   * visitor off to wa.me. Nothing is persisted or transmitted anywhere else,
   * which also means there is no personal data for this site to protect.
   */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError(t.contact.form.required);
      return;
    }

    const lines = [
      template.intro,
      "",
      `${template.name}: ${form.name.trim()}`,
      form.grade.trim() ? `${template.grade}: ${form.grade.trim()}` : null,
      form.subject ? `${template.subject}: ${form.subject}` : null,
      form.plan ? `${template.plan}: ${form.plan}` : null,
      form.message.trim()
        ? `${template.message}: ${form.message.trim()}`
        : null,
    ].filter((line): line is string => line !== null);

    window.open(
      whatsappUrl(contact.whatsappE164, lines.join("\n")),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            description={t.contact.description}
          />

          <Reveal delay={0.1}>
            <ul className="grid gap-3">
              <ChannelCard
                icon={<MessageCircle className="size-[1.1rem]" strokeWidth={2.2} />}
                label={t.contact.channels.whatsappLabel}
                value={contact.whatsappDisplay}
                caption={t.contact.channels.whatsappValue}
                href={whatsappUrl(contact.whatsappE164, template.intro)}
                external
              />
              <ChannelCard
                icon={<InstagramGlyph className="size-[1.1rem]" />}
                label={t.contact.channels.instagramLabel}
                value={`@${contact.instagramHandle}`}
                caption={t.contact.channels.instagramValue}
                href={contact.instagramUrl}
                external
              />
              <ChannelCard
                icon={<Phone className="size-[1.1rem]" strokeWidth={2.2} />}
                label={t.contact.channels.phoneLabel}
                value={contact.officePhoneDisplay}
                caption={t.contact.channels.phoneValue}
                href={contact.officePhoneHref}
              />
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-4xl border border-line bg-surface p-6 shadow-card sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2 sm:col-span-1">
                <span className={labelClasses}>{t.contact.form.nameLabel}</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder={t.contact.form.namePlaceholder}
                  autoComplete="name"
                  aria-invalid={Boolean(error)}
                  className={fieldClasses}
                />
              </label>

              <label className="flex flex-col gap-2 sm:col-span-1">
                <span className={labelClasses}>{t.contact.form.gradeLabel}</span>
                <input
                  type="text"
                  name="grade"
                  value={form.grade}
                  onChange={(event) => update("grade", event.target.value)}
                  placeholder={t.contact.form.gradePlaceholder}
                  className={fieldClasses}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className={labelClasses}>
                  {t.contact.form.subjectLabel}
                </span>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={(event) => update("subject", event.target.value)}
                  className={fieldClasses}
                >
                  <option value="">{t.contact.form.subjectPlaceholder}</option>
                  {subjects.map((subject) => (
                    <option
                      key={subject.id}
                      value={t.subjects.items[subject.id].name}
                    >
                      {t.subjects.items[subject.id].name}
                    </option>
                  ))}
                  <option value={t.contact.form.subjectAll}>
                    {t.contact.form.subjectAll}
                  </option>
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className={labelClasses}>{t.contact.form.planLabel}</span>
                <select
                  name="plan"
                  value={form.plan}
                  onChange={(event) => update("plan", event.target.value)}
                  className={fieldClasses}
                >
                  <option value="">{t.contact.form.planPlaceholder}</option>
                  {packages.map((plan) => (
                    <option
                      key={plan.id}
                      value={t.packages.plans[plan.id].name}
                    >
                      {t.packages.plans[plan.id].name}
                    </option>
                  ))}
                  <option value={t.contact.form.planUndecided}>
                    {t.contact.form.planUndecided}
                  </option>
                </select>
              </label>

              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className={labelClasses}>
                  {t.contact.form.messageLabel}
                </span>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                  placeholder={t.contact.form.messagePlaceholder}
                  className={`${fieldClasses} resize-y`}
                />
              </label>
            </div>

            {error ? (
              <p role="alert" className="mt-4 text-sm font-medium text-brand-red">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className={buttonClasses({
                variant: "primary",
                size: "lg",
                className: "mt-6 w-full",
              })}
            >
              <Send className="size-4" strokeWidth={2.2} />
              {t.contact.form.submit}
            </button>

            <p className="mt-4 text-center text-xs leading-relaxed text-foreground-muted">
              {t.contact.form.privacy}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function ChannelCard({
  icon,
  label,
  value,
  caption,
  href,
  external,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  caption: string;
  href: string;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
        className="group flex items-center gap-4 rounded-3xl border border-line bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-card"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
          {icon}
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            {label}
          </span>
          <span className="text-sm font-semibold text-foreground group-hover:text-accent">
            {value}
          </span>
          <span className="text-xs text-foreground-muted">{caption}</span>
        </span>
      </a>
    </li>
  );
}
