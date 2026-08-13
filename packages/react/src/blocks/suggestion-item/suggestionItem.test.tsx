import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { SuggestionItem } from "./SuggestionItem.js";

const PROPS = {
  title: "مبانی تحلیل داده",
  href: "/courses/12",
  description: "کار با داده‌های واقعی",
  tags: ["آنلاین"],
  match: 8,
};

describe("SuggestionItem", () => {
  it("shows the title, summary and tags", () => {
    render(<SuggestionItem {...PROPS} />);

    expect(screen.getByText("مبانی تحلیل داده")).toBeInTheDocument();
    expect(screen.getByText("کار با داده‌های واقعی")).toBeInTheDocument();
    expect(screen.getByText("آنلاین")).toBeInTheDocument();
  });

  it("links from the title when a href is given", () => {
    render(<SuggestionItem {...PROPS} />);

    expect(screen.getByRole("link", { name: "مبانی تحلیل داده" })).toHaveAttribute(
      "href",
      "/courses/12",
    );
  });

  it("renders the match score with the dictionary caption", () => {
    render(<SuggestionItem {...PROPS} />);

    expect(screen.getByText("تطابق")).toBeInTheDocument();
    // Percentages use the active locale's digits, which default to Persian.
    expect(screen.getByText("۸٪")).toBeInTheDocument();
  });

  it("renders tags at a compact size", () => {
    render(<SuggestionItem {...PROPS} />);

    expect(screen.getByText("آنلاین")).toHaveClass("text-3xs", "py-0.5", "text-gray-400");
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
    expect(renderToString(<SuggestionItem {...PROPS} />)).toContain("مبانی تحلیل داده");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SuggestionItem {...PROPS} />);

    await expectNoAxeViolations(container);
  });
});
