import Link from "next/link";

import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <>
      <Separator />
      <footer>
        <PageContainer className="grid gap-8 py-10 text-sm text-muted-foreground md:grid-cols-[1fr_auto] md:items-end">
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold text-foreground">Yerikho William Tasilima</p>
            <p>Software Engineer · Evidence-led full-stack systems.</p>
            <p className="pt-3">© <span className="font-mono">2026</span> Yerikho William Tasilima.</p>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center gap-1 md:justify-end">
              <li>
                <Button asChild variant="link" size="sm">
                  <a href="mailto:yerikhowilliamt@gmail.com">Email</a>
                </Button>
              </li>
              <li>
                <Button asChild variant="link" size="sm">
                  <a
                    href="https://github.com/yerikhowilliamt"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub (opens in a new tab)"
                  >
                    GitHub
                  </a>
                </Button>
              </li>
              <li>
                <Button asChild variant="link" size="sm">
                  <a
                    href="https://www.linkedin.com/in/yerikhowilliamt"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn (opens in a new tab)"
                  >
                    LinkedIn
                  </a>
                </Button>
              </li>
              <li>
                <Button asChild variant="link" size="sm">
                  <Link
                    href="/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Resume (opens in a new tab)"
                  >
                    Resume
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </PageContainer>
      </footer>
    </>
  );
}
