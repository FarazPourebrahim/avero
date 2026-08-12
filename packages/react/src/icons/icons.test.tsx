import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../test/axe.js";
import { createIcon } from "./createIcon.js";
import * as publicIcons from "./publicIcons.js";

const SolidSquare = createIcon("SolidSquare", {
  viewBox: "0 0 10 10",
  mode: "fill",
  paths: ["M0 0h10v10H0z"],
});

const OutlineSquare = createIcon("OutlineSquare", {
  viewBox: "0 0 24 24",
  mode: "stroke",
  paths: ["M4 4h16v16H4z", "M8 8h8v8H8z"],
});

describe("createIcon", () => {
  it("renders a decorative icon hidden from assistive technology by default", () => {
    const { container } = render(<SolidSquare />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("role");
    expect(svg).toHaveAttribute("width", "1em");
    expect(svg).toHaveAttribute("fill", "currentColor");
    expect(svg).toHaveAttribute("data-slot", "icon");
  });

  it("exposes an accessible name when a title is given", () => {
    render(<SolidSquare title="Square" />);

    const icon = screen.getByRole("img", { name: "Square" });
    expect(icon).not.toHaveAttribute("aria-hidden");
  });

  it("applies size, class name and extra props", () => {
    const { container } = render(<SolidSquare size={16} className="text-primary" data-test="x" />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("height", "16");
    expect(svg).toHaveClass("text-primary");
    expect(svg).toHaveAttribute("data-test", "x");
  });

  it("draws stroke icons as 2px round outlines with every path", () => {
    const { container } = render(<OutlineSquare />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
    expect(svg).toHaveAttribute("stroke-width", "2");
    expect(svg).toHaveAttribute("stroke-linecap", "round");
    expect(container.querySelectorAll("path")).toHaveLength(2);
  });

  it("forwards refs and sets a display name", () => {
    const ref = createRef<SVGSVGElement>();
    render(<SolidSquare ref={ref} />);

    expect(ref.current).toBeInstanceOf(SVGSVGElement);
    expect(SolidSquare.displayName).toBe("SolidSquare");
  });

  it("renders on the server", () => {
    expect(renderToString(<SolidSquare title="Square" />)).toContain("<title>Square</title>");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <p>
        <SolidSquare /> text <OutlineSquare title="Outline" />
      </p>,
    );

    await expectNoAxeViolations(container);
  });
});

describe("public icons", () => {
  const entries = Object.entries(publicIcons);

  it("exports every bundled glyph", () => {
    expect(entries).toHaveLength(19);
  });

  it.each(entries)("%s renders its path data", (name, Icon) => {
    const { container } = render(<Icon />);
    const paths = container.querySelectorAll("path");

    expect(Icon.displayName).toBe(name);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(path.getAttribute("d")?.length).toBeGreaterThan(20);
    }
  });
});
