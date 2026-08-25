import Link from "next/link";

import { PageContainer } from "@/components/page-container";

export default function Home() {
  return (
    <main id="main-content">
      <PageContainer className="py-16 sm:py-24 lg:py-32">
        <section aria-labelledby="home-title" className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="flex max-w-4xl flex-col gap-7">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              Full-stack TypeScript / system correctness
            </p>
            <div className="flex flex-col gap-5">
              <h1
                id="home-title"
                className="text-5xl leading-[0.98] font-semibold tracking-[-0.045em] text-balance sm:text-7xl lg:text-8xl"
              >
                Engineering work you can inspect, not just read about.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                An evidence-led portfolio focused on transaction integrity, explicit trade-offs,
                and technical decisions connected to public artifacts.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/yerikhowilliamt/ohmypos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Inspect OhMyPos source (opens in a new tab)"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover active:bg-primary-active"
              >
                Inspect OhMyPos source
              </a>
              <Link
                href="/about"
                className="inline-flex min-h-11 items-center justify-center rounded-md border px-5 text-sm font-semibold transition-colors hover:bg-accent"
              >
                Read the approach
              </Link>
            </div>
          </div>

          <aside aria-label="Portfolio reading guide" className="border-l border-primary pl-5 font-mono text-xs leading-6 text-muted-foreground">
            <p className="text-primary">EVIDENCE_LEDGER</p>
            <p>01 / verified outcome</p>
            <p>02 / implementation trade-off</p>
            <p>03 / public technical evidence</p>
          </aside>
        </section>
      </PageContainer>

      <section aria-labelledby="featured-work-title" className="border-y bg-card">
        <PageContainer className="py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Featured evidence / OhMyPos
              </p>
              <h2 id="featured-work-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Concurrent settlement integrity, tested end to end.
              </h2>
              <p className="max-w-xl leading-7 text-muted-foreground">
                A multi-branch POS system built to keep sales, inventory, and financial ledgers
                consistent under concurrent transactions.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <dl className="grid border sm:grid-cols-3">
                <div className="flex flex-col gap-2 border-b p-5 sm:border-r sm:border-b-0">
                  <dt className="font-mono text-xs text-muted-foreground uppercase">Requests</dt>
                  <dd className="font-mono text-3xl font-semibold text-primary">30</dd>
                </div>
                <div className="flex flex-col gap-2 border-b p-5 sm:border-r sm:border-b-0">
                  <dt className="font-mono text-xs text-muted-foreground uppercase">Resolved</dt>
                  <dd className="font-mono text-3xl font-semibold">15 / 15</dd>
                  <dd className="text-xs text-muted-foreground">successes / conflicts</dd>
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <dt className="font-mono text-xs text-muted-foreground uppercase">Server errors</dt>
                  <dd className="font-mono text-3xl font-semibold text-primary">0</dd>
                </div>
              </dl>
              <p className="text-sm leading-6 text-muted-foreground">
                30 concurrent settlement requests against a single payable resolved into exactly 15
                successes and 15 conflicts — final balance Rp0.00, zero server errors. This is a
                bounded correctness result from the recorded test scenario, not a latency or
                production-traffic claim.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                <a
                  href="https://ohmypos.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo (opens in a new tab)"
                  className="text-primary underline-offset-4 hover:text-primary-hover hover:underline"
                >
                  Live demo
                </a>
                <a
                  href="https://github.com/yerikhowilliamt/ohmypos/blob/main/docs/02%20-%20ADR.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Architecture decisions (opens in a new tab)"
                  className="text-primary underline-offset-4 hover:text-primary-hover hover:underline"
                >
                  Architecture decisions
                </a>
                <a
                  href="https://github.com/yerikhowilliamt/ohmypos/tree/main/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Project documentation (opens in a new tab)"
                  className="text-primary underline-offset-4 hover:text-primary-hover hover:underline"
                >
                  Project documentation
                </a>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>
    </main>
  );
}
