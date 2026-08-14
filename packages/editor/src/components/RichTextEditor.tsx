"use client";

import { cn, useAvero } from "@avero/react";
import { Image } from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import { Placeholder } from "@tiptap/extensions";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { forwardRef, useEffect, useRef, type HTMLAttributes } from "react";

/** Props specific to `RichTextEditor`. It also accepts every native `<div>` attribute. */
export type RichTextEditorOwnProps = {
  /** Initial HTML. The editor is uncontrolled, so later changes to this prop are ignored. */
  defaultValue?: string;
  /** Shown while the document is empty. @defaultValue the `editorPlaceholder` dictionary string */
  placeholder?: string;
  /** Accessible name of the editing surface. @defaultValue the `editorLabel` dictionary string */
  label?: string;
  /** Turns editing off while keeping the content visible. @defaultValue true */
  editable?: boolean;
  /** Called with the document's HTML on every change. */
  onChange?: (html: string) => void;
  /** Called once the editor exists, for toolbars and imperative commands. */
  onReady?: (editor: Editor) => void;
};

export type RichTextEditorProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof RichTextEditorOwnProps | "children"
> &
  RichTextEditorOwnProps;

/**
 * Avero's Tiptap editing surface. The prose styles live in
 * `@avero/tokens/rich-content.css` under `.avero-editor-content`, which this component's root
 * carries, so the editor and the rendered article share one stylesheet.
 *
 * Output is plain HTML and is meant to be rendered back through `RichContent`, which sanitizes it.
 */
export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  function RichTextEditor(
    {
      defaultValue = "",
      placeholder,
      label,
      editable = true,
      onChange,
      onReady,
      className,
      ...props
    },
    ref,
  ) {
    const { dictionary, dir } = useAvero();

    // Callbacks are read through refs so the editor is created once: Tiptap captures its handlers
    // at creation, and recreating it on every render would lose the document.
    const onChangeRef = useRef(onChange);
    const onReadyRef = useRef(onReady);
    useEffect(() => {
      onChangeRef.current = onChange;
      onReadyRef.current = onReady;
    });

    const editor = useEditor({
      // Tiptap needs a DOM, which does not exist while a server renders this module first.
      immediatelyRender: false,
      editable,
      content: defaultValue,
      extensions: [
        StarterKit,
        TableKit,
        Image,
        Placeholder.configure({ placeholder: placeholder ?? dictionary.editorPlaceholder }),
      ],
      editorProps: {
        attributes: {
          role: "textbox",
          "aria-multiline": "true",
          "aria-label": label ?? dictionary.editorLabel,
          dir,
        },
      },
      onUpdate: ({ editor: instance }) => onChangeRef.current?.(instance.getHTML()),
    });

    useEffect(() => {
      if (editor) editor.setEditable(editable);
    }, [editor, editable]);

    useEffect(() => {
      if (editor) onReadyRef.current?.(editor);
    }, [editor]);

    return (
      <div
        ref={ref}
        data-slot="rich-text-editor"
        data-editable={editable ? "true" : "false"}
        className={cn("avero-editor-content", className)}
        {...props}
      >
        <EditorContent editor={editor} />
      </div>
    );
  },
);

RichTextEditor.displayName = "RichTextEditor";
