import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { SolutionCard } from "@/components/SolutionCard";
import { solutions } from "@/data/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Solutions",
  description:
    "SNS Meditech specialties: anesthesia and critical care, surgery, gastroenterology, neonatal care, hospital infrastructure, monitoring, and electrosurgery.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Clinical specialties we support."
        description="Each solution maps to catalogue families already listed by SNS Meditech — not invented service lines."
        crumbs={[{ label: "Solutions" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.slug} solution={solution} index={index} />
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
