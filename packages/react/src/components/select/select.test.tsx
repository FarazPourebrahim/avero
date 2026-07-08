import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select.js";

function Categories(props: { onValueChange?: (value: string) => void; defaultValue?: string }) {
  return (
    <Select {...props}>
      <SelectTrigger aria-label="دسته‌بندی">
        <SelectValue placeholder="همه دسته‌ها" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="seo">سئو</SelectItem>
        <SelectItem value="design">طراحی سایت</SelectItem>
        <SelectItem value="content" disabled>
          تولید محتوا
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("renders the reference trigger, closed, with a placeholder", () => {
    render(<Categories />);
    const trigger = screen.getByRole("combobox", { name: "دسته‌بندی" });

    expect(trigger).toHaveClass("rounded-xl", "border-gray-300", "px-3.5", "py-2.5");
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(trigger).toHaveTextContent("همه دسته‌ها");
    expect(screen.queryByRole("option")).toBeNull();
  });

  it("opens on click and picks an option", async () => {
    const onValueChange = vi.fn();
    render(<Categories onValueChange={onValueChange} />);
    // Radix hides the rest of the page from assistive technology while the list is open, so the
    // trigger has to be held from before the click rather than re-queried by role.
    const trigger = screen.getByRole("combobox", { name: "دسته‌بندی" });

    await userEvent.click(trigger);

    expect(trigger).toHaveAttribute("data-state", "open");
    expect(screen.getAllByRole("option")).toHaveLength(3);

    await userEvent.click(screen.getByRole("option", { name: "طراحی سایت" }));

    expect(onValueChange).toHaveBeenCalledWith("design");
    expect(trigger).toHaveTextContent("طراحی سایت");
  });

  it("opens from the keyboard", async () => {
    render(<Categories />);
    screen.getByRole("combobox").focus();

    await userEvent.keyboard("{Enter}");

    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("marks the selected option and disables the unavailable one", async () => {
    render(<Categories defaultValue="seo" />);

    await userEvent.click(screen.getByRole("combobox"));

    expect(screen.getByRole("option", { name: "سئو" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("option", { name: "تولید محتوا" })).toHaveAttribute(
      "data-disabled",
      "",
    );
  });

  it("forwards refs to the trigger", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Select>
        <SelectTrigger ref={ref} aria-label="x">
          <SelectValue placeholder="x" />
        </SelectTrigger>
      </Select>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "select-trigger");
  });

  it("renders the closed trigger on the server", () => {
    const html = renderToString(<Categories />);

    expect(html).toContain('data-slot="select-trigger"');
    expect(html).toContain("همه دسته‌ها");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Categories />);

    await expectNoAxeViolations(container);
  });
});
