import { render } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Skeleton, SkeletonCard, SkeletonText } from "./Skeleton.js";

describe("Skeleton", () => {
  it("is hidden from assistive technology", () => {
    // The loading state is announced once by the region that owns it, not per placeholder bar.
    const { container } = render(<Skeleton />);

    expect(container.querySelector('[data-slot="skeleton"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it.each([
    ["shimmer", "skeleton-shimmer"],
    ["pulse", "animate-pulse"],
    ["none", "bg-slate-100"],
  ] as const)("renders the %s animation", (animation, className) => {
    const { container } = render(<Skeleton animation={animation} />);

    expect(container.querySelector('[data-slot="skeleton"]')).toHaveClass(className);
  });

  it.each(["line", "title", "block", "circle"] as const)("renders the %s shape", (shape) => {
    const { container } = render(<Skeleton shape={shape} />);

    expect(container.querySelector('[data-slot="skeleton"]')).toBeInTheDocument();
  });

  it("forwards its ref and merges className", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Skeleton ref={ref} className="w-20" />);

    expect(ref.current).toHaveClass("w-20");
  });
});

describe("SkeletonText", () => {
  it("renders three lines by default, the last one short", () => {
    const { container } = render(<SkeletonText />);
    const lines = container.querySelectorAll('[data-slot="skeleton"]');

    expect(lines).toHaveLength(3);
    expect(lines[2]).toHaveClass("w-3/5");
  });

  it("renders the requested number of lines", () => {
    const { container } = render(<SkeletonText lines={5} />);

    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(5);
  });

  it("renders one full-width line when asked for a single line", () => {
    const { container } = render(<SkeletonText lines={1} />);
    const lines = container.querySelectorAll('[data-slot="skeleton"]');

    expect(lines).toHaveLength(1);
    expect(lines[0]).toHaveClass("w-full");
  });

  it("never renders fewer than one line", () => {
    const { container } = render(<SkeletonText lines={0} />);

    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(1);
  });
});

describe("SkeletonCard", () => {
  it("renders a cover, a title and two lines by default", () => {
    const { container } = render(<SkeletonCard />);

    expect(container.querySelector('[data-slot="skeleton-card"]')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(4);
  });

  it("drops the cover when media is off", () => {
    const { container } = render(<SkeletonCard media={false} />);

    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(3);
  });

  it("adds an avatar and a name line when a footer is asked for", () => {
    const { container } = render(<SkeletonCard footer />);

    expect(container.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(6);
  });

  it("renders on the server", () => {
    expect(renderToString(<SkeletonCard footer />)).toContain("skeleton-card");
  });

  it("has no axe violations", async () => {
    const { container } = render(<SkeletonCard footer />);

    await expectNoAxeViolations(container);
  });
});
