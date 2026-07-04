import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical writing on Laravel architecture, Next.js performance, WordPress engineering, AI integration, and lessons from production systems.",
};

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="container-x">
        <Reveal className="mb-14 max-w-2xl md:mb-20">
          <p className="eyebrow mb-4">Blog</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Writing about systems that survive production.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            Architecture decisions, performance work, AI integration patterns,
            and engineering culture — written from projects that shipped, not
            theory.
          </p>
        </Reveal>

        <Reveal
          stagger="[data-blog-card]"
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </Reveal>
      </div>
    </div>
  );
}
