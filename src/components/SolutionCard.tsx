"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getProduct } from "@/data/products";
import type { Solution } from "@/data/solutions";

export function SolutionCard({ solution, index = 0 }: { solution: Solution; index?: number }) {
  const reduce = useReducedMotion();
  const cover = getProduct(solution.productSlugs[0])?.image;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="card-shine h-full"
    >
      <Link
        href={`/solutions/${solution.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-paper transition-[border-color,box-shadow] duration-300 hover:border-brand/50 hover:shadow-[0_24px_48px_-26px_rgba(240,124,0,0.22)] active:scale-[0.995]"
      >
        {cover ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-mist">
            <Image
              src={cover}
              alt=""
              fill
              sizes="(min-width: 1280px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/15 to-transparent transition-opacity duration-300 group-hover:from-ink/70" />
            <p className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              {solution.eyebrow}
            </p>
          </div>
        ) : (
          <p className="px-6 pt-6 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {solution.eyebrow}
          </p>
        )}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          {!cover ? null : <p className="sr-only">{solution.eyebrow}</p>}
          <h3 className="font-serif text-2xl text-ink transition-colors group-hover:text-brand-dark">
            {solution.shortName}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{solution.summary}</p>
          <span className="mt-6 inline-flex min-h-9 items-center justify-center gap-1.5 rounded-sm bg-ink px-4 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-brand sm:w-fit">
            Explore solution
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
