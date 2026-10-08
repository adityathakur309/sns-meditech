import type { Metadata } from "next";
import { company } from "@/data/company";

const siteUrl = company.contact.website;

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const fullTitle = path === "/" ? `${company.name} | ${title}` : `${title} | ${company.name}`;

  return {
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: company.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: company.name,
    description: company.positioning,
    url: siteUrl,
    email: company.contact.email,
    telephone: company.contact.phone,
    foundingDate: "2020-08-14",
    address: {
      "@type": "PostalAddress",
      streetAddress: "24/8, Industrial Area, Phase-2",
      addressLocality: company.contact.city,
      postalCode: company.contact.postalCode,
      addressCountry: "IN",
    },
  };
}
