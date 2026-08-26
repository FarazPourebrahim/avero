import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Pagination, paginationRange } from "./Pagination.js";

describe("paginationRange", () => {
  it("lists every page when they fit", () => {
    expect(paginationRange(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(paginationRange(1, 1)).toEqual([1]);
  });

  it("returns nothing without pages", () => {
    expect(paginationRange(1, 0)).toEqual([]);
  });

  it("hides pages after the current one near the start", () => {
    expect(paginationRange(1, 20)).toEqual([1, 2, 3, 4, 5, "ellipsis-end", 20]);
    expect(paginationRange(4, 20)).toEqual([1, 2, 3, 4, 5, "ellipsis-end", 20]);
  });

  it("hides pages on both sides in the middle", () => {
    expect(paginationRange(10, 20)).toEqual([1, "ellipsis-start", 9, 10, 11, "ellipsis-end", 20]);
  });

  it("hides pages before the current one near the end", () => {
    expect(paginationRange(18, 20)).toEqual([1, "ellipsis-start", 16, 17, 18, 19, 20]);
  });

  it("widens the window with more siblings", () => {
    expect(paginationRange(10, 20, 2)).toEqual([
      1,
      "ellipsis-start",
      8,
      9,
      10,
      11,
      12,
      "ellipsis-end",
      20,
    ]);
  });

  it("clamps pages outside the range", () => {
    expect(paginationRange(99, 20)).toEqual([1, "ellipsis-start", 16, 17, 18, 19, 20]);
    expect(paginationRange(-3, 20)).toEqual([1, 2, 3, 4, 5, "ellipsis-end", 20]);
  });
});

describe("Pagination", () => {
  it("renders a named navigation with the current page in Persian digits", () => {
    render(<Pagination pageCount={20} defaultPage={10} />);

    const nav = screen.getByRole("navigation", { name: "صفحه‌بندی" });
    const current = within(nav).getByRole("button", { name: "صفحه ۱۰" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveTextContent("۱۰");
    expect(current).toHaveClass("aria-[current=page]:bg-primary");
    expect(within(nav).getByRole("button", { name: "صفحه ۹" })).not.toHaveAttribute("aria-current");
    expect(nav.querySelectorAll("[data-slot='pagination-ellipsis']")).toHaveLength(2);
    expect(nav.querySelector("[data-slot='pagination-ellipsis']")?.parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("moves between pages as buttons when uncontrolled", async () => {
    const onPageChange = vi.fn();
    render(<Pagination pageCount={5} onPageChange={onPageChange} />);

    expect(screen.getByRole("button", { name: "قبلی" })).toBeDisabled();

    await userEvent.click(screen.getByRole("button", { name: "صفحه ۳" }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);
    expect(screen.getByRole("button", { name: "صفحه ۳" })).toHaveAttribute("aria-current", "page");

    await userEvent.click(screen.getByRole("button", { name: "بعدی" }));
    expect(onPageChange).toHaveBeenLastCalledWith(4);

    await userEvent.click(screen.getByRole("button", { name: "قبلی" }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);
  });

  it("does not report the page that is already current", async () => {
    const onPageChange = vi.fn();
    render(<Pagination pageCount={5} defaultPage={2} onPageChange={onPageChange} />);

    await userEvent.click(screen.getByRole("button", { name: "صفحه ۲" }));

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("disables next on the last page", () => {
    render(<Pagination pageCount={5} page={5} />);

    expect(screen.getByRole("button", { name: "بعدی" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "قبلی" })).toBeEnabled();
  });

  it("follows the parent when controlled", async () => {
    function Controlled() {
      const [page, setPage] = useState(1);
      return (
        <>
          <Pagination pageCount={30} page={page} onPageChange={setPage} />
          <output>{page}</output>
        </>
      );
    }
    render(<Controlled />);

    await userEvent.click(screen.getByRole("button", { name: "صفحه ۵" }));

    expect(screen.getByRole("status")).toHaveTextContent("5");
    expect(screen.getByRole("button", { name: "صفحه ۵" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "صفحه ۶" })).toBeInTheDocument();
  });

  it("renders links with prev and next relations when given hrefs", async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        pageCount={8}
        defaultPage={4}
        getHref={(page) => `/courses?page=${page}`}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByRole("link", { name: "صفحه ۴" })).toHaveAttribute("href", "/courses?page=4");
    expect(screen.getByRole("link", { name: "قبلی" })).toHaveAttribute("rel", "prev");
    expect(screen.getByRole("link", { name: "قبلی" })).toHaveAttribute("href", "/courses?page=3");
    expect(screen.getByRole("link", { name: "بعدی" })).toHaveAttribute("rel", "next");

    // Pages 1–5 and 8 are shown; the gap hides 6 and 7.
    expect(screen.queryByRole("link", { name: "صفحه ۶" })).toBeNull();
    const page5 = screen.getByRole("link", { name: "صفحه ۵" });
    page5.addEventListener("click", (event) => event.preventDefault());
    await userEvent.click(page5);

    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  it("replaces the unavailable step link with a disabled button", () => {
    render(<Pagination pageCount={3} defaultPage={1} getHref={(page) => `?page=${page}`} />);

    expect(screen.getByRole("button", { name: "قبلی" })).toBeDisabled();
    expect(screen.getByRole("link", { name: "بعدی" })).toHaveAttribute("href", "?page=2");
  });

  it("uses Latin digits and English labels in English", () => {
    render(
      <AveroProvider locale="en-US">
        <Pagination pageCount={12} defaultPage={3} />
      </AveroProvider>,
    );

    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveTextContent("3");
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("accepts a custom label and native attributes", () => {
    const ref = createRef<HTMLElement>();
    render(<Pagination ref={ref} pageCount={2} aria-label="نتایج" className="justify-center" />);

    expect(ref.current).toHaveAttribute("aria-label", "نتایج");
    expect(ref.current).toHaveAttribute("data-slot", "pagination");
    expect(ref.current).toHaveClass("flex", "justify-center");
  });

  it("renders nothing without pages", () => {
    const { container } = render(<Pagination pageCount={0} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders on the server", () => {
    const html = renderToString(
      <Pagination pageCount={9} defaultPage={2} getHref={(page) => `/p/${page}`} />,
    );

    expect(html).toContain('aria-current="page"');
    expect(html).toContain('href="/p/2"');
  });

  it("has no accessibility violations as buttons or links", async () => {
    const { container, rerender } = render(<Pagination pageCount={20} defaultPage={10} />);
    await expectNoAxeViolations(container);

    rerender(<Pagination pageCount={20} defaultPage={1} getHref={(page) => `/p/${page}`} />);
    await expectNoAxeViolations(container);
  });
});
