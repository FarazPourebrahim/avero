import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ActivityHeatmap, type ActivityDay } from "./ActivityHeatmap.js";

/** 2026-08-31 is a Monday, so a 14-day run spans three Saturday-start columns. */
function twoWeeks(): ActivityDay[] {
  return Array.from({ length: 14 }, (_, index) => ({
    date: new Date(2026, 7, 31 + index),
    count: index,
  }));
}

describe("ActivityHeatmap", () => {
  it("renders a labelled grid with one cell per day", () => {
    render(<ActivityHeatmap days={twoWeeks()} />);
    const grid = screen.getByRole("grid", { name: "نقشه فعالیت" });

    expect(grid).toBeInTheDocument();
    expect(
      screen.getAllByRole("gridcell").filter((cell) => cell.tagName === "BUTTON"),
    ).toHaveLength(14);
    expect(screen.getAllByRole("row")).toHaveLength(7);
  });

  it("labels each day with its count and Jalali date", () => {
    render(<ActivityHeatmap days={[{ date: new Date(2026, 8, 11), count: 3 }]} />);

    expect(screen.getByRole("gridcell", { name: "۳ فعالیت در ۲۰ شهریور ۱۴۰۵" })).toHaveAttribute(
      "title",
      "۳ فعالیت در ۲۰ شهریور ۱۴۰۵",
    );
  });

  it("shades days by their share of the busiest day", () => {
    render(
      <ActivityHeatmap
        days={[
          { date: new Date(2026, 8, 1), count: 0 },
          { date: new Date(2026, 8, 2), count: 1 },
          { date: new Date(2026, 8, 3), count: 4 },
        ]}
        maxCount={4}
      />,
    );
    const cells = screen.getAllByRole("gridcell").filter((cell) => cell.tagName === "BUTTON");

    expect(cells[0]).toHaveAttribute("data-level", "0");
    expect(cells[0]).toHaveClass("bg-gray-100");
    expect(cells[1]).toHaveAttribute("data-level", "1");
    expect(cells[2]).toHaveAttribute("data-level", "4");
    expect(cells[2]).toHaveClass("bg-emerald-700");
  });

  it("fills gaps between days with empty days", () => {
    render(
      <ActivityHeatmap
        days={[
          { date: new Date(2026, 8, 1), count: 2 },
          { date: new Date(2026, 8, 5), count: 1 },
        ]}
      />,
    );

    expect(
      screen.getAllByRole("gridcell").filter((cell) => cell.tagName === "BUTTON"),
    ).toHaveLength(5);
  });

  it("moves focus with the arrow keys", async () => {
    // 2026-09-11 is ۲۰ شهریور ۱۴۰۵; the row above it is the previous day.
    render(<ActivityHeatmap days={twoWeeks()} />);
    screen.getByRole("gridcell", { name: /۲۰ شهریور ۱۴۰۵/ }).focus();

    await userEvent.keyboard("{ArrowUp}");

    expect(document.activeElement).toHaveAttribute(
      "aria-label",
      expect.stringContaining("۱۹ شهریور"),
    );

    // RTL: the column to the right is the earlier week, so ArrowRight steps back seven days.
    await userEvent.keyboard("{ArrowRight}");

    expect(document.activeElement).toHaveAttribute(
      "aria-label",
      expect.stringContaining("۱۲ شهریور"),
    );

    await userEvent.keyboard("{ArrowDown}");

    expect(document.activeElement).toHaveAttribute(
      "aria-label",
      expect.stringContaining("۱۳ شهریور"),
    );
  });

  it("keeps a single tab stop, on the most recent day", () => {
    render(<ActivityHeatmap days={twoWeeks()} />);
    const cells = screen.getAllByRole("gridcell").filter((cell) => cell.tagName === "BUTTON");
    const tabbable = cells.filter((cell) => cell.getAttribute("tabindex") === "0");

    expect(tabbable).toHaveLength(1);
    // The last day of the series is 2026-09-13 → ۲۲ شهریور ۱۴۰۵.
    expect(tabbable[0]).toHaveAttribute("aria-label", expect.stringContaining("۲۲ شهریور"));
  });

  it("renders the legend, and hides it on request", () => {
    const { container, rerender } = render(<ActivityHeatmap days={twoWeeks()} />);

    expect(screen.getByText("کمتر")).toBeInTheDocument();
    expect(screen.getByText("بیشتر")).toBeInTheDocument();

    rerender(<ActivityHeatmap days={twoWeeks()} legend={false} />);

    expect(container.querySelector('[data-slot="activity-heatmap-legend"]')).toBeNull();
  });

  it("renders the empty state when there are no days", () => {
    const { container } = render(
      <ActivityHeatmap days={[]} emptyState={<p>هنوز فعالیتی ثبت نشده است.</p>} />,
    );

    expect(container.firstElementChild).toHaveAttribute("data-state", "empty");
    expect(screen.getByText("هنوز فعالیتی ثبت نشده است.")).toBeInTheDocument();
    expect(screen.queryByRole("grid")).toBeNull();
  });

  it("ignores invalid dates", () => {
    const { container } = render(<ActivityHeatmap days={[{ date: "not a date", count: 1 }]} />);

    expect(container.firstElementChild).toHaveAttribute("data-state", "empty");
  });

  it("uses English weekdays and strings under an English provider", () => {
    render(
      <AveroProvider locale="en-US">
        <ActivityHeatmap days={[{ date: "2026-09-11", count: 1 }]} />
      </AveroProvider>,
    );

    expect(screen.getByRole("grid", { name: "Activity map" })).toBeInTheDocument();
    expect(screen.getByRole("rowheader", { name: "Sunday" })).toBeInTheDocument();
    expect(screen.getByText("Less")).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ActivityHeatmap ref={ref} days={twoWeeks()} />);

    expect(ref.current).toHaveAttribute("data-slot", "activity-heatmap");
  });

  it("renders on the server", () => {
    expect(renderToString(<ActivityHeatmap days={twoWeeks()} />)).toContain('role="grid"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ActivityHeatmap days={twoWeeks()} />);

    await expectNoAxeViolations(container);
  });
});
