import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders a semantic button by default", () => {
    render(<Button>Continue</Button>);

    expect(screen.getByRole("button", { name: "Continue" })).toBeEnabled();
  });

  it("composes an accessible link with asChild", () => {
    render(
      <Button asChild>
        <a href="#status">Check status</a>
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Check status" })).toHaveAttribute(
      "href",
      "#status",
    );
  });
});
