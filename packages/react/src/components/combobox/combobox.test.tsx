import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Field, FieldControl, FieldLabel } from "../field/Field.js";
import {
  Combobox,
  normalizeSearchText,
  type ComboboxItem,
  type ComboboxOption,
} from "./Combobox.js";

const CITIES: ComboboxOption[] = [
  { value: "tehran", label: "تهران", keywords: ["Tehran"] },
  { value: "shiraz", label: "شیراز" },
  { value: "kerman", label: "کرمان", disabled: true },
  { value: "karaj", label: "کرج" },
];

const COURSES: ComboboxItem[] = [
  {
    label: "طراحی",
    options: [
      { value: "ui", label: "طراحی رابط کاربری" },
      { value: "motion", label: "موشن گرافیک" },
    ],
  },
  {
    label: "برنامه‌نویسی",
    options: [
      { value: "web", label: "برنامه‌نویسی وب" },
      { value: "python", label: "پایتون مقدماتی" },
    ],
  },
];

function optionNames(): string[] {
  return screen.getAllByRole("option").map((option) => option.textContent ?? "");
}

describe("normalizeSearchText", () => {
  it("folds Arabic letters, non-joiners, diacritics, digits and case", () => {
    expect(normalizeSearchText("  كيك‌ها ۱۲٣ ABC ")).toBe("کیک ها 123 abc");
    expect(normalizeSearchText("مُحَمَّد")).toBe("محمد");
  });
});

