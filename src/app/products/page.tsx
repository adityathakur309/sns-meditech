import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { ProductCatalogue } from "@/components/ProductCatalogue";
import { products } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Browse the SNS Meditech medical technology catalogue — anaesthesia, ventilation, monitoring, neonatal care, infrastructure, and electrosurgery.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="A clinical technology catalogue."
        description={`${products.length} systems and categories from the current SNS Meditech range. Showcase only — no cart, no checkout.`}
        crumbs={[{ label: "Products" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <ProductCatalogue />
        </div>
      </section>
      <CTA />
    </>
  );
}
