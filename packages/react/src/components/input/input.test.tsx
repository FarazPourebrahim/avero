import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Input } from "./Input.js";

describe("Input", () => {
  it("renders the outline variant by default", () => {
    render(<Input aria-label="جستجو" placeholder="جستجو..." />);
    const input = screen.getByRole("textbox", { name: "جستجو" });

    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveClass("rounded-xl", "border-gray-300", "bg-white", "px-3.5", "py-2.5");
  });

  it.each([
    ["filter", "px-3"],
    ["soft", "bg-gray-50"],
    ["slate", "border-slate-200"],
  ] as const)("renders the %s variant", (variant, expected) => {
    render(<Input aria-label="x" variant={variant} />);

    expect(screen.getByRole("textbox")).toHaveClass(expected);
  });

  it("accepts typed text", async () => {
    render(<Input aria-label="جستجو" />);

    await userEvent.type(screen.getByRole("textbox"), "طراحی");

    expect(screen.getByRole("textbox")).toHaveValue("طراحی");
  });

  it("marks an invalid value", () => {
    render(<Input aria-label="x" aria-invalid />);

    expect(screen.getByRole("textbox")).toHaveClass("aria-invalid:border-red-500");
  });

  it("does not accept input while disabled", async () => {
    render(<Input aria-label="x" disabled />);

    await userEvent.type(screen.getByRole("textbox"), "abc");

    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.getByRole("textbox")).toHaveClass("disabled:opacity-60");
  });

  it("keeps an explicit type", () => {
    render(<Input aria-label="x" type="email" />);

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input aria-label="x" ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "input");
  });

  it("renders on the server", () => {
    expect(renderToString(<Input aria-label="x" />)).toContain('data-slot="input"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <label htmlFor="search">جستجو</label>
        <Input id="search" />
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
