import Link from "next/link";

import { PageContainer } from "@/components/page-container";
import { PrimaryNav } from "@/components/primary-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <PageContainer className="flex flex-col gap-3 py-3 sm:min-h-16 sm:flex-row sm:items-center sm:justify-between sm:py-0">
        <Link href="/" className="w-fit rounded-sm font-mono text-xs font-semibold tracking-[0.18em] uppercase">
          Systems / Work
        </Link>
        <PrimaryNav />
      </PageContainer>
    </header>
  );
}
