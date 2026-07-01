import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ToggleChip, ToggleChipGroup } from "./ToggleChipGroup.js";

function Metrics(props: { onValueChange?: (value: string[]) => void; value?: string[] }) {
  return (
    <ToggleChipGroup aria-label="شاخص‌های نمودار" defaultValue={["views", "likes"]} {...props}>
      <ToggleChip value="views" color="var(--color-indigo-500)">
        بازدید
      </ToggleChip>
      <ToggleChip value="likes" color="var(--color-rose-500)">
        لایک
      </ToggleChip>
      <ToggleChip value="clicks">کلیک</ToggleChip>
    </ToggleChipGroup>
  );
}

const chip = (name: string) => screen.getByRole("button", { name });

describe("ToggleChipGroup", () => {
  it("renders a labelled toolbar with the default chips pressed", () => {
    render(<Metrics />);

    expect(screen.getByRole("toolbar", { name: "شاخص‌های نمودار" })).toBeInTheDocument();
    expect(chip("بازدید")).toHaveAttribute("aria-pressed", "true");
    expect(chip("کلیک")).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles chips independently and reports the selection", async () => {
    const onValueChange = vi.fn();
    render(<Metrics onValueChange={onValueChange} />);

    await userEvent.click(chip("کلیک"));
    await userEvent.click(chip("بازدید"));

    expect(chip("کلیک")).toHaveAttribute("aria-pressed", "true");
    expect(chip("بازدید")).toHaveAttribute("aria-pressed", "false");
    expect(onValueChange).toHaveBeenLastCalledWith(["likes", "clicks"]);
  });

  it("fills selected chips with their own color", () => {
    render(<Metrics />);

    expect(chip("لایک").style.getPropertyValue("--toggle-chip-color")).toBe(
      "var(--color-rose-500)",
    );
    expect(chip("لایک")).toHaveClass("data-[state=on]:bg-(--toggle-chip-color)");
  });

  it("defaults the fill to the primary token", () => {
    render(<Metrics />);

    expect(chip("کلیک").style.getPropertyValue("--toggle-chip-color")).toBe("var(--color-primary)");
  });

  it("supports controlled use", () => {
    render(<Metrics value={["clicks"]} />);

    expect(chip("کلیک")).toHaveAttribute("aria-pressed", "true");
    expect(chip("بازدید")).toHaveAttribute("aria-pressed", "false");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <ToggleChipGroup ref={ref} aria-label="c">
        <ToggleChip value="a">a</ToggleChip>
      </ToggleChipGroup>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "toggle-chip-group");
  });

  it("renders on the server", () => {
    expect(renderToString(<Metrics />)).toContain('aria-pressed="true"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Metrics />);

    await expectNoAxeViolations(container);
  });
});
