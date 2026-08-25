import Link from "next/link";

import { PageContainer } from "@/components/page-container";
import { PrimaryNav } from "@/components/primary-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur">
      <PageContainer className="grid items-center gap-3 py-3 sm:min-h-16 sm:grid-cols-[auto_1fr_auto] sm:py-0">
        <Button asChild variant="brand" size="sm">
          <Link href="/">Systems / Work</Link>
        </Button>
        <div className="sm:justify-self-end">
          <PrimaryNav />
        </div>
        <Button asChild className="w-full sm:w-auto">
          <a
            href="/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume (PDF, opens in a new tab)"
          >
            Resume
          </a>
        </Button>
      </PageContainer>
      <Separator />
    </header>
  );
}
