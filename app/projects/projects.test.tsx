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
    expect(screen.getByRole("link", { name: "OhMyPos" })).toHaveAttribute(
      "href",
      "/projects/ohmypos",
    );
    expect(screen.queryByText("Project System Demonstration")).not.toBeInTheDocument();
    expect(screen.queryByText("Draft Project Fixture")).not.toBeInTheDocument();
    expect(
      screen.getByAltText(/OhMyPos cashier interface showing branch selection/),
    ).toBeInTheDocument();
  });

  it("generates params and metadata for published projects only", async () => {
    await expect(generateStaticParams()).resolves.toEqual([{ slug: "ohmypos" }]);
    await expect(
      generateMetadata({ params: Promise.resolve({ slug: "ohmypos" }) }),
    ).resolves.toMatchObject({
      title: "OhMyPos",
      description: expect.stringContaining("financial ledgers consistent"),
      alternates: { canonical: "/projects/ohmypos" },
      openGraph: {
        title: "OhMyPos | Yerikho William Tasilima",
        url: "/projects/ohmypos",
      },
      twitter: { card: "summary_large_image" },
    });
  });

  it("renders the seven required sections in exact order", async () => {
    const { container } = render(
      await ProjectPage({ params: Promise.resolve({ slug: "ohmypos" }) }),
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
    expect(
      screen.getByRole("region", { name: "OhMyPos interface gallery" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("img")).toHaveLength(3);
    expect(container.querySelector("dt")).toHaveTextContent("Concurrent settlement integrity");
    expect(container.querySelector("dt + dd")).toHaveTextContent("15 × 201 / 15 × 409");
    expect(screen.getByText(/15 settlement rows/)).toHaveTextContent("Rp300,000.00");
    expect(screen.getByRole("link", { name: /B4 concurrency test/ })).toHaveAttribute(
      "href",
      "https://github.com/yerikhowilliamt/ohmypos/blob/main/apps/api/test/concurrency.e2e-spec.ts#L737-L817",
    );
    expect(screen.getByRole("link", { name: /Live demo/ })).toHaveAttribute(
      "href",
      "https://ohmypos.vercel.app",
    );
  });
});
