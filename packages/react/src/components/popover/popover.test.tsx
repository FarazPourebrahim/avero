import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Button } from "../button/Button.js";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./Popover.js";

function FilterPopover(props: { defaultOpen?: boolean; align?: "start" | "center" | "end" }) {
  return (
    <Popover defaultOpen={props.defaultOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">فیلترها</Button>
      </PopoverTrigger>
      <PopoverContent aria-label="فیلتر دوره‌ها" align={props.align}>
        <label htmlFor="free-only">فقط دوره‌های رایگان</label>
        <input id="free-only" type="checkbox" />
        <PopoverClose asChild>
          <Button size="sm">اعمال</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("opens from its trigger as a named dialog and moves focus inside", async () => {
    render(<FilterPopover />);
    const trigger = screen.getByRole("button", { name: "فیلترها" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(trigger);

    const panel = screen.getByRole("dialog", { name: "فیلتر دوره‌ها" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveClass("z-(--z-popover)", "shadow-pop-wide", "rounded-2xl", "w-72");
    expect(screen.getByRole("checkbox", { name: "فقط دوره‌های رایگان" })).toHaveFocus();
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    render(<FilterPopover />);
    const trigger = screen.getByRole("button", { name: "فیلترها" });

    await userEvent.click(trigger);
    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("closes from a PopoverClose inside", async () => {
    render(<FilterPopover defaultOpen />);

    await userEvent.click(screen.getByRole("button", { name: "اعمال" }));

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("passes the provider direction to the panel so alignment stays logical", () => {
    const { unmount } = render(<FilterPopover defaultOpen align="start" />);

    const persian = screen.getByRole("dialog");
    expect(persian).toHaveAttribute("data-align", "start");
    expect(persian.closest("[data-radix-popper-content-wrapper]")).toHaveAttribute("dir", "rtl");
    unmount();

    render(
      <AveroProvider locale="en-US">
        <FilterPopover defaultOpen align="start" />
      </AveroProvider>,
    );

    expect(
      screen.getByRole("dialog").closest("[data-radix-popper-content-wrapper]"),
    ).toHaveAttribute("dir", "ltr");
  });

  it("merges classes and forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Popover defaultOpen>
        <PopoverTrigger>باز کردن</PopoverTrigger>
        <PopoverContent ref={ref} aria-label="پنل" className="w-96 p-0">
          محتوا
        </PopoverContent>
      </Popover>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "popover-content");
    expect(ref.current).toHaveClass("w-96", "p-0");
    expect(ref.current).not.toHaveClass("w-72");
  });

  it("renders only the trigger on the server", () => {
    const html = renderToString(<FilterPopover />);

    expect(html).toContain("فیلترها");
    expect(html).not.toContain("popover-content");
  });

  it("has no accessibility violations while open", async () => {
    render(<FilterPopover defaultOpen />);

    await expectNoAxeViolations(screen.getByRole("dialog"));
  });
});
