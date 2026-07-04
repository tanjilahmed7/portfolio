import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import { projects, getProject } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-36">
      {/* Case study hero */}
      <header className="container-x relative">
        <div
          className={`absolute -top-20 right-0 h-72 w-72 rounded-full bg-gradient-to-br ${project.accent} blur-3xl`}
          aria-hidden
        />
        <Reveal className="relative max-w-3xl">
          <p className="eyebrow mb-4">
            Case Study · {project.category}
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 text-lg text-muted md:text-xl">{project.tagline}</p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="relative mt-12 grid gap-6 rounded-2xl border border-line bg-surface/40 p-6 sm:grid-cols-3 md:p-8"
        >
          <div>
            <p className="font-mono text-[0.65rem] tracking-wider text-faint uppercase">
              Role
            </p>
            <p className="mt-1.5 text-sm font-medium">{project.role}</p>
          </div>
          <div>
            <p className="font-mono text-[0.65rem] tracking-wider text-faint uppercase">
              Category
            </p>
            <p className="mt-1.5 text-sm font-medium">{project.category}</p>
          </div>
          <div>
            <p className="font-mono text-[0.65rem] tracking-wider text-faint uppercase">
              Technology
            </p>
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-line px-2 py-0.5 font-mono text-[0.65rem] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </header>

      {/* Overview */}
      <section className="container-x mt-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <h2 className="eyebrow">Overview</h2>
          </Reveal>
          <Reveal className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
            {project.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Challenge / Approach / Outcome */}
      <section className="container-x mt-20">
        <Reveal
          stagger="[data-cs-block]"
          className="grid gap-5 lg:grid-cols-3"
        >
          {[
            { label: "The Challenge", body: project.challenge },
            { label: "The Approach", body: project.approach },
            { label: "The Outcome", body: project.outcome },
          ].map((block, i) => (
            <div
              key={block.label}
              data-cs-block
              className="card-glow glass rounded-2xl p-7"
            >
              <p className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold">
                {block.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {block.body}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Key features */}
      <section className="container-x mt-20">
        <Reveal>
          <h2 className="eyebrow mb-8">Key Features</h2>
        </Reveal>
        <Reveal
          stagger="[data-feature]"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {project.features.map((feature) => (
            <div
              key={feature}
              data-feature
              className="flex items-center gap-3 rounded-xl border border-line bg-surface/40 px-5 py-4"
            >
              <span
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"
                aria-hidden
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  className="h-3 w-3"
                >
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Next case study */}
      <section className="container-x mt-24">
        <Reveal>
          <Link
            href={`/projects/${next.slug}`}
            className="card-glow glass group flex flex-col gap-2 rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1 md:p-10"
          >
            <p className="font-mono text-xs tracking-wider text-faint uppercase">
              Next case study
            </p>
            <span className="flex items-center justify-between gap-4">
              <span className="font-display text-2xl font-semibold transition-colors duration-300 group-hover:text-accent md:text-3xl">
                {next.title}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6 text-accent transition-transform duration-300 group-hover:translate-x-1.5"
                aria-hidden
              >
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="text-sm text-muted">{next.tagline}</p>
          </Link>
        </Reveal>
      </section>
    </article>
  );
}
