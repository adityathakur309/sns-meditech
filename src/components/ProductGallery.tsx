"use client";

import Image from "next/image";
import { useState } from "react";
import { cx } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const unique = Array.from(new Set(images));
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden border border-line bg-paper">
        <Image
          src={unique[active]}
          alt={`${name} — view ${active + 1}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-8"
        />
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
                "relative aspect-square overflow-hidden border bg-paper",
                active === index ? "border-brand" : "border-line",
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
