import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Button } from "./Button.js";

describe("Button", () => {
  it("renders a primary medium button with type=button by default", () => {
    render(<Button>مشاهده دوره‌ها</Button>);
    const button = screen.getByRole("button", { name: "مشاهده دوره‌ها" });

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveClass(
      "bg-primary",
      "hover:bg-primary-hover",
      "px-5",
      "py-2.5",
      "rounded-xl",
    );
  });

  it("keeps an explicit submit type", () => {
    render(<Button type="submit">ارسال دیدگاه</Button>);

    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it.each([
    ["secondary", "bg-secondary"],
    ["ghost", "text-gray-500"],
    ["outline", "border-slate-200"],
    ["inverse", "hover:bg-surface-glass"],
    ["warning", "bg-warning"],
  ] as const)("applies the %s variant", (variant, expected) => {
    render(<Button variant={variant}>Action</Button>);

    expect(screen.getByRole("button")).toHaveClass(expected);
  });

  it.each([
    ["neutral", "bg-slate-100"],
    ["sky", "bg-sky-50"],
    ["emerald", "bg-emerald-50"],
    ["blue", "bg-blue-50"],
    ["indigo", "bg-indigo-50"],
    ["purple", "bg-purple-50"],
    ["amber", "bg-amber-50"],
    ["rose", "bg-rose-50"],
    ["red", "bg-red-50"],
  ] as const)("applies the soft %s tone", (tone, expected) => {
    render(
      <Button variant="soft" tone={tone}>
        Share
      </Button>,
    );

    expect(screen.getByRole("button")).toHaveClass(expected);
  });

  it("applies size, radius, block and elevation options", () => {
    render(
      <Button size="xl" radius="2xl" block elevated>
        ثبت‌نام در کارگاه
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveClass("py-3.5", "rounded-2xl", "w-full", "shadow-md", "shadow-primary/20");
  });

  it("lets className override variant utilities", () => {
    render(<Button className="px-6 font-bold">Submit</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("px-6", "font-bold");
    expect(button).not.toHaveClass("px-5", "font-semibold");
  });

  it("calls onClick when pressed", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await userEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );

    await userEvent.click(screen.getByRole("button"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("shows a spinner, marks itself busy and blocks clicks while loading", async () => {
    const onClick = vi.fn();
    const { container } = render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Save" });

    await userEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(container.querySelector('[data-slot="button-spinner"]')).toBeInTheDocument();
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders its child with button styles when asChild is set", () => {
    render(
      <Button asChild variant="soft">
        <a href="/contact">تماس با پشتیبانی</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "تماس با پشتیبانی" });

    expect(link).toHaveAttribute("href", "/contact");
    expect(link).toHaveClass("bg-slate-100");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("renders on the server", () => {
    expect(renderToString(<Button>Server</Button>)).toContain('data-slot="button"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <Button>Primary</Button>
        <Button variant="soft" tone="rose" loading>
          Report
        </Button>
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
