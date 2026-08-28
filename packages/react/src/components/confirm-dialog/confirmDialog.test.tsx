import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Button } from "../button/Button.js";
import { ConfirmDialog } from "./ConfirmDialog.js";

function deferred() {
  let resolve!: () => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<void>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

function DeleteCourse(props: Partial<React.ComponentProps<typeof ConfirmDialog>>) {
  return (
    <ConfirmDialog
      trigger={<Button variant="danger">حذف دوره</Button>}
      title="این دوره حذف شود؟"
      description="همه جلسه‌ها و دیدگاه‌های دوره برای همیشه پاک می‌شوند."
      confirmLabel="حذف دوره"
      tone="danger"
      onConfirm={() => {}}
      {...props}
    />
  );
}

describe("ConfirmDialog", () => {
  it("opens from its trigger as a named, described alert dialog", async () => {
    render(<DeleteCourse />);

    await userEvent.click(screen.getByRole("button", { name: "حذف دوره" }));

    const dialog = screen.getByRole("alertdialog", { name: "این دوره حذف شود؟" });
    expect(dialog).toHaveAccessibleDescription(
      "همه جلسه‌ها و دیدگاه‌های دوره برای همیشه پاک می‌شوند.",
    );
    expect(dialog).toHaveClass("max-w-sm", "rounded-3xl");
    expect(dialog).toHaveAttribute("data-tone", "danger");
  });

  it("starts on the cancel button so Enter doesn't confirm by accident", async () => {
    const onConfirm = vi.fn();
    render(<DeleteCourse onConfirm={onConfirm} />);
    const trigger = screen.getByRole("button", { name: "حذف دوره" });

    await userEvent.click(trigger);
    expect(screen.getByRole("button", { name: "انصراف" })).toHaveFocus();

    await userEvent.keyboard("{Enter}");

    expect(onConfirm).not.toHaveBeenCalled();
    expect(screen.queryByRole("alertdialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("styles the confirm button for the tone", async () => {
    const { rerender } = render(<DeleteCourse defaultOpen />);
    expect(screen.getByRole("button", { name: "حذف دوره" })).toHaveClass("bg-red-600");

    rerender(<DeleteCourse defaultOpen tone="default" />);
    expect(screen.getByRole("button", { name: "حذف دوره" })).toHaveClass("bg-primary");
  });

  it("runs a synchronous action and closes", async () => {
    const onConfirm = vi.fn();
    render(<DeleteCourse defaultOpen onConfirm={onConfirm} />);

    await userEvent.click(screen.getByRole("button", { name: "حذف دوره" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("stays open and busy until an async action resolves", async () => {
    const request = deferred();
    render(<DeleteCourse defaultOpen onConfirm={() => request.promise} />);
    const confirm = screen.getByRole("button", { name: "حذف دوره" });

    await userEvent.click(confirm);

    expect(confirm).toHaveAttribute("aria-busy", "true");
    expect(confirm).toBeDisabled();
    expect(screen.getByRole("button", { name: "انصراف" })).toBeDisabled();

    await userEvent.keyboard("{Escape}");
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    request.resolve();

    await vi.waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
  });

  it("stays open when the async action fails, ready to retry", async () => {
    const request = deferred();
    render(<DeleteCourse defaultOpen onConfirm={() => request.promise} />);
    const confirm = screen.getByRole("button", { name: "حذف دوره" });

    await userEvent.click(confirm);
    request.reject(new Error("network"));

    await vi.waitFor(() => expect(confirm).not.toHaveAttribute("aria-busy"));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    expect(confirm).toBeEnabled();
  });

  it("uses the dictionary labels", () => {
    render(
      <AveroProvider locale="en-US">
        <ConfirmDialog defaultOpen title="Leave the course?" onConfirm={() => {}} />
      </AveroProvider>,
    );

    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toHaveClass("bg-primary");
    expect(screen.getByRole("alertdialog")).not.toHaveAttribute("aria-describedby");
  });

  it("follows the parent when controlled", async () => {
    function Controlled() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>باز کردن</Button>
          <ConfirmDialog
            open={open}
            onOpenChange={setOpen}
            title="خروج از حساب؟"
            onConfirm={() => {}}
          />
          <output>{String(open)}</output>
        </>
      );
    }
    render(<Controlled />);

    await userEvent.click(screen.getByRole("button", { name: "باز کردن" }));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "تأیید" }));
    expect(screen.queryByRole("alertdialog")).toBeNull();
  });

  it("renders extra content, merges classes and forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <DeleteCourse ref={ref} defaultOpen className="max-w-md">
        <p>۱۲ هنرجو در این دوره ثبت‌نام کرده‌اند.</p>
      </DeleteCourse>,
    );

    expect(screen.getByText("۱۲ هنرجو در این دوره ثبت‌نام کرده‌اند.")).toBeInTheDocument();
    expect(ref.current).toHaveAttribute("data-slot", "confirm-dialog");
    expect(ref.current).toHaveClass("max-w-md");
  });

  it("renders only the trigger on the server", () => {
    const html = renderToString(<DeleteCourse />);

    expect(html).toContain("حذف دوره");
    expect(html).not.toContain("confirm-dialog");
  });

  it("has no accessibility violations while open", async () => {
    render(<DeleteCourse defaultOpen />);

    await expectNoAxeViolations(screen.getByRole("alertdialog"));
  });
});
