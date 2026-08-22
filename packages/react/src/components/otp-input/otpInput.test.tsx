import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Field, FieldControl, FieldDescription, FieldLabel } from "../field/Field.js";
import { OtpInput } from "./OtpInput.js";

function slotsOf(container: HTMLElement): string[] {
  return [...container.querySelectorAll("[data-slot='otp-input-slot']")].map(
    (slot) => slot.textContent ?? "",
  );
}

describe("OtpInput", () => {
  it("renders one autofill-ready input over six empty boxes", () => {
    const { container } = render(<OtpInput aria-label="کد تأیید" />);
    const input = screen.getByRole("textbox", { name: "کد تأیید" });

    expect(input).toHaveAttribute("autocomplete", "one-time-code");
    expect(input).toHaveAttribute("inputmode", "numeric");
    expect(input).not.toHaveAttribute("maxlength");
    expect(slotsOf(container)).toEqual(["", "", "", "", "", ""]);
    container.querySelectorAll("[data-slot='otp-input-slot']").forEach((slot) => {
      expect(slot).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("renders the requested number of boxes", () => {
    const { container } = render(<OtpInput aria-label="کد" length={4} />);

    expect(slotsOf(container)).toHaveLength(4);
  });

  it("fills the boxes as digits are typed and reports the code", async () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <AveroProvider locale="en-US">
        <OtpInput aria-label="Code" onValueChange={onValueChange} />
      </AveroProvider>,
    );

    await userEvent.type(screen.getByRole("textbox"), "123");

    expect(screen.getByRole("textbox")).toHaveValue("123");
    expect(slotsOf(container)).toEqual(["1", "2", "3", "", "", ""]);
    expect(onValueChange).toHaveBeenLastCalledWith("123");
  });

  it("ignores anything that is not a digit", async () => {
    render(<OtpInput aria-label="کد" />);

    await userEvent.type(screen.getByRole("textbox"), "1a-2 b3");

    expect(screen.getByRole("textbox")).toHaveValue("123");
  });

  it("converts Persian and Arabic digits and shows Persian digits by default", async () => {
    const onValueChange = vi.fn();
    const { container } = render(<OtpInput aria-label="کد" onValueChange={onValueChange} />);

    await userEvent.type(screen.getByRole("textbox"), "۱۲٣");

    expect(onValueChange).toHaveBeenLastCalledWith("123");
    expect(slotsOf(container).slice(0, 3)).toEqual(["۱", "۲", "۳"]);
  });

  it("accepts a pasted code with separators and completes it once", async () => {
    const onComplete = vi.fn();
    render(<OtpInput aria-label="کد" onComplete={onComplete} />);
    const input = screen.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.paste("۱۲۳-۴۵۶");

    expect(input).toHaveValue("123456");
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith("123456");
  });

  it("stops at the code length", async () => {
    const onComplete = vi.fn();
    render(<OtpInput aria-label="کد" length={4} onComplete={onComplete} />);

    await userEvent.type(screen.getByRole("textbox"), "123456");

    expect(screen.getByRole("textbox")).toHaveValue("1234");
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("deletes the last digit with Backspace", async () => {
    render(<OtpInput aria-label="کد" defaultValue="1234" />);

    await userEvent.type(screen.getByRole("textbox"), "{Backspace}");

    expect(screen.getByRole("textbox")).toHaveValue("123");
  });

  it("keeps the value the parent sets when controlled", async () => {
    const onValueChange = vi.fn();
    render(<OtpInput aria-label="کد" value="12" onValueChange={onValueChange} />);

    await userEvent.type(screen.getByRole("textbox"), "3");

    expect(onValueChange).toHaveBeenCalledWith("123");
    expect(screen.getByRole("textbox")).toHaveValue("12");
  });

  it("highlights the next box to fill while focused", async () => {
    const { container } = render(<OtpInput aria-label="کد" defaultValue="12" />);
    const slots = container.querySelectorAll("[data-slot='otp-input-slot']");

    expect(slots[2]).not.toHaveAttribute("data-active");

    await userEvent.click(screen.getByRole("textbox"));

    expect(slots[2]).toHaveAttribute("data-active");
    expect(slots[2]).toHaveClass("border-primary");
  });

  it("marks every box invalid", () => {
    const { container } = render(<OtpInput aria-label="کد" aria-invalid />);

    expect(container.firstElementChild).toHaveAttribute("data-invalid");
    expect(container.querySelector("[data-slot='otp-input-slot']")).toHaveClass("border-red-500");
  });

  it("does not accept input while disabled", async () => {
    render(<OtpInput aria-label="کد" disabled />);

    await userEvent.type(screen.getByRole("textbox"), "12");

    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("lays the boxes out left to right on RTL pages", () => {
    const { container } = render(
      <div dir="rtl">
        <OtpInput aria-label="کد" />
      </div>,
    );

    expect(container.querySelector("[data-slot='otp-input-container']")).toHaveAttribute(
      "dir",
      "ltr",
    );
  });

  it("submits the Latin-digit code with a form", async () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return new FormData(event.currentTarget).get("code");
    });
    render(
      <form onSubmit={onSubmit}>
        <OtpInput aria-label="کد" name="code" length={4} />
        <button type="submit">تأیید</button>
      </form>,
    );

    await userEvent.type(screen.getByRole("textbox"), "۴۵۶۷");
    await userEvent.click(screen.getByRole("button", { name: "تأیید" }));

    expect(onSubmit).toHaveReturnedWith("4567");
  });

  it("is labelled and described through Field", () => {
    render(
      <Field>
        <FieldLabel>کد تأیید</FieldLabel>
        <FieldControl>
          <OtpInput />
        </FieldControl>
        <FieldDescription>کد پیامک‌شده را وارد کنید</FieldDescription>
      </Field>,
    );

    expect(screen.getByRole("textbox", { name: "کد تأیید" })).toHaveAccessibleDescription(
      "کد پیامک‌شده را وارد کنید",
    );
  });

  it("forwards refs to the input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<OtpInput ref={ref} aria-label="کد" />);

    expect(ref.current).toHaveAttribute("data-slot", "otp-input");
  });

  it("renders on the server", () => {
    const html = renderToString(<OtpInput aria-label="کد" defaultValue="12" />);

    expect(html).toContain('data-slot="otp-input"');
    expect(html).toContain("۱");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<OtpInput aria-label="کد تأیید" defaultValue="123" />);

    await expectNoAxeViolations(container);
  });
});
