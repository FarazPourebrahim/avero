import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ReactionBar } from "./ReactionBar.js";

const PROPS = { likes: 0, views: 4, capacity: "حداکثر 15 نفر", saved: false };

describe("ReactionBar", () => {
  it("renders the like, views, capacity and save pills", () => {
    const { container } = render(<ReactionBar {...PROPS} />);

    expect(screen.getByRole("button", { name: "پسندیدن" })).toBeInTheDocument();
    expect(container.querySelector('[data-slot="reaction-bar-views"]')).toHaveTextContent("4");
    expect(screen.getByText("حداکثر 15 نفر")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ذخیره" })).toBeInTheDocument();
  });

  it("reflects the viewer's own state in aria-pressed", () => {
    render(<ReactionBar {...PROPS} liked saved />);

    expect(screen.getByRole("button", { name: "پسندیدن" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "ذخیره" })).toHaveAttribute("aria-pressed", "true");
  });

  it("tints the controls once they are on", () => {
    render(<ReactionBar {...PROPS} liked saved />);

    expect(screen.getByRole("button", { name: "پسندیدن" })).toHaveClass("bg-red-50");
    expect(screen.getByRole("button", { name: "ذخیره" })).toHaveClass("bg-amber-50");
  });

  it("reports like and save", async () => {
    const onLike = vi.fn();
    const onSave = vi.fn();
    render(<ReactionBar {...PROPS} onLike={onLike} onSave={onSave} />);

    await userEvent.click(screen.getByRole("button", { name: "پسندیدن" }));
    await userEvent.click(screen.getByRole("button", { name: "ذخیره" }));

    expect(onLike).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it("prints counts exactly as given", () => {
    const { container } = render(<ReactionBar likes={12} views={4} />);

    expect(container.querySelector('[data-slot="reaction-bar-like"]')).toHaveTextContent("12");
    expect(container.querySelector('[data-slot="reaction-bar-views"]')).toHaveTextContent("4");
  });

  it("hides each pill that has no value", () => {
    const { container } = render(<ReactionBar likes={0} />);

    expect(container.querySelector('[data-slot="reaction-bar-views"]')).toBeNull();
    expect(container.querySelector('[data-slot="reaction-bar-capacity"]')).toBeNull();
    expect(container.querySelector('[data-slot="reaction-bar-save"]')).toBeNull();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ReactionBar {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "reaction-bar");
  });

  it("renders on the server", () => {
    expect(renderToString(<ReactionBar {...PROPS} />)).toContain("حداکثر 15 نفر");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ReactionBar {...PROPS} />);

    await expectNoAxeViolations(container);
  });
});
