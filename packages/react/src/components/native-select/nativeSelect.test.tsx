import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { NativeSelect } from "./NativeSelect.js";

function sortOptions() {
  return (
    <>
      <option value="newest">جدیدترین</option>
      <option value="oldest">قدیمی‌ترین</option>
      <option value="popular">محبوب‌ترین</option>
    </>
  );
}

describe("NativeSelect", () => {
  it("renders a sort control", () => {
    render(<NativeSelect aria-label="مرتب‌سازی">{sortOptions()}</NativeSelect>);
    const select = screen.getByRole("combobox", { name: "مرتب‌سازی" });

    expect(select).toHaveClass("border-gray-300", "bg-white", "cursor-pointer");
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("changes the selected option", async () => {
    render(
      <NativeSelect aria-label="مرتب‌سازی" defaultValue="newest">
        {sortOptions()}
      </NativeSelect>,
    );

    await userEvent.selectOptions(screen.getByRole("combobox"), "popular");

    expect(screen.getByRole("combobox")).toHaveValue("popular");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <NativeSelect aria-label="x" ref={ref}>
        {sortOptions()}
      </NativeSelect>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "native-select");
  });

  it("renders on the server", () => {
    expect(renderToString(<NativeSelect aria-label="x">{sortOptions()}</NativeSelect>)).toContain(
      'data-slot="native-select"',
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <label htmlFor="sort">مرتب‌سازی</label>
        <NativeSelect id="sort">{sortOptions()}</NativeSelect>
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
