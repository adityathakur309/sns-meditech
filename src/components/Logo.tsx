import Image from "next/image";
import Link from "next/link";
import { cx } from "@/lib/utils";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "dark", className }: LogoProps) {
  const src = variant === "light" ? "/images/logo.svg" : "/images/logo-on-light.svg";

  return (
    <Link
      href="/"
      className={cx("inline-flex items-center rounded-sm", className)}
      aria-label="SNS Meditech home"
    >
      <Image
        src={src}
        alt="SNS Meditech"
        width={132}
        height={84}
        className="h-11 w-auto sm:h-12"
        priority
      />
    </Link>
  );
}
