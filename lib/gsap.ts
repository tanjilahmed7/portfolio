"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * `gsap.from` for elements that also have CSS hover transitions.
 *
 * CSS transitions restart on every GSAP tick, which can freeze the tween
 * entirely (Tailwind's default easing starts at zero slope), and leftover
 * inline transforms would permanently override `hover:` transforms. So:
 * transitions are disabled for the duration of the tween, and all GSAP
 * inline styles are cleared once it completes.
 */
export function revealFrom(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars
): gsap.core.Tween | undefined {
  const els = gsap.utils.toArray<HTMLElement>(targets);
  if (!els.length) return;
  gsap.set(els, { transition: "none" });
  return gsap.from(els, {
    ...vars,
    onComplete: () => {
      gsap.set(els, { clearProps: "opacity,visibility,transform,transition" });
    },
  });
}
