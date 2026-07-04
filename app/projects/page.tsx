import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from 10+ years of engineering: enterprise CMS platforms, multilingual e-commerce, AI-powered products, and operational systems.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="container-x">
        <Reveal className="mb-14 max-w-2xl md:mb-20">
          <p className="eyebrow mb-4">Projects</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Systems built to carry real businesses.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            A selection of platforms I&apos;ve architected and led — from
            enterprise CMS and multilingual commerce to AI products and
            operational systems running daily behind physical counters.
          </p>
        </Reveal>

        <div className="grid gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={0.05}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
