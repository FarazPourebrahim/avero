"use client";

import { forwardRef, useRef, useState, type InputHTMLAttributes } from "react";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { formatMessage } from "../../i18n/dictionaries.js";
import { XIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";
import { mergeRefs } from "../../utils/refs.js";
import { normalizeSearchText } from "../../utils/search.js";
import { chipVariants } from "../chip/chip.variants.js";
import { IconButton } from "../icon-button/IconButton.js";

// Comma, Persian comma and newline (from pasted lists) all end a tag.
const SEPARATORS = /[,،\n]/;
const NO_TAGS: string[] = [];

function cleanTag(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

// Tags that differ only in Arabic/Persian letters, joiners or case count as duplicates.
function appendTags(
  current: string[],
  incoming: readonly string[],
  maxTags: number | undefined,
): string[] {
  const seen = new Set(current.map(normalizeSearchText));
  const next = [...current];
  for (const raw of incoming) {
    const tag = cleanTag(raw);
    const key = normalizeSearchText(tag);
    if (!tag || seen.has(key)) continue;
    if (maxTags !== undefined && next.length >= maxTags) break;
    seen.add(key);
    next.push(tag);
  }
  return next.length === current.length ? current : next;
}

/** Props specific to `TagInput`. It also accepts every native `<input>` attribute. */
export type TagInputOwnProps = {
  /** Tags (controlled). */
  value?: string[];
  /** Initial tags (uncontrolled). @defaultValue [] */
  defaultValue?: string[];
  /** Called with the full list after a tag is added or removed. */
  onValueChange?: (tags: string[]) => void;
  /** Most tags allowed. Once reached, typed text stays in the field instead of becoming a tag. */
  maxTags?: number;
};

export type TagInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof TagInputOwnProps | "type"
> &
  TagInputOwnProps;

/**
 * A text field that turns entries into removable tags. Enter, a comma or a Persian comma adds the
 * typed text; pasting a comma-separated list adds each item; Backspace in an empty field removes
 * the last tag. `className` styles the bordered box, and native props go to the text input.
 */
export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(function TagInput(
  {
    value,
    defaultValue,
    onValueChange,
    maxTags,
    className,
    name,
    disabled,
    placeholder,
    onChange,
    onKeyDown,
    onBlur,
    ...props
  },
  ref,
) {
  const { dictionary } = useAvero();
  const inputRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useControllableState({
    value,
    defaultValue: defaultValue ?? NO_TAGS,
    onChange: onValueChange,
  });
  const [draft, setDraft] = useState("");

  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true";
  const full = maxTags !== undefined && tags.length >= maxTags;

  function commit(incoming: readonly string[]) {
    const next = appendTags(tags, incoming, maxTags);
    if (next !== tags) setTags(next);
  }

  function commitDraft() {
    if (!cleanTag(draft)) return false;
    commit([draft]);
    // A full list keeps the text, so nothing typed is lost.
    if (!full) setDraft("");
    return true;
  }

  function removeTag(index: number) {
    setTags(tags.filter((_, position) => position !== index));
    // The remove button disappears with its tag, so focus returns to the input.
    inputRef.current?.focus();
  }

  return (
    <div
      data-slot="tag-input"
      data-invalid={invalid ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      data-full={full ? "" : undefined}
      className={cn(
        "flex w-full cursor-text flex-wrap items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-2 py-1.5 transition",
        "focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20",
        invalid && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
      onMouseDown={(event) => {
        // Pressing the empty part of the box focuses the input, like clicking a normal field.
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        inputRef.current?.focus();
      }}
    >
      {tags.length > 0 ? (
        <ul data-slot="tag-input-list" className="flex max-w-full flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <li
              key={`${tag}-${index}`}
              data-slot="tag-input-tag"
              className={cn(chipVariants({ variant: "skill" }), "max-w-full gap-1 py-1 pe-1")}
            >
              <span className="truncate">{tag}</span>
              <IconButton
                variant="ghost"
                size="sm"
                label={formatMessage(dictionary.tagInputRemove, { tag })}
                disabled={disabled}
                className="rounded-full p-0.5 text-blue-600 hover:bg-blue-100 hover:text-blue-800"
                onClick={() => removeTag(index)}
              >
                <XIcon className="size-3.5" />
              </IconButton>
            </li>
          ))}
        </ul>
      ) : null}
      <input
        ref={mergeRefs(ref, inputRef)}
        type="text"
        data-slot="tag-input-control"
        value={draft}
        disabled={disabled}
        placeholder={tags.length === 0 ? placeholder : undefined}
        className="min-w-24 flex-1 bg-transparent px-1.5 py-1 text-sm text-gray-900 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed"
        onChange={(event) => {
          onChange?.(event);
          const parts = event.target.value.split(SEPARATORS);
          const rest = parts.pop() ?? "";
          if (parts.length > 0) commit(parts);
          setDraft(rest);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) return;
          if (event.key === "Enter") {
            // With nothing typed, Enter keeps its normal job of submitting the form.
            if (commitDraft()) event.preventDefault();
            return;
          }
          if (event.key === "Backspace" && draft === "" && tags.length > 0) {
            event.preventDefault();
            removeTag(tags.length - 1);
          }
        }}
        onBlur={(event) => {
          onBlur?.(event);
          commitDraft();
        }}
        {...props}
      />
      {name
        ? tags.map((tag, index) => (
            <input
              key={`${tag}-${index}`}
              type="hidden"
              name={name}
              value={tag}
              disabled={disabled}
            />
          ))
        : null}
    </div>
  );
});

TagInput.displayName = "TagInput";
