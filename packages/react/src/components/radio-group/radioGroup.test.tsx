import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { RadioGroup, RadioGroupItem } from "./RadioGroup.js";

const OPTIONS = [
  { value: "online", label: "آنلاین" },
  { value: "in-person", label: "حضوری" },
  { value: "hybrid", label: "ترکیبی", disabled: true },
];

function Delivery(props: Parameters<typeof RadioGroup>[0]) {
  return (
    <RadioGroup aria-label="نحوه برگزاری" {...props}>
      {OPTIONS.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <RadioGroupItem id={option.value} value={option.value} disabled={option.disabled} />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("renders a named group of unchecked options", () => {
    render(<Delivery />);

    expect(screen.getByRole("radiogroup", { name: "نحوه برگزاری" })).toHaveAttribute(
      "data-slot",
      "radio-group",
    );
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.getByRole("radio", { name: "آنلاین" })).toHaveAttribute("aria-checked", "false");
  });

  it("selects an option on click and reports its value", async () => {
    const onValueChange = vi.fn();
    render(<Delivery onValueChange={onValueChange} />);

    await userEvent.click(screen.getByRole("radio", { name: "حضوری" }));

    expect(screen.getByRole("radio", { name: "حضوری" })).toHaveAttribute("aria-checked", "true");
    expect(onValueChange).toHaveBeenCalledWith("in-person");
  });

  it("selects an option when its label is clicked", async () => {
    render(<Delivery />);

    await userEvent.click(screen.getByText("آنلاین"));

    expect(screen.getByRole("radio", { name: "آنلاین" })).toHaveAttribute("aria-checked", "true");
  });

  it("moves the selection with the arrow keys", async () => {
    render(<Delivery defaultValue="online" />);
    screen.getByRole("radio", { name: "آنلاین" }).focus();

    // Radix moves focus on a timer and selects the option that receives focus while an arrow key is
    // still down, so the key is held until the move lands, as it is on a real keyboard.
    await userEvent.keyboard("{ArrowDown>}");

    await waitFor(() => expect(screen.getByRole("radio", { name: "حضوری" })).toHaveFocus());
    expect(screen.getByRole("radio", { name: "حضوری" })).toHaveAttribute("aria-checked", "true");

    await userEvent.keyboard("{/ArrowDown}");
  });

  it("takes its direction from AveroProvider", () => {
    render(
      <AveroProvider locale="en-US">
        <Delivery />
      </AveroProvider>,
    );

    expect(screen.getByRole("radiogroup")).toHaveAttribute("dir", "ltr");
  });

  it("defaults to RTL without a provider", () => {
    render(<Delivery />);

    expect(screen.getByRole("radiogroup")).toHaveAttribute("dir", "rtl");
  });

  it("does not select a disabled option", async () => {
    render(<Delivery />);

    await userEvent.click(screen.getByRole("radio", { name: "ترکیبی" }));

    expect(screen.getByRole("radio", { name: "ترکیبی" })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("radio", { name: "ترکیبی" })).toBeDisabled();
  });

  it("submits the selected value with a form", async () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return new FormData(event.currentTarget).get("delivery");
    });
    render(
      <form onSubmit={onSubmit}>
        <Delivery name="delivery" />
        <button type="submit">ثبت</button>
      </form>,
    );

    await userEvent.click(screen.getByRole("radio", { name: "حضوری" }));
    await userEvent.click(screen.getByRole("button", { name: "ثبت" }));

    expect(onSubmit).toHaveReturnedWith("in-person");
  });

  it("forwards refs", () => {
    const groupRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();
    render(
      <RadioGroup ref={groupRef} aria-label="x">
        <RadioGroupItem ref={itemRef} value="a" aria-label="a" />
      </RadioGroup>,
    );

    expect(groupRef.current).toHaveAttribute("data-slot", "radio-group");
    expect(itemRef.current).toHaveAttribute("data-slot", "radio-group-item");
  });

  it("renders on the server", () => {
    expect(renderToString(<Delivery defaultValue="online" />)).toContain(
      'data-slot="radio-group-item"',
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Delivery defaultValue="online" />);

    await expectNoAxeViolations(container);
  });
});
