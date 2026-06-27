import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { TelegramIcon } from "../../icons/referenceIcons.generated.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { IconButton } from "./IconButton.js";

describe("IconButton", () => {
  it("renders an accessible chrome button by default", () => {
    render(
      <IconButton label="اعلان‌ها">
        <TelegramIcon />
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "اعلان‌ها" });

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-slot", "icon-button");
    expect(button).toHaveClass("bg-zinc-50", "border-zinc-200/50", "p-2", "rounded-xl");
  });

  it.each([
    ["outline", "border-gray-200"],
    ["ghost", "text-gray-400"],
    ["circle", "rounded-full"],
    ["social", "size-9"],
    ["tile", "text-icon-muted"],
  ] as const)("applies the %s variant", (variant, expected) => {
    render(<IconButton label="Action" variant={variant} />);

    expect(screen.getByRole("button")).toHaveClass(expected);
  });

  it.each([
    ["neutral", "bg-gray-50"],
    ["blue", "bg-blue-50"],
    ["sky", "bg-sky-50"],
    ["green", "bg-green-50"],
    ["emerald", "bg-emerald-50"],
    ["slate", "bg-slate-50"],
  ] as const)("applies the soft %s tone", (tone, expected) => {
    render(<IconButton label="Share" variant="soft" tone={tone} />);

    expect(screen.getByRole("button")).toHaveClass(expected);
  });

  it("drops padding for fixed-size variants", () => {
    render(<IconButton label="LinkedIn" variant="tile" size="lg" />);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("p-0", "size-10");
    expect(button).not.toHaveClass("p-2.5");
  });

  it("applies the size scale", () => {
    render(<IconButton label="Close" variant="ghost" size="sm" />);

    expect(screen.getByRole("button")).toHaveClass("p-1.5");
  });

  it("handles clicks and respects disabled", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<IconButton label="Next" variant="circle" onClick={onClick} />);

    await userEvent.click(screen.getByRole("button"));
    rerender(<IconButton label="Next" variant="circle" onClick={onClick} disabled />);
    await userEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders a link with icon-button styles when asChild is set", () => {
    render(
      <IconButton asChild label="Telegram" variant="social">
        <a href="https://t.me/example">TG</a>
      </IconButton>,
    );
    const link = screen.getByRole("link", { name: "Telegram" });

    expect(link).toHaveClass("size-9");
    expect(link).toHaveAttribute("href", "https://t.me/example");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton ref={ref} label="Ref" />);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("renders on the server", () => {
    expect(renderToString(<IconButton label="Server" />)).toContain('aria-label="Server"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <IconButton label="Menu">
          <TelegramIcon />
        </IconButton>
        <IconButton label="Share" variant="soft" tone="blue">
          <TelegramIcon />
        </IconButton>
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
