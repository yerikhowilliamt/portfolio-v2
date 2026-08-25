import { describe, expect, it } from "vitest";

import {
  compileProjectMdx,
  getProjectMdx,
  InvalidProjectContentError,
  InvalidProjectSlugError,
  ProjectContentNotFoundError,
} from "@/lib/mdx";

describe("project MDX foundation", () => {
  it("loads the controlled smoke fixture", async () => {
    const project = await getProjectMdx("foundation-smoke");

    expect(project.frontmatter).toEqual({
      title: "Foundation smoke fixture",
      summary: "Controlled local MDX used only to validate the Phase 02 content pipeline.",
      draft: true,
    });
  });

  it("rejects traversal and malformed slugs", async () => {
    await expect(getProjectMdx("../project")).rejects.toBeInstanceOf(
      InvalidProjectSlugError,
    );
  });

  it("reports unknown content predictably", async () => {
    await expect(getProjectMdx("missing-project")).rejects.toBeInstanceOf(
      ProjectContentNotFoundError,
    );
  });

  it("rejects malformed MDX", async () => {
    await expect(
      compileProjectMdx(
        `---\ntitle: Broken\nsummary: Broken fixture\ndraft: true\n---\n\n<Component`,
        "broken",
      ),
    ).rejects.toBeInstanceOf(InvalidProjectContentError);
  });

  it("rejects invalid frontmatter", async () => {
    await expect(
      compileProjectMdx(
        `---\ntitle: ""\nsummary: Missing title\ndraft: true\n---\n\nContent`,
        "invalid-frontmatter",
      ),
    ).rejects.toBeInstanceOf(InvalidProjectContentError);
  });
});
