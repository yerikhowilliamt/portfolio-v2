import Link from "next/link";

import { PageContainer } from "@/components/page-container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
              <Button asChild size="lg">
                <a
                  href="https://github.com/yerikhowilliamt/ohmypos"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Inspect OhMyPos source (opens in a new tab)"
                >
                  Inspect OhMyPos source
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Read the approach</Link>
              </Button>
            </div>
          </div>

          <aside aria-label="Portfolio reading guide">
            <Alert role="note">
              <AlertTitle>EVIDENCE_LEDGER</AlertTitle>
              <AlertDescription>
                <ol className="font-mono text-xs leading-6">
                  <li>01 / verified outcome</li>
                  <li>02 / implementation trade-off</li>
                  <li>03 / public technical evidence</li>
                </ol>
              </AlertDescription>
            </Alert>
          </aside>
        </section>
      </PageContainer>

      <Separator />
      <section aria-labelledby="featured-work-title">
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

            <Card>
              <CardHeader>
                <CardTitle>Recorded concurrency scenario</CardTitle>
                <CardDescription>
                  30 concurrent settlement requests against a single payable resolved into exactly
                  15 successes and 15 conflicts — final balance Rp0.00, zero server errors. This is
                  a bounded correctness result from the recorded test scenario, not a latency or
                  production-traffic claim.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="grid gap-6 sm:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <dt><Badge variant="technical">Requests</Badge></dt>
                    <dd className="font-mono text-3xl font-semibold text-primary">30</dd>
                  </div>
                  <div className="flex flex-col gap-2">
                    <dt><Badge variant="technical">Resolved</Badge></dt>
                    <dd className="font-mono text-3xl font-semibold">15 / 15</dd>
                    <dd className="text-xs text-muted-foreground">successes / conflicts</dd>
                  </div>
                  <div className="flex flex-col gap-2">
                    <dt><Badge variant="technical">Server errors</Badge></dt>
                    <dd className="font-mono text-3xl font-semibold text-primary">0</dd>
                  </div>
                </dl>
              </CardContent>
              <CardFooter className="flex-wrap gap-1">
                <Button asChild variant="link" size="sm">
                  <a
                    href="https://ohmypos.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live demo (opens in a new tab)"
                  >
                    Live demo
                  </a>
                </Button>
                <Button asChild variant="link" size="sm">
                  <a
                    href="https://github.com/yerikhowilliamt/ohmypos/blob/main/docs/02%20-%20ADR.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Architecture decisions (opens in a new tab)"
                  >
                    Architecture decisions
                  </a>
                </Button>
                <Button asChild variant="link" size="sm">
                  <a
                    href="https://github.com/yerikhowilliamt/ohmypos/tree/main/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Project documentation (opens in a new tab)"
                  >
                    Project documentation
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </PageContainer>
      </section>
      <Separator />
    </main>
  );
}
