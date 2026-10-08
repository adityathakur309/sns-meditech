"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { clients } from "@/data/clients";

function ClientLogoCard({ client, index }: { client: (typeof clients)[number]; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 20, scale: 0.96 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index, 9) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className="card-shine group relative list-none"
    >
      <div className="relative flex min-h-[9.5rem] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white p-6 shadow-[0_12px_32px_-20px_rgba(0,0,0,0.55)] transition-[border-color,box-shadow] duration-300 group-hover:border-brand/45 group-hover:shadow-[0_20px_40px_-16px_rgba(240,124,0,0.35)] sm:min-h-[10.5rem] sm:p-7 md:min-h-[11rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/0 via-brand/0 to-brand/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <Image
          src={client.logo}
          alt={client.name}
          width={280}
          height={112}
          className="relative z-10 h-auto max-h-[4.5rem] w-full max-w-[15rem] object-contain transition-[transform,filter] duration-500 group-hover:scale-[1.04] group-hover:brightness-105 sm:max-h-20 sm:max-w-[17rem] md:max-h-[5.25rem] md:max-w-[18rem]"
        />
        <p className="sr-only">{client.shortName}</p>
      </div>
    </motion.li>
  );
}

export function ClientsSection() {
  const reduce = useReducedMotion();

  return (
    <section id="our-clients" className="relative overflow-hidden bg-ink py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-banner.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.14] blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />
      </div>

      <div className="container-page relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            light
            align="center"
            className="mx-auto max-w-2xl text-center"
            eyebrow="Trust"
            title="Our clients"
            description="Hospitals, medical colleges, and healthcare institutions across the region rely on SNS Meditech for clinical technology and supply."
          />
        </motion.div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {clients.map((client, index) => (
            <ClientLogoCard key={client.logo} client={client} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
