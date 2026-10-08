import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { ProductGallery } from "@/components/ProductGallery";
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

  return (
    <>
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
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/contact?interest=${encodeURIComponent(product.name)}`} showArrow>
                  Request information
                </Button>
                <Button href="/products" variant="outline">
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
    </>
  );
}
