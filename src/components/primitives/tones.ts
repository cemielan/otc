/**
 * The four-colour block palette this design is built from (see globals.css).
 * Sections index into it so a grid of cards cycles through the palette instead
 * of hard-coding a colour per card.
 */
export const tones = ["coral", "pink", "purple", "yellow"] as const;

export type Tone = (typeof tones)[number];

/**
 * Block fill plus its on-colour text. Both halves are theme-independent: a
 * yellow block always needs ink text, a purple block always needs cream, in
 * light and dark mode alike.
 */
export const toneBlock: Record<Tone, string> = {
  coral: "bg-brand-coral text-brand-cream",
  pink: "bg-brand-pink text-brand-cream",
  purple: "bg-brand-purple text-brand-cream",
  yellow: "bg-brand-yellow text-brand-ink",
};

/** Just the fill, for decorative shapes that carry no text. */
export const toneFill: Record<Tone, string> = {
  coral: "bg-brand-coral",
  pink: "bg-brand-pink",
  purple: "bg-brand-purple",
  yellow: "bg-brand-yellow",
};

/** Cycle the palette for lists of any length. */
export function toneAt(index: number): Tone {
  return tones[index % tones.length];
}
