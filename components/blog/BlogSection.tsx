"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP, revealFrom, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blogs";

export default function BlogSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealFrom("[data-blog-card]", {
        y: 48,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-blog-grid]",
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="blog" className="relative py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Writing"
            title="Notes from the engineering trenches."
            description="Thinking out loud about architecture, performance, AI integration, and the craft of building software that lasts."
          />
          <Link
            href="/blog"
            className="mb-14 hidden items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-ink md:mb-20 lg:flex"
          >
            All articles
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

        <div data-blog-grid className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-10 text-center lg:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
          >
            All articles
          </Link>
        </div>
      </div>
    </section>
  );
}
