import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Field, FieldControl, FieldDescription, FieldLabel } from "../field/Field.js";
import { Switch } from "./Switch.js";

function Notifications(props: Parameters<typeof Switch>[0]) {
  return (
    <div>
      <label htmlFor="notifications">اعلان‌ها</label>
      <Switch id="notifications" {...props} />
    </div>
  );
}

describe("Switch", () => {
  it("renders an off switch named by its label", () => {
    render(<Notifications />);
    const control = screen.getByRole("switch", { name: "اعلان‌ها" });

    expect(control).toHaveAttribute("aria-checked", "false");
    expect(control).toHaveAttribute("data-slot", "switch");
    expect(control).toHaveClass("h-6", "w-11", "border-2", "border-gray-300", "bg-white");
  });

  it("uses the soft palette: a gray thumb while off, a blue tint and thumb once on", async () => {
    render(<Notifications />);
    const control = screen.getByRole("switch");
    const thumb = control.querySelector("[data-slot='switch-thumb']");

    expect(thumb).toHaveClass("size-4", "bg-gray-400", "data-[state=checked]:bg-blue-600");
    expect(control).toHaveClass("data-[state=checked]:bg-blue-50", "active:scale-95");

    await userEvent.click(control);
    expect(thumb).toHaveAttribute("data-state", "checked");
  });

  it("turns on when clicked and reports the new state", async () => {
    const onCheckedChange = vi.fn();
    render(<Notifications onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole("switch");

    await userEvent.click(control);

    expect(control).toHaveAttribute("aria-checked", "true");
    expect(control).toHaveAttribute("data-state", "checked");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("toggles from the keyboard with Space and Enter", async () => {
    render(<Notifications />);
    screen.getByRole("switch").focus();

    await userEvent.keyboard(" ");
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");

    await userEvent.keyboard("{Enter}");
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("slides the thumb toward the inline end in both directions", () => {
    render(<Notifications defaultChecked />);
    const thumb = screen.getByRole("switch").querySelector("[data-slot='switch-thumb']");

    expect(thumb).toHaveAttribute("data-state", "checked");
    expect(thumb).toHaveClass(
      "data-[state=checked]:translate-x-5",
      "rtl:data-[state=checked]:-translate-x-5",
    );
  });

  it("does not toggle while disabled", async () => {
    render(<Notifications disabled />);

    await userEvent.click(screen.getByRole("switch"));

    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("submits its value with a form", async () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return new FormData(event.currentTarget).get("notifications");
    });
    render(
      <form onSubmit={onSubmit}>
        <Switch name="notifications" aria-label="اعلان‌ها" />
        <button type="submit">ذخیره</button>
      </form>,
    );

    await userEvent.click(screen.getByRole("switch"));
    await userEvent.click(screen.getByRole("button", { name: "ذخیره" }));

    expect(onSubmit).toHaveReturnedWith("on");
  });

  it("is labelled and described through Field", () => {
    render(
      <Field>
        <FieldLabel>حالت تمرکز</FieldLabel>
        <FieldControl>
          <Switch />
        </FieldControl>
        <FieldDescription>اعلان‌ها تا پایان جلسه بی‌صدا می‌شوند</FieldDescription>
      </Field>,
    );

    expect(screen.getByRole("switch", { name: "حالت تمرکز" })).toHaveAccessibleDescription(
      "اعلان‌ها تا پایان جلسه بی‌صدا می‌شوند",
    );
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Switch ref={ref} aria-label="x" />);

    expect(ref.current).toHaveAttribute("data-slot", "switch");
  });

  it("renders on the server", () => {
    expect(renderToString(<Switch aria-label="x" />)).toContain('data-slot="switch"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Notifications defaultChecked />);

    await expectNoAxeViolations(container);
  });
});
