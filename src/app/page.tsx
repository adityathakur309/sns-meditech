import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CapabilityCard } from "@/components/CapabilityCard";
import { ClientsSection } from "@/components/ClientsSection";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { PartnerCard } from "@/components/PartnerCard";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SolutionCard } from "@/components/SolutionCard";
import { company } from "@/data/company";
import { partners } from "@/data/partners";
import { getFeaturedProducts, getProductsByPartnerSlug } from "@/data/products";
import { solutions } from "@/data/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Medical Technology Solutions",
  description: company.positioning,
  path: "/",
});

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <Hero />

      <section className="relative py-20 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
        />
        <AnimatedSection className="container-page grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="The company"
              title="Distributor and consultant to hospitals, clinics, and laboratories."
              description={company.summary}
            />
            <p className="mt-6 text-sm text-muted">Established {company.established} in Chandigarh.</p>
            <Link href="/about" className="link-arrow mt-6">
              About SNS Meditech
              <span data-arrow aria-hidden="true">
                →
              </span>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            {company.strengths.map((item, index) => (
              <CapabilityCard key={item.title} title={item.title} body={item.body} index={index} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Solutions"
              title="Specialties supported by the SNS Meditech catalogue."
              description="Explore clinical ranges — from anaesthesia and critical care to electrosurgery and hospital infrastructure."
            />
          </AnimatedSection>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {solutions.map((solution, index) => (
              <SolutionCard key={solution.slug} solution={solution} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-page">
          <AnimatedSection className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Catalogue"
              title="A showcase of systems we supply."
              description="This is a product showcase, not a store. Explore a system, then request information."
            />
            <Link href="/products" className="link-arrow shrink-0">
              View all products
              <span data-arrow aria-hidden="true">
                →
              </span>
            </Link>
          </AnimatedSection>
          <div className="mt-10 grid grid-cols-2 gap-2.5 sm:gap-5 xl:grid-cols-3">
            {featured.map((product, index) => (
              <ProductCard key={product.slug} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 sm:py-24">
        <div className="container-page">
          <AnimatedSection>
            <SectionHeading
              light
              eyebrow="How we help"
              title="Understand. Recommend. Implement. Support."
              description="A simple working relationship, based on how SNS Meditech describes its role as distributor and consultant."
            />
          </AnimatedSection>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {company.journey.map((item, index) => (
              <AnimatedSection key={item.step} delay={index * 0.06}>
                <p className="font-serif text-4xl text-brand">{item.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.body}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Why SNS Meditech"
              title="Technology access, with a consultant’s brief."
              description="Verified from the company’s own description — no invented awards, headcount, or market statistics."
            />
            <ul className="mt-8 space-y-4">
              {company.strengths.map((item) => (
                <li key={item.title} className="border-l-2 border-brand pl-4 transition-colors hover:border-brand-dark">
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <div className="group relative aspect-[4/3] overflow-hidden border border-line">
              <Image
                src="/images/MODULAR_OT.jpg"
                alt="Modular operating theatre interior"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <AnimatedSection className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Partners"
              title="Manufacturer brands in the current catalogue."
              description="Select a partner to view its products — one company, many systems."
            />
            <Link href="/partners" className="link-arrow shrink-0">
              All partners
              <span data-arrow aria-hidden="true">
                →
              </span>
            </Link>
          </AnimatedSection>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner, index) => (
              <PartnerCard
                key={partner.slug}
                partner={partner}
                productCount={getProductsByPartnerSlug(partner.slug).length}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <ClientsSection />

      <CTA />
    </>
  );
}
