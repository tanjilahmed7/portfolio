import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import { products, getProduct } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-36">
      <header className="container-x relative">
        <div
          className={`absolute -top-20 right-0 h-72 w-72 rounded-full bg-gradient-to-br ${product.accent} blur-3xl`}
          aria-hidden
        />
        <Reveal className="relative max-w-3xl">
          <p className="eyebrow mb-4">Product</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            {product.name}
          </h1>
          <p className="mt-5 text-lg text-muted md:text-xl">
            {product.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <p className="font-mono text-[0.65rem] tracking-wider text-faint uppercase">
                Best for
              </p>
              <p className="mt-1 text-sm font-medium">{product.bestFor}</p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {product.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-line bg-surface/60 px-2.5 py-1 font-mono text-[0.68rem] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </header>

      <section className="container-x mt-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <h2 className="eyebrow">Why it exists</h2>
          </Reveal>
          <Reveal className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
            {product.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="container-x mt-20">
        <Reveal>
          <h2 className="eyebrow mb-8">Core capabilities</h2>
        </Reveal>
        <Reveal stagger="[data-capability]" className="grid gap-5 sm:grid-cols-2">
          {product.capabilities.map((cap, i) => (
            <div
              key={cap.title}
              data-capability
              className="card-glow glass rounded-2xl p-7"
            >
              <p className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-lg font-semibold">
                {cap.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                {cap.description}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="container-x mt-24">
        <Reveal className="card-glow glass flex flex-col items-start gap-6 rounded-3xl p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">
              Want this running for your business?
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted md:text-base">
              Every deployment is tailored — let&apos;s talk about your
              workflows, your scale, and what this foundation becomes for you.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-full bg-gradient-to-r from-accent-deep to-glow px-8 py-3.5 text-sm font-semibold text-void transition-transform duration-300 hover:scale-[1.03]"
          >
            Start a Conversation
          </Link>
        </Reveal>
      </section>
    </article>
  );
}
