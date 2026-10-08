import { Button } from "@/components/Button";
import { AnimatedSection } from "@/components/AnimatedSection";

type CTAProps = {
  title?: string;
  description?: string;
};

export function CTA({
  title = "Ready to specify the right technology?",
  description = "Tell us about the department, procedure mix, or product you are evaluating. Our team will respond with relevant options from the SNS Meditech catalogue.",
}: CTAProps) {
  return (
    <section className="bg-ink">
      <AnimatedSection className="container-page flex flex-col items-start justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Enquire</p>
          <h2 className="mt-3 font-serif text-3xl text-white text-balance sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/68">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact">Talk to Our Team</Button>
          <Button href="/products" variant="ghost">
            View products
          </Button>
        </div>
      </AnimatedSection>
    </section>
  );
}
