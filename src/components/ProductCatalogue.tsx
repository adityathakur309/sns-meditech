"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { productCategories, products } from "@/data/products";
import { cx } from "@/lib/utils";

export function ProductCatalogue({ initialCategory = "All" }: { initialCategory?: string }) {
  const [category, setCategory] = useState(
    productCategories.includes(initialCategory) ? initialCategory : "All",
  );

  const visible = useMemo(
    () => (category === "All" ? products : products.filter((product) => product.category === category)),
    [category],
  );

  return (
    <div>
      <div className="-mx-4 overflow-x-auto px-4 pb-2" role="tablist" aria-label="Product categories">
        <div className="flex min-w-max gap-2">
          {productCategories.map((item) => {
            const selected = item === category;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setCategory(item)}
                className={cx(
                  "min-h-10 whitespace-nowrap border px-4 text-sm font-medium transition-colors",
                  selected
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-paper text-ink hover:border-ink/40",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-6 text-sm text-muted">
        {visible.length} {visible.length === 1 ? "product" : "products"}
        {category !== "All" ? ` in ${category}` : ""}
      </p>
      <div className="mt-5">
        <ProductGrid products={visible} />
      </div>
    </div>
  );
}
