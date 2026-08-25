import Link from "next/link";

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
import type { ProjectSummary } from "@/lib/mdx";

export function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <article className="h-full">
      <Card className="h-full">
        <CardHeader className="gap-4">
          <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
            {project.stack.map((technology) => (
              <li key={technology}>
                <Badge variant="technical">{technology}</Badge>
              </li>
            ))}
          </ul>
          <CardTitle>
            <h2 className="text-2xl tracking-tight sm:text-3xl">
              <Link
                href={`/projects/${project.slug}`}
                className="underline-offset-4 hover:text-primary hover:underline"
              >
                {project.title}
              </Link>
            </h2>
          </CardTitle>
          <CardDescription>{project.hook}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm leading-6 text-muted-foreground">{project.summary}</p>
        </CardContent>
        <CardFooter>
          <Button asChild variant="link" size="sm">
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`Read ${project.title} case study`}
            >
              Read case study <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
