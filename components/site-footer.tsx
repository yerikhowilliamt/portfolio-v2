import { PageContainer } from "@/components/page-container";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <PageContainer className="flex flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Technical Portfolio.</p>
        <a
          href="https://github.com/yerikhowilliamt/ohmypos"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub / OhMyPos (opens in a new tab)"
          className="w-fit rounded-sm text-foreground underline-offset-4 hover:text-primary hover:underline"
        >
          GitHub / OhMyPos
        </a>
      </PageContainer>
    </footer>
  );
}
