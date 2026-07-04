"use client";

import { useRef } from "react";
import { useGSAP, revealFrom, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

export default function ProductsSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      revealFrom("[data-product-card]", {
        y: 64,
        autoAlpha: 0,
        rotateX: -8,
        transformPerspective: 800,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "[data-products-grid]",
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="products" className="relative py-24 md:py-36">
      <div className="glow-orb top-10 -left-48 h-[26rem] w-[26rem] bg-glow/10" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Products"
          title="Productized systems, ready to become your platform."
          description="Proven foundations distilled from years of client work — each one deployable, extensible, and built to marketplace standards."
        />

        <div
          data-products-grid
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 [perspective:1200px]"
        >
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
