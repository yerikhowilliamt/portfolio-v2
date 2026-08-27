import { PageContainer } from "@/components/page-container";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPublishedProjects } from "@/lib/mdx";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  title: "Projects",
  description:
    "Evidence-led engineering case studies by Yerikho William Tasilima, with system constraints, architecture decisions, verified outcomes, and technical proof.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <main id="main-content">
      <PageContainer className="py-16 sm:py-24 lg:py-28">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="flex max-w-4xl flex-col gap-5 lg:col-span-8">
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Projects / evidence index
            </p>
            <h1 className="text-5xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-7xl">
              Engineering decisions, constraints, and proof.
            </h1>
          </div>
          <div className="flex flex-col items-start gap-4 lg:col-span-4">
            <Badge variant="technical">{projects.length.toString().padStart(2, "0")} published</Badge>
            <p className="max-w-xl leading-7 text-muted-foreground">
              Case studies are published only when their claims, limitations, and evidence boundary are explicit.
            </p>
          </div>
        </header>
      </PageContainer>
      <Separator />
      <PageContainer className="py-16 sm:py-24">
        <section aria-label="Published projects" className="flex flex-col gap-6">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </section>
      </PageContainer>
    </main>
  );
}
