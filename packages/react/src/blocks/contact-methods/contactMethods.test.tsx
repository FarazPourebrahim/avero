import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ContactMethod } from "../../components/meta/index.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ContactMethods } from "./ContactMethods.js";

function methods() {
  return (
    <>
      <ContactMethod href="mailto:a@example.com" label="email:" value="a@example.com" external />
      <ContactMethod href="tel:+982100000000" label="phone:" value="۰۲۱-۰۰۰۰۰۰۰۰" />
    </>
  );
}

describe("ContactMethods", () => {
  it("renders the title, description and channels", () => {
    render(
      <ContactMethods title="راه‌های ارتباط با پشتیبانی" description="برای پرسش‌های ثبت‌نام">
        {methods()}
      </ContactMethods>,
    );

    expect(screen.getByRole("heading", { name: "راه‌های ارتباط با پشتیبانی" })).toBeInTheDocument();
    expect(screen.getByText("برای پرسش‌های ثبت‌نام")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("wraps the channels onto as many rows as they need", () => {
    const { container } = render(<ContactMethods title="تماس">{methods()}</ContactMethods>);

    expect(container.querySelector('[data-slot="contact-methods-list"]')).toHaveClass(
      "flex-wrap",
      "gap-3",
    );
  });

  it("omits the description when there is none", () => {
    const { container } = render(<ContactMethods title="تماس">{methods()}</ContactMethods>);

    expect(container.querySelectorAll("p")).toHaveLength(0);
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(
      <ContactMethods ref={ref} title="تماس">
        {methods()}
      </ContactMethods>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "contact-methods");
  });

  it("renders on the server", () => {
    expect(renderToString(<ContactMethods title="تماس">{methods()}</ContactMethods>)).toContain(
      "email:",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ContactMethods title="تماس" description="برای پرسش‌های ثبت‌نام">
        {methods()}
      </ContactMethods>,
    );

    await expectNoAxeViolations(container);
  });
});
