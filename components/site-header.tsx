import Link from "next/link";

import { MobileNav } from "@/components/mobile-nav";
import { PageContainer } from "@/components/page-container";
import { PrimaryNav } from "@/components/primary-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur">
      <PageContainer className="flex min-h-16 items-center justify-between gap-3">
        <Button asChild variant="brand" size="sm" className="-ml-3">
          <Link href="/">Yerikho William Tasilima</Link>
        </Button>
        <div className="ml-auto hidden md:block">
          <PrimaryNav />
        </div>
        <div className="hidden md:block">
          <Button asChild>
            <a
              href="/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume (PDF, opens in a new tab)"
            >
              Resume
            </a>
          </Button>
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </PageContainer>
      <Separator />
    </header>
  );
}
