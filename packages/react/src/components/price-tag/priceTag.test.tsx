import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { en } from "../../i18n/dictionaries.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { PriceTag } from "./PriceTag.js";

describe("PriceTag", () => {
  it("renders the display price with a large primary amount", () => {
    const { container } = render(<PriceTag amount={20_000_000} />);

    expect(screen.getByText("۲۰٬۰۰۰٬۰۰۰")).toHaveClass("text-3xl", "font-black", "text-primary");
    expect(screen.getByText("تومان")).toHaveClass("text-xs", "text-slate-500");
    expect(container.firstElementChild).toHaveClass("flex", "items-baseline", "gap-2");
  });

  it("prefixes the inline price with the dictionary's from string", () => {
    const { container } = render(<PriceTag variant="inline" amount={7_000_000} />);

    expect(container.firstElementChild).toHaveTextContent("از ۷٬۰۰۰٬۰۰۰ تومان");
    expect(container.firstElementChild).toHaveClass("text-sm-plus", "text-text-chrome");
    expect(screen.getByText("۷٬۰۰۰٬۰۰۰")).toHaveClass("font-bold");
  });

  it("hides the prefix when it is null", () => {
    const { container } = render(<PriceTag variant="inline" amount={1} prefix={null} />);

    expect(container.querySelector('[data-slot="price-tag-prefix"]')).toBeNull();
  });

  it("renders the compact price with a custom currency and amount class", () => {
    const { container } = render(
      <PriceTag variant="compact" amount={35_000_000} currency="ریال" amountClassName="text-sm" />,
    );

    expect(container.firstElementChild).toHaveTextContent("۳۵٬۰۰۰٬۰۰۰ ریال");
    expect(container.firstElementChild).toHaveClass("text-primary", "font-black");
    expect(screen.getByText("۳۵٬۰۰۰٬۰۰۰")).toHaveClass("text-sm");
  });

  it("uses Latin digits and English strings under an English provider", () => {
    const { container } = render(
      <AveroProvider locale="en-US">
        <PriceTag variant="inline" amount={20_000_000} />
      </AveroProvider>,
    );

    expect(container.firstElementChild).toHaveTextContent(
      `${en.pricePrefixFrom} 20,000,000 ${en.currencyToman}`,
    );
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<PriceTag ref={ref} amount={1} />);

    expect(ref.current).toHaveAttribute("data-slot", "price-tag");
  });

  it("renders on the server", () => {
    expect(renderToString(<PriceTag amount={1000} />)).toContain("۱٬۰۰۰");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <PriceTag amount={20_000_000} />
        <PriceTag variant="inline" amount={20_000_000} />
        <PriceTag variant="compact" amount={20_000_000} />
      </div>,
    );

    await expectNoAxeViolations(container);
  });
});
