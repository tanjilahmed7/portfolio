"use client";

import { useRef } from "react";
import { useGSAP, revealFrom, prefersReducedMotion } from "@/lib/gsap";
import Reveal from "@/components/ui/Reveal";

const stats = [
  { value: "10+", label: "Years of engineering" },
  { value: "15+", label: "Complex applications delivered" },
  { value: "3", label: "Marketplace-grade product channels" },
  { value: "1", label: "Employee of the Year award" },
];

const focusAreas = [
  "E-commerce platforms",
  "SaaS products",
  "CMS platforms",
  "AI tools",
  "WordPress products",
  "Clean architecture",
  "DevOps automation",
  "Team mentoring",
];

export default function About() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealFrom("[data-stat]", {
        y: 32,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "[data-stats]",
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="about" className="relative py-24 md:py-36">
      <div className="glow-orb top-20 -left-40 h-96 w-96 bg-glow/10" />
      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">About</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
              I design and scale systems that{" "}
              <span className="text-gradient">outlive their launch day</span>.
            </h2>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-muted md:text-lg">
              <p>
                For over ten years I&apos;ve been the engineer businesses call
                when a web application has to do more than exist — when it has
                to handle real traffic, real money, and real growth. My work
                spans e-commerce platforms, SaaS products, CMS systems, AI
                tools, and WordPress products shipped to marketplace standards.
              </p>
              <p>
                As Lead Software Engineer at Notionhive, I own architecture
                decisions end to end: designing high-performance backends in
                Laravel, building modern frontends with Next.js and React,
                automating delivery with CI/CD, and integrating AI where it
                creates genuine business value — not where it just demos well.
              </p>
              <p>
                Just as important as the systems are the people who build them.
                I mentor developers, run code reviews that teach rather than
                gatekeep, and translate business requirements into technical
                plans that teams can actually execute.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col justify-between gap-10">
            <div data-stats className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  data-stat
                  className="card-glow glass rounded-2xl p-6"
                >
                  <p className="font-display text-4xl font-semibold text-gradient">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            <Reveal delay={0.15}>
              <p className="eyebrow mb-4">Focus Areas</p>
              <ul className="flex flex-wrap gap-2.5">
                {focusAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs text-muted transition-colors duration-300 hover:border-accent/40 hover:text-ink"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
