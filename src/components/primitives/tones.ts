/**
 * The four-colour pastel palette this design is built from (see globals.css).
 * Sections index into it so a grid of cards cycles through the palette instead
 * of hard-coding a colour per card.
 */
export const tones = ["apricot", "peach", "lavender", "lime"] as const;

export type Tone = (typeof tones)[number];

/** Block fill plus its on-colour text. Every pastel carries ink text. */
export const toneBlock: Record<Tone, string> = {
  apricot: "bg-brand-apricot text-brand-ink",
  peach: "bg-brand-peach text-brand-ink",
  lavender: "bg-brand-lavender text-brand-ink",
  lime: "bg-brand-lime text-brand-ink",
};

/** Cycle the palette for lists of any length. */
export function toneAt(index: number): Tone {
  return tones[index % tones.length];
}
