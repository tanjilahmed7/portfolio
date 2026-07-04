import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Productized systems and reusable solutions: headless commerce, modular CMS, AI knowledge assistants, POS platforms, and WordPress products.",
};

export default function ProductsPage() {
  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="container-x">
        <Reveal className="mb-14 max-w-2xl md:mb-20">
          <p className="eyebrow mb-4">Products</p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            Proven systems, productized.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            Every one of these started as a real system solving a real business
            problem. Now they&apos;re foundations you can start from — audited,
            documented, and ready to be shaped to your operation.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 [perspective:1200px]">
          {products.map((product) => (
            <Reveal key={product.slug} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
