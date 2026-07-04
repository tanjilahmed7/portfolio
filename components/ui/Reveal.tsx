"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, revealFrom, prefersReducedMotion } from "@/lib/gsap";

/** Semantic wrappers Reveal can render as — all share the same prop surface */
type RevealTag = "div" | "section" | "article" | "header" | "aside" | "ul";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  /** Seconds to delay after the trigger fires */
  delay?: number;
  /** Pixels to travel upward while fading in */
  y?: number;
  /** CSS selector — when set, children matching it stagger in instead */
  stagger?: string;
  staggerAmount?: number;
  id?: string;
};

/**
 * Generic ScrollTrigger fade-up. Wrap any block to reveal it as it enters
 * the viewport; pass `stagger` with a child selector for grouped reveals.
 */
export default function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  y = 44,
  stagger,
  staggerAmount = 0.12,
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const targets = stagger
        ? gsap.utils.toArray<HTMLElement>(stagger, el)
        : [el];
      if (!targets.length) return;

      revealFrom(targets, {
        y,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        delay,
        stagger: stagger ? staggerAmount : 0,
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  // All RevealTag elements accept the same props, so rendering via a single
  // element type keeps the polymorphism simple for both TS and React.
  const Tag = as as "div";

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
