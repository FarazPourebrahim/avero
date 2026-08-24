import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Field, FieldControl, FieldLabel } from "../field/Field.js";
import { TagInput } from "./TagInput.js";

function tagNames(): string[] {
  return [...document.querySelectorAll("[data-slot='tag-input-tag']")].map(
    (tag) => tag.querySelector("span")?.textContent ?? "",
  );
}

describe("TagInput", () => {
  it("renders existing tags with named remove buttons", () => {
    render(<TagInput aria-label="مهارت‌ها" defaultValue={["React", "طراحی"]} />);

    expect(screen.getByRole("textbox", { name: "مهارت‌ها" })).toHaveValue("");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "حذف React" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "حذف طراحی" })).toBeInTheDocument();
  });

  it("adds the typed text as a tag with Enter", async () => {
    const onValueChange = vi.fn();
    render(<TagInput aria-label="مهارت‌ها" onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "  front   end {Enter}");

    expect(onValueChange).toHaveBeenCalledWith(["front end"]);
    expect(tagNames()).toEqual(["front end"]);
    expect(input).toHaveValue("");
  });

  it("adds tags at a comma or a Persian comma", async () => {
    render(<TagInput aria-label="مهارت‌ها" />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "طراحی،تحلیل,");

    expect(tagNames()).toEqual(["طراحی", "تحلیل"]);
    expect(input).toHaveValue("");
  });

  it("splits a pasted list and keeps the unfinished last item", async () => {
    render(<TagInput aria-label="مهارت‌ها" />);
    const input = screen.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.paste("UX, UI، Figma");

    expect(tagNames()).toEqual(["UX", "UI"]);
    expect(input).toHaveValue(" Figma");
  });

  it("ignores duplicates, including Arabic letters and case", async () => {
    const onValueChange = vi.fn();
    render(
      <TagInput
        aria-label="مهارت‌ها"
        defaultValue={["React", "کتاب"]}
        onValueChange={onValueChange}
      />,
    );
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "react{Enter}كتاب{Enter}");

    expect(onValueChange).not.toHaveBeenCalled();
    expect(tagNames()).toEqual(["React", "کتاب"]);
    expect(input).toHaveValue("");
  });

  it("removes the last tag with Backspace in an empty field", async () => {
    render(<TagInput aria-label="مهارت‌ها" defaultValue={["a", "b"]} />);
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "x{Backspace}{Backspace}");

    expect(tagNames()).toEqual(["a"]);
  });

  it("removes a tag with its button and returns focus to the input", async () => {
    const onValueChange = vi.fn();
    render(
      <TagInput aria-label="مهارت‌ها" defaultValue={["a", "b"]} onValueChange={onValueChange} />,
    );

    await userEvent.click(screen.getByRole("button", { name: "حذف a" }));

    expect(onValueChange).toHaveBeenCalledWith(["b"]);
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("stops at maxTags and keeps the typed text", async () => {
    const { container } = render(
      <TagInput aria-label="مهارت‌ها" maxTags={2} defaultValue={["a", "b"]} />,
    );
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "c{Enter}");

    expect(tagNames()).toEqual(["a", "b"]);
    expect(input).toHaveValue("c");
    expect(container.firstElementChild).toHaveAttribute("data-full");
  });

  it("adds the typed text when focus leaves", async () => {
    render(
      <>
        <TagInput aria-label="مهارت‌ها" />
        <button type="button">بعدی</button>
      </>,
    );

    await userEvent.type(screen.getByRole("textbox"), "UX");
    await userEvent.tab();

    expect(tagNames()).toEqual(["UX"]);
  });

  it("lets Enter submit the form only when nothing is typed", async () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return new FormData(event.currentTarget).getAll("skills");
    });
    render(
      <form onSubmit={onSubmit}>
        <TagInput aria-label="مهارت‌ها" name="skills" defaultValue={["React"]} />
        <button type="submit">ثبت</button>
      </form>,
    );
    const input = screen.getByRole("textbox");

    await userEvent.type(input, "UX{Enter}");
    expect(onSubmit).not.toHaveBeenCalled();

    await userEvent.keyboard("{Enter}");
    expect(onSubmit).toHaveReturnedWith(["React", "UX"]);
  });

  it("shows the placeholder only while there are no tags", async () => {
    render(<TagInput aria-label="مهارت‌ها" placeholder="مهارت را بنویسید" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("placeholder", "مهارت را بنویسید");

    await userEvent.type(input, "UX{Enter}");

    expect(input).not.toHaveAttribute("placeholder");
  });

  it("focuses the input when the empty part of the box is pressed", async () => {
    const { container } = render(<TagInput aria-label="مهارت‌ها" />);

    await userEvent.click(container.firstElementChild as HTMLElement);

    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("disables the input and the remove buttons", () => {
    const { container } = render(<TagInput aria-label="مهارت‌ها" defaultValue={["a"]} disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: "حذف a" })).toBeDisabled();
    expect(container.firstElementChild).toHaveAttribute("data-disabled");
  });

  it("follows the parent when controlled", async () => {
    function Controlled() {
      const [tags, setTags] = useState<string[]>(["a"]);
      return (
        <>
          <TagInput aria-label="مهارت‌ها" value={tags} onValueChange={setTags} />
          <output>{tags.join("|")}</output>
        </>
      );
    }
    render(<Controlled />);

    await userEvent.type(screen.getByRole("textbox"), "b{Enter}");

    expect(screen.getByRole("status")).toHaveTextContent("a|b");
  });

  it("uses the English dictionary for remove buttons", () => {
    render(
      <AveroProvider locale="en-US">
        <TagInput aria-label="Skills" defaultValue={["React"]} />
      </AveroProvider>,
    );

    expect(screen.getByRole("button", { name: "Remove React" })).toBeInTheDocument();
  });

  it("is labelled through Field and shows the invalid state", () => {
    const { container } = render(
      <Field invalid>
        <FieldLabel>مهارت‌ها</FieldLabel>
        <FieldControl>
          <TagInput />
        </FieldControl>
      </Field>,
    );

    expect(screen.getByRole("textbox", { name: "مهارت‌ها" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(container.querySelector("[data-slot='tag-input']")).toHaveClass("border-red-500");
  });

  it("forwards refs and composes handlers", async () => {
    const ref = createRef<HTMLInputElement>();
    const onKeyDown = vi.fn();
    const onBlur = vi.fn();
    render(<TagInput ref={ref} aria-label="مهارت‌ها" onKeyDown={onKeyDown} onBlur={onBlur} />);

    await userEvent.type(ref.current as HTMLInputElement, "a");
    await userEvent.tab();

    expect(ref.current).toHaveAttribute("data-slot", "tag-input-control");
    expect(onKeyDown).toHaveBeenCalled();
    expect(onBlur).toHaveBeenCalled();
  });

  it("renders tags on the server", () => {
    const html = renderToString(<TagInput aria-label="مهارت‌ها" defaultValue={["React"]} />);

    expect(html).toContain('data-slot="tag-input-tag"');
    expect(html).toContain("React");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <TagInput aria-label="مهارت‌ها" defaultValue={["React", "طراحی رابط کاربری"]} />,
    );

    await expectNoAxeViolations(container);
  });
});
