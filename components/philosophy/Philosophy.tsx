"use client";

import { useRef } from "react";
import {
  gsap,
  useGSAP,
  SplitText,
  revealFrom,
  prefersReducedMotion,
} from "@/lib/gsap";

const values = [
  {
    title: "Clean code",
    detail: "Readable by the next engineer, not just the author.",
  },
  {
    title: "Scalable architecture",
    detail: "Boundaries and patterns that welcome the 200th feature.",
  },
  {
    title: "Security-first mindset",
    detail: "Threat modeling before launch, not after the incident.",
  },
  {
    title: "Performance optimization",
    detail: "Measured on real devices and real networks.",
  },
  {
    title: "Practical AI adoption",
    detail: "AI where it creates value — grounded, scoped, and shipped.",
  },
  {
    title: "Team mentorship",
    detail: "Code reviews that teach; engineers who outgrow their roles.",
  },
  {
    title: "Business-focused engineering",
    detail: "Technical decisions traced back to business outcomes.",
  },
];

export default function Philosophy() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Manifesto lines brighten as the reader scrolls through them
      const split = SplitText.create("[data-manifesto]", { type: "lines" });
      gsap.from(split.lines, {
        opacity: 0.15,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: "[data-manifesto]",
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.8,
        },
      });

      revealFrom("[data-value-card]", {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "[data-values-grid]",
          start: "top 85%",
          once: true,
        },
      });

      return () => split.revert();
    },
    { scope }
  );

  return (
    <section ref={scope} id="philosophy" className="relative py-24 md:py-36">
      <div className="glow-orb top-1/4 right-0 h-[24rem] w-[24rem] bg-accent/8" />
      <div className="container-x relative">
        <p className="eyebrow mb-8">Technical Philosophy</p>

        <blockquote
          data-manifesto
          className="max-w-4xl font-display text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl md:text-[2.6rem] md:leading-[1.25]"
        >
          Clean architecture matters because software should be easy to
          maintain, scale, and hand over. Good engineering is not just making
          something work — it is making it{" "}
          <span className="text-gradient">
            reliable, readable, secure, and ready for business growth
          </span>
          .
        </blockquote>

        <div
          data-values-grid
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {values.map((value, i) => (
            <div
              key={value.title}
              data-value-card
              className="card-glow glass rounded-xl p-5"
            >
              <p className="font-mono text-[0.65rem] tracking-wider text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-base font-semibold">
                {value.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                {value.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
