import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Button } from "../button/Button.js";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu.js";

function AccountMenu(props: { onSignOut?: () => void; defaultOpen?: boolean }) {
  const [sort, setSort] = useState("newest");
  const [compact, setCompact] = useState(false);
  return (
    <DropdownMenu defaultOpen={props.defaultOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">حساب کاربری</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>سارا محمدی</DropdownMenuLabel>
        <DropdownMenuItem>مشاهده پروفایل</DropdownMenuItem>
        <DropdownMenuItem disabled>گواهی‌ها</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={compact} onCheckedChange={setCompact}>
          نمایش فشرده
        </DropdownMenuCheckboxItem>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="newest">جدیدترین</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="popular">محبوب‌ترین</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>زبان</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>فارسی</DropdownMenuItem>
            <DropdownMenuItem>English</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="danger" onSelect={props.onSignOut}>
          خروج از حساب
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("opens from its trigger with every kind of item", async () => {
    render(<AccountMenu />);
    const trigger = screen.getByRole("button", { name: "حساب کاربری" });

    expect(trigger).toHaveAttribute("aria-haspopup", "menu");

    await userEvent.click(trigger);

    const menu = screen.getByRole("menu");
    expect(menu).toHaveClass("z-(--z-popover)", "shadow-pop-wide", "min-w-48");
    expect(screen.getAllByRole("menuitem").map((item) => item.textContent)).toEqual([
      "مشاهده پروفایل",
      "گواهی‌ها",
      "زبان",
      "خروج از حساب",
    ]);
    expect(screen.getByRole("menuitemcheckbox", { name: "نمایش فشرده" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
    expect(screen.getByRole("menuitemradio", { name: "جدیدترین" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByText("سارا محمدی")).toHaveAttribute("data-slot", "dropdown-menu-label");
    expect(screen.getAllByRole("separator")).toHaveLength(2);
  });

  it("focuses the first item when opened from the keyboard", async () => {
    render(<AccountMenu />);
    screen.getByRole("button", { name: "حساب کاربری" }).focus();

    await userEvent.keyboard("{Enter}");

    expect(screen.getByRole("menuitem", { name: "مشاهده پروفایل" })).toHaveFocus();
  });

  it("runs an item's action, closes and returns focus", async () => {
    const onSignOut = vi.fn();
    render(<AccountMenu onSignOut={onSignOut} />);
    const trigger = screen.getByRole("button", { name: "حساب کاربری" });

    await userEvent.click(trigger);
    const signOut = screen.getByRole("menuitem", { name: "خروج از حساب" });
    expect(signOut).toHaveAttribute("data-tone", "danger");
    expect(signOut).toHaveClass("text-red-600");

    await userEvent.click(signOut);

    expect(onSignOut).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("marks disabled items", async () => {
    render(<AccountMenu defaultOpen />);

    expect(screen.getByRole("menuitem", { name: "گواهی‌ها" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("toggles checkbox items and picks radio items", async () => {
    render(<AccountMenu />);
    const trigger = screen.getByRole("button", { name: "حساب کاربری" });

    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole("menuitemcheckbox", { name: "نمایش فشرده" }));
    await userEvent.click(trigger);

    expect(screen.getByRole("menuitemcheckbox", { name: "نمایش فشرده" })).toHaveAttribute(
      "aria-checked",
      "true",
    );

    await userEvent.click(screen.getByRole("menuitemradio", { name: "محبوب‌ترین" }));
    await userEvent.click(trigger);

    expect(screen.getByRole("menuitemradio", { name: "محبوب‌ترین" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("opens a submenu toward the reading direction from the keyboard", async () => {
    render(<AccountMenu />);
    screen.getByRole("button", { name: "حساب کاربری" }).focus();
    await userEvent.keyboard("{Enter}");
    screen.getByRole("menuitem", { name: "زبان" }).focus();

    // Right to left: ArrowLeft opens the submenu.
    await userEvent.keyboard("{ArrowLeft}");

    expect(screen.getAllByRole("menu")).toHaveLength(2);
    expect(screen.getByRole("menuitem", { name: "فارسی" })).toHaveFocus();
  });

  it("opens a submenu with ArrowRight left to right", async () => {
    render(
      <AveroProvider locale="en-US">
        <AccountMenu />
      </AveroProvider>,
    );
    screen.getByRole("button", { name: "حساب کاربری" }).focus();
    await userEvent.keyboard("{Enter}");
    screen.getByRole("menuitem", { name: "زبان" }).focus();

    await userEvent.keyboard("{ArrowRight}");

    expect(screen.getAllByRole("menu")).toHaveLength(2);
  });

  it("merges classes and forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>منو</DropdownMenuTrigger>
        <DropdownMenuContent ref={ref} className="min-w-64">
          <DropdownMenuItem className="font-bold">مورد</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "dropdown-menu-content");
    expect(ref.current).toHaveClass("min-w-64");
    expect(ref.current).not.toHaveClass("min-w-48");
    expect(screen.getByRole("menuitem")).toHaveClass("font-bold");
  });

  it("renders only the trigger on the server", () => {
    const html = renderToString(<AccountMenu />);

    expect(html).toContain("حساب کاربری");
    expect(html).not.toContain("dropdown-menu-content");
  });

  it("has no accessibility violations while open", async () => {
    render(<AccountMenu defaultOpen />);

    await expectNoAxeViolations(screen.getByRole("menu"));
  });
});
