import Link from "next/link";

import { PageContainer } from "@/components/page-container";
import { PrimaryNav } from "@/components/primary-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <PageContainer className="grid items-center gap-3 py-3 sm:min-h-16 sm:grid-cols-[auto_1fr_auto] sm:py-0">
        <Link href="/" className="w-fit rounded-sm font-mono text-xs font-semibold tracking-[0.18em] uppercase">
          Systems / Work
        </Link>
        <div className="sm:justify-self-end">
          <PrimaryNav />
        </div>
        <a
          href="/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Resume (PDF, opens in a new tab)"
          className="inline-flex min-h-9 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover active:bg-primary-active sm:w-auto"
        >
          Resume
        </a>
      </PageContainer>
    </header>
  );
}
