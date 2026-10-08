"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Solution } from "@/data/solutions";

export function SolutionCard({ solution, index = 0 }: { solution: Solution; index?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <Link
        href={`/solutions/${solution.slug}`}
        className="group flex h-full flex-col border border-line bg-paper p-6 transition-colors duration-200 hover:border-brand sm:p-7"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{solution.eyebrow}</p>
        <h3 className="mt-3 font-serif text-2xl text-ink">{solution.shortName}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{solution.summary}</p>
        <span className="mt-6 text-sm font-semibold text-ink transition-colors group-hover:text-brand">
          Explore solution →
        </span>
      </Link>
    </motion.article>
  );
}
