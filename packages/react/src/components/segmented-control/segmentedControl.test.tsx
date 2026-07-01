import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { SegmentedControl, SegmentedControlItem } from "./SegmentedControl.js";

function Analytics(props: { onValueChange?: (value: string) => void }) {
  return (
    <SegmentedControl aria-label="نوع آنالیتیکس" defaultValue="services" {...props}>
      <SegmentedControlItem value="services">خدمات</SegmentedControlItem>
      <SegmentedControlItem value="portfolio">نمونه‌کار</SegmentedControlItem>
      <SegmentedControlItem value="stories">استوری</SegmentedControlItem>
    </SegmentedControl>
  );
}

const segment = (name: string) => screen.getByText(name).closest("button")!;

describe("SegmentedControl", () => {
  it("renders a labelled radio group with the default segment checked", () => {
    render(<Analytics />);

    expect(screen.getByRole("radiogroup", { name: "نوع آنالیتیکس" })).toBeInTheDocument();
    expect(segment("خدمات")).toHaveAttribute("data-state", "on");
    expect(segment("خدمات")).toHaveClass("data-[state=on]:bg-white");
    expect(segment("نمونه‌کار")).toHaveAttribute("data-state", "off");
  });

  it("selects another segment on click and reports it", async () => {
    const onValueChange = vi.fn();
    render(<Analytics onValueChange={onValueChange} />);

    await userEvent.click(segment("استوری"));

    expect(segment("استوری")).toHaveAttribute("data-state", "on");
    expect(segment("خدمات")).toHaveAttribute("data-state", "off");
    expect(onValueChange).toHaveBeenCalledWith("stories");
  });

  it("cannot be emptied by clicking the selected segment", async () => {
    const onValueChange = vi.fn();
    render(<Analytics onValueChange={onValueChange} />);

    await userEvent.click(segment("خدمات"));

    expect(segment("خدمات")).toHaveAttribute("data-state", "on");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("supports controlled use", async () => {
    function Controlled() {
      const [value, setValue] = useState("portfolio");
      return (
        <>
          <output>{value}</output>
          <SegmentedControl aria-label="c" value={value} onValueChange={setValue}>
            <SegmentedControlItem value="services">خدمات</SegmentedControlItem>
            <SegmentedControlItem value="portfolio">نمونه‌کار</SegmentedControlItem>
          </SegmentedControl>
        </>
      );
    }
    render(<Controlled />);

    await userEvent.click(segment("خدمات"));

    expect(screen.getByRole("status")).toHaveTextContent("services");
  });

  it("moves focus with arrow keys in reading direction (RTL by default)", async () => {
    render(<Analytics />);
    segment("خدمات").focus();

    await userEvent.keyboard("{ArrowLeft}");

    expect(segment("نمونه‌کار")).toHaveFocus();
  });

  it("follows LTR arrow keys under an English provider", async () => {
    render(
      <AveroProvider locale="en-US">
        <Analytics />
      </AveroProvider>,
    );
    segment("خدمات").focus();

    await userEvent.keyboard("{ArrowRight}");

    expect(segment("نمونه‌کار")).toHaveFocus();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <SegmentedControl ref={ref} aria-label="c">
        <SegmentedControlItem value="a">a</SegmentedControlItem>
      </SegmentedControl>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "segmented-control");
  });

  it("renders on the server", () => {
    expect(renderToString(<Analytics />)).toContain('data-state="on"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Analytics />);

    await expectNoAxeViolations(container);
  });
});
