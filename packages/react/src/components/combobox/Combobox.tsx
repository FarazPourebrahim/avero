"use client";

import { Popover } from "radix-ui";
import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { ChevronDownIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";
import { mergeRefs } from "../../utils/refs.js";
import { normalizeSearchText } from "../../utils/search.js";

export type ComboboxOption = {
  /** Submitted and reported value. Must be unique across the whole list. */
  value: string;
  /** Visible text, also matched against what is typed. */
  label: string;
  /** Extra words that should find this option, such as synonyms or an English name. */
  keywords?: readonly string[];
  disabled?: boolean;
};

/** Options listed under a category heading. */
export type ComboboxGroup = {
  label: string;
  options: readonly ComboboxOption[];
};

export type ComboboxItem = ComboboxOption | ComboboxGroup;

function isGroup(item: ComboboxItem): item is ComboboxGroup {
  return "options" in item;
}

function defaultFilter(option: ComboboxOption, query: string): boolean {
  const needle = normalizeSearchText(query);
  if (!needle) return true;
  return [option.label, ...(option.keywords ?? [])].some((text) =>
    normalizeSearchText(text).includes(needle),
  );
}

type Section = {
  key: string;
  label?: string;
  entries: { option: ComboboxOption; index: number }[];
};

// Groups with no matching option are dropped, and every visible option gets its position in the
// flat keyboard order.
function filterItems(
  items: readonly ComboboxItem[],
  query: string,
  filter: (option: ComboboxOption, query: string) => boolean,
): { sections: Section[]; visible: ComboboxOption[] } {
  const sections: Section[] = [];
  const visible: ComboboxOption[] = [];

  const take = (options: readonly ComboboxOption[]) =>
    options
      .filter((option) => filter(option, query))
      .map((option) => {
        visible.push(option);
        return { option, index: visible.length - 1 };
      });

  items.forEach((item, position) => {
    if (isGroup(item)) {
      const entries = take(item.options);
      if (entries.length > 0)
        sections.push({ key: `group-${position}`, label: item.label, entries });
      return;
    }
    const entries = take([item]);
    const previous = sections[sections.length - 1];
    if (previous && previous.label === undefined) previous.entries.push(...entries);
    else if (entries.length > 0) sections.push({ key: `options-${position}`, entries });
  });

  return { sections, visible };
}

function nextEnabledIndex(options: readonly ComboboxOption[], from: number, step: 1 | -1): number {
  for (let index = from + step; index >= 0 && index < options.length; index += step) {
    if (!options[index]?.disabled) return index;
  }
  return from;
}

function scrollIntoViewNearest(node: HTMLElement | null) {
  node?.scrollIntoView({ block: "nearest" });
}

/** Props specific to `Combobox`. It also accepts every native `<input>` attribute. */
export type ComboboxOwnProps = {
  /** Options, or groups of options under a category heading. */
  options: readonly ComboboxItem[];
  /** Selected value (controlled). An empty string means nothing is selected. */
  value?: string;
  /** Initially selected value (uncontrolled). @defaultValue "" */
  defaultValue?: string;
  /** Called with the value of the option the user picks. */
  onValueChange?: (value: string) => void;
  /** Decides whether an option matches the typed text. @defaultValue label and keywords contain the text, after `normalizeSearchText` */
  filter?: (option: ComboboxOption, query: string) => boolean;
  /** Shown when nothing matches. @defaultValue the dictionary's `comboboxEmpty` */
  emptyMessage?: ReactNode;
  /** Classes for the wrapper around the input and chevron. */
  containerClassName?: string;
  /** Classes for the floating list. */
  contentClassName?: string;
};

export type ComboboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof ComboboxOwnProps | "type" | "role" | "children" | "list"
> &
  ComboboxOwnProps;

/**
 * A searchable single select. Typing filters the options, the arrow keys move through them, and
 * Enter picks one. The input keeps focus the whole time, following the WAI-ARIA combobox pattern.
 */
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  {
    options,
    value,
    defaultValue,
    onValueChange,
    filter = defaultFilter,
    emptyMessage,
    containerClassName,
    contentClassName,
    className,
    name,
    disabled,
    onChange,
    onKeyDown,
    onBlur,
    onClick,
    ...props
  },
  ref,
) {
  const { dictionary } = useAvero();
  const id = useId();
  const listboxId = `${id}-listbox`;
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  const [selectedValue, setSelectedValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? "",
    onChange: onValueChange,
  });
  const [open, setOpen] = useState(false);
  // `null` while the user is not typing, so the input shows the selected option's label.
  const [query, setQuery] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [labelText, setLabelText] = useState<string>();

  const { sections, visible } = useMemo(
    () => filterItems(options, query ?? "", filter),
    [options, query, filter],
  );
  const selectedOption = useMemo(
    () =>
      options
        .flatMap((item) => (isGroup(item) ? item.options : [item]))
        .find((option) => option.value === selectedValue),
    [options, selectedValue],
  );

  const ariaLabel = props["aria-label"];
  const ariaLabelledBy = props["aria-labelledby"];
  const expanded = open && !disabled;
  const hasList = expanded && visible.length > 0;
  const optionId = (index: number) => `${id}-option-${index}`;

  // The listbox needs its own name. Without an explicit one, it borrows the text of the input's
  // `<label>`, minus decorations such as Field's required asterisk.
  useEffect(() => {
    if (!expanded || ariaLabel || ariaLabelledBy) return;
    const label = inputRef.current?.labels?.[0];
    if (!label) return;
    const copy = label.cloneNode(true) as HTMLElement;
    copy.querySelectorAll("[aria-hidden='true']").forEach((node) => node.remove());
    setLabelText((copy.textContent ?? "").trim() || undefined);
  }, [expanded, ariaLabel, ariaLabelledBy]);

  function openList(options: readonly ComboboxOption[] = visible) {
    if (disabled) return;
    const selectedIndex = options.findIndex(
      (option) => option.value === selectedValue && !option.disabled,
    );
    setOpen(true);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : nextEnabledIndex(options, -1, 1));
  }

  function close() {
    setOpen(false);
    setQuery(null);
    setActiveIndex(-1);
  }

  function select(option: ComboboxOption | undefined) {
    if (!option || option.disabled) return;
    setSelectedValue(option.value);
    close();
  }

  return (
    <Popover.Root open={expanded} onOpenChange={(next) => (next ? openList() : close())}>
      <Popover.Anchor asChild>
        <div
          ref={anchorRef}
          data-slot="combobox"
          data-state={expanded ? "open" : "closed"}
          data-disabled={disabled ? "" : undefined}
          className={cn("group relative w-full", containerClassName)}
        >
          <input
            ref={mergeRefs(ref, inputRef)}
            type="text"
            role="combobox"
            autoComplete="off"
            spellCheck={false}
            aria-autocomplete="list"
            aria-expanded={expanded}
            aria-controls={hasList ? listboxId : undefined}
            aria-activedescendant={hasList && activeIndex >= 0 ? optionId(activeIndex) : undefined}
            data-slot="combobox-input"
            value={query ?? selectedOption?.label ?? ""}
            disabled={disabled}
            className={cn(
              "w-full rounded-xl border border-gray-300 bg-white py-2.5 ps-3.5 pe-10 text-sm font-medium text-gray-900 transition placeholder:font-normal placeholder:text-gray-500",
              "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-60",
              "aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/20",
              className,
            )}
            onChange={(event) => {
              onChange?.(event);
              const text = event.target.value;
              setQuery(text);
              setOpen(true);
              const next = filterItems(options, text, filter).visible;
              setActiveIndex(nextEnabledIndex(next, -1, 1));
            }}
            onKeyDown={(event) => {
              onKeyDown?.(event);
              if (event.defaultPrevented) return;

              switch (event.key) {
                case "ArrowDown":
                case "ArrowUp": {
                  event.preventDefault();
                  if (!expanded) {
                    openList();
                    return;
                  }
                  const step = event.key === "ArrowDown" ? 1 : -1;
                  setActiveIndex((current) => nextEnabledIndex(visible, current, step));
                  return;
                }
                case "Enter":
                  if (hasList && activeIndex >= 0) {
                    event.preventDefault();
                    select(visible[activeIndex]);
                  }
                  return;
                case "Escape":
                  // An open list is closed by Radix; a closed one only drops the typed text.
                  if (!expanded && query !== null) setQuery(null);
                  return;
              }
            }}
            onBlur={(event) => {
              onBlur?.(event);
              close();
            }}
            onClick={(event) => {
              onClick?.(event);
              if (!expanded) openList();
            }}
            {...props}
          />
          <ChevronDownIcon className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          {name ? (
            <input type="hidden" name={name} value={selectedValue} disabled={disabled} />
          ) : null}
        </div>
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          // Radix marks the popup as a dialog, but it only wraps the listbox the input controls.
          role={undefined}
          align="start"
          sideOffset={6}
          data-slot="combobox-content"
          className={cn(
            "shadow-card-raised scrollbar-fancy z-(--z-popover) max-h-72 w-(--radix-popover-trigger-width) overflow-y-auto rounded-xl border border-gray-200 bg-white p-1.5",
            contentClassName,
          )}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => {
            // Pressing the input itself must not close the list it controls.
            if (anchorRef.current?.contains(event.target as Node)) event.preventDefault();
          }}
          // Keeps focus in the input while an option or the scrollbar is pressed.
          onMouseDown={(event) => event.preventDefault()}
        >
          {hasList ? (
            <div
              id={listboxId}
              role="listbox"
              aria-label={ariaLabelledBy ? undefined : (ariaLabel ?? labelText)}
              aria-labelledby={ariaLabelledBy}
              data-slot="combobox-listbox"
            >
              {sections.map((section) => {
                const renderedOptions = section.entries.map(({ option, index }) => {
                  const selected = option.value === selectedValue;
                  const highlighted = index === activeIndex;
                  return (
                    <div
                      key={option.value}
                      ref={highlighted ? scrollIntoViewNearest : undefined}
                      id={optionId(index)}
                      role="option"
                      aria-selected={selected}
                      aria-disabled={option.disabled || undefined}
                      data-slot="combobox-option"
                      data-state={selected ? "checked" : "unchecked"}
                      data-highlighted={highlighted ? "" : undefined}
                      data-disabled={option.disabled ? "" : undefined}
                      className={cn(
                        "cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 select-none",
                        "data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-700",
                        "data-[state=checked]:font-medium data-[state=checked]:text-blue-600",
                        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
                      )}
                      onMouseMove={() => {
                        if (!option.disabled && !highlighted) setActiveIndex(index);
                      }}
                      onClick={() => select(option)}
                    >
                      {option.label}
                    </div>
                  );
                });

                if (section.label === undefined) {
                  return <div key={section.key}>{renderedOptions}</div>;
                }

                const labelId = `${id}-${section.key}-label`;
                return (
                  <div
                    key={section.key}
                    role="group"
                    aria-labelledby={labelId}
                    data-slot="combobox-group"
                  >
                    <div
                      id={labelId}
                      data-slot="combobox-group-label"
                      className="px-3 py-1.5 text-xs font-bold text-gray-500"
                    >
                      {section.label}
                    </div>
                    {renderedOptions}
                  </div>
                );
              })}
            </div>
          ) : (
            <p data-slot="combobox-empty" className="px-3 py-2 text-sm text-gray-500">
              {emptyMessage ?? dictionary.comboboxEmpty}
            </p>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
});

Combobox.displayName = "Combobox";
