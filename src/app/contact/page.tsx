import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Enquire with SNS Meditech in Chandigarh. Email ${company.contact.email} or call ${company.contact.phone}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our team."
        description="Share the department, product, or project you are evaluating. This form sends an enquiry to SNS Meditech — it is not an order."
        crumbs={[{ label: "Contact" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl text-ink">SNS Meditech</h2>
            <address className="mt-6 space-y-4 text-sm not-italic leading-relaxed text-muted">
              <p>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-brand">Address</span>
                {company.contact.address}
              </p>
              <p>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-brand">Email</span>
                <a className="text-ink hover:text-brand" href={`mailto:${company.contact.email}`}>
                  {company.contact.email}
                </a>
              </p>
              <p>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-brand">Phone</span>
                <a className="text-ink hover:text-brand" href={`tel:${company.contact.phoneRaw}`}>
                  {company.contact.phone}
                </a>
              </p>
              <p>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-brand">Landline</span>
                <a className="text-ink hover:text-brand" href={`tel:${company.contact.landlineRaw}`}>
                  {company.contact.landline}
                </a>
              </p>
            </address>
          </div>
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="min-h-[28rem] border border-line bg-paper" aria-hidden="true" />
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
