"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface TextSegment {
  text: string;
  /** Extra classes for this segment's words, e.g. the accent-coloured phrase. */
  className?: string;
}

interface Token {
  key: string;
  word: string;
  className?: string;
  /** Whether a space follows this token. */
  space: boolean;
}

/**
 * Split segments into animatable tokens.
 *
 * Word separators are inferred from the copy itself: a segment that contains
 * spaces belongs to a space-delimited language, so its words are separated and
 * a space is emitted after the segment. Chinese copy contains no spaces, so the
 * segment stays a single token and no stray spaces are injected between
 * segments.
 */
function tokenize(segments: readonly TextSegment[]): Token[] {
  return segments.flatMap((segment, segmentIndex) => {
    const spaceDelimited = segment.text.includes(" ");
    const words = spaceDelimited
      ? segment.text.split(" ").filter(Boolean)
      : [segment.text];
    const isLastSegment = segmentIndex === segments.length - 1;

    return words.map((word, wordIndex) => ({
      key: `${segmentIndex}-${wordIndex}`,
      word,
      className: segment.className,
      space:
        spaceDelimited && (wordIndex < words.length - 1 || !isLastSegment),
    }));
  });
}

/**
 * Word-by-word entrance for the hero heading: each word fades in out of a blur,
 * one after another. Takes segments rather than a single string so a heading can
 * mix plain and accented phrases while sharing one continuous stagger.
 *
 * This is a local Framer Motion effect — HeroUI has no equivalent, and it is
 * decoration only, so it never gates access to the copy (the text is in the
 * server-rendered HTML either way).
 */
export function TextReveal({
  segments,
  className,
  delay = 0,
  stagger = 0.09,
}: {
  segments: readonly TextSegment[];
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const tokens = tokenize(segments);

  return (
    <span className={cn("inline", className)}>
      {tokens.map((token, index) => (
        <Fragment key={token.key}>
          <motion.span
            className={cn("inline-block", token.className)}
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.55,
              delay: delay + index * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {token.word}
          </motion.span>
          {token.space ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
