import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { PostListItem } from "./PostListItem.js";

const PROPS = {
  title: "بهترین مهارت‌های فریلنسری در سال ۲۰۲۶",
  href: "/blog/skills",
  image: "/cover.webp",
  author: "محمد ابراهیمی",
  readTime: "5 دقیقه",
};

/** The row is an `<li>`, so it is always rendered inside a list. */
function renderInList(ui: React.ReactElement) {
  return render(<ul>{ui}</ul>);
}

describe("PostListItem", () => {
  it("renders the row as one link inside a list item", () => {
    const { container } = renderInList(<PostListItem {...PROPS} />);

    expect(container.querySelector("li")).toHaveAttribute("data-slot", "post-list-item");
    expect(screen.getByRole("link", { name: /بهترین مهارت/ })).toHaveAttribute(
      "href",
      "/blog/skills",
    );
  });

  it("shows the title, author and reading time", () => {
    renderInList(<PostListItem {...PROPS} />);

    expect(screen.getByText("بهترین مهارت‌های فریلنسری در سال ۲۰۲۶")).toBeInTheDocument();
    expect(screen.getByText("محمد ابراهیمی")).toBeInTheDocument();
    expect(screen.getByText(/5 دقیقه/)).toBeInTheDocument();
  });

  it("renders the thumbnail at the reference's 64px square", () => {
    const { container } = renderInList(<PostListItem {...PROPS} />);

    expect(container.querySelector("img")).toHaveClass("size-16", "object-cover", "rounded-xl");
  });

  it("omits the meta row when neither author nor reading time is given", () => {
    const { container } = renderInList(<PostListItem title="بدون متا" href="/x" />);

    expect(container.querySelector('[data-slot="post-list-item-meta"]')).toBeNull();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLLIElement>();
    renderInList(<PostListItem {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "post-list-item");
  });

  it("renders on the server", () => {
    expect(
      renderToString(
        <ul>
          <PostListItem {...PROPS} />
        </ul>,
      ),
    ).toContain("بهترین مهارت");
  });

  it("has no accessibility violations", async () => {
    const { container } = renderInList(<PostListItem {...PROPS} />);

    await expectNoAxeViolations(container);
  });
});
