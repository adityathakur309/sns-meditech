"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/Button";
import { company } from "@/data/company";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.35]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/hero-banner.png"
          alt="Modular operating theatre with surgical lights, pendant, and anaesthesia workstation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/55 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container-page relative flex min-h-[100svh] flex-col justify-center pb-16 pt-28 sm:pb-20 lg:pt-28"
      >
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.26em] text-brand"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {company.tagline}
        </motion.p>
        <motion.h1
          className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] text-white text-balance sm:text-5xl lg:text-6xl"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          Medical technology for the operating room, ICU, and neonatal unit.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-white/74 sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
        >
          {company.positioning} Established in {company.establishedYear}, we help healthcare
          institutions specify, source, and support clinical systems.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38 }}
        >
          <Button href="/solutions">Explore Our Solutions</Button>
          <Button href="/contact" variant="ghost">
            Talk to Our Team
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
