import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { LiveRegion, VisuallyHidden } from "./VisuallyHidden.js";

describe("VisuallyHidden", () => {
  it("keeps content available to assistive technology but visually hidden", () => {
    render(
      <button type="button">
        <span aria-hidden="true">♥</span>
        <VisuallyHidden>پسندیدن</VisuallyHidden>
      </button>,
    );

    expect(screen.getByRole("button", { name: "پسندیدن" })).toBeInTheDocument();
    expect(screen.getByText("پسندیدن")).toHaveClass("sr-only");
  });

  it("forwards refs and merges className", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <VisuallyHidden ref={ref} className="focus:not-sr-only">
        skip
      </VisuallyHidden>,
    );

    expect(ref.current).toHaveClass("sr-only", "focus:not-sr-only");
  });
});

describe("LiveRegion", () => {
  it("renders a polite status region by default", () => {
    render(<LiveRegion>لینک کپی شد</LiveRegion>);
    const region = screen.getByRole("status");

    expect(region).toHaveAttribute("aria-live", "polite");
    expect(region).toHaveAttribute("aria-atomic", "true");
    expect(region).toHaveTextContent("لینک کپی شد");
  });

  it("renders an assertive alert region", () => {
    render(<LiveRegion politeness="assertive">خطا</LiveRegion>);

    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<LiveRegion ref={ref} />);

    expect(ref.current).toHaveClass("sr-only");
  });

  it("renders on the server", () => {
    expect(renderToString(<LiveRegion>ok</LiveRegion>)).toContain('role="status"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <VisuallyHidden>hidden label</VisuallyHidden>
        <LiveRegion>announced</LiveRegion>
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
