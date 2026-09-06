import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ResponsiveBanner } from "./ResponsiveBanner.js";

const SOURCES = { desktopSrc: "/banner-desktop.png", mobileSrc: "/banner-mobile.png" };

describe("ResponsiveBanner", () => {
  it("serves the desktop artwork from md up and the mobile artwork below", () => {
    const { container } = render(<ResponsiveBanner {...SOURCES} alt="جشنواره ثبت‌نام پاییز" />);

    const picture = container.querySelector("picture");
    expect(picture).toHaveAttribute("data-slot", "responsive-banner");
    expect(picture?.querySelector("source")).toHaveAttribute("media", "(min-width: 48rem)");
    expect(picture?.querySelector("source")).toHaveAttribute("srcset", "/banner-desktop.png");

    const image = screen.getByRole("img", { name: "جشنواره ثبت‌نام پاییز" });
    expect(image).toHaveAttribute("src", "/banner-mobile.png");
    expect(image).toHaveClass("w-full", "rounded-2xl", "object-cover");
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it.each([
    ["sm", "(min-width: 40rem)"],
    ["lg", "(min-width: 64rem)"],
  ] as const)("switches at the %s breakpoint", (breakpoint, media) => {
    const { container } = render(<ResponsiveBanner {...SOURCES} alt="" breakpoint={breakpoint} />);

    expect(container.querySelector("source")).toHaveAttribute("media", media);
  });

  it("passes image options through", () => {
    render(<ResponsiveBanner {...SOURCES} alt="بنر" radius="xl" aspect="video" loading="eager" />);

    const image = screen.getByRole("img", { name: "بنر" });
    expect(image).toHaveClass("rounded-xl", "aspect-video");
    expect(image).toHaveAttribute("loading", "eager");
  });

  it("is decorative with an empty alt", () => {
    const { container } = render(<ResponsiveBanner {...SOURCES} alt="" />);

    expect(screen.queryByRole("img")).toBeNull();
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("shows the fallback when the artwork fails to load", () => {
    const { container } = render(
      <ResponsiveBanner {...SOURCES} alt="بنر" fallback={<p>بنر در دسترس نیست</p>} />,
    );

    fireEvent.error(container.querySelector("img")!);

    expect(screen.getByText("بنر در دسترس نیست")).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
  });

  it("replaces the width class, styles the picture and forwards refs to the image", () => {
    const ref = createRef<HTMLImageElement>();
    const { container } = render(
      <ResponsiveBanner
        ref={ref}
        {...SOURCES}
        alt="بنر"
        className="max-h-60 w-auto"
        pictureClassName="block"
      />,
    );

    expect(ref.current).toBe(screen.getByRole("img"));
    expect(ref.current).toHaveClass("max-h-60", "w-auto");
    expect(ref.current).not.toHaveClass("w-full");
    expect(container.querySelector("picture")).toHaveClass("block");
  });

  it("renders on the server", () => {
    const html = renderToString(<ResponsiveBanner {...SOURCES} alt="بنر" />);

    expect(html).toContain("<picture");
    expect(html).toContain('srcSet="/banner-desktop.png"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ResponsiveBanner {...SOURCES} alt="جشنواره ثبت‌نام پاییز" />);

    await expectNoAxeViolations(container);
  });
});
