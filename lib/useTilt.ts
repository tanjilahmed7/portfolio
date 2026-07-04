"use client";

import { useRef, useCallback } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Pointer-tracking 3D tilt for cards. Attach the returned handlers and ref
 * to the element that should tilt. No-ops for touch/reduced-motion users.
 */
export function useTilt<T extends HTMLElement>(maxTilt = 7) {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: px * maxTilt,
        rotateX: -py * maxTilt,
        transformPerspective: 900,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    [maxTilt]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.6)",
    });
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
