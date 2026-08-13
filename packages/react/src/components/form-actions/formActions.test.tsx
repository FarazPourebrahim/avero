import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { FormActions } from "./FormActions.js";

describe("FormActions", () => {
  it("puts the hint opposite the actions", () => {
    const { container } = render(
      <FormActions hint="دیدگاه‌ها پس از بررسی منتشر می‌شوند.">
        <button type="submit">ارسال دیدگاه</button>
      </FormActions>,
    );

    expect(container.firstElementChild).toHaveClass("justify-between");
    expect(screen.getByText("دیدگاه‌ها پس از بررسی منتشر می‌شوند.")).toHaveClass(
      "text-xs",
      "text-gray-400",
    );
  });

  it("aligns actions to the end without a hint", () => {
    const { container } = render(
      <FormActions>
        <button type="submit">ثبت</button>
      </FormActions>,
    );

    expect(container.firstElementChild).toHaveClass("justify-end");
    expect(container.querySelector('[data-slot="form-actions-hint"]')).toBeNull();
  });

  it("honours an explicit alignment", () => {
    const { container } = render(<FormActions hint="راهنما" align="end" />);

    expect(container.firstElementChild).toHaveClass("justify-end");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<FormActions ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "form-actions");
  });

  it("renders on the server", () => {
    expect(renderToString(<FormActions hint="راهنما" />)).toContain("راهنما");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <FormActions hint="راهنما">
        <button type="submit">ثبت</button>
      </FormActions>,
    );

    await expectNoAxeViolations(container);
  });
});
