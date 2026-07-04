"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Route transition: templates remount on navigation, so each page enters
 * with a soft fade-and-rise. Kept subtle to avoid fighting ScrollTrigger.
 */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          // A lingering transform would turn this wrapper into a containing
          // block for position: fixed, breaking ScrollTrigger pinning below.
          clearProps: "all",
        }
      );
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}
