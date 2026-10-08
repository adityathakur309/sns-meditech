import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="bg-ink pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div className="container-page">
        <div className="text-white/55 [&_a]:text-white/70 [&_a:hover]:text-white [&_[aria-current=page]]:text-white">
          <Breadcrumbs items={crumbs} />
        </div>
        {eyebrow ? (
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-brand">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl text-white text-balance sm:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
