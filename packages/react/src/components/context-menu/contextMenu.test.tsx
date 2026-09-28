import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Dialog, DialogContent, DialogTitle } from "../dialog/Dialog.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu/DropdownMenu.js";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ContextMenu.js";

function MessageActions(props: { onDelete?: () => void }) {
  const [pinned, setPinned] = useState(false);
  const [reaction, setReaction] = useState("like");
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <p tabIndex={0}>سلام، جلسه فردا ساعت ۱۰ است.</p>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>پیام</ContextMenuLabel>
        <ContextMenuItem>پاسخ</ContextMenuItem>
        <ContextMenuItem disabled>ویرایش</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
          سنجاق کردن
        </ContextMenuCheckboxItem>
        <ContextMenuRadioGroup value={reaction} onValueChange={setReaction}>
          <ContextMenuRadioItem value="like">پسندیدن</ContextMenuRadioItem>
          <ContextMenuRadioItem value="love">عالی</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSub>
          <ContextMenuSubTrigger>ارسال به</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>گروه طراحی</ContextMenuItem>
            <ContextMenuItem>گروه فنی</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem tone="danger" onSelect={props.onDelete}>
          حذف
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

function message() {
  return screen.getByText("سلام، جلسه فردا ساعت ۱۰ است.");
}

async function openMenu() {
  await userEvent.pointer({ keys: "[MouseRight]", target: message() });
}

describe("ContextMenu", () => {
  it("opens on a secondary click with every kind of item", async () => {
    render(<MessageActions />);

    await openMenu();

    const menu = screen.getByRole("menu");
    expect(menu).toHaveAttribute("data-slot", "context-menu-content");
    expect(menu).toHaveClass("z-(--z-popover)", "shadow-pop-wide", "min-w-48");
    expect(screen.getAllByRole("menuitem").map((item) => item.textContent)).toEqual([
      "پاسخ",
      "ویرایش",
      "ارسال به",
      "حذف",
    ]);
    expect(screen.getByRole("menuitemcheckbox", { name: "سنجاق کردن" })).toHaveAttribute(
      "aria-checked",
      "false",
    );
    expect(screen.getByRole("menuitemradio", { name: "پسندیدن" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByText("پیام")).toHaveAttribute("data-slot", "context-menu-label");
    expect(screen.getAllByRole("separator")).toHaveLength(2);
    expect(screen.getByRole("menuitem", { name: "ویرایش" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("opens from the context-menu key on the focused area", () => {
    render(<MessageActions />);
    message().focus();

    fireEvent.contextMenu(message());

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("runs an item's action and closes", async () => {
    const onDelete = vi.fn();
    render(<MessageActions onDelete={onDelete} />);
    await openMenu();
    const remove = screen.getByRole("menuitem", { name: "حذف" });
    expect(remove).toHaveAttribute("data-tone", "danger");

    await userEvent.click(remove);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("toggles checkbox items and picks radio items", async () => {
    render(<MessageActions />);

    await openMenu();
    await userEvent.click(screen.getByRole("menuitemcheckbox", { name: "سنجاق کردن" }));
    await openMenu();
    expect(screen.getByRole("menuitemcheckbox", { name: "سنجاق کردن" })).toHaveAttribute(
      "aria-checked",
      "true",
    );

    await userEvent.click(screen.getByRole("menuitemradio", { name: "عالی" }));
    await openMenu();
    expect(screen.getByRole("menuitemradio", { name: "عالی" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("styles its parts exactly like DropdownMenu", async () => {
    const withoutHeightCap = (element: Element) =>
      [...element.classList].filter((name) => !name.startsWith("max-h-"));
    const { unmount } = render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>منو</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>مورد</DropdownMenuItem>
          <DropdownMenuItem tone="danger">حذف مورد</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    const dropdown = {
      content: withoutHeightCap(screen.getByRole("menu")),
      item: screen.getByRole("menuitem", { name: "مورد" }).className,
      danger: screen.getByRole("menuitem", { name: "حذف مورد" }).className,
    };
    unmount();

    render(<MessageActions />);
    await openMenu();

    expect(withoutHeightCap(screen.getByRole("menu"))).toEqual(dropdown.content);
    expect(screen.getByRole("menuitem", { name: "پاسخ" }).className).toBe(dropdown.item);
    expect(screen.getByRole("menuitem", { name: "حذف" }).className).toBe(dropdown.danger);
  });

  it("opens a submenu toward the reading direction from the keyboard", async () => {
    render(<MessageActions />);
    await openMenu();
    screen.getByRole("menuitem", { name: "ارسال به" }).focus();

    // Right to left: ArrowLeft opens the submenu.
    await userEvent.keyboard("{ArrowLeft}");

    expect(screen.getAllByRole("menu")).toHaveLength(2);
    expect(screen.getByRole("menuitem", { name: "گروه طراحی" })).toHaveFocus();
  });

  it("opens a submenu with ArrowRight left to right", async () => {
    render(
      <AveroProvider locale="en-US">
        <MessageActions />
      </AveroProvider>,
    );
    await openMenu();
    screen.getByRole("menuitem", { name: "ارسال به" }).focus();

    await userEvent.keyboard("{ArrowRight}");

    expect(screen.getAllByRole("menu")).toHaveLength(2);
  });

  it("returns focus to the message after a dialog opened from an item closes", async () => {
    function MessageWithDialog() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <p tabIndex={0}>سلام، جلسه فردا ساعت ۱۰ است.</p>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onSelect={() => setOpen(true)}>گزارش</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent aria-describedby={undefined}>
              <DialogTitle>گزارش پیام</DialogTitle>
            </DialogContent>
          </Dialog>
        </>
      );
    }
    const user = userEvent.setup();
    render(<MessageWithDialog />);
    await user.click(message());

    await user.pointer({ keys: "[MouseRight]", target: message() });
    await user.click(screen.getByRole("menuitem", { name: "گزارش" }));
    expect(screen.getByRole("dialog", { name: "گزارش پیام" })).toBeInTheDocument();
    await user.keyboard("{Escape}");

    expect(message()).toHaveFocus();
  });

  it("merges classes and forwards refs", async () => {
    const contentRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLSpanElement>();
    render(
      <ContextMenu>
        <ContextMenuTrigger ref={triggerRef}>ناحیه</ContextMenuTrigger>
        <ContextMenuContent ref={contentRef} className="min-w-64">
          <ContextMenuItem className="font-bold">مورد</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    expect(triggerRef.current).toHaveAttribute("data-slot", "context-menu-trigger");

    await userEvent.pointer({ keys: "[MouseRight]", target: triggerRef.current! });

    expect(contentRef.current).toHaveAttribute("data-slot", "context-menu-content");
    expect(contentRef.current).toHaveClass("min-w-64");
    expect(contentRef.current).not.toHaveClass("min-w-48");
    expect(screen.getByRole("menuitem")).toHaveClass("font-bold");
  });

  it("renders only the area on the server", () => {
    const html = renderToString(<MessageActions />);

    expect(html).toContain("سلام، جلسه فردا");
    expect(html).not.toContain("context-menu-content");
  });

  it("has no accessibility violations while open", async () => {
    render(<MessageActions />);
    await openMenu();

    await expectNoAxeViolations(screen.getByRole("menu"));
  });
});
