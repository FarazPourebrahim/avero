import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { RichContent } from "./RichContent.js";

const ARTICLE = "<h2>فریلنسری چیست؟</h2><p>متن <strong>مهم</strong></p><ul><li>یک</li></ul>";

describe("RichContent", () => {
  it("renders sanitized HTML with the content prose class", () => {
    const { container } = render(<RichContent html={ARTICLE} />);

    expect(container.firstElementChild).toHaveClass("avero-rich-content");
    expect(screen.getByRole("heading", { name: "فریلنسری چیست؟" })).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveTextContent("یک");
  });

  it.each([
    ["editor", "avero-rich-content-editor"],
    ["question", "avero-rich-content-question"],
  ] as const)("renders the %s variant", (variant, expected) => {
    const { container } = render(<RichContent variant={variant} html="<p>a</p>" />);

    expect(container.firstElementChild).toHaveClass(expected);
    expect(container.firstElementChild).not.toHaveClass("avero-rich-content");
  });

  it("strips scripts and event handlers from stored HTML", () => {
    const { container } = render(
      <RichContent html={'<p onclick="x()">متن</p><script>alert(1)</script>'} />,
    );

    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("p")).not.toHaveAttribute("onclick");
  });

  it("accepts a custom sanitizer", () => {
    const sanitize = vi.fn(() => "<p>replaced</p>");
    render(<RichContent html="<p>original</p>" sanitize={sanitize} />);

    expect(sanitize).toHaveBeenCalledWith("<p>original</p>");
    expect(screen.getByText("replaced")).toBeInTheDocument();
  });

  it("renders nothing for empty HTML", () => {
    const { container } = render(<RichContent html="" />);

    expect(container.firstElementChild).toBeEmptyDOMElement();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<RichContent ref={ref} html="<p>a</p>" />);

    expect(ref.current).toHaveAttribute("data-slot", "rich-content");
  });

  it("sanitizes on the server too", () => {
    const html = renderToString(<RichContent html={"<p>a</p><script>alert(1)</script>"} />);

    expect(html).toContain("<p>a</p>");
    expect(html).not.toContain("<script>");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<RichContent html={ARTICLE} />);

    await expectNoAxeViolations(container);
  });
});
