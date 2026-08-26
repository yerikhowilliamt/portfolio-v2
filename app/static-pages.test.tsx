import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";
import Home from "@/app/page";

afterEach(cleanup);

describe("redesigned static routes", () => {
  it("renders the identity-first Home recruiter journey", () => {
    const { container } = render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Building business systems that stay correct under pressure.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Yerikho William Tasilima")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("15/15")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View selected work" })).toHaveAttribute("href", "#selected-work");
    expect(container.querySelectorAll('[data-slot="button"]')).toHaveLength(9);
    expect(container.querySelectorAll('[data-slot="card"]')).toHaveLength(3);
    expect(container.querySelectorAll('[data-slot="badge"]')).toHaveLength(10);
    expect(container.querySelectorAll('[data-slot="separator"]')).toHaveLength(7);
  });

  it("renders the About route from evidence-bounded copy", () => {
    const { container } = render(<AboutPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Software engineering with explicit ownership." })).toBeInTheDocument();
    expect(screen.getByText("Data integrity")).toBeInTheDocument();
    expect(container.querySelectorAll('[data-slot="card"]')).toHaveLength(0);
    expect(container.querySelectorAll('[data-slot="badge"]')).toHaveLength(3);
    expect(container.querySelectorAll('[data-slot="alert"]')).toHaveLength(1);
  });

  it("renders the approved public contact destinations", () => {
    const { container } = render(<ContactPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Let's talk about the system you need to build." })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Send an email" })).toHaveAttribute(
      "href",
      "mailto:yerikhowilliamt@gmail.com",
    );
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/yerikhowilliamt",
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/yerikhowilliamt",
    );
    expect(screen.getByRole("link", { name: /Resume/ })).toHaveAttribute(
      "href",
      "/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf",
    );
    expect(container.querySelectorAll('[data-slot="card"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-slot="badge"]')).toHaveLength(1);
    expect(container.querySelectorAll('[data-slot="button"]')).toHaveLength(4);
  });
});
