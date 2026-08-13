import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Figure, Image } from "./Image.js";

describe("Image", () => {
  it("renders a lazy, async-decoded cover image by default", () => {
    render(<Image src="/cover.webp" alt="آشنایی با طراحی رابط کاربری" />);
    const image = screen.getByRole("img", { name: "آشنایی با طراحی رابط کاربری" });

    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("decoding", "async");
    expect(image).toHaveClass("object-cover");
  });

  it("allows eager loading for above-the-fold images", () => {
    render(<Image src="/hero.webp" alt="hero" loading="eager" />);

    expect(screen.getByRole("img")).toHaveAttribute("loading", "eager");
  });

  it.each([
    [{ radius: "2xl" }, "rounded-2xl"],
    [{ zoom: "subtle" }, "hover:scale-102"],
    [{ zoom: "hover" }, "hover:scale-105"],
    [{ zoom: "group" }, "group-hover:scale-105"],
    [{ aspect: "video" }, "aspect-video"],
    [{ aspect: "9/16" }, "aspect-[9/16]"],
    [{ fit: "contain" }, "object-contain"],
  ] as const)("applies %o", (options, expected) => {
    render(<Image src="/x.webp" alt="x" {...options} />);

    expect(screen.getByRole("img")).toHaveClass(expected);
  });

  it("replaces a broken image with a labelled placeholder and calls onError", () => {
    const onError = vi.fn();
    render(<Image src="/missing.webp" alt="پیش‌نمایش دوره" radius="xl" onError={onError} />);

    fireEvent.error(screen.getByRole("img"));

    const placeholder = screen.getByRole("img", { name: "پیش‌نمایش دوره" });
    expect(placeholder.tagName).toBe("SPAN");
    expect(placeholder).toHaveClass("bg-gray-100", "rounded-xl");
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it("hides the placeholder of a decorative image", () => {
    const { container } = render(<Image src="/missing.webp" alt="" />);

    fireEvent.error(container.querySelector("img")!);

    expect(container.querySelector('[data-slot="image-fallback"]')).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("renders a custom fallback", () => {
    render(<Image src="/missing.webp" alt="x" fallback={<p>بدون تصویر</p>} />);

    fireEvent.error(screen.getByRole("img"));

    expect(screen.getByText("بدون تصویر")).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLImageElement>();
    render(<Image ref={ref} src="/x.webp" alt="x" />);

    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });
});

describe("Figure", () => {
  it("clips its media to rounded corners by default", () => {
    render(
      <Figure caption="کاور">
        <Image src="/x.webp" alt="x" zoom="subtle" />
      </Figure>,
    );
    const figure = screen.getByRole("figure");

    expect(figure).toHaveClass("overflow-hidden", "rounded-2xl");
    expect(screen.getByText("کاور").tagName).toBe("FIGCAPTION");
  });

  it("can disable clipping", () => {
    render(<Figure clip={false}>content</Figure>);

    expect(screen.getByRole("figure")).not.toHaveClass("overflow-hidden");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(<Figure ref={ref}>x</Figure>);

    expect(ref.current?.tagName).toBe("FIGURE");
  });
});

describe("media", () => {
  it("renders on the server", () => {
    const html = renderToString(
      <Figure>
        <Image src="/x.webp" alt="x" />
      </Figure>,
    );

    expect(html).toContain('loading="lazy"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Figure caption="caption">
        <Image src="/x.webp" alt="description" />
      </Figure>,
    );

    await expectNoAxeViolations(container);
  });
});
