import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ReportAction, ReportCard } from "./Report.js";

describe("ReportAction", () => {
  it("renders the compact mini control by default", () => {
    render(<ReportAction />);
    const button = screen.getByRole("button", { name: "گزارش مشکل" });

    expect(button).toHaveClass("text-2xs", "text-slate-400");
  });

  it("renders the plain text control", () => {
    render(<ReportAction variant="text" />);

    expect(screen.getByRole("button", { name: "گزارش مشکل" })).toHaveClass(
      "text-sm",
      "text-gray-500",
    );
  });

  it("renders the tinted soft button", () => {
    render(<ReportAction variant="soft" />);
    const button = screen.getByRole("button", { name: "گزارش مشکل" });

    expect(button).toHaveAttribute("data-slot", "report-action");
    expect(button).toHaveClass("bg-rose-50", "text-rose-600");
  });

  it("reports activation", async () => {
    const onReport = vi.fn();
    render(<ReportAction onReport={onReport} />);

    await userEvent.click(screen.getByRole("button"));

    expect(onReport).toHaveBeenCalledTimes(1);
  });

  it("accepts its own text", () => {
    render(<ReportAction>گزارش</ReportAction>);

    expect(screen.getByRole("button", { name: "گزارش" })).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<ReportAction ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "report-action");
  });
});

describe("ReportCard", () => {
  it("renders the dictionary's title, description and button", () => {
    render(<ReportCard />);

    expect(screen.getByText("گزارش محتوای نامناسب")).toBeInTheDocument();
    expect(screen.getByText("برای بررسی به تیم پشتیبانی ارسال می‌شود")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "گزارش مشکل" })).toBeInTheDocument();
  });

  it("reports activation from its button", async () => {
    const onReport = vi.fn();
    render(<ReportCard onReport={onReport} />);

    await userEvent.click(screen.getByRole("button"));

    expect(onReport).toHaveBeenCalledTimes(1);
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ReportCard ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "report-card");
  });

  it("renders on the server", () => {
    expect(renderToString(<ReportCard />)).toContain("برای بررسی به تیم پشتیبانی ارسال می‌شود");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ReportCard />);

    await expectNoAxeViolations(container);
  });
});
