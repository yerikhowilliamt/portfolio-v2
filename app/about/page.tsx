import Link from "next/link";

import { PageContainer } from "@/components/page-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "How Yerikho William Tasilima owns full-stack TypeScript systems from business rules and transaction boundaries to persistence, failure modes, and verification.",
  path: "/about",
});

const focusAreas = [
  {
    number: "01",
    title: "Application architecture",
    description:
      "Full-stack TypeScript systems with explicit boundaries across interface, API, domain logic, and persistence.",
  },
  {
    number: "02",
    title: "Data integrity",
    description:
      "Transaction flows examined through invariants, concurrency behavior, ledger consistency, and failure states.",
  },
  {
    number: "03",
    title: "Verification",
    description:
      "Claims connected to reproducible tests, documented decisions, and public implementation evidence.",
  },
] as const;

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageContainer className="py-16 sm:py-24 lg:py-28">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-5 lg:col-span-7">
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              About / professional profile
            </p>
            <h1 className="text-5xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-7xl">
              Software engineering with explicit ownership.
            </h1>
          </div>
          <div className="flex max-w-2xl flex-col gap-4 text-base leading-8 text-muted-foreground sm:text-lg lg:col-span-5">
            <p>
              I am Yerikho William Tasilima, a Software Engineer focused on full-stack TypeScript
              systems and PostgreSQL-backed business workflows.
            </p>
            <p>
              My work emphasizes observable behavior: define the rule, make the trade-off visible,
              and verify the result at the boundary where it can fail.
            </p>
          </div>
        </header>
      </PageContainer>

      <Separator />
      <section aria-labelledby="focus-title">
        <PageContainer className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Current focus
              </p>
              <h2 id="focus-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Where I go deepest.
              </h2>
            </div>
            <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
              {focusAreas.map((area) => (
                <article key={area.number} className="flex flex-col gap-4">
                  <Badge variant="technical" className="w-fit">{area.number}</Badge>
                  <h3 className="text-xl font-semibold">{area.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{area.description}</p>
                </article>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <Separator />
      <section aria-labelledby="ownership-title">
        <PageContainer className="grid gap-10 py-16 sm:py-24 lg:grid-cols-12">
          <div className="flex max-w-2xl flex-col gap-5 lg:col-span-7">
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              How I work
            </p>
            <h2 id="ownership-title" className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Follow the system from business rule to failure mode.
            </h2>
            <p className="leading-8 text-muted-foreground">
              A feature is more than its interface. I trace the request through validation,
              domain rules, transactions, persistence, and user-visible recovery so correctness is
              owned across the full path.
            </p>
          </div>
          <div className="lg:col-span-5">
            <Alert role="note">
              <AlertTitle>Evidence before adjectives</AlertTitle>
              <AlertDescription>
                Published results remain bounded by their test scenario. Repositories,
                architecture decisions, and test records are linked only when they are genuinely
                public.
              </AlertDescription>
            </Alert>
          </div>
        </PageContainer>
      </section>

      <Separator />
      <PageContainer className="flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold">Inspect the work, then start a conversation.</h2>
          <p className="mt-2 leading-7 text-muted-foreground">
            The project index shows the publishing contract; OhMyPos source provides the deeper public implementation evidence.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild><Link href="/projects">View projects</Link></Button>
          <Button asChild variant="outline"><Link href="/contact">Contact me</Link></Button>
        </div>
      </PageContainer>
    </main>
  );
}
