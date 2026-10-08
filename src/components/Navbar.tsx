"use client";

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
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        overHero ? "bg-transparent" : "border-b border-line/80 bg-paper/95 backdrop-blur-md",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Logo variant={light && !open ? "light" : "dark"} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "relative text-sm font-medium tracking-wide transition-colors",
                  light ? "text-white/82 hover:text-white" : "text-ink/70 hover:text-ink",
                  active && (light ? "text-white" : "text-ink"),
                )}
              >
                {link.label}
                {active ? (
                  <span className="absolute inset-x-0 -bottom-1 h-px bg-brand" />
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <Button href="/contact" variant={light ? "primary" : "secondary"}>
            Talk to Our Team
          </Button>
        </div>
        <button
          type="button"
          className={cx(
            "inline-flex h-11 w-11 items-center justify-center rounded-sm lg:hidden",
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
                "absolute left-0 h-px w-full bg-current transition-transform",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cx(
                "absolute left-0 top-1.5 h-px w-full bg-current transition-opacity",
                open && "opacity-0",
              )}
            />
            <span
              className={cx(
                "absolute left-0 h-px w-full bg-current transition-transform",
                open ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>
      </div>
      <div id="mobile-nav">
        <MobileMenu open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
}
