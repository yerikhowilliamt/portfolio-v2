import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";

import { compileMDX } from "next-mdx-remote/rsc";
import { z } from "zod";

import { projectMdxComponents } from "@/components/project-mdx-components";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "content", "projects");
const PROJECT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REQUIRED_SECTION_TITLES = [
  "Hook",
  "Problem",
  "Key Decisions & Trade-offs",
  "Measured Results",
  "What This Demonstrates",
  "Limitations & Next Steps",
  "Technical Evidence",
] as const;
const ALLOWED_MDX_COMPONENTS = new Set(["StatBlock"]);
const PUBLISH_BLOCKING_PLACEHOLDER_PATTERN = /\[[^\]\n]*\bREQUIRED\]/i;

const projectFrontmatterSchema = z.object({
  slug: z.string().regex(PROJECT_SLUG_PATTERN),
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  hook: z.string().trim().min(1),
  stack: z.array(z.string().trim().min(1)).min(1),
  status: z.enum(["published", "draft"]),
  order: z.number().int().nonnegative(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export type Project = {
  content: ReactNode;
  frontmatter: ProjectFrontmatter;
};

export type ProjectSummary = ProjectFrontmatter;

export class InvalidProjectSlugError extends Error {
  constructor(slug: string) {
    super(`Invalid project slug: ${slug}`);
    this.name = "InvalidProjectSlugError";
  }
}

export class ProjectContentNotFoundError extends Error {
  constructor(slug: string) {
    super(`Project content not found: ${slug}`);
    this.name = "ProjectContentNotFoundError";
  }
}

export class InvalidProjectContentError extends Error {
  constructor(slug: string, options?: ErrorOptions) {
    super(`Invalid project content: ${slug}`, options);
    this.name = "InvalidProjectContentError";
  }
}

export class DuplicateProjectSlugError extends Error {
  constructor(slug: string) {
    super(`Duplicate project slug: ${slug}`);
    this.name = "DuplicateProjectSlugError";
  }
}

function validateProjectSource(source: string) {
  const headings = Array.from(source.matchAll(/^##\s+(.+?)\s*$/gm), (match) => match[1]);

  if (
    headings.length !== REQUIRED_SECTION_TITLES.length ||
    headings.some((heading, index) => heading !== REQUIRED_SECTION_TITLES[index])
  ) {
    throw new Error(
      `Project sections must appear exactly once in this order: ${REQUIRED_SECTION_TITLES.join(", ")}`,
    );
  }

  if (/^\s*(?:import|export)\s/m.test(source)) {
    throw new Error("MDX imports and exports are not allowed in project content");
  }

  const componentNames = Array.from(
    source.matchAll(/<\/?([A-Za-z][A-Za-z0-9]*)\b/g),
    (match) => match[1],
  );
  const unsupportedComponent = componentNames.find((name) => !ALLOWED_MDX_COMPONENTS.has(name));

  if (unsupportedComponent) {
    throw new Error(`Unsupported MDX component: ${unsupportedComponent}`);
  }
}

export async function compileProjectMdx(source: string, fileSlug = "inline"): Promise<Project> {
  try {
    validateProjectSource(source);
    const compiled = await compileMDX<ProjectFrontmatter>({
      source,
      components: projectMdxComponents,
      options: {
        parseFrontmatter: true,
      },
    });
    const frontmatter = projectFrontmatterSchema.parse(compiled.frontmatter);

    if (
      frontmatter.status === "published" &&
      PUBLISH_BLOCKING_PLACEHOLDER_PATTERN.test(source)
    ) {
      throw new Error("Published project content cannot contain unresolved required placeholders");
    }

    return {
      content: compiled.content,
      frontmatter,
    };
  } catch (error) {
    throw new InvalidProjectContentError(fileSlug, { cause: error });
  }
}

export async function loadProjectsFromSources(
  sources: ReadonlyArray<{ fileSlug: string; source: string }>,
): Promise<Project[]> {
  const projects = await Promise.all(
    sources.map(({ fileSlug, source }) => compileProjectMdx(source, fileSlug)),
  );
  const seenSlugs = new Set<string>();

  for (const project of projects) {
    if (seenSlugs.has(project.frontmatter.slug)) {
      throw new DuplicateProjectSlugError(project.frontmatter.slug);
    }
    seenSlugs.add(project.frontmatter.slug);
  }

  return projects.sort(
    (left, right) =>
      left.frontmatter.order - right.frontmatter.order ||
      left.frontmatter.slug.localeCompare(right.frontmatter.slug),
  );
}

async function getAllProjects(): Promise<Project[]> {
  const filenames = (await readdir(PROJECTS_DIRECTORY))
    .filter((filename) => filename.endsWith(".mdx"))
    .sort();
  const sources = await Promise.all(
    filenames.map(async (filename) => ({
      fileSlug: filename.slice(0, -4),
      source: await readFile(path.join(PROJECTS_DIRECTORY, filename), "utf8"),
    })),
  );

  return loadProjectsFromSources(sources);
}

export async function getPublishedProjects(): Promise<ProjectSummary[]> {
  const projects = await getAllProjects();

  return projects
    .filter((project) => project.frontmatter.status === "published")
    .map((project) => project.frontmatter);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!PROJECT_SLUG_PATTERN.test(slug)) {
    throw new InvalidProjectSlugError(slug);
  }

  const projects = await getAllProjects();

  return projects.find(
    (project) => project.frontmatter.slug === slug && project.frontmatter.status === "published",
  );
}

export async function getProjectMdx(slug: string): Promise<Project> {
  const project = await getProjectBySlug(slug);

  if (!project) {
    throw new ProjectContentNotFoundError(slug);
  }

  return project;
}

export { REQUIRED_SECTION_TITLES };
