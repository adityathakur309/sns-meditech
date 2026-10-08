import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { PartnerLogo } from "@/components/PartnerLogo";
import { ProductGrid } from "@/components/ProductGrid";
import { getPartner, partners } from "@/data/partners";
import { getProductsByPartnerSlug } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return partners.map((partner) => ({ slug: partner.slug }));
}

export async function generateMetadata({ params }: PageProps<"/partners/[slug]">) {
  const { slug } = await params;
  const partner = getPartner(slug);
  if (!partner) return {};
  return pageMetadata({
    title: `${partner.name} Products`,
    description: partner.summary,
    path: `/partners/${partner.slug}`,
  });
}

export default async function PartnerDetailPage({ params }: PageProps<"/partners/[slug]">) {
  const { slug } = await params;
  const partner = getPartner(slug);
  if (!partner) notFound();

  const catalogue = getProductsByPartnerSlug(slug);

  return (
    <>
      <PageHero
        eyebrow="Partner catalogue"
        title={partner.name}
        description={partner.summary}
        crumbs={[{ label: "Partners", href: "/partners" }, { label: partner.name }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <AnimatedSection className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <PartnerLogo partner={partner} className="sticky top-24" />
            </div>
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Focus areas</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {partner.focus.map((item) => (
                  <li
                    key={item}
                    className="border border-line bg-mist px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brand/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-2xl text-muted">
                Select a product below to explore specifications, applications, and request information from
                SNS Meditech.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/contact">Request information</Button>
                <Button href="/partners" variant="outline">
                  All partners
                </Button>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-14" delay={0.06}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-serif text-3xl text-ink">Products from {partner.name}</h2>
                <p className="mt-2 text-sm text-muted">
                  {catalogue.length
                    ? `${catalogue.length} systems listed in the SNS Meditech showcase.`
                    : "Product listings for this partner are confirmed on enquiry."}
                </p>
              </div>
              <Link href="/products" className="link-arrow">
                Full catalogue
                <span data-arrow aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
            <div className="mt-8">
              {catalogue.length ? (
                <ProductGrid products={catalogue} />
              ) : (
                <div className="border border-dashed border-line bg-paper px-6 py-16 text-center">
                  <p className="text-muted">
                    No individual product pages are listed for this partner yet. Contact SNS Meditech to discuss
                    available technology.
                  </p>
                  <Button href="/contact" className="mt-6">
                    Talk to our team
                  </Button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTA title={`Discuss ${partner.name} technology with SNS Meditech`} />
    </>
  );
}
