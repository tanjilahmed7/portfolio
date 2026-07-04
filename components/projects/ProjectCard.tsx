import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card-glow glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1 md:p-10"
    >
      {/* Ambient artwork gradient unique to each case study */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-60 transition-opacity duration-500 group-hover:opacity-90`}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_55%)]"
        aria-hidden
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {project.title}
            </h3>
          </div>
          <span
            className="font-mono text-5xl font-bold text-ink/8 transition-colors duration-500 group-hover:text-accent/20 md:text-6xl"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-3 text-base font-medium text-ink/90">
          {project.tagline}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
          {project.features.slice(0, 4).map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-xs text-muted"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <ul className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line bg-void/50 px-2.5 py-1 font-mono text-[0.68rem] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
          <span className="flex items-center gap-2 text-sm font-medium text-accent">
            Case study
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
