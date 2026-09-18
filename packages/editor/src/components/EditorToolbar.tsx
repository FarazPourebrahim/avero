"use client";

import { cn, useAvero, type AveroDictionary } from "@averoui/react";
import { useEditorState, type Editor } from "@tiptap/react";
import { Toolbar as ToolbarPrimitive } from "radix-ui";
import { forwardRef, Fragment, type ComponentPropsWithoutRef, type ReactNode } from "react";
import {
  BoldIcon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  Redo2Icon,
  SquareCodeIcon,
  StrikethroughIcon,
  TextQuoteIcon,
  UnderlineIcon,
  Undo2Icon,
} from "../icons/toolbarIcons.js";

type ToolbarState = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strike: boolean;
  heading: boolean;
  subheading: boolean;
  bulletList: boolean;
  orderedList: boolean;
  blockquote: boolean;
  codeBlock: boolean;
  canUndo: boolean;
  canRedo: boolean;
  editable: boolean;
};

const INACTIVE: ToolbarState = {
  bold: false,
  italic: false,
  underline: false,
  strike: false,
  heading: false,
  subheading: false,
  bulletList: false,
  orderedList: false,
  blockquote: false,
  codeBlock: false,
  canUndo: false,
  canRedo: false,
  editable: false,
};

function readState(editor: Editor | null): ToolbarState {
  if (!editor) return INACTIVE;
  return {
    bold: editor.isActive("bold"),
    italic: editor.isActive("italic"),
    underline: editor.isActive("underline"),
    strike: editor.isActive("strike"),
    heading: editor.isActive("heading", { level: 2 }),
    subheading: editor.isActive("heading", { level: 3 }),
    bulletList: editor.isActive("bulletList"),
    orderedList: editor.isActive("orderedList"),
    blockquote: editor.isActive("blockquote"),
    codeBlock: editor.isActive("codeBlock"),
    canUndo: editor.can().undo(),
    canRedo: editor.can().redo(),
    editable: editor.isEditable,
  };
}

type ToolbarAction = {
  label: keyof AveroDictionary;
  icon: ReactNode;
  run: (editor: Editor) => boolean;
  /** State that marks a toggle as pressed. */
  pressedWhen?: keyof ToolbarState;
  /** State that must be true for the action to be available. */
  enabledWhen?: keyof ToolbarState;
};

// Glyphs that point along the reading direction (lists, quote, history arrows) mirror in RTL;
// letters and digits don't.
const mirrored = "rtl:-scale-x-100";

const GROUPS: ToolbarAction[][] = [
  [
    {
      label: "editorBold",
      icon: <BoldIcon />,
      pressedWhen: "bold",
      run: (editor) => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "editorItalic",
      icon: <ItalicIcon />,
      pressedWhen: "italic",
      run: (editor) => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "editorUnderline",
      icon: <UnderlineIcon />,
      pressedWhen: "underline",
      run: (editor) => editor.chain().focus().toggleUnderline().run(),
    },
    {
      label: "editorStrike",
      icon: <StrikethroughIcon />,
      pressedWhen: "strike",
      run: (editor) => editor.chain().focus().toggleStrike().run(),
    },
  ],
  [
    {
      label: "editorHeading",
      icon: <Heading2Icon />,
      pressedWhen: "heading",
      run: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "editorSubheading",
      icon: <Heading3Icon />,
      pressedWhen: "subheading",
      run: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      label: "editorBlockquote",
      icon: <TextQuoteIcon className={mirrored} />,
      pressedWhen: "blockquote",
      run: (editor) => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      label: "editorCodeBlock",
      icon: <SquareCodeIcon />,
      pressedWhen: "codeBlock",
      run: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    },
  ],
  [
    {
      label: "editorBulletList",
      icon: <ListIcon className={mirrored} />,
      pressedWhen: "bulletList",
      run: (editor) => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: "editorOrderedList",
      icon: <ListOrderedIcon />,
      pressedWhen: "orderedList",
      run: (editor) => editor.chain().focus().toggleOrderedList().run(),
    },
  ],
  [
    {
      label: "editorUndo",
      icon: <Undo2Icon className={mirrored} />,
      enabledWhen: "canUndo",
      run: (editor) => editor.chain().focus().undo().run(),
    },
    {
      label: "editorRedo",
      icon: <Redo2Icon className={mirrored} />,
      enabledWhen: "canRedo",
      run: (editor) => editor.chain().focus().redo().run(),
    },
  ],
];

/** Props specific to `EditorToolbar`. It also accepts every Radix toolbar root prop. */
export type EditorToolbarOwnProps = {
  /** The editor to control, from `RichTextEditor`'s `onReady`. `null` disables every button. */
  editor: Editor | null;
  /** Accessible name of the toolbar. @defaultValue the dictionary's `editorToolbar` */
  label?: string;
};

export type EditorToolbarProps = Omit<
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>,
  keyof EditorToolbarOwnProps | "children"
> &
  EditorToolbarOwnProps;

/**
 * Formatting buttons for a `RichTextEditor`: text styles, headings, quote and code blocks, lists,
 * undo and redo. It follows the WAI-ARIA toolbar pattern, with one tab stop and arrow keys that
 * follow the reading direction. Toggles report their state with `aria-pressed`.
 */
export const EditorToolbar = forwardRef<HTMLDivElement, EditorToolbarProps>(function EditorToolbar(
  { editor, label, className, ...props },
  ref,
) {
  const { dir, dictionary } = useAvero();
  // The hook re-renders the toolbar when a transaction changes the state. Its snapshot is only
  // refreshed by the next transaction after `editor` arrives, so the state itself is read from the
  // editor during render; otherwise the buttons stay disabled until the first keystroke.
  useEditorState({ editor, selector: ({ editor: instance }) => readState(instance) });
  const state = readState(editor);

  return (
    <ToolbarPrimitive.Root
      ref={ref}
      dir={dir}
      aria-label={label ?? dictionary.editorToolbar}
      data-slot="editor-toolbar"
      className={cn("flex flex-wrap items-center gap-1 border-b border-gray-100 p-2", className)}
      {...props}
    >
      {GROUPS.map((group, index) => (
        <Fragment key={group[0]!.label}>
          {index > 0 ? (
            <ToolbarPrimitive.Separator
              data-slot="editor-toolbar-separator"
              className="mx-1 h-5 w-px bg-gray-200"
            />
          ) : null}
          {group.map((action) => {
            const available =
              editor !== null &&
              state.editable &&
              (action.enabledWhen === undefined || state[action.enabledWhen]);
            return (
              <ToolbarPrimitive.Button
                key={action.label}
                type="button"
                aria-label={dictionary[action.label]}
                aria-pressed={
                  action.pressedWhen === undefined ? undefined : state[action.pressedWhen]
                }
                disabled={!available}
                data-slot="editor-toolbar-button"
                onClick={() => {
                  if (editor) action.run(editor);
                }}
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 aria-pressed:bg-indigo-50 aria-pressed:text-indigo-700 [&>svg]:size-4"
              >
                {action.icon}
              </ToolbarPrimitive.Button>
            );
          })}
        </Fragment>
      ))}
    </ToolbarPrimitive.Root>
  );
});

EditorToolbar.displayName = "EditorToolbar";
