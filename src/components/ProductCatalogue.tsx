"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { productCategories, products } from "@/data/products";
import { cx } from "@/lib/utils";

export function ProductCatalogue({ initialCategory = "All" }: { initialCategory?: string }) {
  const reduce = useReducedMotion();
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
                  "relative min-h-10 whitespace-nowrap border px-4 text-sm font-medium transition-colors duration-200",
                  selected
                    ? "border-ink text-white"
                    : "border-line bg-paper text-ink hover:border-ink/40 active:bg-mist",
                )}
              >
                {selected && !reduce ? (
                  <motion.span
                    layoutId="catalogue-pill"
                    className="absolute inset-0 bg-ink"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : selected ? (
                  <span className="absolute inset-0 -z-0 bg-ink" aria-hidden />
                ) : null}
                <span className="relative z-[1]">{item}</span>
              </button>
            );
          })}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={`count-${category}`}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="mt-6 text-sm text-muted"
        >
          {visible.length} {visible.length === 1 ? "product" : "products"}
          {category !== "All" ? ` in ${category}` : ""}
        </motion.p>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5"
        >
          <ProductGrid products={visible} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
