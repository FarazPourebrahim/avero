import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Field, FieldControl, FieldLabel } from "../field/Field.js";
import { Checkbox } from "./Checkbox.js";

function Terms(props: Parameters<typeof Checkbox>[0]) {
  return (
    <div>
      <Checkbox id="terms" {...props} />
      <label htmlFor="terms">قوانین را می‌پذیرم</label>
    </div>
  );
}

describe("Checkbox", () => {
  it("renders an unchecked checkbox named by its label", () => {
    render(<Terms />);
    const checkbox = screen.getByRole("checkbox", { name: "قوانین را می‌پذیرم" });

    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(checkbox).toHaveAttribute("data-slot", "checkbox");
    expect(checkbox).toHaveClass("size-5", "rounded-lg", "border-gray-500");
  });

  it("toggles on click and reports the new state", async () => {
    const onCheckedChange = vi.fn();
    render(<Terms onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox");

    await userEvent.click(checkbox);

    expect(checkbox).toHaveAttribute("aria-checked", "true");
    expect(checkbox).toHaveAttribute("data-state", "checked");
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("toggles from the keyboard with Space", async () => {
    render(<Terms />);
    screen.getByRole("checkbox").focus();

    await userEvent.keyboard(" ");

    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("toggles when its label is clicked", async () => {
    render(<Terms />);

    await userEvent.click(screen.getByText("قوانین را می‌پذیرم"));

    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("shows the indeterminate state as mixed", () => {
    render(<Terms checked="indeterminate" />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
    expect(checkbox).toHaveAttribute("data-state", "indeterminate");
  });

  it("stays as the parent sets it when controlled", async () => {
    function Controlled() {
      const [checked, setChecked] = useState(false);
      return (
        <>
          <Terms checked={checked} />
          <button type="button" onClick={() => setChecked(true)}>
            انتخاب
          </button>
        </>
      );
    }
    render(<Controlled />);

    await userEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "false");

    await userEvent.click(screen.getByRole("button", { name: "انتخاب" }));
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("does not toggle while disabled", async () => {
    render(<Terms disabled />);

    await userEvent.click(screen.getByRole("checkbox"));

    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("submits its value with a form", async () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return new FormData(event.currentTarget).get("newsletter");
    });
    render(
      <form onSubmit={onSubmit}>
        <Checkbox name="newsletter" value="yes" aria-label="خبرنامه" />
        <button type="submit">ذخیره</button>
      </form>,
    );

    await userEvent.click(screen.getByRole("checkbox"));
    await userEvent.click(screen.getByRole("button", { name: "ذخیره" }));

    expect(onSubmit).toHaveReturnedWith("yes");
  });

  it("is labelled and marked invalid through Field", () => {
    render(
      <Field invalid required>
        <FieldControl>
          <Checkbox />
        </FieldControl>
        <FieldLabel>قوانین را می‌پذیرم</FieldLabel>
      </Field>,
    );
    const checkbox = screen.getByRole("checkbox", { name: "قوانین را می‌پذیرم" });

    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    expect(checkbox).toHaveAttribute("aria-required", "true");
  });

  it("follows the primary Button's hover, focus ring and timing", () => {
    render(<Checkbox aria-label="خبرنامه" defaultChecked />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveClass(
      "data-[state=checked]:hover:bg-primary-hover",
      "focus-visible:ring-offset-2",
      "duration-200",
      "aria-invalid:focus-visible:ring-red-500/40",
    );
    expect(checkbox.querySelector("svg")).toHaveAttribute("stroke-width", "3");
  });

  it("presses, pops when checked and draws its tick in", () => {
    render(<Checkbox aria-label="خبرنامه" defaultChecked />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveClass(
      "rounded-lg",
      "active:scale-95",
      "data-[state=checked]:animate-check-pop",
    );
    expect(checkbox.querySelector("svg")).toHaveClass("[&_path]:animate-check-draw");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} aria-label="x" />);

    expect(ref.current).toHaveAttribute("data-slot", "checkbox");
  });

  it("renders on the server", () => {
    expect(renderToString(<Checkbox aria-label="x" defaultChecked />)).toContain(
      'data-slot="checkbox"',
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Terms defaultChecked />);

    await expectNoAxeViolations(container);
  });
});
