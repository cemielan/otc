"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import { MessageCircle, Phone, Send } from "lucide-react";

import { InstagramGlyph } from "@/components/icons";
import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { toneAt, toneBlock } from "@/components/primitives/tones";
import { packages, siteConfig, subjects } from "@/content/site";
import { useI18n } from "@/i18n/provider";
import { cn, whatsappUrl } from "@/lib/utils";

const { contact } = siteConfig;

const labelClasses =
  "text-foreground text-[0.65rem] font-bold tracking-[0.14em] uppercase";

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
      form.message.trim() ? `${template.message}: ${form.message.trim()}` : null,
    ].filter((line): line is string => line !== null);

    window.open(
      whatsappUrl(contact.whatsappE164, lines.join("\n")),
      "_blank",
      "noopener,noreferrer",
    );
  }

  const subjectOptions = [
    ...subjects.map((subject) => t.subjects.items[subject.id].name),
    t.contact.form.subjectAll,
  ];

  const planOptions = [
    ...packages.map((plan) => t.packages.plans[plan.id].name),
    t.contact.form.planUndecided,
  ];

  return (
    <Section id="contact" tone="surface">
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
                index={0}
                icon={
                  <MessageCircle className="size-[1.1rem]" strokeWidth={2.2} />
                }
                label={t.contact.channels.whatsappLabel}
                value={contact.whatsappDisplay}
                caption={t.contact.channels.whatsappValue}
                href={whatsappUrl(contact.whatsappE164, template.intro)}
                external
              />
              <ChannelCard
                index={1}
                icon={<InstagramGlyph className="size-[1.1rem]" />}
                label={t.contact.channels.instagramLabel}
                value={`@${contact.instagramHandle}`}
                caption={t.contact.channels.instagramValue}
                href={contact.instagramUrl}
                external
              />
              <ChannelCard
                index={2}
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
          <Card className="ink-frame bg-surface rounded-4xl p-5 sm:p-8">
            {/*
              HeroUI's Form is React Aria's, so validation state, labelling and
              the association between label, field and error message are handled
              by the library rather than by hand-written aria-* attributes.
            */}
            <Form onSubmit={handleSubmit} validationBehavior="aria">
              <div className="grid w-full gap-5 sm:grid-cols-2">
                <TextField
                  className="flex flex-col gap-2"
                  value={form.name}
                  onChange={(value) => update("name", value)}
                  isInvalid={Boolean(error)}
                  isRequired
                >
                  <Label className={labelClasses}>
                    {t.contact.form.nameLabel}
                  </Label>
                  <Input
                    placeholder={t.contact.form.namePlaceholder}
                    autoComplete="name"
                  />
                  <FieldError className="text-brand-red text-sm font-medium">
                    {error}
                  </FieldError>
                </TextField>

                <TextField
                  className="flex flex-col gap-2"
                  value={form.grade}
                  onChange={(value) => update("grade", value)}
                >
                  <Label className={labelClasses}>
                    {t.contact.form.gradeLabel}
                  </Label>
                  <Input placeholder={t.contact.form.gradePlaceholder} />
                </TextField>

                <SelectField
                  label={t.contact.form.subjectLabel}
                  placeholder={t.contact.form.subjectPlaceholder}
                  options={subjectOptions}
                  value={form.subject}
                  onChange={(value) => update("subject", value)}
                />

                <SelectField
                  label={t.contact.form.planLabel}
                  placeholder={t.contact.form.planPlaceholder}
                  options={planOptions}
                  value={form.plan}
                  onChange={(value) => update("plan", value)}
                />

                <TextField
                  className="flex flex-col gap-2 sm:col-span-2"
                  value={form.message}
                  onChange={(value) => update("message", value)}
                >
                  <Label className={labelClasses}>
                    {t.contact.form.messageLabel}
                  </Label>
                  <TextArea
                    rows={4}
                    placeholder={t.contact.form.messagePlaceholder}
                    className="resize-y"
                  />
                </TextField>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                className="mt-6 min-h-12 rounded-full font-semibold"
              >
                <Send className="size-4" strokeWidth={2.2} />
                {t.contact.form.submit}
              </Button>

              <p className="text-muted mt-4 text-center text-xs leading-relaxed">
                {t.contact.form.privacy}
              </p>
            </Form>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}

/**
 * HeroUI's Select is a listbox popover rather than a native `<select>`, so the
 * options are keyed by their own label — the value that ends up in the WhatsApp
 * message is the translated option text.
 */
function SelectField({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select
      className="flex flex-col gap-2"
      selectedKey={value || null}
      onSelectionChange={(key) => onChange(key === null ? "" : String(key))}
    >
      <Label className={labelClasses}>{label}</Label>
      {/* Select.Trigger renders HeroUI's own chevron indicator by default. */}
      <Select.Trigger className="min-h-12 justify-between">
        <Select.Value>
          {/*
            React Aria reports an empty string (not null) for `selectedText`
            when nothing is chosen, so the placeholder is keyed off
            `isPlaceholder` instead of a nullish check.
          */}
          {({ isPlaceholder, selectedText }) =>
            isPlaceholder ? placeholder : selectedText
          }
        </Select.Value>
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBoxItem key={option} id={option} textValue={option}>
              {option}
            </ListBoxItem>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

function ChannelCard({
  icon,
  label,
  value,
  caption,
  href,
  external,
  index,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  caption: string;
  href: string;
  external?: boolean;
  index: number;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
        className="ink-frame bg-surface flex min-h-16 items-center gap-4 rounded-3xl p-4 no-underline transition-transform duration-200 hover:-translate-y-1"
      >
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-2xl",
            toneBlock[toneAt(index)],
          )}
        >
          {icon}
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-muted text-[0.65rem] font-bold tracking-[0.12em] uppercase">
            {label}
          </span>
          <span className="text-foreground text-sm font-bold">{value}</span>
          <span className="text-muted text-xs">{caption}</span>
        </span>
      </a>
    </li>
  );
}
