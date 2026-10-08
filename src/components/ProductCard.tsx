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
      whileHover={reduce ? undefined : { y: -5 }}
      className="card-shine h-full"
    >
      <Link
        href={`/products/${product.slug}`}
        className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-line bg-paper transition-[border-color,box-shadow] duration-300 hover:border-brand/50 hover:shadow-[0_22px_48px_-26px_rgba(16,24,32,0.38)] active:scale-[0.99]"
      >
        <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-mist to-paper sm:aspect-[4/3]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 25vw, 50vw"
            className="object-contain p-2.5 transition-transform duration-500 ease-out group-hover:scale-[1.07] sm:p-6"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span className="absolute left-2 top-2 rounded-sm bg-ink/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white sm:hidden">
            {product.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-2.5 sm:p-5">
          <p className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-brand sm:block">
            {product.category}
          </p>
          <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-ink transition-colors group-hover:text-brand-dark sm:mt-2 sm:line-clamp-none sm:text-lg">
            {product.name}
          </h3>
          <p className="mt-2 hidden flex-1 text-sm leading-relaxed text-muted sm:block">{product.summary}</p>
          <span className="mt-3 inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-sm bg-ink px-3 text-xs font-semibold text-white transition-[background-color,gap] duration-300 group-hover:bg-brand sm:mt-4 sm:w-auto sm:min-w-[10.5rem] sm:text-sm">
            Explore product
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
