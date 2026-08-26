import Link from "next/link";

import { PageContainer } from "@/components/page-container";
import { ProjectScreenshot } from "@/components/project-screenshot";
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
import { getProjectVisuals } from "@/lib/project-visuals";

const capabilities = [
  {
    number: "01",
    title: "Transaction correctness",
    description:
      "Model invariants, concurrency paths, and failure states before treating a workflow as complete.",
  },
  {
    number: "02",
    title: "Full-stack ownership",
    description:
      "Connect interface behavior, API contracts, domain rules, and persistence decisions into one inspectable system.",
  },
  {
    number: "03",
    title: "Evidence-led delivery",
    description:
      "Bound public claims to reproducible tests, documented trade-offs, and artifacts that reviewers can inspect.",
  },
] as const;

export default function Home() {
  const ohmyposVisuals = getProjectVisuals("ohmypos");

  return (
    <main id="main-content">
      <PageContainer className="py-16 sm:py-24 lg:py-28">
        <section
          aria-labelledby="home-title"
          className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-10"
        >
          <div className="flex flex-col gap-7 lg:col-span-7">
            <div className="flex flex-col gap-3">
              <p className="text-lg font-semibold text-foreground">Yerikho William Tasilima</p>
              <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Software Engineer
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <h1
                id="home-title"
                className="max-w-4xl text-5xl leading-[1.02] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-[5.25rem]"
              >
                Building business systems that stay correct under pressure.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                I build full-stack TypeScript systems with explicit transaction boundaries,
                traceable engineering decisions, and verification tied to public evidence.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#selected-work">View selected work</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href="/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open resume (PDF, opens in a new tab)"
                >
                  Open resume
                </a>
              </Button>
              <Button asChild size="lg" variant="link">
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>

          {ohmyposVisuals ? (
            <ProjectScreenshot
              visual={ohmyposVisuals.primary}
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
              className="lg:col-span-5"
            />
          ) : null}
        </section>
      </PageContainer>

      <Separator />
      <section id="selected-work" aria-labelledby="selected-work-title" className="scroll-mt-24">
        <PageContainer className="py-16 sm:py-24 lg:py-28">
          <div className="mb-10 flex max-w-3xl flex-col gap-4">
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Selected work / OhMyPos
            </p>
            <h2 id="selected-work-title" className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Correctness across sales, inventory, and financial ledgers.
            </h2>
          </div>

          <Card>
            <div className="grid lg:grid-cols-[7fr_auto_5fr]">
              <CardHeader className="gap-5 lg:p-10">
                <Badge variant="technical" className="w-fit">Multi-branch POS</Badge>
                <CardTitle className="text-3xl leading-tight sm:text-4xl">
                  One operational system, multiple consistency boundaries.
                </CardTitle>
                <CardDescription className="max-w-2xl text-base leading-7">
                  A multi-branch POS system built to keep sales, inventory, and financial ledgers
                  consistent under concurrent transactions.
                </CardDescription>
              </CardHeader>
              <Separator className="lg:hidden" />
              <Separator orientation="vertical" className="hidden lg:block" />
              <CardContent className="flex flex-col justify-center gap-6 p-6 lg:p-10">
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-xs text-primary uppercase">Recorded result</p>
                  <p className="leading-7 text-foreground">
                    30 concurrent settlement requests resolved into exactly 15 successes and 15
                    conflicts, with a final balance of <span className="font-mono">Rp0.00</span>
                    and zero server errors.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2" aria-label="OhMyPos technology stack">
                  {["Next.js", "NestJS", "PostgreSQL", "Prisma"].map((technology) => (
                    <li key={technology}><Badge variant="technical">{technology}</Badge></li>
                  ))}
                </ul>
              </CardContent>
            </div>
            <Separator />
            <CardFooter className="flex-wrap gap-2 py-5">
              <Button asChild>
                <a
                  href="https://ohmypos.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open live demo (opens in a new tab)"
                >
                  Open live demo <span aria-hidden="true">↗</span>
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://github.com/yerikhowilliamt/ohmypos"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Inspect source (opens in a new tab)"
                >
                  Inspect source <span aria-hidden="true">↗</span>
                </a>
              </Button>
              <Button asChild variant="link">
                <a
                  href="https://github.com/yerikhowilliamt/ohmypos/tree/main/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Read technical documentation (opens in a new tab)"
                >
                  Read technical documentation
                </a>
              </Button>
            </CardFooter>
          </Card>
        </PageContainer>
      </section>

      <Separator />
      <section aria-labelledby="capabilities-title">
        <PageContainer className="py-16 sm:py-24 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="flex max-w-xl flex-col gap-4 lg:col-span-4">
              <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Engineering focus
              </p>
              <h2 id="capabilities-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                From business rule to verifiable behavior.
              </h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
              {capabilities.map((capability) => (
                <article key={capability.number} className="flex flex-col gap-4">
                  <Badge variant="technical" className="w-fit">{capability.number}</Badge>
                  <h3 className="text-xl font-semibold">{capability.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{capability.description}</p>
                </article>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <Separator />
      <section aria-labelledby="approach-title">
        <PageContainer className="grid gap-10 py-16 sm:py-24 lg:grid-cols-12 lg:py-28">
          <div className="flex max-w-2xl flex-col gap-5 lg:col-span-7">
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Professional approach
            </p>
            <h2 id="approach-title" className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Technical depth should remain easy to inspect.
            </h2>
            <p className="leading-8 text-muted-foreground">
              My portfolio separates facts from claims: each case study states its constraints,
              records trade-offs, and keeps limitations visible alongside the outcome.
            </p>
          </div>
          <div className="flex items-end lg:col-span-5 lg:justify-end">
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Read how I work</Link>
            </Button>
          </div>
        </PageContainer>
      </section>

      <Separator />
      <section aria-labelledby="contact-cta-title">
        <PageContainer className="py-16 sm:py-24">
          <Card>
            <CardHeader className="max-w-3xl gap-4 sm:p-10">
              <Badge variant="technical" className="w-fit">Open a conversation</Badge>
              <CardTitle id="contact-cta-title" className="text-3xl sm:text-4xl">
                Looking for a Software Engineer who makes system behavior inspectable?
              </CardTitle>
              <CardDescription className="text-base leading-7">
                Start with the public work, then reach me directly by email or LinkedIn.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex-wrap gap-3 sm:px-10 sm:pb-10">
              <Button asChild size="lg"><Link href="/contact">Contact Yerikho</Link></Button>
              <Button asChild size="lg" variant="outline"><Link href="/projects">Browse case studies</Link></Button>
            </CardFooter>
          </Card>
        </PageContainer>
      </section>
    </main>
  );
}
