import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { ProductEnquiryBar } from "@/components/ProductEnquiryBar";
import { ProductGallery } from "@/components/ProductGallery";
import { company } from "@/data/company";
import { contactEmailSectionHref, contactEnquiryHref } from "@/lib/contact-links";
import { ProductGrid } from "@/components/ProductGrid";
import { partners } from "@/data/partners";
import { getProduct, getRelatedProducts, products } from "@/data/products";
import { getSolution } from "@/data/solutions";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.name,
    description: product.summary,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug);
  const relatedSolutions = product.solutionSlugs
    .map((item) => getSolution(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const partnerSlug = partners.find(
    (item) =>
      item.name === product.partner ||
      (product.partner === "Dräger" && item.slug === "draeger") ||
      (product.partner === "Erbe" && item.slug === "erbe"),
  )?.slug;

  const enquireHref = contactEnquiryHref(product.name);
  const emailHref = contactEmailSectionHref(product.name);

  return (
    <>
      <div className="pb-24 lg:pb-0">
      <section className="bg-mist pt-28 pb-16 sm:pt-32">
        <div className="container-page">
          <Breadcrumbs items={[{ label: "Products", href: "/products" }, { label: product.name }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <ProductGallery images={product.gallery} name={product.name} />
            <AnimatedSection>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {product.category}
              </p>
              <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{product.name}</h1>
              <p className="mt-2 text-sm text-muted">
                Manufacturer brand in catalogue:{" "}
                {partnerSlug ? (
                  <Link href={`/partners/${partnerSlug}`} className="font-medium text-ink underline-offset-2 hover:text-brand hover:underline">
                    {product.partner}
                  </Link>
                ) : (
                  product.partner
                )}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-muted">{product.description}</p>
              <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
                <Button href={enquireHref} showArrow fullWidth className="sm:col-span-2 lg:col-span-1 lg:w-auto">
                  Enquire Now
                </Button>
                <a
                  href={`tel:${company.contact.phoneRaw}`}
                  className="hidden min-h-11 w-full items-center justify-center rounded-sm border border-ink/15 bg-transparent px-5 text-sm font-semibold tracking-wide text-ink transition-colors hover:border-brand hover:text-brand lg:inline-flex lg:w-auto"
                >
                  Call Now
                </a>
                <div className="hidden lg:block">
                  <Button href={emailHref} variant="outline">
                    Email Now
                  </Button>
                </div>
                <Button href="/products" variant="outline" fullWidth className="sm:col-span-2 lg:col-span-1 lg:w-auto">
                  Back to catalogue
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <AnimatedSection>
            <h2 className="font-serif text-3xl text-ink">Applications</h2>
            <ul className="mt-5 space-y-2">
              {product.applications.map((item) => (
                <li key={item} className="border-b border-line py-3 text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.06}>
            <h2 className="font-serif text-3xl text-ink">Related solutions</h2>
            <ul className="mt-5 space-y-2">
              {relatedSolutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="flex items-center justify-between border-b border-line py-3 text-ink hover:text-brand"
                  >
                    {solution.name}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Technical specifications are not published on this page. Request a data sheet or a
              conversation with the SNS Meditech team.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {related.length ? (
        <section className="bg-mist py-16">
          <div className="container-page">
            <h2 className="font-serif text-3xl text-ink">Related products</h2>
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      ) : null}

      <CTA title={`Ask about ${product.name}`} />
      </div>
      <ProductEnquiryBar productName={product.name} />
    </>
  );
}
