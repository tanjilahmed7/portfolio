"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/data/site";

// Heavy WebGL scene loads client-side only, after the critical content
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const split = SplitText.create("[data-hero-title]", {
        type: "lines",
        linesClass: "split-line-inner",
        mask: "lines",
      });

      // The CTA links have CSS hover transitions that would fight GSAP's
      // per-frame style writes — suspend them for the intro, restore after.
      const ctas = gsap.utils.toArray<HTMLElement>("[data-hero-cta] > *");
      gsap.set(ctas, { transition: "none" });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            gsap.set(ctas, {
              clearProps: "opacity,visibility,transform,transition",
            });
          },
        })
        .from("[data-hero-eyebrow]", { y: 24, autoAlpha: 0, duration: 0.8 }, 0.15)
        .from(
          split.lines,
          { yPercent: 115, duration: 1.1, stagger: 0.09 },
          0.3
        )
        .from("[data-hero-sub]", { y: 28, autoAlpha: 0, duration: 0.9 }, 0.85)
        .from(
          "[data-hero-cta] > *",
          { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.1 },
          1.05
        )
        .from(
          "[data-hero-trust] li",
          { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.08 },
          1.25
        )
        .from("[data-hero-scroll]", { autoAlpha: 0, duration: 0.8 }, 1.6);

      return () => split.revert();
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16"
    >
      <HeroScene />

      <div className="container-x relative z-10">
        <p data-hero-eyebrow className="eyebrow mb-6">
          {site.role} · {site.location}
        </p>

        <h1
          data-hero-title
          className="max-w-4xl font-display text-4xl leading-[1.06] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Building <span className="text-gradient">scalable web systems</span>,
          AI products, and digital platforms that move businesses forward.
        </h1>

        <p
          data-hero-sub
          className="mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {site.subheadline}
        </p>

        <div data-hero-cta className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/projects"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accent-deep to-glow px-8 py-3.5 text-sm font-semibold text-void transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
          <a
            href={site.resumeUrl}
            download="Tanjil-Ahmed-Resume.pdf"
            className="rounded-full border border-line px-8 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:border-accent/50 hover:text-accent"
          >
            Download Resume
          </a>
        </div>

        <ul
          data-hero-trust
          className="mt-14 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[0.7rem] tracking-wider text-faint uppercase md:mt-20"
        >
          {site.trustIndicators.map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-9 w-5.5 items-start justify-center rounded-full border border-line p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-accent/80" />
        </div>
      </div>
    </section>
  );
}
