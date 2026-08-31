import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Button } from "../button/Button.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Tooltip, TooltipProvider } from "./Tooltip.js";

function CopyLink(props: Partial<React.ComponentProps<typeof Tooltip>>) {
  return (
    <Tooltip content="لینک در حافظه کپی می‌شود" delayDuration={0} {...props}>
      <IconButton label="کپی لینک">
        <span aria-hidden>⧉</span>
      </IconButton>
    </Tooltip>
  );
}

describe("Tooltip", () => {
  it("opens when the trigger receives keyboard focus and describes it", async () => {
    render(<CopyLink />);
    const trigger = screen.getByRole("button", { name: "کپی لینک" });

    await userEvent.tab();

    expect(trigger).toHaveFocus();
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveTextContent("لینک در حافظه کپی می‌شود");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
    expect(trigger).toHaveAccessibleName("کپی لینک");
  });

  it("opens on hover", async () => {
    render(<CopyLink />);

    await userEvent.hover(screen.getByRole("button", { name: "کپی لینک" }));

    expect(screen.getByRole("tooltip")).toHaveTextContent("لینک در حافظه کپی می‌شود");
  });

  it("closes on Escape and keeps focus on the trigger", async () => {
    render(<CopyLink />);
    const trigger = screen.getByRole("button", { name: "کپی لینک" });

    await userEvent.tab();
    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("tooltip")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("styles the panel on the popover layer with an arrow", () => {
    render(<CopyLink defaultOpen />);

    const panel = document.querySelector('[data-slot="tooltip"]');
    expect(panel).toHaveClass("z-(--z-popover)", "bg-slate-800", "text-white", "rounded-lg");
    expect(panel?.querySelector('[data-slot="tooltip-arrow"]')).not.toBeNull();
  });

  it("hides the arrow on request", () => {
    render(<CopyLink defaultOpen showArrow={false} />);

    expect(document.querySelector('[data-slot="tooltip-arrow"]')).toBeNull();
  });

  it("supports controlled use", () => {
    const { rerender } = render(<CopyLink open={false} />);

    expect(screen.queryByRole("tooltip")).toBeNull();

    rerender(<CopyLink open />);

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("passes the provider direction to the portalled panel", () => {
    const { unmount } = render(<CopyLink defaultOpen />);

    expect(document.querySelector('[data-slot="tooltip"]')).toHaveAttribute("dir", "rtl");
    unmount();

    render(
      <AveroProvider locale="en-US">
        <CopyLink defaultOpen />
      </AveroProvider>,
    );

    expect(document.querySelector('[data-slot="tooltip"]')).toHaveAttribute("dir", "ltr");
  });

  it("uses the delay of a shared TooltipProvider instead of its own", async () => {
    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip content="ذخیره در فهرست">
          <Button variant="outline">ذخیره</Button>
        </Tooltip>
      </TooltipProvider>,
    );

    await userEvent.hover(screen.getByRole("button", { name: "ذخیره" }));

    expect(screen.getByRole("tooltip")).toHaveTextContent("ذخیره در فهرست");
  });

  it("waits for its delay before opening on hover", async () => {
    render(<CopyLink delayDuration={10_000} />);

    await userEvent.hover(screen.getByRole("button", { name: "کپی لینک" }));

    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("merges classes and forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<CopyLink ref={ref} defaultOpen className="max-w-80 bg-gray-900" />);

    expect(ref.current).toHaveAttribute("data-slot", "tooltip");
    expect(ref.current).toHaveClass("max-w-80", "bg-gray-900");
    expect(ref.current).not.toHaveClass("max-w-64", "bg-slate-800");
  });

  it("renders only the trigger on the server", () => {
    const html = renderToString(<CopyLink />);

    expect(html).toContain("کپی لینک");
    expect(html).not.toContain('data-slot="tooltip"');
  });

  it("has no accessibility violations while open", async () => {
    const { container } = render(<CopyLink defaultOpen />);

    await expectNoAxeViolations(container);
    await expectNoAxeViolations(document.querySelector<HTMLElement>('[data-slot="tooltip"]')!);
  });
});
