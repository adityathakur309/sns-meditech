import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/data/products";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <p className="border border-dashed border-line bg-paper px-6 py-16 text-center text-muted">
        No products in this category yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-5 xl:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard key={product.slug} product={product} index={index} />
      ))}
    </div>
  );
}
