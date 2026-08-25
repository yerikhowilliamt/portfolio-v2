import type { Metadata } from "next";

import { PageContainer } from "@/components/page-container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Verified public destinations for reviewing the portfolio's current technical work.",
};

const publicDestinations = [
  {
    label: "Source repository",
    description: "Inspect the OhMyPos implementation and repository history.",
    href: "https://github.com/yerikhowilliamt/ohmypos",
  },
  {
    label: "Live demo",
    description: "Open the public OhMyPos application entry point.",
    href: "https://ohmypos.vercel.app",
  },
  {
    label: "Architecture decisions",
    description: "Review recorded technical decisions and their trade-offs.",
    href: "https://github.com/yerikhowilliamt/ohmypos/blob/main/docs/02%20-%20ADR.md",
  },
] as const;

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageContainer className="py-16 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <header className="flex max-w-xl flex-col gap-5">
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              Contact / public channels
            </p>
            <h1 className="text-5xl leading-none font-semibold tracking-[-0.04em] sm:text-6xl">
              Start with the work.
            </h1>
            <p className="leading-7 text-muted-foreground">
              Direct email, LinkedIn, and CV destinations are not published on this site yet. The
              verified project surfaces below remain available for technical review.
            </p>
          </header>

          <section aria-labelledby="public-destinations-title" className="flex flex-col gap-4">
            <h2 id="public-destinations-title" className="sr-only">
              Public project destinations
            </h2>
            {publicDestinations.map((destination, index) => (
              <a
                key={destination.href}
                href={destination.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${destination.label} (opens in a new tab)`}
                className="group grid gap-3 border p-5 transition-colors hover:border-primary hover:bg-card sm:grid-cols-[3rem_1fr_auto] sm:items-center"
              >
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <span className="flex flex-col gap-1">
                  <span className="font-semibold">{destination.label}</span>
                  <span className="text-sm leading-6 text-muted-foreground">
                    {destination.description}
                  </span>
                </span>
                <span aria-hidden="true" className="font-mono text-sm text-muted-foreground group-hover:text-primary">
                  ↗
                </span>
              </a>
            ))}
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
