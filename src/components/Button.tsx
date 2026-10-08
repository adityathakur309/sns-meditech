"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cx } from "@/lib/utils";

const variants = {
  primary:
    "bg-brand text-white hover:bg-brand-dark shadow-[0_10px_24px_-12px_rgba(240,124,0,0.8)]",
  secondary: "bg-ink text-white hover:bg-ink-soft",
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
  showArrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
  showArrow = false,
}: ButtonProps) {
  const reduce = useReducedMotion();
  const classes = cx(
    "group/btn relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-sm px-5 text-sm font-semibold tracking-wide transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow ? (
        <motion.span
          className="relative z-10"
          aria-hidden
          initial={false}
          animate={reduce ? undefined : { x: 0 }}
          whileHover={reduce ? undefined : { x: 4 }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.span>
      ) : null}
      {!reduce && variant === "primary" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
        />
      ) : null}
    </>
  );

  const motionProps = reduce
    ? {}
    : {
        whileTap: { scale: disabled ? 1 : 0.98 },
        transition: { duration: 0.15 },
      };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link href={href} className={classes} onClick={onClick}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
