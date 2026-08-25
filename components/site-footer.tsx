import { PageContainer } from "@/components/page-container";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <PageContainer className="flex flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Technical Portfolio.</p>
        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-5">
            <li>
              <a
                href="https://github.com/yerikhowilliamt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub (opens in a new tab)"
                className="rounded-sm text-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/yerikhowilliamt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in a new tab)"
                className="rounded-sm text-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </PageContainer>
    </footer>
  );
}
