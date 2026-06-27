import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Divider } from "./Divider.js";

describe("Divider", () => {
  it("renders a decorative horizontal gray divider by default", () => {
    const { container } = render(<Divider />);
    const divider = container.firstElementChild;

    expect(divider).toHaveAttribute("role", "none");
    expect(divider).toHaveAttribute("data-orientation", "horizontal");
    expect(divider).toHaveClass("h-px", "w-full", "bg-gray-100");
  });

  it("exposes a separator when not decorative", () => {
    render(<Divider decorative={false} orientation="vertical" />);
    const separator = screen.getByRole("separator");

    expect(separator).toHaveAttribute("aria-orientation", "vertical");
    expect(separator).toHaveClass("w-px");
  });

  it("defaults the separator orientation to horizontal", () => {
    render(<Divider decorative={false} />);

    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
  });

  it.each([
    ["slate", "bg-slate-100"],
    ["strong", "bg-gray-200"],
  ] as const)("applies the %s tone", (tone, expected) => {
    const { container } = render(<Divider tone={tone} />);

    expect(container.firstElementChild).toHaveClass(expected);
  });

  it("forwards refs and merges className", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Divider ref={ref} className="my-4" />);

    expect(ref.current).toHaveClass("my-4");
  });

  it("renders on the server", () => {
    expect(renderToString(<Divider />)).toContain('data-slot="divider"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <p>Above</p>
        <Divider decorative={false} />
        <p>Below</p>
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
