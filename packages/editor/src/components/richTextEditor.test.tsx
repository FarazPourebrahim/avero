import { sanitizeHtml } from "@avero/react";
import { render, screen, waitFor } from "@testing-library/react";
import type { Editor } from "@tiptap/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../test/axe.js";
import { RichTextEditor } from "./RichTextEditor.js";

// Every tag here is in `richContentAllowList`, so sanitizing must not drop any of it.
const CONTENT = [
  "<h2>عنوان بخش</h2>",
  '<p><strong>پررنگ</strong> و <em>کج</em> و <a href="https://example.com">پیوند</a></p>',
  "<ul><li>مورد اول</li></ul>",
  "<blockquote><p>نقل قول</p></blockquote>",
  "<pre><code>const a = 1;</code></pre>",
].join("");

/** Mounts the editor and resolves once Tiptap has created its instance. */
async function mountEditor(ui: React.ReactElement, onReady: { current: Editor | null }) {
  const result = render(ui);
  await waitFor(() => expect(onReady.current).not.toBeNull());
  return result;
}

describe("RichTextEditor", () => {
  it("renders an editing surface named by the dictionary", async () => {
    const instance: { current: Editor | null } = { current: null };
    await mountEditor(
      <RichTextEditor
        onReady={(editor) => {
          instance.current = editor;
        }}
      />,
      instance,
    );

    expect(screen.getByRole("textbox", { name: "ویرایشگر متن" })).toBeInTheDocument();
  });

  it("carries the stylesheet's class contract", async () => {
    const instance: { current: Editor | null } = { current: null };
    const { container } = await mountEditor(
      <RichTextEditor
        onReady={(editor) => {
          instance.current = editor;
        }}
      />,
      instance,
    );

    // `.avero-editor-content .tiptap` is what rich-content.css styles.
    expect(container.firstElementChild).toHaveClass("avero-editor-content");
    expect(container.querySelector(".tiptap")).toBeInTheDocument();
  });

  it("round-trips its output through RichContent sanitization without losing formatting", async () => {
    const instance: { current: Editor | null } = { current: null };
    await mountEditor(
      <RichTextEditor
        defaultValue={CONTENT}
        onReady={(editor) => {
          instance.current = editor;
        }}
      />,
      instance,
    );

    const sanitized = sanitizeHtml(instance.current!.getHTML());

    for (const tag of [
      "<h2>",
      "<strong>",
      "<em>",
      "<a ",
      "<ul>",
      "<li>",
      "<blockquote>",
      "<pre>",
    ]) {
      expect(sanitized).toContain(tag);
    }
    expect(sanitized).toContain("عنوان بخش");
    expect(sanitized).toContain("https://example.com");
  });

  it("reports changes as HTML", async () => {
    const instance: { current: Editor | null } = { current: null };
    const onChange = vi.fn();
    await mountEditor(
      <RichTextEditor
        onChange={onChange}
        onReady={(editor) => {
          instance.current = editor;
        }}
      />,
      instance,
    );

    instance.current!.commands.setContent("<p>سلام</p>", { emitUpdate: true });

    await waitFor(() => expect(onChange).toHaveBeenCalled());
    expect(onChange.mock.lastCall?.[0]).toContain("سلام");
  });

  it("can be made read-only", async () => {
    const instance: { current: Editor | null } = { current: null };
    const { container } = await mountEditor(
      <RichTextEditor
        editable={false}
        defaultValue="<p>متن</p>"
        onReady={(editor) => {
          instance.current = editor;
        }}
      />,
      instance,
    );

    expect(container.firstElementChild).toHaveAttribute("data-editable", "false");
    expect(instance.current!.isEditable).toBe(false);
  });

  it("forwards refs", async () => {
    const ref = createRef<HTMLDivElement>();
    const instance: { current: Editor | null } = { current: null };
    await mountEditor(
      <RichTextEditor
        ref={ref}
        onReady={(editor) => {
          instance.current = editor;
        }}
      />,
      instance,
    );

    expect(ref.current).toHaveAttribute("data-slot", "rich-text-editor");
  });

  it("renders on the server", () => {
    // Tiptap only mounts in the browser, so the server render is the empty surface.
    expect(renderToString(<RichTextEditor defaultValue="<p>متن</p>" />)).toContain(
      "avero-editor-content",
    );
  });

  it("has no accessibility violations", async () => {
    const instance: { current: Editor | null } = { current: null };
    const { container } = await mountEditor(
      <RichTextEditor
        defaultValue={CONTENT}
        onReady={(editor) => {
          instance.current = editor;
        }}
      />,
      instance,
    );

    await expectNoAxeViolations(container);
  });
});
