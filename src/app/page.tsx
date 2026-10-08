import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { Hero } from "@/components/Hero";
import { PartnerLogo } from "@/components/PartnerLogo";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SolutionCard } from "@/components/SolutionCard";
import { company } from "@/data/company";
import { partners } from "@/data/partners";
import { getFeaturedProducts } from "@/data/products";
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

      <section className="py-20 sm:py-24">
        <AnimatedSection className="container-page grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="The company"
              title="Distributor and consultant to hospitals, clinics, and laboratories."
              description={company.summary}
            />
            <p className="mt-6 text-sm text-muted">
              Established {company.established} in Chandigarh.
            </p>
            <Link href="/about" className="mt-6 inline-flex text-sm font-semibold text-ink hover:text-brand">
              About SNS Meditech →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            {company.strengths.map((item) => (
              <article key={item.title} className="border border-line bg-paper p-5">
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
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
              description="Interactive ranges drawn from the specialties and product families on the existing SNS Meditech site."
            />
          </AnimatedSection>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
            <Link href="/products" className="text-sm font-semibold text-ink hover:text-brand">
              View all products →
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
                <li key={item.title} className="border-l-2 border-brand pl-4">
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden border border-line">
              <Image
                src="/images/MODULAR_OT.jpg"
                alt="Modular operating theatre interior"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container-page">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Partners"
              title="Manufacturer brands in the current catalogue."
              description="Only partners visible on the existing SNS Meditech site are shown here."
            />
          </AnimatedSection>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {partners.map((partner) => (
              <Link key={partner.slug} href="/partners" className="block">
                <PartnerLogo partner={partner} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
