import Link from "next/link";
import { cx } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand text-white hover:bg-brand-dark shadow-[0_10px_24px_-12px_rgba(240,124,0,0.8)]",
  secondary:
    "bg-ink text-white hover:bg-ink-soft",
  ghost:
    "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/8",
  outline:
    "bg-transparent text-ink border border-ink/15 hover:border-brand hover:text-brand",
};

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const classes = cx(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 text-sm font-semibold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
