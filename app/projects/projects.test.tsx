import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import ProjectPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/projects/[slug]/page";
import ProjectsPage from "@/app/projects/page";

afterEach(cleanup);

describe("Phase 04 project routes", () => {
  it("renders only published cards with valid case-study destinations", async () => {
    render(await ProjectsPage());

    expect(
      screen.getByRole("heading", { level: 1, name: "Engineering decisions, constraints, and proof." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Project System Demonstration" })).toHaveAttribute(
      "href",
      "/projects/project-system-demo",
    );
    expect(screen.queryByText("Draft Project Fixture")).not.toBeInTheDocument();
  });

  it("generates params and metadata for published projects only", async () => {
    await expect(generateStaticParams()).resolves.toEqual([{ slug: "project-system-demo" }]);
    await expect(
      generateMetadata({ params: Promise.resolve({ slug: "project-system-demo" }) }),
    ).resolves.toMatchObject({
      title: "Project System Demonstration",
      description: expect.stringContaining("transparent fixture"),
    });
  });

  it("renders the seven required sections in exact order", async () => {
    const { container } = render(
      await ProjectPage({ params: Promise.resolve({ slug: "project-system-demo" }) }),
    );
    const headings = Array.from(
      container.querySelectorAll("h2"),
      (heading) => heading.textContent,
    );

    expect(headings).toEqual([
      "Hook",
      "Problem",
      "Key Decisions & Trade-offs",
      "Measured Results",
      "What This Demonstrates",
      "Limitations & Next Steps",
      "Technical Evidence",
    ]);
    expect(headings.map((heading) => heading?.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))).toEqual(
      Array.from(container.querySelectorAll("h2"), (heading) => heading.id),
    );
    expect(screen.getByRole("navigation", { name: "Case study sections" })).toBeInTheDocument();
    expect(container.querySelector("dt")).toHaveTextContent("Evidence state");
    expect(container.querySelector("dt + dd")).toHaveTextContent("Fixture");
  });
});
