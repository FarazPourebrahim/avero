import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Alert } from "./Alert.js";

const TONES = ["info", "success", "warning", "danger", "neutral"] as const;

describe("Alert", () => {
  it("renders a tinted info alert with its icon, title and message by default", () => {
    render(<Alert title="ثبت‌نام باز است">تا پایان هفته فرصت دارید.</Alert>);

    const alert = screen.getByText("تا پایان هفته فرصت دارید.").closest('[data-slot="alert"]');
    expect(alert).toHaveAttribute("data-tone", "info");
    expect(alert).toHaveAttribute("data-variant", "tinted");
    expect(alert).toHaveClass("bg-blue-50", "border-blue-100", "text-blue-800", "rounded-2xl");
    expect(screen.getByText("ثبت‌نام باز است")).toHaveClass("font-bold", "text-blue-900");
    expect(alert?.querySelector('[data-slot="alert-icon"]')).toHaveClass("text-blue-600");
    expect(alert).not.toHaveAttribute("role");
  });

  it.each([
    ["success", "bg-green-50", "text-green-600"],
    ["warning", "bg-amber-50", "text-amber-600"],
    ["danger", "bg-red-50", "text-red-600"],
    ["neutral", "bg-gray-50", "text-gray-500"],
  ] as const)("renders the %s tone", (tone, background, iconColour) => {
    const { container } = render(<Alert tone={tone}>پیام</Alert>);

    expect(container.firstElementChild).toHaveClass(background);
    expect(container.querySelector('[data-slot="alert-icon"] svg')).not.toBeNull();
    expect(container.querySelector('[data-slot="alert-icon"]')).toHaveClass(iconColour);
  });

  it("renders the bordered variant with an accent bar at the inline start", () => {
    const { container } = render(
      <Alert variant="bordered" tone="warning" title="توجه">
        پیام
      </Alert>,
    );

    expect(container.firstElementChild).toHaveClass("bg-white", "border-s-4", "border-s-amber-500");
    expect(screen.getByText("توجه")).toHaveClass("text-gray-900");
  });

  it("replaces or removes the icon", () => {
    const { container, rerender } = render(<Alert icon={<svg data-testid="custom" />}>پیام</Alert>);

    expect(screen.getByTestId("custom")).toBeInTheDocument();

    rerender(<Alert icon={false}>پیام</Alert>);

    expect(container.querySelector('[data-slot="alert-icon"]')).toBeNull();
  });

  it("renders only the parts it is given", () => {
    const { container } = render(<Alert title="فقط عنوان" />);

    expect(container.querySelector('[data-slot="alert-title"]')).toBeInTheDocument();
    expect(container.querySelector('[data-slot="alert-description"]')).toBeNull();
    expect(container.querySelector('[data-slot="alert-action"]')).toBeNull();
    expect(container.querySelector('[data-slot="alert-dismiss"]')).toBeNull();
  });

  it("renders actions below the message", () => {
    render(
      <Alert tone="danger" action={<button type="button">تلاش دوباره</button>}>
        پرداخت انجام نشد.
      </Alert>,
    );

    expect(screen.getByRole("button", { name: "تلاش دوباره" }).parentElement).toHaveAttribute(
      "data-slot",
      "alert-action",
    );
  });

  it("calls onDismiss from a close button labelled from the dictionary", async () => {
    const onDismiss = vi.fn();
    const { unmount } = render(<Alert onDismiss={onDismiss}>پیام</Alert>);

    await userEvent.click(screen.getByRole("button", { name: "بستن" }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
    unmount();

    render(
      <AveroProvider locale="en-US">
        <Alert onDismiss={onDismiss}>Message</Alert>
      </AveroProvider>,
    );

    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("accepts a custom dismiss label", () => {
    render(
      <Alert onDismiss={() => {}} dismissLabel="بستن اطلاعیه">
        پیام
      </Alert>,
    );

    expect(screen.getByRole("button", { name: "بستن اطلاعیه" })).toBeInTheDocument();
  });

  it("becomes a live region when given role alert", () => {
    render(
      <Alert role="alert" tone="danger">
        رمز عبور اشتباه است.
      </Alert>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("رمز عبور اشتباه است.");
  });

  it("keeps long unbroken text inside the panel", () => {
    const { container } = render(<Alert title={"ب".repeat(300)}>{"الف".repeat(300)}</Alert>);

    expect(container.querySelector('[data-slot="alert-title"]')?.parentElement).toHaveClass(
      "min-w-0",
      "flex-1",
    );
  });

  it("merges classes, spreads props and forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Alert ref={ref} id="notice" className="rounded-xl p-6">
        پیام
      </Alert>,
    );

    expect(ref.current).toHaveAttribute("id", "notice");
    expect(ref.current).toHaveClass("rounded-xl", "p-6");
    expect(ref.current).not.toHaveClass("rounded-2xl", "p-4");
  });

  it("renders on the server", () => {
    const html = renderToString(<Alert title="عنوان">پیام</Alert>);

    expect(html).toContain('data-slot="alert"');
    expect(html).toContain("پیام");
  });

  it("has no accessibility violations in any tone or variant", async () => {
    const { container } = render(
      <div>
        {TONES.map((tone) => (
          <div key={tone}>
            <Alert tone={tone} title="عنوان" onDismiss={() => {}}>
              پیام
            </Alert>
            <Alert tone={tone} variant="bordered" title="عنوان">
              پیام
            </Alert>
          </div>
        ))}
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
