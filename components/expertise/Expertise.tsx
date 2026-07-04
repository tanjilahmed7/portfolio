"use client";

import { useRef } from "react";
import { useGSAP, revealFrom, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillGroups, type SkillGroup } from "@/data/expertise";

const icons: Record<SkillGroup["icon"], React.ReactNode> = {
  server: (
    <path d="M4 5h16v6H4zM4 13h16v6H4zM7 8h.01M7 16h.01" strokeLinecap="round" />
  ),
  layout: (
    <path d="M4 4h16v16H4zM4 9h16M9 9v11" strokeLinecap="round" />
  ),
  puzzle: (
    <path d="M10 4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4h-4a2 2 0 1 0-4 0H6v-4a2 2 0 1 0 0-4V4z" />
  ),
  sparkles: (
    <path d="M12 3l1.8 4.8L18.5 9.5l-4.7 1.7L12 16l-1.8-4.8L5.5 9.5l4.7-1.7zM19 15l.9 2.4 2.1.8-2.1.8L19 21.5l-.9-2.5-2.1-.8 2.1-.8z" />
  ),
  rocket: (
    <path
      d="M12 15l-3-3c1-4 4-8 10-9-1 6-5 9-9 10l2 2zM6 15l-2 5 5-2M9 12l3 3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export default function Expertise() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealFrom("[data-skill-card]", {
        y: 56,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "[data-skill-grid]",
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="expertise" className="relative py-24 md:py-36">
      <div className="glow-orb top-1/3 -right-48 h-[28rem] w-[28rem] bg-accent/8" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Expertise"
          title="Full-stack depth, from database schema to deploy pipeline."
          description="Nine years across the stack means I don't hand problems between silos — I design the whole system and know where it will bend before it breaks."
        />

        <div data-skill-grid className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.id}
              data-skill-card
              className="card-glow glass group relative overflow-hidden rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div
                className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${group.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40`}
                aria-hidden
              />
              <div className="relative">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface/80 text-accent">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5"
                    aria-hidden
                  >
                    {icons[group.icon]}
                  </svg>
                </span>
                <h3 className="font-display text-xl font-semibold">
                  {group.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {group.blurb}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-line bg-void/60 px-2.5 py-1 font-mono text-[0.68rem] text-muted transition-colors duration-300 group-hover:border-accent/25"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
