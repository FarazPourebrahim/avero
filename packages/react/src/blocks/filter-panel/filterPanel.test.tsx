import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Input } from "../../components/input/index.js";
import { NativeSelect } from "../../components/native-select/index.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { FilterPanel } from "./FilterPanel.js";

function renderPanel(title?: string) {
  return render(
    <FilterPanel title={title}>
      <Input aria-label="جستجو" placeholder="جستجو..." />
      <NativeSelect aria-label="مرتب‌سازی" defaultValue="newest">
        <option value="newest">جدیدترین</option>
        <option value="popular">محبوب‌ترین</option>
      </NativeSelect>
    </FilterPanel>,
  );
}

describe("FilterPanel", () => {
  it("renders the dictionary's title above the controls", () => {
    renderPanel();

    expect(screen.getByRole("heading", { name: "فیلترها" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "جستجو" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "مرتب‌سازی" })).toBeInTheDocument();
  });

  it("names the region with its heading, which the reference leaves unnamed", () => {
    renderPanel();

    expect(screen.getByRole("region", { name: "فیلترها" })).toBeInTheDocument();
  });

  it("accepts its own title", () => {
    renderPanel("فیلتر خدمات");

    expect(screen.getByRole("region", { name: "فیلتر خدمات" })).toBeInTheDocument();
  });

  it("stacks the controls in the reference's rhythm", () => {
    const { container } = renderPanel();

    expect(container.querySelector('[data-slot="filter-panel-controls"]')).toHaveClass(
      "flex-col",
      "gap-3",
    );
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(
      <FilterPanel ref={ref}>
        <Input aria-label="جستجو" />
      </FilterPanel>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "filter-panel");
  });

  it("renders on the server", () => {
    expect(
      renderToString(
        <FilterPanel>
          <Input aria-label="جستجو" />
        </FilterPanel>,
      ),
    ).toContain("فیلترها");
  });

  it("has no accessibility violations", async () => {
    const { container } = renderPanel();

    await expectNoAxeViolations(container);
  });
});
