"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/data/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index, 8) * 0.04 }}
      className="h-full"
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex h-full min-w-0 flex-col border border-line bg-paper transition-shadow duration-200 active:bg-mist hover:shadow-[0_16px_40px_-24px_rgba(16,24,32,0.35)]"
      >
        <div className="relative aspect-square overflow-hidden bg-mist sm:aspect-[4/3]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, 50vw"
            className="object-contain p-2.5 transition-transform duration-500 group-hover:scale-[1.04] sm:p-6"
          />
        </div>
        <div className="flex flex-1 flex-col p-2.5 sm:p-5">
          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-brand sm:block">
            {product.category}
          </p>
          <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-ink sm:mt-2 sm:line-clamp-none sm:text-lg">
            {product.name}
          </h3>
          <p className="mt-2 hidden flex-1 text-sm leading-relaxed text-muted sm:block">{product.summary}</p>
          <span className="mt-2 text-xs font-semibold text-brand sm:mt-4 sm:text-sm sm:text-ink sm:group-hover:text-brand">
            Explore →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
