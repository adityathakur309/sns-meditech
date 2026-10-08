import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { PartnerCard } from "@/components/PartnerCard";
import { partners } from "@/data/partners";
import { getProductsByPartnerSlug } from "@/data/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partners",
  description:
    "Manufacturer brands featured in the SNS Meditech catalogue: Dräger, Erbe, and Fujifilm Medwork.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Manufacturer relationships that power the catalogue."
        description="Each partner contributes multiple systems across SNS Meditech’s solutions. Select a company to browse its products, then request information for your department."
        crumbs={[{ label: "Partners" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="container-page">
          <AnimatedSection>
            <p className="max-w-2xl text-muted">
              SNS Meditech partners with trusted manufacturers so the products it distributes can meet
              international standards of quality and safety.
            </p>
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
      <CTA title="Discuss a technology partnership or supply brief" />
    </>
  );
}
