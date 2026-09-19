import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { Input } from "../input/Input.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select/index.js";
import { Textarea } from "../textarea/Textarea.js";
import { FormActions } from "./FormActions.js";

/**
 * Phase 4 DoD: the controls work with react-hook-form and zod. A resolver this small keeps the
 * example dependency-free — `@hookform/resolvers` does the same job in an application.
 */
const schema = z.object({
  name: z.string().min(3, "نام باید حداقل ۳ نویسه باشد."),
  comment: z.string().min(10, "دیدگاه باید حداقل ۱۰ نویسه باشد."),
  sort: z.enum(["newest", "oldest"]),
});

type Values = z.infer<typeof schema>;

const resolver: Resolver<Values> = (values) => {
  const result = schema.safeParse(values);
  if (result.success) return { values: result.data, errors: {} };
  const errors: Record<string, { type: string; message: string }> = {};
  for (const issue of result.error.issues) {
    const path = String(issue.path[0]);
    errors[path] ??= { type: "validation", message: issue.message };
  }
  return { values: {}, errors };
};

function CommentForm({ onValid }: { onValid: (values: Values) => void }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver, defaultValues: { name: "", comment: "", sort: "newest" } });

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate>
      <label htmlFor="name">نام</label>
      <Input id="name" aria-invalid={Boolean(errors.name)} {...register("name")} />
      {errors.name ? <p role="alert">{errors.name.message}</p> : null}

      <label htmlFor="comment">دیدگاه</label>
      <Textarea id="comment" aria-invalid={Boolean(errors.comment)} {...register("comment")} />
      {errors.comment ? <p role="alert">{errors.comment.message}</p> : null}

      {/* Select is not a native form control, so it joins the form through Controller rather than
          register: the trigger is a button, and the value lives in the form state. */}
      <Controller
        name="sort"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger ref={field.ref} aria-label="مرتب‌سازی" onBlur={field.onBlur}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">جدیدترین</SelectItem>
              <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <FormActions hint="دیدگاه‌ها پس از بررسی منتشر می‌شوند.">
        <button type="submit">ارسال دیدگاه</button>
      </FormActions>
    </form>
  );
}

describe("form integration (react-hook-form + zod)", () => {
  it("shows validation errors and marks the invalid controls", async () => {
    const onValid = vi.fn();
    render(<CommentForm onValid={onValid} />);

    await userEvent.click(screen.getByRole("button", { name: "ارسال دیدگاه" }));

    expect(onValid).not.toHaveBeenCalled();
    expect(await screen.findAllByRole("alert")).toHaveLength(2);
    expect(screen.getByLabelText("نام")).toHaveAttribute("aria-invalid", "true");
  });

  it("submits the registered values once they are valid", async () => {
    const onValid = vi.fn();
    render(<CommentForm onValid={onValid} />);

    await userEvent.type(screen.getByLabelText("نام"), "سارا");
    await userEvent.type(screen.getByLabelText("دیدگاه"), "مقاله بسیار کاربردی بود، ممنون.");
    await userEvent.click(screen.getByRole("combobox", { name: "مرتب‌سازی" }));
    await userEvent.click(screen.getByRole("option", { name: "قدیمی‌ترین" }));
    await userEvent.click(screen.getByRole("button", { name: "ارسال دیدگاه" }));

    expect(onValid).toHaveBeenCalledTimes(1);
    expect(onValid.mock.calls[0]![0]).toEqual({
      name: "سارا",
      comment: "مقاله بسیار کاربردی بود، ممنون.",
      sort: "oldest",
    });
  });
});
