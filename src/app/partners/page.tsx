import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { PartnerLogo } from "@/components/PartnerLogo";
import { partners } from "@/data/partners";
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
        title="Manufacturer relationships visible in the catalogue."
        description="SNS Meditech partners with trusted manufacturers so the products it distributes can meet international standards of quality and safety."
        crumbs={[{ label: "Partners" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="container-page space-y-6">
          {partners.map((partner, index) => (
            <AnimatedSection
              key={partner.slug}
              delay={index * 0.05}
              className="grid items-center gap-8 border border-line bg-paper p-6 sm:p-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-4">
                <PartnerLogo partner={partner} className="border-0 bg-transparent px-0" />
              </div>
              <div className="lg:col-span-8">
                <h2 className="font-serif text-3xl text-ink">{partner.name}</h2>
                <p className="mt-3 text-muted">{partner.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {partner.focus.map((item) => (
                    <li key={item} className="border border-line bg-mist px-3 py-1.5 text-xs font-medium text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
      <CTA title="Discuss a technology partnership or supply brief" />
    </>
  );
}
