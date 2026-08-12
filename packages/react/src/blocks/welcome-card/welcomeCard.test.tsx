import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { WelcomeCard } from "./WelcomeCard.js";

describe("WelcomeCard", () => {
  it("fills the name into the dictionary's greeting", () => {
    render(<WelcomeCard name="Faraz Pourebrahim" />);

    expect(screen.getByText(/سلام Faraz Pourebrahim/)).toBeInTheDocument();
    expect(screen.getByText("خوش آمدید")).toBeInTheDocument();
  });

  it("accepts a whole greeting and its own second line", () => {
    render(
      <WelcomeCard name="سارا" greeting="صبح بخیر سارا">
        امروز دو جلسه تازه در انتظار شماست
      </WelcomeCard>,
    );

    expect(screen.getByText("صبح بخیر سارا")).toBeInTheDocument();
    expect(screen.getByText("امروز دو جلسه تازه در انتظار شماست")).toBeInTheDocument();
  });

  it("uses the soft brand shadow", () => {
    const { container } = render(<WelcomeCard name="سارا" />);

    expect(container.querySelector('[data-slot="welcome-card"]')).toHaveClass("shadow-brand-soft");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<WelcomeCard name="سارا" ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "welcome-card");
  });

  it("renders on the server", () => {
    expect(renderToString(<WelcomeCard name="سارا" />)).toContain("خوش آمدید");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<WelcomeCard name="سارا" />);

    await expectNoAxeViolations(container);
  });
});
