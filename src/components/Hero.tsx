"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/Button";
import { company } from "@/data/company";

const headline = "Medical technology for the operating room, ICU, and neonatal unit.";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.25]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      <motion.div style={{ y, scale }} className="absolute inset-0 origin-center">
        <Image
          src="/images/hero-banner.png"
          alt="Modular operating theatre with surgical lights, pendant, and anaesthesia workstation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/94 via-ink/58 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/35" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container-page relative flex min-h-[100svh] flex-col justify-center pb-20 pt-28 sm:pb-24 lg:pt-28"
      >
        <motion.p
          className="text-xs font-semibold uppercase tracking-[0.26em] text-brand"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {company.tagline}
        </motion.p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.08] text-white text-balance sm:text-5xl lg:text-6xl">
          {headline.split(" ").map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className="mr-[0.28em] inline-block font-serif"
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.14 + index * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-white/74 sm:text-lg"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          {company.positioning} Established in {company.establishedYear}, we help healthcare institutions
          specify, source, and support clinical systems.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <Button href="/solutions" showArrow>
            Explore Our Solutions
          </Button>
          <Button href="/contact" variant="ghost" showArrow>
            Talk to Our Team
          </Button>
        </motion.div>
        <motion.div
          className="mt-14 hidden items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/45 sm:flex"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span className="h-px w-10 bg-brand/80" />
          Scroll to explore
        </motion.div>
      </motion.div>
    </section>
  );
}
