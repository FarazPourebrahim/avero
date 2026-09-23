import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef, useState, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Field, FieldControl, FieldLabel } from "../field/Field.js";
import { PriceInput } from "./PriceInput.js";

function inEnglish(children: ReactNode) {
  return <AveroProvider locale="en-US">{children}</AveroProvider>;
}

describe("PriceInput", () => {
  it("renders an empty numeric field with the toman unit as its description", () => {
    render(<PriceInput aria-label="بودجه" />);
    const input = screen.getByRole("textbox", { name: "بودجه" });

    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("inputmode", "numeric");
    expect(input).toHaveAccessibleDescription("تومان");
    expect(input).toHaveClass("pe-16", "rounded-xl", "border-gray-300");
  });

  it("groups Latin digits with the Persian separator and reports a number", async () => {
    const onValueChange = vi.fn();
    render(<PriceInput aria-label="بودجه" onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "2500000");

    expect(input).toHaveValue("۲٬۵۰۰٬۰۰۰");
    expect(onValueChange).toHaveBeenLastCalledWith(2_500_000);
  });

  it("accepts Persian and Arabic digits", async () => {
    const onValueChange = vi.fn();
    render(<PriceInput aria-label="بودجه" onValueChange={onValueChange} />);

    await userEvent.type(screen.getByRole("textbox"), "۱۲٣٤");

    expect(onValueChange).toHaveBeenLastCalledWith(1234);
  });

  it("uses Latin grouping and the English unit in English", async () => {
    render(inEnglish(<PriceInput aria-label="Budget" />));
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "2500000");

    expect(input).toHaveValue("2,500,000");
    expect(input).toHaveAccessibleDescription("Toman");
  });

  it("ignores letters and keeps the caret where it was", async () => {
    const onValueChange = vi.fn();
    render(
      inEnglish(
        <PriceInput aria-label="Budget" defaultValue={1000} onValueChange={onValueChange} />,
      ),
    );
    const input = screen.getByRole<HTMLInputElement>("textbox");

    await userEvent.type(input, "a", { initialSelectionStart: 1, initialSelectionEnd: 1 });

    expect(input).toHaveValue("1,000");
    expect(input.selectionStart).toBe(1);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("keeps the caret after the typed digit when the grouping changes", async () => {
    render(inEnglish(<PriceInput aria-label="Budget" defaultValue={1000} />));
    const input = screen.getByRole<HTMLInputElement>("textbox");

    await userEvent.type(input, "2", { initialSelectionStart: 1, initialSelectionEnd: 1 });

    expect(input).toHaveValue("12,000");
    expect(input.selectionStart).toBe(2);
  });

  it("drops leading zeros", async () => {
    const onValueChange = vi.fn();
    render(inEnglish(<PriceInput aria-label="Budget" onValueChange={onValueChange} />));
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "007");

    expect(input).toHaveValue("7");
    expect(onValueChange).toHaveBeenLastCalledWith(7);
  });

  it("reports null when cleared", async () => {
    const onValueChange = vi.fn();
    render(<PriceInput aria-label="بودجه" defaultValue={5000} onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox");

    await userEvent.clear(input);

    expect(input).toHaveValue("");
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("caps the amount at max", async () => {
    const onValueChange = vi.fn();
    render(inEnglish(<PriceInput aria-label="Budget" max={1000} onValueChange={onValueChange} />));
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "5000");

    expect(input).toHaveValue("1,000");
    expect(onValueChange).toHaveBeenLastCalledWith(1000);
  });

  it("stops at the largest safe integer", async () => {
    const onValueChange = vi.fn();
    render(inEnglish(<PriceInput aria-label="Budget" onValueChange={onValueChange} />));

    await userEvent.type(screen.getByRole("textbox"), "9999999999999999");

    expect(onValueChange).toHaveBeenLastCalledWith(999_999_999_999_999);
  });

  it("follows the parent when controlled", async () => {
    function Controlled() {
      const [budget, setBudget] = useState<number | null>(300);
      return (
        <>
          <PriceInput aria-label="Budget" value={budget} onValueChange={setBudget} />
          <output>{String(budget)}</output>
        </>
      );
    }
    render(inEnglish(<Controlled />));

    await userEvent.type(screen.getByRole("textbox"), "0");

    expect(screen.getByRole("status")).toHaveTextContent("3000");
    expect(screen.getByRole("textbox")).toHaveValue("3,000");
  });

  it("hides the unit or replaces it", () => {
    const { rerender } = render(<PriceInput aria-label="قیمت" currency={null} />);

    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby");
    expect(screen.getByRole("textbox")).not.toHaveClass("pe-16");

    rerender(<PriceInput aria-label="قیمت" currency="ریال" />);

    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("ریال");
  });

  it("submits the amount in Latin digits", async () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return new FormData(event.currentTarget).get("budget");
    });
    render(
      <form onSubmit={onSubmit}>
        <PriceInput aria-label="بودجه" name="budget" />
        <button type="submit">ثبت</button>
      </form>,
    );

    await userEvent.type(screen.getByRole("textbox"), "۲۵۰۰");
    await userEvent.click(screen.getByRole("button", { name: "ثبت" }));

    expect(onSubmit).toHaveReturnedWith("2500");
  });

  it("is labelled and described through Field", () => {
    render(
      <Field invalid>
        <FieldLabel>بودجه</FieldLabel>
        <FieldControl>
          <PriceInput aria-describedby="note" />
        </FieldControl>
        <p id="note">حداقل ۱ میلیون</p>
      </Field>,
    );
    const input = screen.getByRole("textbox", { name: "بودجه" });

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("حداقل ۱ میلیون تومان");
  });

  it("forwards refs and passes native attributes", () => {
    const ref = createRef<HTMLInputElement>();
    render(<PriceInput ref={ref} aria-label="بودجه" placeholder="مبلغ" disabled />);

    expect(ref.current).toHaveAttribute("data-slot", "price-input-control");
    expect(ref.current).toHaveAttribute("placeholder", "مبلغ");
    expect(ref.current).toBeDisabled();
  });

  it("renders the formatted amount on the server", () => {
    const html = renderToString(<PriceInput aria-label="بودجه" defaultValue={4_500_000} />);

    expect(html).toContain("۴٬۵۰۰٬۰۰۰");
    expect(html).toContain("تومان");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<PriceInput aria-label="بودجه" defaultValue={4_500_000} />);

    await expectNoAxeViolations(container);
  });
});
