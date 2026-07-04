"use client";

import { useRef } from "react";
import { gsap, useGSAP, revealFrom, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experience";

export default function ExperienceTimeline() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Progress line fills as the timeline scrolls through the viewport
      gsap.fromTo(
        "[data-timeline-progress]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 70%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-timeline-item]").forEach((item) => {
        revealFrom(item, {
          y: 48,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 82%", once: true },
        });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="experience" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Work Experience"
          title="A decade of shipping, leading, and leveling up teams."
        />

        <div data-timeline className="relative">
          {/* Track + animated progress line */}
          <div
            className="absolute top-0 bottom-0 left-[7px] w-px bg-line md:left-1/2"
            aria-hidden
          >
            <div
              data-timeline-progress
              className="h-full w-full origin-top bg-gradient-to-b from-accent to-glow"
            />
          </div>

          <ol className="space-y-14 md:space-y-20">
            {experiences.map((exp, i) => (
              <li
                key={`${exp.role}-${exp.start}`}
                data-timeline-item
                className={`relative pl-10 md:w-1/2 md:pl-0 ${
                  i % 2 === 0
                    ? "md:pr-14 md:text-right"
                    : "md:ml-auto md:pl-14"
                }`}
              >
                {/* Node dot — sits on the center line by pinning to the
                    column edge that meets it, then nudging back by half its
                    own width. On mobile the line runs down the left gutter. */}
                <span
                  className={`absolute top-1.5 left-0 h-[15px] w-[15px] rounded-full border-2 md:-translate-x-1/2 ${
                    i % 2 === 0 ? "md:left-full" : "md:left-0"
                  } ${
                    exp.current
                      ? "border-accent bg-accent/30 shadow-[0_0_16px_rgba(103,232,249,0.6)]"
                      : "border-faint bg-void"
                  }`}
                  aria-hidden
                />

                <p className="font-mono text-xs tracking-wider text-accent">
                  {exp.period}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">
                  {exp.role}
                </h3>
                <p className="mt-1 text-sm font-medium text-muted">
                  {exp.company}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {exp.summary}
                </p>

                <ul
                  className={`mt-4 space-y-1.5 text-sm text-muted ${
                    i % 2 === 0 ? "md:ml-auto" : ""
                  }`}
                >
                  {exp.responsibilities.map((r) => (
                    <li
                      key={r}
                      className={`text-sm ${
                        i % 2 === 0 ? "md:text-right" : ""
                      }`}
                    >
                      {r}
                    </li>
                  ))}
                </ul>

                <ul
                  className={`mt-5 flex flex-wrap gap-2 ${
                    i % 2 === 0 ? "md:justify-end" : ""
                  }`}
                >
                  {exp.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-line px-2.5 py-1 font-mono text-[0.68rem] text-faint"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
