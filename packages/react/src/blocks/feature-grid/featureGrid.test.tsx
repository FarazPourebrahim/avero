import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FeatureCard } from "../../components/feature-card/index.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { FeatureGrid } from "./FeatureGrid.js";

function cards() {
  return (
    <>
      <FeatureCard title="پرداخت امن" description="بازگشت وجه تا هفت روز." tone="emerald" />
      <FeatureCard title="مدرس‌های باتجربه" description="متخصصانی با سال‌ها تجربه." tone="blue" />
    </>
  );
}

describe("FeatureGrid", () => {
  it("renders the titled section above its cards", () => {
    render(<FeatureGrid title="چرا ما؟">{cards()}</FeatureGrid>);

    expect(screen.getByRole("heading", { name: "چرا ما؟" })).toBeInTheDocument();
    expect(screen.getByText("پرداخت امن")).toBeInTheDocument();
  });

  it("lays four columns out by default, folding to two on a tablet", () => {
    const { container } = render(<FeatureGrid>{cards()}</FeatureGrid>);

    expect(container.querySelector('[data-slot="feature-grid-items"]')).toHaveClass(
      "grid-cols-1",
      "sm:grid-cols-2",
      "lg:grid-cols-4",
    );
  });

  it("takes a narrower column count", () => {
    const { container } = render(<FeatureGrid columns={3}>{cards()}</FeatureGrid>);

    expect(container.querySelector('[data-slot="feature-grid-items"]')).toHaveClass(
      "lg:grid-cols-3",
    );
  });

  it("stands alone without a title", () => {
    const { container } = render(<FeatureGrid>{cards()}</FeatureGrid>);

    expect(container.querySelector('[data-slot="section-header"]')).toBeNull();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(<FeatureGrid ref={ref}>{cards()}</FeatureGrid>);

    expect(ref.current).toHaveAttribute("data-slot", "feature-grid");
  });

  it("renders on the server", () => {
    expect(renderToString(<FeatureGrid title="چرا ما؟">{cards()}</FeatureGrid>)).toContain(
      "پرداخت امن",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<FeatureGrid title="چرا ما؟">{cards()}</FeatureGrid>);

    await expectNoAxeViolations(container);
  });
});
