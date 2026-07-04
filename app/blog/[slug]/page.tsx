import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts, getBlogPost, type BlogBlock } from "@/data/blogs";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [site.name],
    },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 mb-4 font-display text-2xl font-semibold tracking-tight md:text-3xl">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="my-5 text-base leading-relaxed text-muted md:text-lg">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base text-muted md:text-lg">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-accent pl-6 font-display text-xl leading-snug font-medium text-ink md:text-2xl">
          {block.text}
        </blockquote>
      );
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-36">
      <article className="container-x">
        <Reveal as="header" className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-4 w-4"
              aria-hidden
            >
              <path d="M19 12H5m6 6-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All articles
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-[0.65rem] tracking-wider text-accent uppercase">
              {post.category}
            </span>
            <span className="font-mono text-xs text-faint">{post.readTime}</span>
            <span className="text-faint" aria-hidden>
              ·
            </span>
            <time dateTime={post.date} className="font-mono text-xs text-faint">
              {formatDate(post.date)}
            </time>
          </div>

          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {post.excerpt}
          </p>

          <div className="mt-8 flex items-center gap-3 border-y border-line py-4">
            <span
              className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-accent/80 to-glow/80 font-mono text-xs font-bold text-void"
              aria-hidden
            >
              TA
            </span>
            <div>
              <p className="text-sm font-medium">{site.name}</p>
              <p className="text-xs text-faint">
                {site.role} · {site.company}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl" y={28}>
          {post.content.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </Reveal>
      </article>

      <aside className="container-x mt-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="eyebrow mb-8">Keep reading</h2>
          </Reveal>
          <Reveal stagger="[data-blog-card]" className="grid gap-5 sm:grid-cols-2">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </Reveal>
        </div>
      </aside>
    </div>
  );
}
