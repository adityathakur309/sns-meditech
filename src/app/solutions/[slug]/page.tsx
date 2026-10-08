import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";
import { getSolution, solutions } from "@/data/solutions";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return pageMetadata({
    title: solution.name,
    description: solution.summary,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const related = products.filter((product) => solution.productSlugs.includes(product.slug));

  return (
    <>
      <section className="bg-ink pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container-page">
          <div className="text-white/55 [&_a]:text-white/70 [&_a:hover]:text-white [&_[aria-current=page]]:text-white">
            <Breadcrumbs
              items={[{ label: "Solutions", href: "/solutions" }, { label: solution.shortName }]}
            />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            {solution.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl text-white text-balance sm:text-5xl">
            {solution.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">{solution.summary}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 text-base leading-relaxed text-muted lg:col-span-7">
            {solution.description.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <aside className="border border-line bg-paper p-6 lg:col-span-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Applications</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink">
              {solution.applications.map((item) => (
                <li key={item} className="border-b border-line py-2 last:border-0">
                  {item}
                </li>
              ))}
            </ul>
            <Button href="/contact" className="mt-6 w-full">
              Request information
            </Button>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="bg-mist py-16 sm:py-20">
          <div className="container-page">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-serif text-3xl text-ink">Related products</h2>
              <Link href="/products" className="text-sm font-semibold text-ink hover:text-brand">
                All products →
              </Link>
            </div>
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      ) : null}

      <CTA />
    </>
  );
}
