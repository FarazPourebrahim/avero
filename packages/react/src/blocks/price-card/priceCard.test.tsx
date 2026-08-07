import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { PriceCard } from "./PriceCard.js";

describe("PriceCard", () => {
  it("renders the dictionary's caption over a formatted amount", () => {
    render(<PriceCard amount={20000000} />);

    expect(screen.getByText("قیمت پایه خدمت")).toBeInTheDocument();
    expect(screen.getByText("۲۰٬۰۰۰٬۰۰۰")).toBeInTheDocument();
    expect(screen.getByText("تومان")).toBeInTheDocument();
  });

  it("accepts its own caption and currency", () => {
    render(<PriceCard amount={1000} label="قیمت نهایی" currency="ریال" />);

    expect(screen.getByText("قیمت نهایی")).toBeInTheDocument();
    expect(screen.getByText("ریال")).toBeInTheDocument();
  });

  it("renders anything passed under the price", () => {
    render(
      <PriceCard amount={1000}>
        <button type="button">سفارش</button>
      </PriceCard>,
    );

    expect(screen.getByRole("button", { name: "سفارش" })).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<PriceCard amount={1000} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "price-card");
  });

  it("renders on the server", () => {
    expect(renderToString(<PriceCard amount={20000000} />)).toContain("قیمت پایه خدمت");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<PriceCard amount={20000000} />);

    await expectNoAxeViolations(container);
  });
});
