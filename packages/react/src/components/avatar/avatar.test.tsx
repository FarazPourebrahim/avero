import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Avatar, getInitials } from "./Avatar.js";

describe("getInitials", () => {
  it.each([
    ["Faraz Pourebrahim", "FP"],
    ["سارا محمدی", "سم"],
    ["Nika", "N"],
    ["  sam   taylor  ", "ST"],
    ["علی رضا کریمی", "عک"],
    ["", ""],
  ])("returns the initials of %j", (name, initials) => {
    expect(getInitials(name)).toBe(initials);
  });
});

describe("Avatar", () => {
  it("shows the initials fallback when no image is given", () => {
    render(<Avatar name="سارا محمدی" />);

    expect(screen.getByRole("img", { name: "سارا محمدی" })).toHaveTextContent("سم");
  });

  it("renders a custom fallback", () => {
    render(<Avatar name="Faraz" fallback="?" />);

    expect(screen.getByRole("img", { name: "Faraz" })).toHaveTextContent("?");
  });

  it("applies size, shape and border variants to the root", () => {
    const { container } = render(<Avatar name="Faraz" size="xl" shape="3xl" border="ring" />);
    const root = container.querySelector('[data-slot="avatar"]');

    expect(root).toHaveClass("size-20", "rounded-3xl", "border-4", "border-white", "shadow-md");
  });

  it("defaults to a 40px circle", () => {
    const { container } = render(<Avatar name="Faraz" />);

    expect(container.querySelector('[data-slot="avatar"]')).toHaveClass("size-10", "rounded-full");
  });

  it("uses the responsive profile size", () => {
    const { container } = render(<Avatar name="سارا" size="3xl" />);

    expect(container.querySelector('[data-slot="avatar"]')).toHaveClass("size-28", "md:size-44");
  });

  it("forwards refs and merges className", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Avatar ref={ref} name="Faraz" className="shadow-xs" />);

    expect(ref.current).toHaveClass("shadow-xs");
  });

  it("renders the fallback on the server", () => {
    expect(renderToString(<Avatar name="Faraz Pourebrahim" />)).toContain("FP");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Avatar name="سارا محمدی" />
        <Avatar name="Nika" src="data:image/png;base64,iVBORw0KGgo=" />
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
