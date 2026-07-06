import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { MatchScore } from "./MatchScore.js";

describe("MatchScore", () => {
  it("renders the percentage and the dictionary caption", () => {
    render(<MatchScore value={8} />);

    expect(screen.getByText("۸٪")).toHaveClass("font-bold", "text-gray-400", "sm:text-lg");
    expect(screen.getByText("تطابق")).toHaveClass("text-4xs", "sm:text-3xs");
  });

  it.each([
    [150, "۱۰۰٪"],
    [-5, "۰٪"],
    [42.6, "۴۳٪"],
  ])("clamps and rounds %s to %s", (value, expected) => {
    render(<MatchScore value={value} />);

    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  it("renders a custom caption", () => {
    render(<MatchScore value={50} label="هم‌خوانی" />);

    expect(screen.getByText("هم‌خوانی")).toBeInTheDocument();
  });

  it("uses English formatting under an English provider", () => {
    render(
      <AveroProvider locale="en-US">
        <MatchScore value={8} />
      </AveroProvider>,
    );

    expect(screen.getByText("8%")).toBeInTheDocument();
    expect(screen.getByText("Match")).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<MatchScore ref={ref} value={1} />);

    expect(ref.current).toHaveAttribute("data-slot", "match-score");
  });

  it("renders on the server", () => {
    expect(renderToString(<MatchScore value={8} />)).toContain("۸٪");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MatchScore value={8} />);

    await expectNoAxeViolations(container);
  });
});
