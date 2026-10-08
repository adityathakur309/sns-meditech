"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { navLinks } from "@/data/company";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduce = useReducedMotion();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={onClose}
          />
          <motion.nav
            aria-label="Mobile"
            className="absolute inset-x-0 top-0 flex max-h-[100dvh] flex-col overflow-hidden bg-paper shadow-2xl"
            initial={reduce ? false : { y: -32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -20, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
              <Logo variant="dark" />
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line bg-mist px-3 text-sm font-semibold text-ink transition-[background-color,transform,border-color] hover:border-brand/40 hover:bg-brand/10 active:scale-95"
                aria-label="Close menu"
              >
                <CloseIcon />
                <span className="pr-0.5">Close</span>
              </button>
            </div>

            <div className="overflow-y-auto px-5 pb-8 pt-2">
              <ul className="space-y-1">
                {navLinks.map((link, index) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <motion.li
                      key={link.href}
                      initial={reduce ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 + index * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`flex min-h-12 items-center border-b border-line text-lg font-medium transition-colors ${
                          active ? "text-brand" : "text-ink"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <Button href="/contact" className="mt-6 w-full" showArrow onClick={onClose}>
                Talk to Our Team
              </Button>
            </div>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
