import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { BackLink } from "./BackLink.js";

describe("BackLink", () => {
  it("renders a button labelled with the dictionary's back string", async () => {
    const onClick = vi.fn();
    render(<BackLink onClick={onClick} />);
    const button = screen.getByRole("button", { name: "بازگشت" });

    await userEvent.click(button);

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("text-gray-500", "hover:text-primary");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("uses the English dictionary under an English provider", () => {
    render(
      <AveroProvider locale="en-US">
        <BackLink />
      </AveroProvider>,
    );

    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
  });

  it("renders a link when href is given", () => {
    render(<BackLink href="/courses" variant="subtle" label="بازگشت به فهرست دوره‌ها" />);
    const link = screen.getByRole("link", { name: "بازگشت به فهرست دوره‌ها" });

    expect(link).toHaveAttribute("href", "/courses");
    expect(link).toHaveClass("hover:text-gray-700");
  });

  it("flips the arrow in LTR", () => {
    const { container } = render(<BackLink variant="soft" />);

    expect(container.querySelector("svg")).toHaveClass("ltr:-scale-x-100", "size-4");
  });

  it("applies the soft variant", () => {
    render(<BackLink variant="soft" />);

    expect(screen.getByRole("button")).toHaveClass("px-4", "font-bold", "hover:bg-slate-50");
  });

  it("styles a custom child with asChild", () => {
    render(
      <BackLink asChild>
        <a href="/blog">وبلاگ</a>
      </BackLink>,
    );

    expect(screen.getByRole("link", { name: "وبلاگ" })).toHaveAttribute("data-slot", "back-link");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(<BackLink ref={ref} href="/" />);

    expect(ref.current?.tagName).toBe("A");
  });

  it("renders on the server", () => {
    expect(renderToString(<BackLink href="/" />)).toContain("بازگشت");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <BackLink />
        <BackLink href="/" variant="subtle" />
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
