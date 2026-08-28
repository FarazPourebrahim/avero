import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Button } from "../button/Button.js";
import { Input } from "../input/Input.js";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  type DialogContentOwnProps,
} from "./Dialog.js";

function EditProfile(props: DialogContentOwnProps & { defaultOpen?: boolean }) {
  const { defaultOpen, ...content } = props;
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger asChild>
        <Button>ویرایش پروفایل</Button>
      </DialogTrigger>
      <DialogContent {...content}>
        <DialogHeader>
          <DialogTitle>ویرایش پروفایل</DialogTitle>
          <DialogDescription>نام نمایشی شما در همه دوره‌ها دیده می‌شود.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <label htmlFor="display-name">نام نمایشی</label>
          <Input id="display-name" />
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">انصراف</Button>
          </DialogClose>
          <Button>ذخیره</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("opens from its trigger as a named, described modal", async () => {
    render(<EditProfile />);

    expect(screen.queryByRole("dialog")).toBeNull();

    await userEvent.click(screen.getByRole("button", { name: "ویرایش پروفایل" }));

    const dialog = screen.getByRole("dialog", { name: "ویرایش پروفایل" });
    expect(dialog).toHaveAccessibleDescription("نام نمایشی شما در همه دوره‌ها دیده می‌شود.");
    expect(dialog).toHaveClass("max-w-lg", "rounded-3xl", "shadow-modal", "max-h-[90vh]");
  });

  it("focuses the first field rather than the close button", async () => {
    render(<EditProfile />);

    await userEvent.click(screen.getByRole("button", { name: "ویرایش پروفایل" }));

    expect(screen.getByRole("textbox", { name: "نام نمایشی" })).toHaveFocus();
  });

  it("dims and blurs the page behind it", () => {
    render(<EditProfile defaultOpen />);

    expect(document.querySelector('[data-slot="dialog-overlay"]')).toHaveClass(
      "bg-black/50",
      "backdrop-blur-sm",
      "z-(--z-modal)",
    );
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    render(<EditProfile />);
    const trigger = screen.getByRole("button", { name: "ویرایش پروفایل" });

    await userEvent.click(trigger);
    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("closes with the corner button and with a footer close", async () => {
    render(<EditProfile />);
    const trigger = screen.getByRole("button", { name: "ویرایش پروفایل" });

    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole("button", { name: "بستن" }));
    expect(screen.queryByRole("dialog")).toBeNull();

    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole("button", { name: "انصراف" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("labels the close button from the dictionary or a prop, or hides it", () => {
    const { rerender } = render(
      <AveroProvider locale="en-US">
        <EditProfile defaultOpen />
      </AveroProvider>,
    );
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();

    rerender(<EditProfile defaultOpen closeLabel="بستن پنجره" />);
    expect(screen.getByRole("button", { name: "بستن پنجره" })).toBeInTheDocument();

    rerender(<EditProfile defaultOpen showClose={false} />);
    expect(screen.queryByRole("button", { name: /بستن/ })).toBeNull();
  });

  it.each([
    ["sm", "max-w-sm"],
    ["lg", "max-w-3xl"],
  ] as const)("renders the %s size", (size, expected) => {
    render(<EditProfile defaultOpen size={size} />);

    expect(screen.getByRole("dialog")).toHaveClass(expected);
  });

  it("merges classes on every part", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent
          className="max-w-xl"
          overlayClassName="bg-black/70"
          aria-describedby={undefined}
        >
          <DialogHeader className="pb-2">
            <DialogTitle className="text-xl">عنوان</DialogTitle>
          </DialogHeader>
          <DialogBody className="p-8">متن</DialogBody>
          <DialogFooter className="justify-between">پایین</DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByRole("dialog")).toHaveClass("max-w-xl");
    expect(screen.getByRole("dialog")).not.toHaveClass("max-w-lg");
    expect(document.querySelector('[data-slot="dialog-overlay"]')).toHaveClass("bg-black/70");
    expect(document.querySelector('[data-slot="dialog-header"]')).toHaveClass("pb-2", "pe-14");
    expect(screen.getByRole("heading", { name: "عنوان" })).toHaveClass("text-xl");
    expect(document.querySelector('[data-slot="dialog-body"]')).toHaveClass(
      "p-8",
      "overflow-y-auto",
    );
    expect(document.querySelector('[data-slot="dialog-footer"]')).toHaveClass("justify-between");
  });

  it("forwards refs to the panel", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Dialog defaultOpen>
        <DialogContent ref={ref} aria-describedby={undefined}>
          <DialogTitle>عنوان</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "dialog-content");
  });

  it("renders only the trigger on the server", () => {
    const html = renderToString(<EditProfile />);

    expect(html).toContain("ویرایش پروفایل");
    expect(html).not.toContain("dialog-content");
  });

  it("has no accessibility violations while open", async () => {
    render(<EditProfile defaultOpen />);

    await expectNoAxeViolations(screen.getByRole("dialog"));
  });
});
