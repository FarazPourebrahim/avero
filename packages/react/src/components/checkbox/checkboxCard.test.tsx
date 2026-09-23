import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Field, FieldControl } from "../field/Field.js";
import { CheckboxCard } from "./CheckboxCard.js";

describe("CheckboxCard", () => {
  it("names the checkbox by its title and describes it by its description", () => {
    render(<CheckboxCard title="ایمیل هفتگی" description="خلاصه‌ای در هر شنبه" />);

    const checkbox = screen.getByRole("checkbox", { name: "ایمیل هفتگی" });
    expect(checkbox).toHaveAccessibleDescription("خلاصه‌ای در هر شنبه");
  });

  it("toggles when anywhere on the card is clicked", async () => {
    const onCheckedChange = vi.fn();
    render(
      <CheckboxCard
        title="یادآوری جلسه‌ها"
        description="یک ساعت پیش از هر جلسه"
        onCheckedChange={onCheckedChange}
      />,
    );

    await userEvent.click(screen.getByText("یک ساعت پیش از هر جلسه"));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-state", "checked");
  });

  it("toggles exactly once when the checkbox itself is clicked", async () => {
    const onCheckedChange = vi.fn();
    render(<CheckboxCard title="پیامک" onCheckedChange={onCheckedChange} />);

    await userEvent.click(screen.getByRole("checkbox"));

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("styles the card from the checkbox state", () => {
    const { container } = render(<CheckboxCard title="ایمیل هفتگی" defaultChecked />);

    expect(container.querySelector('[data-slot="checkbox-card"]')).toHaveClass(
      "has-[[data-state=checked]]:border-blue-200",
    );
  });

  it("renders an aside and omits the description when there is none", () => {
    const { container } = render(<CheckboxCard title="اشتراک ویژه" aside="۹۹٬۰۰۰ تومان" />);

    expect(screen.getByText("۹۹٬۰۰۰ تومان")).toHaveAttribute("data-slot", "checkbox-card-aside");
    expect(container.querySelector('[data-slot="checkbox-card-description"]')).toBeNull();
    expect(screen.getByRole("checkbox")).not.toHaveAttribute("aria-describedby");
  });

  it("does not toggle while disabled", async () => {
    render(<CheckboxCard title="پیامک" disabled />);

    await userEvent.click(screen.getByText("پیامک"));

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("takes its id, invalid state and descriptions from Field", () => {
    render(
      <>
        <p id="hint">راهنما</p>
        <Field id="terms" invalid>
          <FieldControl aria-describedby="hint">
            <CheckboxCard title="قوانین را می‌پذیرم" description="پیش از ادامه" />
          </FieldControl>
        </Field>
      </>,
    );

    const checkbox = screen.getByRole("checkbox", { name: "قوانین را می‌پذیرم" });
    expect(checkbox).toHaveAttribute("id", "terms");
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAccessibleDescription("راهنما پیش از ادامه");
  });

  it("forwards its ref to the checkbox and its className to the card", () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(
      <CheckboxCard ref={ref} title="پیامک" className="w-80" checkboxClassName="ms-1" />,
    );

    expect(ref.current).toHaveAttribute("role", "checkbox");
    expect(ref.current).toHaveClass("ms-1");
    expect(container.querySelector('[data-slot="checkbox-card"]')).toHaveClass("w-80");
  });

  it("renders on the server", () => {
    expect(renderToString(<CheckboxCard title="پیامک" description="به‌زودی" />)).toContain(
      "checkbox-card",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CheckboxCard title="ایمیل هفتگی" description="خلاصه‌ای در هر شنبه" defaultChecked />,
    );

    await expectNoAxeViolations(container);
  });
});
