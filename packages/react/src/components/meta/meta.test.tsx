import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ContactMethod, KeyValueRow, MetaBar, MetaItem } from "./Meta.js";

const icon = <svg data-testid="icon" aria-hidden="true" />;

describe("MetaItem and MetaBar", () => {
  it("renders the article meta panel with label and value", () => {
    render(
      <MetaBar>
        <MetaItem icon={icon} label="انتشار:">
          ۱۲ مهر ۱۴۰۵
        </MetaItem>
      </MetaBar>,
    );

    expect(screen.getByText("۱۲ مهر ۱۴۰۵")).toHaveClass("font-medium", "text-gray-700");
    expect(screen.getByText("انتشار:").parentElement?.parentElement).toHaveClass(
      "bg-gray-50/70",
      "rounded-2xl",
    );
  });

  it.each([
    ["compact", "gap-1.5"],
    ["pill", "bg-slate-100/80"],
    ["chip", "bg-slate-50"],
  ] as const)("renders the %s item variant", (variant, expected) => {
    render(
      <MetaItem variant={variant} icon={icon}>
        value
      </MetaItem>,
    );

    expect(screen.getByText("value").parentElement).toHaveClass(expected);
    expect(screen.getByText("value")).not.toHaveClass("font-medium");
  });

  it.each([
    ["row", "text-sm-plus"],
    ["inline", "text-gray-500"],
  ] as const)("renders the %s bar variant", (variant, expected) => {
    const { container } = render(<MetaBar variant={variant} />);

    expect(container.firstElementChild).toHaveClass(expected);
  });
});

describe("KeyValueRow", () => {
  it("renders a linked value in Latin reading order", () => {
    render(
      <KeyValueRow label="ایمیل :" value="hello@example.com" href="mailto:hello@example.com" />,
    );
    const link = screen.getByRole("link", { name: "hello@example.com" });

    expect(link).toHaveAttribute("dir", "ltr");
    expect(link).toHaveAttribute("href", "mailto:hello@example.com");
    expect(link).toHaveClass("hover:text-text-chrome-hover");
  });

  it("renders a plain value with a custom direction", () => {
    render(<KeyValueRow label="شهر :" value="اصفهان" valueDir="rtl" />);

    expect(screen.getByText("اصفهان")).toHaveAttribute("dir", "rtl");
  });
});

describe("ContactMethod", () => {
  it("renders a contact chip with a monospace LTR value", () => {
    render(
      <ContactMethod href="tel:+982100000000" icon={icon} label="phone:" value="021-00000000" />,
    );
    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "tel:+982100000000");
    expect(link).not.toHaveAttribute("target");
    expect(screen.getByText("021-00000000")).toHaveAttribute("dir", "ltr");
    expect(screen.getByText("021-00000000")).toHaveClass("font-mono");
  });

  it("opens external channels safely", () => {
    render(
      <ContactMethod href="https://t.me/example" label="telegram:" value="@example" external />,
    );

    expect(screen.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
});

describe("meta family", () => {
  it("forwards refs", () => {
    const item = createRef<HTMLDivElement>();
    const bar = createRef<HTMLDivElement>();
    const row = createRef<HTMLDivElement>();
    const contact = createRef<HTMLAnchorElement>();
    render(
      <>
        <MetaBar ref={bar}>
          <MetaItem ref={item}>x</MetaItem>
        </MetaBar>
        <KeyValueRow ref={row} label="a" value="b" />
        <ContactMethod ref={contact} href="mailto:a@b.c" label="email:" value="a@b.c" />
      </>,
    );

    expect(item.current).toHaveAttribute("data-slot", "meta-item");
    expect(bar.current).toHaveAttribute("data-slot", "meta-bar");
    expect(row.current).toHaveAttribute("data-slot", "key-value-row");
    expect(contact.current?.tagName).toBe("A");
  });

  it("renders on the server", () => {
    expect(renderToString(<KeyValueRow label="a" value="b" href="tel:1" />)).toContain('dir="ltr"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <MetaBar>
          <MetaItem icon={icon} label="بازدید:">
            15
          </MetaItem>
        </MetaBar>
        <KeyValueRow label="ایمیل :" value="a@b.c" href="mailto:a@b.c" />
        <ContactMethod href="mailto:a@b.c" label="email:" value="a@b.c" icon={icon} />
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
