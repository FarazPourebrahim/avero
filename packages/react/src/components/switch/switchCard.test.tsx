import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Field, FieldControl } from "../field/Field.js";
import { SwitchCard } from "./SwitchCard.js";

describe("SwitchCard", () => {
  it("names the switch by its title and describes it by its description", () => {
    render(<SwitchCard title="اعلان‌های ایمیلی" description="خلاصه فعالیت هفته" />);

    const control = screen.getByRole("switch", { name: "اعلان‌های ایمیلی" });
    expect(control).toHaveAccessibleDescription("خلاصه فعالیت هفته");
  });

  it("toggles when anywhere on the card is clicked", async () => {
    const onCheckedChange = vi.fn();
    render(
      <SwitchCard
        title="حالت تمرکز"
        description="اعلان‌ها تا پایان جلسه بی‌صدا می‌شوند"
        onCheckedChange={onCheckedChange}
      />,
    );

    await userEvent.click(screen.getByText("اعلان‌ها تا پایان جلسه بی‌صدا می‌شوند"));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("toggles exactly once when the switch itself is clicked", async () => {
    const onCheckedChange = vi.fn();
    render(<SwitchCard title="پیامک" onCheckedChange={onCheckedChange} />);

    await userEvent.click(screen.getByRole("switch"));

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
  });

  it("tints the card while on and omits an absent description", () => {
    const { container } = render(<SwitchCard title="پیامک" defaultChecked />);

    expect(container.querySelector('[data-slot="switch-card"]')).toHaveClass(
      "has-[[data-state=checked]]:border-blue-200",
    );
    expect(container.querySelector('[data-slot="switch-card-description"]')).toBeNull();
    expect(screen.getByRole("switch")).not.toHaveAttribute("aria-describedby");
  });

  it("does not toggle while disabled", async () => {
    render(<SwitchCard title="پیامک" disabled />);

    await userEvent.click(screen.getByText("پیامک"));

    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("takes its id, invalid state and descriptions from Field", () => {
    render(
      <>
        <p id="hint">راهنما</p>
        <Field id="sync" invalid>
          <FieldControl aria-describedby="hint">
            <SwitchCard title="همگام‌سازی" description="روی همه دستگاه‌ها" />
          </FieldControl>
        </Field>
      </>,
    );

    const control = screen.getByRole("switch", { name: "همگام‌سازی" });
    expect(control).toHaveAttribute("id", "sync");
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control).toHaveAccessibleDescription("راهنما روی همه دستگاه‌ها");
  });

  it("forwards its ref to the switch and its className to the card", () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(
      <SwitchCard ref={ref} title="پیامک" className="w-80" switchClassName="ms-1" />,
    );

    expect(ref.current).toHaveAttribute("role", "switch");
    expect(ref.current).toHaveClass("ms-1");
    expect(container.querySelector('[data-slot="switch-card"]')).toHaveClass("w-80");
  });

  it("renders on the server", () => {
    expect(renderToString(<SwitchCard title="پیامک" description="به‌زودی" />)).toContain(
      "switch-card",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <SwitchCard title="اعلان‌های ایمیلی" description="خلاصه فعالیت هفته" defaultChecked />,
    );

    await expectNoAxeViolations(container);
  });
});
