import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { SuggestionItem } from "./SuggestionItem.js";

const PROPS = {
  title: "طراحی سایت عمده فروش",
  href: "/projects/12",
  description: "طراحی فروشگاه اینترنتی",
  tags: ["remote"],
  match: 8,
};

describe("SuggestionItem", () => {
  it("shows the title, summary and work-type tags", () => {
    render(<SuggestionItem {...PROPS} />);

    expect(screen.getByText("طراحی سایت عمده فروش")).toBeInTheDocument();
    expect(screen.getByText("طراحی فروشگاه اینترنتی")).toBeInTheDocument();
    expect(screen.getByText("remote")).toBeInTheDocument();
  });

  it("links from the title when a href is given", () => {
    render(<SuggestionItem {...PROPS} />);

    expect(screen.getByRole("link", { name: "طراحی سایت عمده فروش" })).toHaveAttribute(
      "href",
      "/projects/12",
    );
  });

  it("renders the match score with the dictionary caption", () => {
    render(<SuggestionItem {...PROPS} />);

    expect(screen.getByText("تطابق")).toBeInTheDocument();
    // Percentages use the active locale's digits, which default to Persian.
    expect(screen.getByText("۸٪")).toBeInTheDocument();
  });

  it("renders tags at the reference's compact size", () => {
    render(<SuggestionItem {...PROPS} />);

    expect(screen.getByText("remote")).toHaveClass("text-3xs", "py-0.5", "text-gray-400");
  });

  it("omits optional parts when they are not given", () => {
    const { container } = render(<SuggestionItem title="بدون جزئیات" />);

    expect(container.querySelector('[data-slot="suggestion-item-tags"]')).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.queryByText("تطابق")).toBeNull();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<SuggestionItem {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "suggestion-item");
  });

  it("renders on the server", () => {
    expect(renderToString(<SuggestionItem {...PROPS} />)).toContain("طراحی سایت عمده فروش");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SuggestionItem {...PROPS} />);

    await expectNoAxeViolations(container);
  });
});
