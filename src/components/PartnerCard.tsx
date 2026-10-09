"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PartnerLogo } from "@/components/PartnerLogo";
import type { Partner } from "@/data/partners";

const accentBySlug: Record<string, string> = {
  draeger: "from-sky-500/20 via-transparent to-brand/25",
  erbe: "from-emerald-500/15 via-transparent to-brand/20",
  "fujifilm-medwork": "from-rose-400/10 via-transparent to-brand/20",
};

type PartnerCardProps = {
  partner: Partner;
  productCount: number;
  index?: number;
};

export function PartnerCard({ partner, productCount, index = 0 }: PartnerCardProps) {
  const reduce = useReducedMotion();
  const accent = accentBySlug[partner.slug] ?? "from-brand/15 via-transparent to-brand/25";

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="card-shine h-full"
    >
      <Link
        href={`/partners/${partner.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-[0_8px_24px_-18px_rgba(16,24,32,0.25)] transition-[border-color,box-shadow] duration-300 hover:border-brand/55 hover:shadow-[0_28px_52px_-24px_rgba(240,124,0,0.28)] active:scale-[0.99]"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 z-20 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand via-[#ff9a3c] to-brand-dark transition-transform duration-500 group-hover:scale-x-100"
        />
        <div
          className={`relative overflow-hidden border-b border-line bg-gradient-to-br ${accent} px-5 py-7 sm:px-6 sm:py-8 lg:px-6 lg:py-6`}
        >
          <div
            aria-hidden
            className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/15 blur-2xl transition-transform duration-500 group-hover:scale-150"
          />
          <PartnerLogo
            partner={partner}
            className="relative z-10 border-0 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-sm lg:py-3.5"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-5">
          <h3 className="font-serif text-xl text-ink transition-colors group-hover:text-brand-dark lg:text-[1.35rem]">
            {partner.name}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted lg:line-clamp-3">
            {partner.summary}
          </p>
          <p className="mt-4 inline-flex w-fit rounded-full border border-line bg-mist px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/80">
            {productCount > 0
              ? `${productCount} ${productCount === 1 ? "product" : "products"}`
              : "Partnership"}
          </p>
          <span className="mt-5 inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-sm bg-ink px-4 text-sm font-semibold text-white transition-[background-color,transform] duration-300 group-hover:bg-brand group-active:scale-[0.98] lg:mt-4">
            View products
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
