import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { RadioCard } from "./RadioCard.js";
import { RadioGroup } from "./RadioGroup.js";

function Shipping(props: Parameters<typeof RadioGroup>[0]) {
  return (
    <RadioGroup aria-label="روش ارسال" {...props}>
      <RadioCard value="post" title="پست پیشتاز" description="سه تا پنج روز کاری" aside="رایگان" />
      <RadioCard value="courier" title="پیک" description="همان روز، فقط تهران" />
      <RadioCard value="pickup" title="تحویل حضوری" description="به‌زودی" disabled />
    </RadioGroup>
  );
}

describe("RadioCard", () => {
  it("names each radio by its title and describes it by its description", () => {
    render(<Shipping />);

    const post = screen.getByRole("radio", { name: "پست پیشتاز" });
    expect(post).toHaveAccessibleDescription("سه تا پنج روز کاری");
  });

  it("chooses its option when anywhere on the card is clicked", async () => {
    const onValueChange = vi.fn();
    render(<Shipping onValueChange={onValueChange} />);

    await userEvent.click(screen.getByText("همان روز، فقط تهران"));

    expect(onValueChange).toHaveBeenCalledWith("courier");
    expect(screen.getByRole("radio", { name: "پیک" })).toBeChecked();
  });

  it("chooses exactly once when the radio itself is clicked", async () => {
    const onValueChange = vi.fn();
    render(<Shipping onValueChange={onValueChange} />);

    await userEvent.click(screen.getByRole("radio", { name: "پست پیشتاز" }));

    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it("moves between cards with the arrow keys and skips a disabled one", async () => {
    render(<Shipping defaultValue="post" />);
    screen.getByRole("radio", { name: "پست پیشتاز" }).focus();

    // As in the RadioGroup tests: Radix selects the option that receives focus while an arrow key
    // is still down, so the key is held until the move lands.
    await userEvent.keyboard("{ArrowDown>}");
    await waitFor(() => expect(screen.getByRole("radio", { name: "پیک" })).toHaveFocus());
    expect(screen.getByRole("radio", { name: "پیک" })).toHaveAttribute("aria-checked", "true");
    await userEvent.keyboard("{/ArrowDown}");

    await userEvent.keyboard("{ArrowDown>}");
    await waitFor(() => expect(screen.getByRole("radio", { name: "پست پیشتاز" })).toHaveFocus());
    await userEvent.keyboard("{/ArrowDown}");
  });

  it("does not choose a disabled card", async () => {
    render(<Shipping />);

    await userEvent.click(screen.getByText("تحویل حضوری"));

    expect(screen.getByRole("radio", { name: "تحویل حضوری" })).not.toBeChecked();
  });

  it("tints the chosen card and renders the aside", () => {
    const { container } = render(<Shipping defaultValue="post" />);

    expect(container.querySelector('[data-slot="radio-card"]')).toHaveClass(
      "has-[[data-state=checked]]:border-blue-200",
    );
    expect(screen.getByText("رایگان")).toHaveAttribute("data-slot", "radio-card-aside");
  });

  it("submits the chosen value with a form", async () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return new FormData(event.currentTarget).get("shipping");
    });
    render(
      <form onSubmit={onSubmit}>
        <Shipping name="shipping" defaultValue="courier" />
        <button type="submit">ثبت</button>
      </form>,
    );

    await userEvent.click(screen.getByRole("button", { name: "ثبت" }));

    expect(onSubmit.mock.results[0]!.value).toBe("courier");
  });

  it("forwards its ref to the radio and its className to the card", () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(
      <RadioGroup aria-label="روش ارسال">
        <RadioCard ref={ref} value="post" title="پست" className="w-80" radioClassName="ms-1" />
      </RadioGroup>,
    );

    expect(ref.current).toHaveAttribute("role", "radio");
    expect(ref.current).toHaveClass("ms-1");
    expect(container.querySelector('[data-slot="radio-card"]')).toHaveClass("w-80");
  });

  it("renders on the server", () => {
    expect(renderToString(<Shipping />)).toContain("radio-card");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Shipping defaultValue="post" />);

    await expectNoAxeViolations(container);
  });
});
