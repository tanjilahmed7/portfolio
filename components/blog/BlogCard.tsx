import Link from "next/link";
import type { BlogPost } from "@/data/blogs";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-blog-card
      className="card-glow glass group flex h-full flex-col rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1.5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-[0.65rem] tracking-wider text-accent uppercase">
          {post.category}
        </span>
        <span className="font-mono text-xs text-faint">{post.readTime}</span>
      </div>

      <h3 className="mt-5 font-display text-xl leading-snug font-semibold text-balance transition-colors duration-300 group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
        {post.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between pt-6 text-xs text-faint">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="flex items-center gap-1.5 font-medium text-accent">
          Read article
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          >
            <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
