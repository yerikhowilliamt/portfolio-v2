import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageContainer } from "@/components/page-container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  getProjectBySlug,
  getPublishedProjects,
  InvalidProjectSlugError,
} from "@/lib/mdx";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getPublishedProjects();

  return projects.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

async function resolveProject(slug: string) {
  try {
    return await getProjectBySlug(slug);
  } catch (error) {
    if (error instanceof InvalidProjectSlugError) {
      return undefined;
    }

    throw error;
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await resolveProject(slug);

  if (!project) {
    notFound();
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await resolveProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main id="main-content">
      <PageContainer className="py-16 sm:py-24">
        <article>
          <header className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                Case study / {project.frontmatter.slug}
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
                {project.frontmatter.stack.map((technology) => (
                  <li key={technology}>
                    <Badge variant="technical">{technology}</Badge>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="text-5xl leading-none font-semibold tracking-[-0.04em] text-balance sm:text-7xl">
                {project.frontmatter.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                {project.frontmatter.summary}
              </p>
            </div>
          </header>
          <Separator className="mt-12" />

          <div className="project-content mx-auto mt-12 max-w-3xl">{project.content}</div>
        </article>
      </PageContainer>
    </main>
  );
}
