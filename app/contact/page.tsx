import type { Metadata } from "next";

import { PageContainer } from "@/components/page-container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Public email, professional profiles, and resume for Yerikho William Tasilima.",
};

const publicDestinations = [
  {
    label: "Email",
    description: "Send a direct message about engineering roles or technical collaboration.",
    href: "mailto:yerikhowilliamt@gmail.com",
    newTab: false,
  },
  {
    label: "LinkedIn",
    description: "View the public professional profile and employment history.",
    href: "https://www.linkedin.com/in/yerikhowilliamt",
    newTab: true,
  },
  {
    label: "GitHub",
    description: "Inspect public repositories and implementation history.",
    href: "https://github.com/yerikhowilliamt",
    newTab: true,
  },
  {
    label: "Resume",
    description: "Open the current public CV as a two-page PDF.",
    href: "/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf",
    newTab: true,
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
              For engineering opportunities, technical interviews, or project discussions, use any
              of the verified public channels below.
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
                target={destination.newTab ? "_blank" : undefined}
                rel={destination.newTab ? "noopener noreferrer" : undefined}
                aria-label={
                  destination.newTab
                    ? `${destination.label} (opens in a new tab)`
                    : destination.label
                }
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
                  {destination.newTab ? "↗" : "→"}
                </span>
              </a>
            ))}
          </section>
        </div>
      </PageContainer>
    </main>
  );
}
