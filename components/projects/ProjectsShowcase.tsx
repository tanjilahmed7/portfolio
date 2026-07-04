"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, revealFrom, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

/**
 * Featured case studies. On desktop the deck pins and scrolls horizontally
 * (GSAP ScrollTrigger scrub); on smaller screens it falls back to a vertical
 * stagger reveal for touch-friendly scrolling.
 */
export default function ProjectsShowcase() {
  const scope = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        if (!track) return;
        const distance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-projects-pin]",
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.utils
          .toArray<HTMLElement>("[data-project-slide]")
          .forEach((slide) => {
            revealFrom(slide, {
              y: 56,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: slide, start: "top 85%", once: true },
            });
          });
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="projects" className="relative py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Case studies in systems that carry real businesses."
            description="Enterprise CMS platforms, multilingual commerce, AI products, and operational systems — scroll through the work."
          />
          <Link
            href="/projects"
            className="mb-14 hidden items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-ink md:mb-20 lg:flex"
          >
            All projects
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
              aria-hidden
            >
              <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <div data-projects-pin className="lg:flex lg:h-svh lg:items-center lg:overflow-hidden">
        <div
          ref={trackRef}
          className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:px-10 lg:mx-0 lg:w-max lg:max-w-none lg:flex-row lg:gap-10 lg:pr-[8vw]"
        >
          {projects.map((project, i) => (
            <div
              key={project.slug}
              data-project-slide
              className="lg:h-[70vh] lg:w-[44rem] lg:max-w-[80vw] lg:shrink-0"
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}

          {/* End-of-rail CTA */}
          <div
            data-project-slide
            className="flex items-center justify-center lg:h-[70vh] lg:w-[26rem] lg:shrink-0"
          >
            <Link
              href="/projects"
              className="card-glow glass group flex h-full w-full flex-col items-center justify-center gap-4 rounded-3xl p-10 text-center transition-transform duration-500 hover:-translate-y-1 max-lg:py-16"
            >
              <span className="font-display text-2xl font-semibold">
                Explore every build
              </span>
              <span className="text-sm text-muted">
                Full project archive with detailed case studies
              </span>
              <span className="mt-2 grid h-12 w-12 place-items-center rounded-full border border-accent/40 text-accent transition-transform duration-300 group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
