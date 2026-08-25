import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  compileProjectMdx,
  DuplicateProjectSlugError,
  getProjectBySlug,
  getProjectMdx,
  getPublishedProjects,
  InvalidProjectContentError,
  InvalidProjectSlugError,
  loadProjectsFromSources,
  ProjectContentNotFoundError,
  REQUIRED_SECTION_TITLES,
} from "@/lib/mdx";

afterEach(cleanup);

function projectSource({
  slug = "sample-project",
  status = "published",
  order = 1,
  body,
}: {
  slug?: string;
  status?: "published" | "draft";
  order?: number;
  body?: string;
} = {}) {
  const sections = REQUIRED_SECTION_TITLES.map(
    (title) => `## ${title}\n\n${title} content.`,
  ).join("\n\n");

  return `---
slug: ${slug}
title: Sample project
summary: Representative project summary.
hook: A factual, non-quantified hook.
stack:
  - TypeScript
status: ${status}
order: ${order}
---

${body ?? sections}`;
}

describe("project MDX content system", () => {
  it("loads published content and renders the constrained StatBlock", async () => {
    const project = await compileProjectMdx(
      projectSource({
        body: REQUIRED_SECTION_TITLES.map((title) =>
          title === "Measured Results"
            ? `## ${title}\n\n<StatBlock label="State" value="Fixture" context="No product metric." />`
            : `## ${title}\n\n${title} content.`,
        ).join("\n\n"),
      }),
    );

    const { container } = render(project.content);

    expect(screen.getByRole("term")).toHaveTextContent("State");
    expect(container.querySelector("dt + dd")).toHaveTextContent("Fixture");
    expect(screen.getByText("Fixture")).toBeInTheDocument();
    expect(screen.getByText("No product metric.")).toBeInTheDocument();
  });

  it("sorts deterministically and rejects duplicate slugs", async () => {
    const projects = await loadProjectsFromSources([
      { fileSlug: "second", source: projectSource({ slug: "second", order: 2 }) },
      { fileSlug: "first", source: projectSource({ slug: "first", order: 1 }) },
    ]);

    expect(projects.map(({ frontmatter }) => frontmatter.slug)).toEqual(["first", "second"]);

    await expect(
      loadProjectsFromSources([
        { fileSlug: "first-file", source: projectSource({ slug: "same" }) },
        { fileSlug: "second-file", source: projectSource({ slug: "same", order: 2 }) },
      ]),
    ).rejects.toBeInstanceOf(DuplicateProjectSlugError);
  });

  it("filters drafts from public discovery and lookup", async () => {
    const published = await getPublishedProjects();

    expect(published.map(({ slug }) => slug)).toEqual(["project-system-demo"]);
    await expect(getProjectBySlug("draft-project")).resolves.toBeUndefined();
  });

  it("rejects malformed slugs and reports unknown content predictably", async () => {
    await expect(getProjectMdx("../project")).rejects.toBeInstanceOf(InvalidProjectSlugError);
    await expect(getProjectMdx("missing-project")).rejects.toBeInstanceOf(
      ProjectContentNotFoundError,
    );
  });

  it("renders safe evidence links with explicit external-link boundaries", async () => {
    const project = await compileProjectMdx(
      projectSource({
        body: REQUIRED_SECTION_TITLES.map(
          (title) =>
            `## ${title}\n\n${title === "Technical Evidence" ? "[Public evidence](https://example.com/evidence)" : "Content."}`,
        ).join("\n\n"),
      }),
    );

    render(project.content);

    expect(screen.getByRole("link", { name: "Public evidence" })).toHaveAttribute(
      "href",
      "https://example.com/evidence",
    );
    expect(screen.getByRole("link", { name: "Public evidence" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });

  it("rejects invalid section order, imports, and raw or unsupported components", async () => {
    await expect(
      compileProjectMdx(projectSource({ body: "## Hook\n\nMissing six sections." })),
    ).rejects.toBeInstanceOf(InvalidProjectContentError);
    await expect(
      compileProjectMdx(
        projectSource({
          body: `export const unsafe = true\n\n${REQUIRED_SECTION_TITLES.map((title) => `## ${title}\n\nContent.`).join("\n\n")}`,
        }),
      ),
    ).rejects.toBeInstanceOf(InvalidProjectContentError);
    await expect(
      compileProjectMdx(
        projectSource({
          body: REQUIRED_SECTION_TITLES.map(
            (title) => `## ${title}\n\n${title === "Hook" ? "<Unsupported />" : "Content."}`,
          ).join("\n\n"),
        }),
      ),
    ).rejects.toBeInstanceOf(InvalidProjectContentError);
    await expect(
      compileProjectMdx(
        projectSource({
          body: REQUIRED_SECTION_TITLES.map(
            (title) => `## ${title}\n\n${title === "Hook" ? "<script />" : "Content."}`,
          ).join("\n\n"),
        }),
      ),
    ).rejects.toBeInstanceOf(InvalidProjectContentError);
  });
});
