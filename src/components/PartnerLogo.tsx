import Image from "next/image";
import type { Partner } from "@/data/partners";
import { cx } from "@/lib/utils";

export function PartnerLogo({
  partner,
  className,
}: {
  partner: Partner;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex min-h-28 items-center justify-center border border-line bg-paper px-8 py-6",
        className,
      )}
    >
      <Image
        src={partner.logo}
        alt={partner.name}
        width={220}
        height={72}
        className="h-10 w-auto max-w-[180px] object-contain sm:h-12"
      />
    </div>
  );
}
