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

  it("renders the four approved primary navigation items without a Resume CTA", () => {
    render(<SiteHeader />);

    const navigation = screen.getByRole("navigation", { name: "Primary navigation" });
    expect(navigation).toHaveTextContent("Home");
    expect(navigation).toHaveTextContent("Projects");
    expect(navigation).toHaveTextContent("About");
    expect(navigation).toHaveTextContent("Contact");
    expect(screen.queryByRole("link", { name: /resume|cv/i })).not.toBeInTheDocument();
  });

  it("marks the current route and preserves approved destinations", () => {
    usePathname.mockReturnValue("/about");
    const { unmount } = render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
    unmount();

    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: /GitHub \/ OhMyPos/ })).toHaveAttribute(
      "href",
      "https://github.com/yerikhowilliamt/ohmypos",
    );
  });
});
