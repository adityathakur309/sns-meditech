import Link from "next/link";
import { Logo } from "@/components/Logo";
import { company, navLinks } from "@/data/company";
import { solutions } from "@/data/solutions";

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
                <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Solutions</p>
          <ul className="mt-4 space-y-2.5">
            {solutions.slice(0, 6).map((solution) => (
              <li key={solution.slug}>
                <Link
                  href={`/solutions/${solution.slug}`}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {solution.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Contact</p>
          <address className="mt-4 space-y-2.5 text-sm not-italic text-white/70">
            <p>{company.contact.address}</p>
            <p>
              <a className="hover:text-white" href={`mailto:${company.contact.email}`}>
                {company.contact.email}
              </a>
            </p>
            <p>
              <a className="hover:text-white" href={`tel:${company.contact.phoneRaw}`}>
                {company.contact.phone}
              </a>
            </p>
            <p>
              <a className="hover:text-white" href={`tel:${company.contact.landlineRaw}`}>
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
