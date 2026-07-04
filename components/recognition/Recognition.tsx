import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Recognition() {
  return (
    <section id="recognition" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Recognition"
          title="Impact that gets noticed."
        />

        <Reveal stagger="[data-recognition-card]" className="grid gap-5 lg:grid-cols-2">
          {/* Award */}
          <article
            data-recognition-card
            className="card-glow glass relative overflow-hidden rounded-3xl p-8 md:p-10"
          >
            <div
              className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-amber-400/25 to-orange-500/10 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-6 w-6"
                  aria-hidden
                >
                  <path
                    d="M8 21h8m-4-4v4m-6-17h12v3a6 6 0 0 1-12 0V4zM6 5H3.5A1.5 1.5 0 0 0 2 6.5 3.5 3.5 0 0 0 5.5 10H6m12-5h2.5A1.5 1.5 0 0 1 22 6.5 3.5 3.5 0 0 1 18.5 10H18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="mt-6 font-mono text-xs tracking-wider text-amber-300/90 uppercase">
                Notionhive · 2022
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
                Employee of the Year
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
                Recognized for leadership, project delivery, and team impact at
                Notionhive — awarded for consistently turning ambitious client
                requirements into shipped, stable platforms while lifting the
                engineers around him.
              </p>
            </div>
          </article>

          {/* Space reserved for future client testimonials */}
          <article
            data-recognition-card
            className="flex flex-col justify-center rounded-3xl border border-dashed border-line p-8 md:p-10"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-8 w-8 text-faint"
              aria-hidden
            >
              <path d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2-1 3.5-3 4m12-6h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2-1 3.5-3 4" />
            </svg>
            <h3 className="mt-5 font-display text-xl font-semibold text-muted">
              Client testimonials — coming soon
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-faint">
              This space is reserved for the words of clients and collaborators.
              If we&apos;ve shipped something together and you&apos;d like to
              share a few lines, I&apos;d be glad to feature them here.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
