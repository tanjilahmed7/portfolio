"use client";

import Link from "next/link";
import { useTilt } from "@/lib/useTilt";
import type { Product } from "@/data/products";

const icons: Record<Product["icon"], React.ReactNode> = {
  cart: (
    <path
      d="M3 4h2l2.6 12.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.76L21 8H6m3 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  blocks: (
    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
  ),
  brain: (
    <path
      d="M12 4a3 3 0 0 0-3 3v10a3 3 0 1 0 6 0V7a3 3 0 0 0-3-3zM9 8H7a3 3 0 0 0 0 6h2M15 8h2a3 3 0 0 1 0 6h-2"
      strokeLinecap="round"
    />
  ),
  register: (
    <path
      d="M4 10h16v9H4zM7 10V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4M8 14h.01M12 14h.01M16 14h.01M8 17h8"
      strokeLinecap="round"
    />
  ),
  plug: (
    <path
      d="M9 3v5m6-5v5M7 8h10v3a5 5 0 0 1-5 5 5 5 0 0 1-5-5V8zm5 8v5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export default function ProductCard({ product }: { product: Product }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(6);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-product-card
      className="h-full will-change-transform [transform-style:preserve-3d]"
    >
      <article className="card-glow glass relative flex h-full flex-col overflow-hidden rounded-2xl p-7">
        <div
          className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${product.accent} blur-3xl`}
          aria-hidden
        />
        <div className="relative flex h-full flex-col">
          <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface/80 text-accent">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
              aria-hidden
            >
              {icons[product.icon]}
            </svg>
          </span>

          <h3 className="font-display text-xl font-semibold">{product.name}</h3>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">
            {product.shortDescription}
          </p>

          <p className="mt-4 text-xs text-faint">
            <span className="font-mono tracking-wider text-accent/80 uppercase">
              Best for ·{" "}
            </span>
            {product.bestFor}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {product.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line bg-void/50 px-2.5 py-1 font-mono text-[0.68rem] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition-all duration-300 hover:border-accent/60 hover:bg-accent/20"
            >
              Explore Product
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
      </article>
    </div>
  );
}
