import Link from "next/link";

import { ProjectScreenshot } from "@/components/project-screenshot";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ProjectSummary } from "@/lib/mdx";
import { getProjectVisuals } from "@/lib/project-visuals";

export function ProjectCard({ project }: { project: ProjectSummary }) {
  const visuals = getProjectVisuals(project.slug);

  return (
    <article>
      <Card>
        {visuals ? (
          <>
            <ProjectScreenshot
              visual={visuals.primary}
              sizes="(min-width: 1280px) 1200px, 100vw"
              presentation="embedded"
              priority
            />
            <Separator />
          </>
        ) : null}
        <div className="grid lg:grid-cols-[7fr_auto_5fr]">
          <CardHeader className="gap-5 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="technical">Published case study</Badge>
              <span className="font-mono text-xs text-muted-foreground">/{project.slug}</span>
            </div>
            <CardTitle>
              <h2 className="text-3xl leading-tight tracking-tight sm:text-5xl">
                <Link
                  href={`/projects/${project.slug}`}
                  className="underline-offset-4 hover:text-primary hover:underline"
                >
                  {project.title}
                </Link>
              </h2>
            </CardTitle>
            <CardDescription className="max-w-2xl text-base leading-7">{project.hook}</CardDescription>
          </CardHeader>
          <Separator className="lg:hidden" />
          <Separator orientation="vertical" className="hidden lg:block" />
          <CardContent className="flex flex-col justify-center gap-6 p-6 lg:p-10">
            <p className="leading-7 text-muted-foreground">{project.summary}</p>
            <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
              {project.stack.map((technology) => (
                <li key={technology}><Badge variant="technical">{technology}</Badge></li>
              ))}
            </ul>
          </CardContent>
        </div>
        <Separator />
        <CardFooter className="py-5">
          <Button asChild>
            <Link href={`/projects/${project.slug}`}>
              Read case study <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
