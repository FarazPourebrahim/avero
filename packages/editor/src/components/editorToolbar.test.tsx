import { AveroProvider } from "@avero/react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { Editor } from "@tiptap/react";
import { createRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../test/axe.js";
import { EditorToolbar } from "./EditorToolbar.js";
import { RichTextEditor } from "./RichTextEditor.js";

const instance: { current: Editor | null } = { current: null };

function WithEditor({ editable = true }: { editable?: boolean }) {
  const [editor, setEditor] = useState<Editor | null>(null);
  return (
    <>
      <EditorToolbar editor={editor} />
      <RichTextEditor
        defaultValue="<p>سلام دنیا</p>"
        editable={editable}
        onReady={(ready) => {
          instance.current = ready;
          setEditor(ready);
        }}
      />
    </>
  );
}

async function mount(ui: React.ReactElement) {
  instance.current = null;
  const result = render(ui);
  await waitFor(() => expect(instance.current).not.toBeNull());
  return result;
}

// A text selection inside the paragraph: block toggles such as headings report themselves active
// for a cursor in the block, which a whole-document selection is not.
function selectWord() {
  act(() => {
    instance.current!.commands.setTextSelection({ from: 2, to: 5 });
  });
}

describe("EditorToolbar", () => {
  it("renders a named toolbar of labelled buttons in groups", async () => {
    await mount(<WithEditor />);

    const toolbar = screen.getByRole("toolbar", { name: "نوار ابزار ویرایشگر" });
    expect(toolbar).toHaveAttribute("dir", "rtl");
    expect(
      screen.getAllByRole("button").map((button) => button.getAttribute("aria-label")),
    ).toEqual([
      "پررنگ",
      "کج",
      "زیرخط",
      "خط‌خورده",
      "عنوان بخش",
      "زیرعنوان",
      "نقل قول",
      "بلوک کد",
      "فهرست نقطه‌ای",
      "فهرست شماره‌دار",
      "واگرد",
      "ازنو",
    ]);
    expect(toolbar.querySelectorAll('[data-slot="editor-toolbar-separator"]')).toHaveLength(3);
  });

  it.each([
    ["پررنگ", "<strong>"],
    ["کج", "<em>"],
    ["زیرخط", "<u>"],
    ["خط‌خورده", "<s>"],
    ["عنوان بخش", "<h2>"],
    ["زیرعنوان", "<h3>"],
    ["نقل قول", "<blockquote>"],
    ["بلوک کد", "<pre>"],
    ["فهرست نقطه‌ای", "<ul>"],
    ["فهرست شماره‌دار", "<ol>"],
  ])("applies %s to the selection and shows it as pressed", async (name, tag) => {
    await mount(<WithEditor />);
    selectWord();
    const button = screen.getByRole("button", { name });

    expect(button).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(button);

    expect(instance.current!.getHTML()).toContain(tag);
    await waitFor(() => expect(button).toHaveAttribute("aria-pressed", "true"));
  });

  it("undoes and redoes, enabling each only when there is something to do", async () => {
    await mount(<WithEditor />);
    const undo = screen.getByRole("button", { name: "واگرد" });
    const redo = screen.getByRole("button", { name: "ازنو" });

    expect(undo).toBeDisabled();
    expect(redo).toBeDisabled();
    expect(undo).not.toHaveAttribute("aria-pressed");

    selectWord();
    await userEvent.click(screen.getByRole("button", { name: "پررنگ" }));
    await waitFor(() => expect(undo).toBeEnabled());

    await userEvent.click(undo);

    expect(instance.current!.getHTML()).not.toContain("<strong>");
    await waitFor(() => expect(redo).toBeEnabled());

    await userEvent.click(redo);

    expect(instance.current!.getHTML()).toContain("<strong>");
  });

  it("has one tab stop and moves along the reading direction with arrow keys", async () => {
    await mount(<WithEditor />);

    await userEvent.tab();
    expect(screen.getByRole("button", { name: "پررنگ" })).toHaveFocus();

    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("button", { name: "کج" })).toHaveFocus();

    await userEvent.keyboard("{End}");
    expect(screen.getByRole("button", { name: "فهرست شماره‌دار" })).toHaveFocus();
  });

  it("moves with ArrowRight left to right and uses the English dictionary", async () => {
    await mount(
      <AveroProvider locale="en-US">
        <WithEditor />
      </AveroProvider>,
    );

    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}");

    expect(screen.getByRole("button", { name: "Italic" })).toHaveFocus();
    expect(screen.getByRole("toolbar", { name: "Editor toolbar" })).toHaveAttribute("dir", "ltr");
  });

  it("disables every button without an editor or while the editor is read-only", async () => {
    const { unmount } = render(<EditorToolbar editor={null} />);

    for (const button of screen.getAllByRole("button")) expect(button).toBeDisabled();
    unmount();

    await mount(<WithEditor editable={false} />);

    for (const button of screen.getAllByRole("button")) expect(button).toBeDisabled();
  });

  it("merges classes, uses a custom label and forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<EditorToolbar ref={ref} editor={null} label="قالب‌بندی" className="p-0" />);

    expect(ref.current).toHaveAttribute("data-slot", "editor-toolbar");
    expect(ref.current).toHaveClass("p-0");
    expect(ref.current).not.toHaveClass("p-2");
    expect(screen.getByRole("toolbar", { name: "قالب‌بندی" })).toBe(ref.current);
  });

  it("renders on the server", () => {
    const html = renderToString(<EditorToolbar editor={null} />);

    expect(html).toContain('data-slot="editor-toolbar"');
    expect(html).toContain("پررنگ");
  });

  it("has no accessibility violations", async () => {
    const { container } = await mount(<WithEditor />);

    await expectNoAxeViolations(container);
  });
});
