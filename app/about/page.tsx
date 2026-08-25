import type { Metadata } from "next";

import { PageContainer } from "@/components/page-container";

export const metadata: Metadata = {
  title: "About",
  description: "The technical focus and evidence standard behind this portfolio.",
};

const focusAreas = [
  {
    title: "Application architecture",
    description:
      "Full-stack TypeScript systems with explicit boundaries across interface, API, domain logic, and persistence.",
  },
  {
    title: "Data integrity",
    description:
      "Transaction flows examined through invariants, concurrency behavior, ledger consistency, and failure states.",
  },
  {
    title: "Verification",
    description:
      "Claims connected to reproducible tests, documented decisions, and public implementation evidence.",
  },
] as const;

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageContainer className="py-16 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <header className="flex flex-col gap-5">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              About / operating principles
            </p>
            <h1 className="text-5xl leading-none font-semibold tracking-[-0.04em] sm:text-6xl">
              Systems thinking, written down.
            </h1>
          </header>

          <div className="flex flex-col gap-12">
            <div className="flex max-w-2xl flex-col gap-5 text-base leading-7 text-muted-foreground sm:text-lg">
              <p>
                This portfolio documents engineering work through observable behavior: the problem,
                the constraints, the decisions made, and the evidence that supports the result.
              </p>
              <p>
                The current technical focus is full-stack TypeScript and PostgreSQL, with particular
                attention to correctness under concurrent transactions. Unsupported performance or
                production-scale claims are intentionally excluded.
              </p>
            </div>

            <section aria-labelledby="focus-title" className="flex flex-col gap-5">
              <h2 id="focus-title" className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Focus areas
              </h2>
              <div className="grid border md:grid-cols-3">
                {focusAreas.map((area, index) => (
                  <article
                    key={area.title}
                    className="flex flex-col gap-5 border-b p-5 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
                  >
                    <p className="font-mono text-xs text-muted-foreground">0{index + 1}</p>
                    <h3 className="text-lg font-semibold">{area.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{area.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="evidence-title" className="flex max-w-2xl flex-col gap-4 border-l border-primary pl-5">
              <h2 id="evidence-title" className="text-xl font-semibold">
                Evidence before adjectives
              </h2>
              <p className="leading-7 text-muted-foreground">
                Each published result is bounded by its test scenario and environment. Repositories,
                architecture decisions, and test records are linked where they are genuinely public.
              </p>
            </section>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
