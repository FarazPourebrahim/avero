import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { OpportunityCard } from "./OpportunityCard.js";

const PROPS = {
  title: "کارگاه طراحی تجربه کاربری",
  href: "/workshops/ux-101",
  date: "15 مهر",
  tags: ["آنلاین"],
  description: "کارگاه عملی سه‌روزه برای آشنایی با فرایند طراحی",
  capacityLabel: "ظرفیت ثبت‌نام",
  value: 3,
  max: 12,
  status: "9 جای خالی",
  startCaption: "3 نفر ثبت‌نام کرده‌اند",
  endCaption: "حداکثر 12 نفر",
};

describe("OpportunityCard", () => {
  it("renders the whole card as one link", () => {
    render(<OpportunityCard {...PROPS} />);

    expect(screen.getByRole("link", { name: /کارگاه طراحی تجربه کاربری/ })).toHaveAttribute(
      "href",
      "/workshops/ux-101",
    );
  });

  it("shows the title, date and tags", () => {
    render(<OpportunityCard {...PROPS} />);

    expect(screen.getByText("کارگاه طراحی تجربه کاربری")).toBeInTheDocument();
    expect(screen.getByText("15 مهر")).toBeInTheDocument();
    expect(screen.getByText("آنلاین")).toBeInTheDocument();
  });

  it("renders the capacity meter with its captions", () => {
    render(<OpportunityCard {...PROPS} />);

    expect(screen.getByText("ظرفیت ثبت‌نام")).toBeInTheDocument();
    expect(screen.getByText("9 جای خالی")).toBeInTheDocument();
    expect(screen.getByText("3 نفر ثبت‌نام کرده‌اند")).toBeInTheDocument();
    expect(screen.getByText("حداکثر 12 نفر")).toBeInTheDocument();
  });

  it("shows the view call to action from the dictionary", () => {
    render(<OpportunityCard {...PROPS} />);

    expect(screen.getByText(/مشاهده/)).toBeInTheDocument();
  });

  it("covers a full opportunity and stops it responding", () => {
    const { container } = render(<OpportunityCard {...PROPS} full value={5} max={5} />);
    const card = container.firstElementChild;

    expect(card).toHaveAttribute("data-full", "true");
    expect(card).toHaveAttribute("aria-disabled", "true");
    expect(card).toHaveClass("pointer-events-none", "opacity-70", "blur-[1px]");
    expect(screen.getByText("ظرفیت تکمیل شد")).toBeInTheDocument();
    // A full card has nothing left to act on, so it drops its call to action.
    expect(screen.queryByText(/مشاهده/)).toBeNull();
  });

  it("omits the meter when no capacity is given", () => {
    render(<OpportunityCard title="بدون ظرفیت" href="/x" />);

    expect(screen.queryByText("ظرفیت ثبت‌نام")).toBeNull();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(<OpportunityCard {...PROPS} ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "opportunity-card");
  });

  it("renders on the server", () => {
    expect(renderToString(<OpportunityCard {...PROPS} />)).toContain("کارگاه طراحی تجربه کاربری");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<OpportunityCard {...PROPS} />);

    await expectNoAxeViolations(container);
  });

  it("has no accessibility violations when full", async () => {
    const { container } = render(<OpportunityCard {...PROPS} full value={5} max={5} />);

    await expectNoAxeViolations(container);
  });
});
