"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { company, navLinks } from "@/data/company";
import { solutions } from "@/data/solutions";
import { cx } from "@/lib/utils";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex text-sm text-white/70 transition-colors hover:text-white",
        active && "text-white",
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
      </span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-page grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
            {company.tagline}. {company.positioning}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href}>{link.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Solutions</p>
          <ul className="mt-4 space-y-2.5">
            {solutions.slice(0, 6).map((solution) => (
              <li key={solution.slug}>
                <FooterLink href={`/solutions/${solution.slug}`}>{solution.shortName}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Contact</p>
          <address className="mt-4 space-y-2.5 text-sm not-italic text-white/70">
            <p>{company.contact.address}</p>
            <p>
              <a className="transition-colors hover:text-white" href={`mailto:${company.contact.email}`}>
                {company.contact.email}
              </a>
            </p>
            <p>
              <a className="transition-colors hover:text-white" href={`tel:${company.contact.phoneRaw}`}>
                {company.contact.phone}
              </a>
            </p>
            <p>
              <a className="transition-colors hover:text-white" href={`tel:${company.contact.landlineRaw}`}>
                {company.contact.landline}
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 | All rights reserved, Snsmeditech.com</p>
          <p>Chandigarh, India</p>
        </div>
      </div>
    </footer>
  );
}