describe("Combobox", () => {
  it("renders a closed, labelled combobox input", () => {
    render(<Combobox aria-label="شهر" options={CITIES} placeholder="انتخاب شهر" />);
    const input = screen.getByRole("combobox", { name: "شهر" });

    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveAttribute("aria-autocomplete", "list");
    expect(input).not.toHaveAttribute("aria-controls");
    expect(input).toHaveAttribute("placeholder", "انتخاب شهر");
    expect(input).toHaveClass("rounded-xl", "border-gray-300", "pe-10");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("opens every option on click and points at the listbox", async () => {
    render(<Combobox aria-label="شهر" options={CITIES} />);
    const input = screen.getByRole("combobox");

    await userEvent.click(input);

    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input).toHaveAttribute("aria-controls", screen.getByRole("listbox").id);
    expect(screen.getByRole("listbox")).toHaveAccessibleName("شهر");
    expect(optionNames()).toEqual(["تهران", "شیراز", "کرمان", "کرج"]);
    expect(input).toHaveFocus();
  });

  it("filters as the user types and highlights the first match", async () => {
    render(<Combobox aria-label="شهر" options={CITIES} />);
    const input = screen.getByRole("combobox");

    await userEvent.type(input, "کر");

    expect(optionNames()).toEqual(["کرمان", "کرج"]);
    // کرمان is disabled, so the first match that can be picked is highlighted.
    const karaj = screen.getByRole("option", { name: "کرج" });
    expect(input).toHaveAttribute("aria-activedescendant", karaj.id);
    expect(karaj).toHaveAttribute("data-highlighted");
  });

  it("matches Arabic keyboard letters and keywords", async () => {
    render(<Combobox aria-label="شهر" options={CITIES} />);
    const input = screen.getByRole("combobox");

    await userEvent.type(input, "شيراز");
    expect(optionNames()).toEqual(["شیراز"]);

    await userEvent.clear(input);
    await userEvent.type(input, "tehr");
    expect(optionNames()).toEqual(["تهران"]);
  });

  it("uses a custom filter", async () => {
    render(
      <Combobox
        aria-label="شهر"
        options={CITIES}
        filter={(option, query) => option.label.startsWith(query)}
      />,
    );

    await userEvent.type(screen.getByRole("combobox"), "ر");

    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("shows the dictionary message when nothing matches", async () => {
    render(
      <AveroProvider locale="en-US">
        <Combobox aria-label="City" options={CITIES} />
      </AveroProvider>,
    );
    const input = screen.getByRole("combobox");

    await userEvent.type(input, "zzz");

    expect(screen.getByText("No matches found")).toHaveAttribute("data-slot", "combobox-empty");
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input).not.toHaveAttribute("aria-controls");
    expect(input).not.toHaveAttribute("aria-activedescendant");
  });

  it("accepts a custom empty message", async () => {
    render(<Combobox aria-label="شهر" options={CITIES} emptyMessage="شهری پیدا نشد" />);

    await userEvent.type(screen.getByRole("combobox"), "zzz");

    expect(screen.getByText("شهری پیدا نشد")).toBeInTheDocument();
  });

  it("moves with the arrow keys, skips disabled options and picks with Enter", async () => {
    const onValueChange = vi.fn();
    render(<Combobox aria-label="شهر" options={CITIES} onValueChange={onValueChange} />);
    const input = screen.getByRole("combobox");
    input.focus();

    await userEvent.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "تهران" }).id,
    );

    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    expect(input).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "کرج" }).id,
    );

    await userEvent.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "کرج" }).id,
    );

    await userEvent.keyboard("{ArrowUp}{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("shiraz");
    expect(input).toHaveValue("شیراز");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveFocus();
  });

  it("starts from the selected option when reopened", async () => {
    render(<Combobox aria-label="شهر" options={CITIES} defaultValue="karaj" />);
    const input = screen.getByRole("combobox");
    input.focus();

    await userEvent.keyboard("{ArrowUp}");

    const karaj = screen.getByRole("option", { name: "کرج" });
    expect(input).toHaveAttribute("aria-activedescendant", karaj.id);
    expect(karaj).toHaveAttribute("aria-selected", "true");
    expect(karaj).toHaveAttribute("data-state", "checked");
  });

  it("picks an option with the mouse and keeps focus in the input", async () => {
    const onValueChange = vi.fn();
    render(<Combobox aria-label="شهر" options={CITIES} onValueChange={onValueChange} />);
    const input = screen.getByRole("combobox");

    await userEvent.click(input);
    await userEvent.click(screen.getByRole("option", { name: "کرج" }));

    expect(onValueChange).toHaveBeenCalledWith("karaj");
    expect(input).toHaveValue("کرج");
    expect(input).toHaveFocus();
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("ignores clicks on disabled options", async () => {
    const onValueChange = vi.fn();
    render(<Combobox aria-label="شهر" options={CITIES} onValueChange={onValueChange} />);

    await userEvent.click(screen.getByRole("combobox"));
    const kerman = screen.getByRole("option", { name: "کرمان" });
    await userEvent.click(kerman);

    expect(kerman).toHaveAttribute("aria-disabled", "true");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("closes with Escape and restores the selected label", async () => {
    render(<Combobox aria-label="شهر" options={CITIES} defaultValue="tehran" />);
    const input = screen.getByRole("combobox");

    await userEvent.clear(input);
    await userEvent.type(input, "کر");
    await userEvent.keyboard("{Escape}");

    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveValue("تهران");
  });

  it("closes and restores the selected label when focus leaves", async () => {
    render(
      <>
        <Combobox aria-label="شهر" options={CITIES} defaultValue="tehran" />
        <button type="button">بعدی</button>
      </>,
    );
    const input = screen.getByRole("combobox");

    await userEvent.type(input, "ش");
    await userEvent.tab();

    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveValue("تهران");
  });

  it("lists grouped options under their category and hides empty groups", async () => {
    render(<Combobox aria-label="دوره" options={COURSES} />);
    const input = screen.getByRole("combobox");

    await userEvent.click(input);

    const groups = screen.getAllByRole("group");
    expect(groups.map((group) => group.getAttribute("aria-labelledby"))).toHaveLength(2);
    expect(screen.getByRole("group", { name: "طراحی" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "برنامه‌نویسی" })).toBeInTheDocument();

    await userEvent.type(input, "برنامه نویسی");

    expect(screen.getAllByRole("group")).toHaveLength(1);
    expect(optionNames()).toEqual(["برنامه‌نویسی وب"]);
  });

  it("navigates across groups in one order", async () => {
    render(<Combobox aria-label="دوره" options={COURSES} />);
    const input = screen.getByRole("combobox");
    input.focus();

    await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{Enter}");

    expect(input).toHaveValue("برنامه‌نویسی وب");
  });

  it("keeps the value the parent sets when controlled", async () => {
    function Controlled() {
      const [city, setCity] = useState("tehran");
      return (
        <>
          <Combobox aria-label="شهر" options={CITIES} value={city} onValueChange={setCity} />
          <output>{city}</output>
        </>
      );
    }
    render(<Controlled />);

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "شیراز" }));

    expect(screen.getByRole("status")).toHaveTextContent("shiraz");
    expect(screen.getByRole("combobox")).toHaveValue("شیراز");
  });

  it("does not change when controlled without a handler", async () => {
    render(<Combobox aria-label="شهر" options={CITIES} value="tehran" />);

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "شیراز" }));

    expect(screen.getByRole("combobox")).toHaveValue("تهران");
  });

  it("submits the selected value with a form", async () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return new FormData(event.currentTarget).get("city");
    });
    render(
      <form onSubmit={onSubmit}>
        <Combobox aria-label="شهر" name="city" options={CITIES} />
        <button type="submit">ثبت</button>
      </form>,
    );

    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "کرج" }));
    await userEvent.click(screen.getByRole("button", { name: "ثبت" }));

    expect(onSubmit).toHaveReturnedWith("karaj");
  });

  it("does not submit the form when Enter picks an option", async () => {
    const onSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => event.preventDefault());
    render(
      <form onSubmit={onSubmit}>
        <Combobox aria-label="شهر" options={CITIES} />
        <button type="submit">ثبت</button>
      </form>,
    );
    const input = screen.getByRole("combobox");
    input.focus();

    await userEvent.keyboard("{ArrowDown}{Enter}");

    expect(input).toHaveValue("تهران");
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("does not open while disabled", async () => {
    render(<Combobox aria-label="شهر" options={CITIES} disabled />);
    const input = screen.getByRole("combobox");

    await userEvent.click(input);

    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("is labelled through Field and names its listbox from the label", async () => {
    render(
      <Field required invalid>
        <FieldLabel>شهر</FieldLabel>
        <FieldControl>
          <Combobox options={CITIES} />
        </FieldControl>
      </Field>,
    );
    const input = screen.getByRole("combobox", { name: "شهر" });

    await userEvent.click(input);

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(screen.getByRole("listbox")).toHaveAccessibleName("شهر");
  });

  it("forwards refs and composes event handlers", async () => {
    const ref = createRef<HTMLInputElement>();
    const onKeyDown = vi.fn();
    render(<Combobox ref={ref} aria-label="شهر" options={CITIES} onKeyDown={onKeyDown} />);

    ref.current?.focus();
    await userEvent.keyboard("{ArrowDown}");

    expect(ref.current).toHaveAttribute("data-slot", "combobox-input");
    expect(onKeyDown).toHaveBeenCalled();
    expect(ref.current).toHaveAttribute("aria-expanded", "true");
  });

  it("renders on the server", () => {
    const html = renderToString(
      <Combobox aria-label="شهر" options={CITIES} defaultValue="shiraz" />,
    );

    expect(html).toContain('data-slot="combobox-input"');
    expect(html).toContain("شیراز");
  });

  it("has no accessibility violations when closed", async () => {
    const { container } = render(<Combobox aria-label="شهر" options={CITIES} />);

    await expectNoAxeViolations(container);
  });

  it("has no accessibility violations when open with groups", async () => {
    render(<Combobox aria-label="دوره" options={COURSES} defaultValue="motion" />);

    await userEvent.click(screen.getByRole("combobox"));

    await expectNoAxeViolations(document.body);
  });
});
