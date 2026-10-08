"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cx } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const unique = Array.from(new Set(images));
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="lg:sticky lg:top-28">
      <div className="relative aspect-[4/3] overflow-hidden border border-line bg-paper">
        <AnimatePresence mode="wait">
          <motion.div
            key={unique[active]}
            initial={reduce ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={unique[active]}
              alt={`${name} — view ${active + 1}`}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-8"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {unique.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {unique.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1} of ${name}`}
              aria-pressed={active === index}
              className={cx(
                "relative aspect-square overflow-hidden border bg-paper transition-[border-color,transform] duration-200 hover:scale-[1.02] active:scale-[0.98]",
                active === index ? "border-brand ring-1 ring-brand/30" : "border-line",
              )}
            >
              <Image src={src} alt="" fill className="object-contain p-2" sizes="120px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
