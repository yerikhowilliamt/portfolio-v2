import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageContainer } from "@/components/page-container";
import { ProjectScreenshot } from "@/components/project-screenshot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getProjectBySlug,
  getPublishedProjects,
  InvalidProjectSlugError,
  REQUIRED_SECTION_TITLES,
} from "@/lib/mdx";
import { getProjectVisuals } from "@/lib/project-visuals";

type ProjectPageProps = { params: Promise<{ slug: string }> };

function sectionId(title: string) {
  return title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

async function resolveProject(slug: string) {
  try {
    return await getProjectBySlug(slug);
  } catch (error) {
    if (error instanceof InvalidProjectSlugError) return undefined;
    throw error;
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await resolveProject(slug);
  if (!project) notFound();
  return { title: project.frontmatter.title, description: project.frontmatter.summary };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await resolveProject(slug);
  if (!project) notFound();
  const visuals = getProjectVisuals(slug);

  return (
    <main id="main-content">
      <PageContainer className="py-16 sm:py-24 lg:py-28">
        <Button asChild variant="ghost" size="sm" className="mb-10 -ml-3">
          <Link href="/projects"><span aria-hidden="true">←</span> All projects</Link>
        </Button>
        <article>
          <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="flex flex-col gap-5 lg:col-span-8">
              <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                Case study / {project.frontmatter.slug}
              </p>
              <h1 className="text-5xl leading-[1.04] font-semibold tracking-[-0.04em] sm:text-7xl">
                {project.frontmatter.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
                {project.frontmatter.summary}
              </p>
            </div>
            <div className="lg:col-span-4">
              <p className="mb-3 font-mono text-xs text-muted-foreground uppercase">Technology stack</p>
              <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
                {project.frontmatter.stack.map((technology) => (
                  <li key={technology}><Badge variant="technical">{technology}</Badge></li>
                ))}
              </ul>
            </div>
          </header>

          {visuals ? (
            <section
              aria-label={`${project.frontmatter.title} interface gallery`}
              className="mt-12 flex flex-col gap-6"
            >
              <ProjectScreenshot
                visual={visuals.primary}
                sizes="(min-width: 1280px) 1200px, 100vw"
                priority
              />
              <div className="grid gap-6 md:grid-cols-2">
                {visuals.secondary.map((visual) => (
                  <ProjectScreenshot
                    key={visual.caption}
                    visual={visual}
                    sizes="(min-width: 1280px) 588px, (min-width: 768px) 50vw, 100vw"
                  />
                ))}
              </div>
            </section>
          ) : null}

          <Separator className="my-12" />
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-4">
              <Card className="lg:sticky lg:top-24">
                <CardHeader>
                  <Badge variant="technical" className="w-fit">Reading guide</Badge>
                  <CardTitle>Case-study structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav aria-label="Case study sections">
                    <ol className="flex flex-col gap-1">
                      {REQUIRED_SECTION_TITLES.map((title, index) => (
                        <li key={title}>
                          <Button asChild variant="ghost" size="sm" className="h-auto w-full justify-start whitespace-normal py-2 text-left">
                            <a href={`#${sectionId(title)}`}>
                              <span className="font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                              {title}
                            </a>
                          </Button>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </CardContent>
              </Card>
            </aside>
            <div className="project-content min-w-0 lg:col-span-8">{project.content}</div>
          </div>
        </article>
      </PageContainer>
    </main>
  );
}
