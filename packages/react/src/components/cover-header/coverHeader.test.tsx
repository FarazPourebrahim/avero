import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { CoverHeader } from "./CoverHeader.js";

const avatar = <img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="سارا محمدی" />;

describe("CoverHeader", () => {
  it("renders the default gradient cover with a bottom shade", () => {
    const { container } = render(<CoverHeader>identity</CoverHeader>);
    const cover = container.querySelector('[data-slot="cover-header-cover"]');

    expect(cover).toHaveClass(
      "rtl:bg-gradient-to-r",
      "ltr:bg-gradient-to-l",
      "from-blue-600",
      "via-indigo-600",
      "to-purple-700",
    );
    expect(cover).toHaveClass("h-36", "md:h-52", "lg:h-72");
    expect(cover?.firstElementChild).toHaveClass("from-black/40", "pointer-events-none");
    expect(container.firstElementChild).toHaveClass("shadow-card-ambient", "rounded-3xl");
  });

  it("renders a custom cover, an overlapping avatar and the identity content", () => {
    const { container } = render(
      <CoverHeader
        cover={<img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="" />}
        avatar={avatar}
      >
        <h1>سارا محمدی</h1>
      </CoverHeader>,
    );

    expect(container.querySelector('[data-slot="cover-header-cover"] > img')).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "سارا محمدی" }).parentElement).toHaveClass(
      "-mt-14",
      "md:-mt-20",
      "rounded-full",
      "border-4",
      "lg:me-6",
    );
    expect(screen.getByRole("heading", { name: "سارا محمدی" }).parentElement).toHaveAttribute(
      "data-slot",
      "cover-header-content",
    );
  });

  it("renders the footer bar only when given", () => {
    const { container, rerender } = render(<CoverHeader>identity</CoverHeader>);

    expect(container.querySelector('[data-slot="cover-header-footer"]')).toBeNull();
    expect(container.querySelector('[data-slot="cover-header-avatar"]')).toBeNull();

    rerender(<CoverHeader footer={<nav aria-label="tabs">tabs</nav>}>identity</CoverHeader>);

    expect(screen.getByRole("navigation").parentElement).toHaveClass("border-t", "pt-4");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<CoverHeader ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "cover-header");
  });

  it("renders on the server", () => {
    expect(renderToString(<CoverHeader avatar={avatar} />)).toContain("cover-header-avatar");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CoverHeader avatar={avatar} footer={<nav aria-label="tabs">tabs</nav>}>
        <h1>سارا محمدی</h1>
      </CoverHeader>,
    );

    await expectNoAxeViolations(container);
  });
});
