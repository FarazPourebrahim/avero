import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { WelcomeCard } from "./WelcomeCard.js";

describe("WelcomeCard", () => {
  it("fills the name into the dictionary's greeting", () => {
    render(<WelcomeCard name="Faraz Pourebrahim" />);

    expect(screen.getByText(/Faraz Pourebrahim عزیز، سلام/)).toBeInTheDocument();
    expect(screen.getByText("به دورلنسر خوش اومدی")).toBeInTheDocument();
  });

  it("accepts a whole greeting and its own second line", () => {
    render(
      <WelcomeCard name="زینب" greeting="سلام زینب">
        روز خوبی داشته باشی
      </WelcomeCard>,
    );

    expect(screen.getByText("سلام زینب")).toBeInTheDocument();
    expect(screen.getByText("روز خوبی داشته باشی")).toBeInTheDocument();
  });

  it("ships a real shadow in place of the reference's broken one", () => {
    const { container } = render(<WelcomeCard name="زینب" />);

    expect(container.querySelector('[data-slot="welcome-card"]')).toHaveClass("shadow-brand-soft");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<WelcomeCard name="زینب" ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "welcome-card");
  });

  it("renders on the server", () => {
    expect(renderToString(<WelcomeCard name="زینب" />)).toContain("خوش اومدی");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<WelcomeCard name="زینب" />);

    await expectNoAxeViolations(container);
  });
});
