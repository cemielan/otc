import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names while letting later Tailwind utilities win. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number of Rupiah the Indonesian way, e.g. 500000 -> "Rp 500.000". */
export function formatRupiah(amount: number) {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

/**
 * Build a wa.me deep link. The number must be in international format without
 * a leading "+" or any separators (e.g. 6285147283429).
 */
export function whatsappUrl(phoneE164: string, message?: string) {
  const base = `https://wa.me/${phoneE164}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
