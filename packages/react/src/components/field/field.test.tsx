import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Input } from "../input/Input.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select/index.js";
import { Textarea } from "../textarea/Textarea.js";
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "./Field.js";

describe("Field", () => {
  it("labels the control through a generated id", () => {
    render(
      <Field>
        <FieldLabel>نام</FieldLabel>
        <FieldControl>
          <Input />
        </FieldControl>
      </Field>,
    );

    const input = screen.getByRole("textbox", { name: "نام" });
    expect(input.id).not.toBe("");
    expect(input).toHaveAttribute("data-slot", "input");
  });

  it("uses an explicit id for the control", () => {
    render(
      <Field id="email">
        <FieldLabel>ایمیل</FieldLabel>
        <FieldControl>
          <Input type="email" />
        </FieldControl>
      </Field>,
    );

    expect(screen.getByLabelText("ایمیل")).toHaveAttribute("id", "email");
  });

  it("describes the control with its description", () => {
    render(
      <Field>
        <FieldLabel>نام کاربری</FieldLabel>
        <FieldControl>
          <Input />
        </FieldControl>
        <FieldDescription>فقط حروف انگلیسی و عدد</FieldDescription>
      </Field>,
    );

    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("فقط حروف انگلیسی و عدد");
  });

  it("hides the error and leaves the control valid until the field is invalid", () => {
    render(
      <Field>
        <FieldLabel>نام</FieldLabel>
        <FieldControl>
          <Input />
        </FieldControl>
        <FieldError>نام الزامی است</FieldError>
      </Field>,
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid");
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby");
  });

  it("marks an invalid control and describes it with the error", () => {
    render(
      <Field invalid>
        <FieldLabel>نام</FieldLabel>
        <FieldControl>
          <Input />
        </FieldControl>
        <FieldDescription>نام کامل خود را بنویسید</FieldDescription>
        <FieldError>نام الزامی است</FieldError>
      </Field>,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("نام کامل خود را بنویسید نام الزامی است");
    expect(screen.getByRole("alert")).toHaveTextContent("نام الزامی است");
    expect(screen.getByText("نام الزامی است").closest("[data-slot='field']")).toHaveAttribute(
      "data-invalid",
    );
  });

  it("pairs the error with a decorative icon, so it does not rely on colour alone", () => {
    render(
      <Field invalid>
        <FieldLabel>نام</FieldLabel>
        <FieldControl>
          <Input />
        </FieldControl>
        <FieldError>نام الزامی است</FieldError>
      </Field>,
    );

    const error = screen.getByRole("alert");
    expect(error.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("نام الزامی است");
  });

  it("does not render an empty error", () => {
    render(
      <Field invalid>
        <FieldLabel>نام</FieldLabel>
        <FieldControl>
          <Input />
        </FieldControl>
        <FieldError>{undefined}</FieldError>
      </Field>,
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby");
  });

  it("marks a required control and shows a decorative asterisk", () => {
    render(
      <Field required>
        <FieldLabel>ایمیل</FieldLabel>
        <FieldControl>
          <Input />
        </FieldControl>
      </Field>,
    );

    expect(screen.getByRole("textbox", { name: "ایمیل" })).toHaveAttribute("aria-required", "true");
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
  });

  it("disables the control", () => {
    render(
      <Field disabled>
        <FieldLabel>توضیحات</FieldLabel>
        <FieldControl>
          <Textarea />
        </FieldControl>
      </Field>,
    );

    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByText("توضیحات").closest("[data-slot='field']")).toHaveAttribute(
      "data-disabled",
    );
  });

  it("keeps descriptions the caller already set on the control", () => {
    render(
      <>
        <p id="hint">راهنمای بیرونی</p>
        <Field>
          <FieldLabel>شهر</FieldLabel>
          <Select>
            <FieldControl aria-describedby="hint">
              <SelectTrigger>
                <SelectValue placeholder="تهران" />
              </SelectTrigger>
            </FieldControl>
            <SelectContent>
              <SelectItem value="tehran">تهران</SelectItem>
            </SelectContent>
          </Select>
          <FieldDescription>شهر محل سکونت</FieldDescription>
        </Field>
      </>,
    );

    expect(screen.getByRole("combobox")).toHaveAccessibleDescription(
      "راهنمای بیرونی شهر محل سکونت",
    );
  });

  it("works with react-hook-form's register through the control slot", async () => {
    const onValid = vi.fn();

    function SignupForm() {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<{ email: string }>({ defaultValues: { email: "" } });

      return (
        <form onSubmit={handleSubmit(onValid)} noValidate>
          <Field invalid={Boolean(errors.email)} required>
            <FieldLabel>ایمیل</FieldLabel>
            <FieldControl>
              <Input type="email" {...register("email", { required: "ایمیل الزامی است" })} />
            </FieldControl>
            <FieldError>{errors.email?.message}</FieldError>
          </Field>
          <button type="submit">ثبت‌نام</button>
        </form>
      );
    }

    render(<SignupForm />);

    await userEvent.click(screen.getByRole("button", { name: "ثبت‌نام" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("ایمیل الزامی است");
    expect(screen.getByRole("textbox", { name: "ایمیل" })).toHaveAccessibleDescription(
      "ایمیل الزامی است",
    );

    // The required asterisk is part of the label's text but not of the accessible name, so query by role.
    await userEvent.type(screen.getByRole("textbox", { name: "ایمیل" }), "sara@example.com");
    await userEvent.click(screen.getByRole("button", { name: "ثبت‌نام" }));

    expect(onValid).toHaveBeenCalledTimes(1);
    expect(onValid.mock.calls[0]![0]).toEqual({ email: "sara@example.com" });
  });

  it("forwards refs and merges class names", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Field ref={ref} className="gap-3">
        <FieldLabel>نام</FieldLabel>
      </Field>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "field");
    expect(ref.current).toHaveClass("gap-3");
  });

  it("throws when a part is used outside a field", () => {
    // React logs the thrown render error; silence it so the expected failure doesn't flood the output.
    const reactErrorLog = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<FieldLabel>نام</FieldLabel>)).toThrow(
      "FieldLabel must be used within Field",
    );

    reactErrorLog.mockRestore();
  });

  it("renders on the server", () => {
    const html = renderToString(
      <Field invalid>
        <FieldLabel>نام</FieldLabel>
        <FieldControl>
          <Input />
        </FieldControl>
        <FieldError>نام الزامی است</FieldError>
      </Field>,
    );

    expect(html).toContain('data-slot="field"');
    expect(html).toContain('role="alert"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Field invalid required>
        <FieldLabel>ایمیل</FieldLabel>
        <FieldControl>
          <Input type="email" />
        </FieldControl>
        <FieldDescription>برای ارسال رسید پرداخت</FieldDescription>
        <FieldError>ایمیل معتبر نیست</FieldError>
      </Field>,
    );

    await expectNoAxeViolations(container);
  });
});
