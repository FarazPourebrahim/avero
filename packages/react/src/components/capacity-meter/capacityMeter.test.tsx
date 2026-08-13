import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { CapacityMeter } from "./CapacityMeter.js";

describe("CapacityMeter", () => {
  it("renders the detail layout with a labelled bar and a count", () => {
    const { container } = render(<CapacityMeter label="ظرفیت ثبت‌نام" value={3} max={12} />);
    const bar = screen.getByRole("progressbar", { name: "ظرفیت ثبت‌نام" });

    expect(bar).toHaveAttribute("aria-valuenow", "3");
    expect(bar).toHaveAttribute("aria-valuemax", "12");
    expect(screen.getByText("۳ از ۱۲")).toHaveClass("font-medium", "text-gray-800");
    expect(container.firstElementChild).toHaveAttribute("data-state", "available");
  });

  it("renders the card layout with a green status pill and captions", () => {
    render(
      <CapacityMeter
        variant="card"
        label="ظرفیت ثبت‌نام"
        value={3}
        max={12}
        status="9 جای خالی"
        startCaption="3 نفر ثبت‌نام کرده‌اند"
        endCaption="حداکثر 12 نفر"
      />,
    );

    expect(screen.getByText("9 جای خالی")).toHaveClass("bg-green-100", "text-green-700");
    expect(screen.getByText("ظرفیت ثبت‌نام")).toHaveClass("text-xs", "text-gray-500");
    expect(screen.getByText("حداکثر 12 نفر").parentElement).toHaveClass(
      "text-2xs",
      "text-gray-400",
    );
    expect(screen.queryByText("۳ از ۱۲")).toBeNull();
  });

  it("turns the status red and marks the meter full at capacity", () => {
    const { container } = render(
      <CapacityMeter variant="card" label="ظرفیت" value={5} max={5} status="ظرفیت تکمیل شد" />,
    );

    expect(screen.getByText("ظرفیت تکمیل شد")).toHaveClass("bg-red-100", "text-red-700");
    expect(container.firstElementChild).toHaveAttribute("data-state", "full");
    expect(container.querySelector('[data-slot="progress-indicator"]')).toHaveStyle({
      width: "100%",
    });
  });

  it("omits the status and captions when they are not given", () => {
    const { container } = render(<CapacityMeter variant="card" label="ظرفیت" value={0} max={0} />);

    expect(container.querySelector('[data-slot="capacity-meter-status"]')).toBeNull();
    expect(container.querySelectorAll("span")).toHaveLength(1);
    expect(container.firstElementChild).toHaveAttribute("data-state", "available");
  });

  it("uses the English count under an English provider", () => {
    render(
      <AveroProvider locale="en-US">
        <CapacityMeter label="Capacity" value={3} max={12} />
      </AveroProvider>,
    );

    expect(screen.getByText("3 of 12")).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<CapacityMeter ref={ref} label="a" value={1} max={2} />);

    expect(ref.current).toHaveAttribute("data-slot", "capacity-meter");
  });

  it("renders on the server", () => {
    expect(renderToString(<CapacityMeter label="a" value={0} max={15} />)).toContain("۰ از ۱۵");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <CapacityMeter label="ظرفیت ثبت‌نام" value={3} max={12} />
        <CapacityMeter variant="card" label="ظرفیت" value={5} max={5} status="ظرفیت تکمیل شد" />
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
