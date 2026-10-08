"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(240,124,0,0.18),transparent)]"
      />
      <div className="container-page relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-white/55 [&_a]:text-white/70 [&_a:hover]:text-white [&_[aria-current=page]]:text-white"
        >
          <Breadcrumbs items={crumbs} />
        </motion.div>
        {eyebrow ? (
          <motion.p
            className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-brand"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            {eyebrow}
          </motion.p>
        ) : null}
        <motion.h1
          className="mt-3 max-w-3xl font-serif text-4xl text-white text-balance sm:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
