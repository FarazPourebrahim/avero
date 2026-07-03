import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionLink,
  AccordionTrigger,
} from "./Accordion.js";

function FooterGroups() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="about">
        <AccordionTrigger>درباره ما</AccordionTrigger>
        <AccordionContent>
          <AccordionLink href="/rules">قوانین و مقررات</AccordionLink>
          <AccordionLink href="/contact">تماس با ما</AccordionLink>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="skills">
        <AccordionTrigger>مهارت ها</AccordionTrigger>
        <AccordionContent>
          <AccordionLink href="/project?category=web">طراحی سایت</AccordionLink>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const trigger = (name: string) => screen.getByRole("button", { name });

describe("Accordion", () => {
  it("renders collapsed triggers in the reference footer style", () => {
    render(<FooterGroups />);

    expect(trigger("درباره ما")).toHaveAttribute("aria-expanded", "false");
    expect(trigger("درباره ما")).toHaveClass("bg-surface-muted", "rounded-xl", "px-8", "py-4");
    expect(screen.queryByRole("link", { name: "قوانین و مقررات" })).not.toBeInTheDocument();
  });

  it("opens a panel on click and rotates the arrow", async () => {
    render(<FooterGroups />);

    await userEvent.click(trigger("درباره ما"));

    expect(trigger("درباره ما")).toHaveAttribute("aria-expanded", "true");
    expect(trigger("درباره ما")).toHaveAttribute("data-state", "open");
    expect(screen.getByRole("link", { name: "قوانین و مقررات" })).toBeVisible();
  });

  it("keeps only one panel open and can close it again", async () => {
    render(<FooterGroups />);

    await userEvent.click(trigger("درباره ما"));
    await userEvent.click(trigger("مهارت ها"));

    expect(trigger("درباره ما")).toHaveAttribute("aria-expanded", "false");
    expect(trigger("مهارت ها")).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(trigger("مهارت ها"));
    expect(trigger("مهارت ها")).toHaveAttribute("aria-expanded", "false");
  });

  it("supports keyboard navigation between triggers", async () => {
    render(<FooterGroups />);
    trigger("درباره ما").focus();

    await userEvent.keyboard("{ArrowDown}");
    expect(trigger("مهارت ها")).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    expect(trigger("مهارت ها")).toHaveAttribute("aria-expanded", "true");
  });

  it("styles panel links and supports asChild", async () => {
    render(
      <Accordion type="single" defaultValue="a">
        <AccordionItem value="a">
          <AccordionTrigger>a</AccordionTrigger>
          <AccordionContent>
            <AccordionLink asChild>
              <a href="/x">router link</a>
            </AccordionLink>
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByRole("link", { name: "router link" })).toHaveClass(
      "text-text-chrome",
      "hover:pe-5",
    );
  });

  it("forwards refs", () => {
    const rootRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();
    render(
      <Accordion ref={rootRef} type="multiple">
        <AccordionItem value="a">
          <AccordionTrigger ref={triggerRef}>a</AccordionTrigger>
          <AccordionContent>content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(rootRef.current).toHaveAttribute("data-slot", "accordion");
    expect(triggerRef.current?.tagName).toBe("BUTTON");
  });

  it("renders on the server", () => {
    expect(renderToString(<FooterGroups />)).toContain('aria-expanded="false"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<FooterGroups />);
    await userEvent.click(trigger("درباره ما"));

    await expectNoAxeViolations(container);
  });
});
