import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-ink pt-24">
      <div className="container-page max-w-2xl py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">404</p>
        <h1 className="mt-4 font-serif text-4xl text-white sm:text-5xl">This page is not in the catalogue.</h1>
        <p className="mt-4 text-white/68">
          The address may have changed, or the page does not exist. Continue from solutions, products, or
          contact.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Back home</Button>
          <Button href="/contact" variant="ghost">
            Talk to Our Team
          </Button>
        </div>
      </div>
    </section>
  );
}
