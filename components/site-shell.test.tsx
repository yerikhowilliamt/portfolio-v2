import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const usePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => usePathname(),
}));

afterEach(cleanup);

describe("shared site shell", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/");
  });

  it("renders the four primary navigation items and approved Resume CTA", () => {
    const { container } = render(<SiteHeader />);

    const navigation = screen.getByRole("navigation", { name: "Primary navigation" });
    expect(navigation).toHaveTextContent("Home");
    expect(navigation).toHaveTextContent("Projects");
    expect(navigation).toHaveTextContent("About");
    expect(navigation).toHaveTextContent("Contact");
    expect(screen.getByRole("link", { name: /resume/i })).toHaveAttribute(
      "href",
      "/CV_YERIKHO_WILLIAM_TASILIMA_public.pdf",
    );
    expect(container.querySelectorAll('[data-slot="button"]')).toHaveLength(6);
    expect(container.querySelectorAll('[data-slot="separator"]')).toHaveLength(1);
  });

  it("marks the current route and preserves approved destinations", () => {
    usePathname.mockReturnValue("/about");
    const { unmount } = render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
    unmount();

    const { container } = render(<SiteFooter />);
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/yerikhowilliamt",
    );
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/yerikhowilliamt",
    );
    expect(container.querySelectorAll('[data-slot="button"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-slot="separator"]')).toHaveLength(1);
  });
});
