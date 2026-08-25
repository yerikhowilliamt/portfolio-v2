import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import Home from "@/app/page";

describe("Phase 03 static routes", () => {
  it("renders the evidence-led Home route", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Engineering work you can inspect, not just read about.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("15 / 15")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("renders the About route from evidence-bounded copy", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Systems thinking, written down." })).toBeInTheDocument();
    expect(screen.getByText("Data integrity")).toBeInTheDocument();
  });

  it("renders only verified public destinations on Contact", () => {
    render(<ContactPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Start with the work." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Source repository/ })).toHaveAttribute(
      "href",
      "https://github.com/yerikhowilliamt/ohmypos",
    );
    expect(screen.queryByRole("link", { name: /email|linkedin|resume|cv/i })).not.toBeInTheDocument();
  });
});
