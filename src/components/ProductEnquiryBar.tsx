"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { company } from "@/data/company";
import { contactEmailSectionHref, contactEnquiryHref } from "@/lib/contact-links";
import { cx } from "@/lib/utils";

type ProductEnquiryBarProps = {
  productName: string;
};

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.6 10.8a11.4 11.4 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11 11 0 003.46.55 1 1 0 011 1V20a1 1 0 01-1 1A16 16 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11 11 0 00.55 3.46 1 1 0 01-.25 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EnquireIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 5h16v14H4V5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

const railButtonClass =
  "group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper text-ink shadow-[0_10px_28px_-16px_rgba(16,24,32,0.45)] transition-[background-color,border-color] hover:border-brand/45 hover:bg-brand hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function RailAction({
  href,
  external,
  label,
  children,
  reduce,
  floatDelay = 0,
}: {
  href: string;
  external?: boolean;
  label: string;
  children: React.ReactNode;
  reduce: boolean | null;
  floatDelay?: number;
}) {
  const tooltip = (
    <span
      role="tooltip"
      className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-sm bg-ink px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 lg:block"
    >
      {label}
    </span>
  );

  const pulseRing = !reduce ? (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-full border-2 border-brand/40"
      initial={{ scale: 1, opacity: 0.55 }}
      animate={{ scale: 1.45, opacity: 0 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
        delay: floatDelay,
      }}
    />
  ) : null;

  const motionProps = reduce
    ? {}
    : {
        animate: { y: [0, -4, 0] },
        transition: {
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut" as const,
          delay: floatDelay,
        },
        whileHover: { scale: 1.08 },
        whileTap: { scale: 0.94 },
      };

  const content = (
    <>
      {pulseRing}
      {tooltip}
      <motion.span
        className="relative z-10"
        animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay + 0.2,
        }}
      >
        {children}
      </motion.span>
    </>
  );

  if (external) {
    return (
      <motion.a href={href} className={railButtonClass} aria-label={label} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div {...motionProps}>
      <Link href={href} className={railButtonClass} aria-label={label}>
        {content}
      </Link>
    </motion.div>
  );
}

export function ProductEnquiryBar({ productName }: ProductEnquiryBarProps) {
  const reduce = useReducedMotion();
  const enquireHref = contactEnquiryHref(productName);
  const emailHref = contactEmailSectionHref(productName);
  const telHref = `tel:${company.contact.phoneRaw}`;

  const mobileActionClass =
    "flex min-h-11 flex-1 items-center justify-center gap-2 rounded-sm px-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

  return (
    <>
      <aside
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md lg:hidden"
        aria-label="Product enquiry actions"
      >
        <motion.div
          className="pointer-events-auto container-page flex gap-2"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={enquireHref}
            className={cx(mobileActionClass, "bg-brand text-white hover:bg-brand-dark active:scale-[0.98]")}
          >
            <EnquireIcon />
            Enquire
          </Link>
          <motion.a
            href={telHref}
            className={cx(mobileActionClass, "border border-line bg-white text-ink hover:border-brand/40")}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            animate={reduce ? undefined : { scale: [1, 1.02, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            aria-label={`Call ${company.contact.phone}`}
          >
            <PhoneIcon />
            Call
          </motion.a>
          <motion.div
            className="flex flex-1"
            whileTap={reduce ? undefined : { scale: 0.97 }}
            animate={reduce ? undefined : { scale: [1, 1.02, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
          >
            <Link
              href={emailHref}
              className={cx(mobileActionClass, "w-full border border-line bg-white text-ink hover:border-brand/40")}
              aria-label="Email — contact page"
            >
              <EmailIcon />
              Email
            </Link>
          </motion.div>
        </motion.div>
      </aside>

      <motion.aside
        className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex xl:right-5"
        aria-label="Quick contact for this product"
        initial={reduce ? false : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pointer-events-auto flex flex-col gap-3">
          <RailAction href={telHref} external label={`Call ${company.contact.phone}`} reduce={reduce} floatDelay={0}>
            <PhoneIcon />
          </RailAction>
          <RailAction href={emailHref} label="Email — contact page" reduce={reduce} floatDelay={0.5}>
            <EmailIcon />
          </RailAction>
        </div>
      </motion.aside>
    </>
  );
}
