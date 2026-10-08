"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { navLinks } from "@/data/company";
import { cx } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();
  const isHome = pathname === "/";
  const overHero = ready && isHome && !scrolled && !open;
  const light = overHero;

  useEffect(() => {
    setReady(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      className={cx(
        "fixed inset-x-0 top-0 z-40",
        overHero ? "border-b border-transparent" : "border-b border-line/80 bg-paper/92 backdrop-blur-md",
      )}
      initial={false}
      animate={
        reduce
          ? undefined
          : {
              backgroundColor: overHero ? "rgba(16, 24, 32, 0)" : "rgba(255, 252, 247, 0.92)",
            }
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Logo variant={light && !open ? "light" : "dark"} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "group relative py-1 text-sm font-medium tracking-wide transition-colors duration-200",
                  light ? "text-white/82 hover:text-white" : "text-ink/70 hover:text-ink",
                  active && (light ? "text-white" : "text-ink"),
                )}
              >
                {link.label}
                <span
                  className={cx(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100",
                    active && "scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <Button href="/contact" variant={light ? "primary" : "secondary"} showArrow>
            Talk to Our Team
          </Button>
        </div>
        <button
          type="button"
          className={cx(
            "inline-flex h-11 w-11 items-center justify-center rounded-sm transition-transform active:scale-95 lg:hidden",
            light && !open ? "text-white" : "text-ink",
          )}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={cx(
                "absolute left-0 h-px w-full bg-current transition-transform duration-300",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cx(
                "absolute left-0 top-1.5 h-px w-full bg-current transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cx(
                "absolute left-0 h-px w-full bg-current transition-transform duration-300",
                open ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>
      </div>
      <div id="mobile-nav">
        <MobileMenu open={open} onClose={() => setOpen(false)} />
      </div>
    </motion.header>
  );
}
