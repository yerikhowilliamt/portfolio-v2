import type { Metadata } from "next";

import { PageContainer } from "@/components/page-container";
import { ProjectCard } from "@/components/project-card";
import { getPublishedProjects } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Projects",
  description: "Evidence-led engineering case studies with explicit decisions and trade-offs.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <main id="main-content">
      <PageContainer className="py-16 sm:py-24">
        <header className="flex max-w-3xl flex-col gap-5">
          <p className="font-mono text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Projects / evidence index
          </p>
          <h1 className="text-5xl leading-none font-semibold tracking-[-0.04em] sm:text-7xl">
            Decisions, constraints, and proof.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Case studies organized for a fast technical scan, with claims bounded by the evidence
            each project can expose publicly.
          </p>
        </header>

        <section aria-label="Published projects" className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </section>
      </PageContainer>
    </main>
  );
}
