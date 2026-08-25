import { readFile } from "node:fs/promises";
import path from "node:path";

import { compileMDX } from "next-mdx-remote/rsc";
import { z } from "zod";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "content", "projects");
const PROJECT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const foundationFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  draft: z.boolean().default(true),
});

export type ProjectFrontmatter = z.infer<typeof foundationFrontmatterSchema>;

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

export async function compileProjectMdx(source: string, slug = "inline") {
  try {
    const compiled = await compileMDX<ProjectFrontmatter>({
      source,
      options: {
        parseFrontmatter: true,
      },
    });
    const frontmatter = foundationFrontmatterSchema.parse(compiled.frontmatter);

    return {
      content: compiled.content,
      frontmatter,
    };
  } catch (error) {
    throw new InvalidProjectContentError(slug, { cause: error });
  }
}

export async function getProjectMdx(slug: string) {
  if (!PROJECT_SLUG_PATTERN.test(slug)) {
    throw new InvalidProjectSlugError(slug);
  }

  const filePath = path.join(PROJECTS_DIRECTORY, `${slug}.mdx`);
  let source: string;

  try {
    source = await readFile(filePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new ProjectContentNotFoundError(slug);
    }

    throw error;
  }

  return compileProjectMdx(source, slug);
}
