"use client";

import { motion, useReducedMotion } from "framer-motion";

type CapabilityCardProps = {
  title: string;
  body: string;
  index?: number;
};

export function CapabilityCard({ title, body, index = 0 }: CapabilityCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={reduce ? undefined : { y: -5 }}
      className="card-shine group rounded-lg border border-line bg-paper p-5 transition-[border-color,box-shadow] duration-300 hover:border-brand/45 hover:shadow-[0_18px_40px_-24px_rgba(16,24,32,0.3)]"
    >
      <div className="mb-3 h-0.5 w-8 origin-left scale-x-[0.35] bg-brand transition-transform duration-300 group-hover:scale-x-100" />
      <h3 className="text-base font-semibold text-ink transition-colors group-hover:text-brand-dark">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </motion.article>
  );
}
