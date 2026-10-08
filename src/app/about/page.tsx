import { AnimatedSection } from "@/components/AnimatedSection";
import { CTA } from "@/components/CTA";
import { PageHero } from "@/components/PageHero";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: company.summary,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="SNS Meditech"
        description={`Established ${company.established}. A medical equipment distribution and consulting company based in Chandigarh.`}
        crumbs={[{ label: "About" }]}
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <AnimatedSection className="lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed text-muted">
              {company.about.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection className="lg:col-span-5" delay={0.08}>
            <aside className="border border-line bg-paper p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">At a glance</p>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-sm text-muted">Established</dt>
                  <dd className="mt-1 font-medium text-ink">{company.established}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Role</dt>
                  <dd className="mt-1 font-medium text-ink">Distributor and healthcare consultant</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Serves</dt>
                  <dd className="mt-1 font-medium text-ink">Hospitals, clinics, and laboratories</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Location</dt>
                  <dd className="mt-1 font-medium text-ink">{company.contact.address}</dd>
                </div>
              </dl>
            </aside>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-mist py-16 sm:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <AnimatedSection className="border border-line bg-paper p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Mission</p>
            <h2 className="mt-3 font-serif text-3xl text-ink">What we work toward</h2>
            <p className="mt-4 leading-relaxed text-muted">{company.mission}</p>
          </AnimatedSection>
          <AnimatedSection className="border border-line bg-paper p-7 sm:p-9" delay={0.08}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Vision</p>
            <h2 className="mt-3 font-serif text-3xl text-ink">The company we are building</h2>
            <p className="mt-4 leading-relaxed text-muted">{company.vision}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-page">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Values</p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl text-ink sm:text-4xl">
              {company.valuesIntro}
            </h2>
          </AnimatedSection>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {company.values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.04} className="border border-line bg-paper p-6">
                <h3 className="text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.body}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <AnimatedSection className="container-page max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Team</p>
          <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">Founder’s brief</h2>
          <div className="mt-6 space-y-5 leading-relaxed text-muted">
            {company.founder.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <CTA title="Speak with the SNS Meditech team" />
    </>
  );
}
