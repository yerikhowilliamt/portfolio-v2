import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <>
      <Separator />
      <footer>
        <PageContainer className="flex flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span className="font-mono">2026</span> Technical Portfolio.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-1">
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
            </ul>
          </nav>
        </PageContainer>
      </footer>
    </>
  );
}
