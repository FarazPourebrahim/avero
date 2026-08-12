import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ZoomFrame } from "./ZoomFrame.js";

const image = <img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="پیش‌نمایش دوره" />;

describe("ZoomFrame", () => {
  it("renders a button named by the image and the zoom hint", async () => {
    const onClick = vi.fn();
    render(<ZoomFrame onClick={onClick}>{image}</ZoomFrame>);
    const button = screen.getByRole("button", { name: /پیش‌نمایش دوره.*نمایش بزرگ‌تر/ });

    await userEvent.click(button);

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("cursor-zoom-in", "rounded-2xl", "hover:[&_img]:scale-[1.02]");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("reveals the hint pill on hover and focus", () => {
    const { container } = render(<ZoomFrame>{image}</ZoomFrame>);
    const pill = container.querySelector('[data-slot="zoom-frame-overlay"] > span');

    expect(pill).toHaveClass(
      "opacity-0",
      "group-hover:opacity-100",
      "group-focus-visible:opacity-100",
    );
    expect(pill?.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders a custom hint", () => {
    render(<ZoomFrame hint="بزرگ‌نمایی">{image}</ZoomFrame>);

    expect(screen.getByText("بزرگ‌نمایی")).toBeInTheDocument();
  });

  it("uses the English hint under an English provider", () => {
    render(
      <AveroProvider locale="en-US">
        <ZoomFrame>{image}</ZoomFrame>
      </AveroProvider>,
    );

    expect(screen.getByText("View larger")).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<ZoomFrame ref={ref}>{image}</ZoomFrame>);

    expect(ref.current).toHaveAttribute("data-slot", "zoom-frame");
  });

  it("renders on the server", () => {
    expect(renderToString(<ZoomFrame>{image}</ZoomFrame>)).toContain("نمایش بزرگ‌تر");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ZoomFrame>{image}</ZoomFrame>);

    await expectNoAxeViolations(container);
  });
});
