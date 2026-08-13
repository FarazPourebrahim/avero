import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Textarea } from "./Textarea.js";

describe("Textarea", () => {
  it("renders the soft comment box by default", () => {
    render(<Textarea aria-label="دیدگاه" placeholder="دیدگاه خود را بنویسید..." />);
    const textarea = screen.getByRole("textbox", { name: "دیدگاه" });

    expect(textarea).toHaveAttribute("rows", "4");
    expect(textarea).toHaveClass("bg-gray-50", "rounded-2xl", "resize-none");
  });

  it("renders the slate variant with a resizable box", () => {
    render(<Textarea aria-label="دیدگاه" variant="slate" resize="vertical" rows={3} />);
    const textarea = screen.getByRole("textbox");

    expect(textarea).toHaveClass("border-slate-200", "resize-y");
    expect(textarea).toHaveAttribute("rows", "3");
  });

  it("accepts typed text", async () => {
    render(<Textarea aria-label="دیدگاه" />);

    await userEvent.type(screen.getByRole("textbox"), "متن دیدگاه");

    expect(screen.getByRole("textbox")).toHaveValue("متن دیدگاه");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea aria-label="x" ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "textarea");
  });

  it("renders on the server", () => {
    expect(renderToString(<Textarea aria-label="x" />)).toContain('data-slot="textarea"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <label htmlFor="comment">دیدگاه</label>
        <Textarea id="comment" />
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
