import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-20 sm:px-10">
      <section aria-labelledby="foundation-title" className="flex max-w-2xl flex-col gap-6">
        <p className="font-mono text-sm font-medium tracking-[0.18em] text-primary uppercase">
          Portfolio foundation
        </p>
        <div className="flex flex-col gap-3">
          <h1
            id="foundation-title"
            className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
          >
            Foundation ready for verified work.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            The application shell, content pipeline, and final case studies arrive in the next
            delivery phases.
          </p>
        </div>
        <div>
          <Button asChild>
            <a href="#foundation-status">Check foundation status</a>
          </Button>
        </div>
        <p id="foundation-status" className="text-sm text-muted-foreground">
          Next.js, Tailwind CSS, accessible UI primitives, and controlled MDX are configured.
        </p>
      </section>
    </main>
  );
}
