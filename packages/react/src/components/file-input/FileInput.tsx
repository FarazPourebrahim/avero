"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { formatMessage } from "../../i18n/dictionaries.js";
import { FileIcon, UploadIcon, XIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";
import { formatFileSize, formatNumber } from "../../utils/format.js";
import { mergeRefs } from "../../utils/refs.js";
import { IconButton } from "../icon-button/IconButton.js";

export type FileRejectionReason = "type" | "size" | "count";

export type FileRejection = {
  file: File;
  /** `type`: not allowed by `accept`; `size`: over `maxSize`; `count`: over the file limit. */
  reason: FileRejectionReason;
};

const NO_FILES: File[] = [];

/** Checks a file against an `accept` list such as `image/*,.pdf`, the way the file picker does. */
function acceptsFile(file: File, accept: string | undefined): boolean {
  const tokens = (accept ?? "")
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);
  if (tokens.length === 0) return true;

  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return tokens.some((token) => {
    if (token.startsWith(".")) return name.endsWith(token);
    if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
    return type === token;
  });
}

type FileRules = {
  accept: string | undefined;
  maxSize: number | undefined;
  multiple: boolean;
  maxFiles: number | undefined;
};

// A single-file input replaces its file; a multiple one appends until the limit, and the files
// past the limit are rejected rather than silently dropped.
function mergeFiles(
  incoming: readonly File[],
  current: File[],
  { accept, maxSize, multiple, maxFiles }: FileRules,
): { files: File[]; rejections: FileRejection[] } {
  const rejections: FileRejection[] = [];
  const valid: File[] = [];
  for (const file of incoming) {
    if (!acceptsFile(file, accept)) rejections.push({ file, reason: "type" });
    else if (maxSize !== undefined && file.size > maxSize)
      rejections.push({ file, reason: "size" });
    else valid.push(file);
  }

  const base = multiple ? current : NO_FILES;
  const limit = multiple ? (maxFiles ?? Number.POSITIVE_INFINITY) : 1;
  const room = Math.max(limit - base.length, 0);
  for (const file of valid.slice(room)) rejections.push({ file, reason: "count" });

  const added = valid.slice(0, room);
  return { files: added.length > 0 ? [...base, ...added] : current, rejections };
}

/** Props specific to `FileInput`. It also accepts every native `<input>` attribute. */
export type FileInputOwnProps = {
  /** Chosen files (controlled). */
  value?: File[];
  /** Initially chosen files (uncontrolled). @defaultValue [] */
  defaultValue?: File[];
  /** Called with the full list of chosen files after each pick, drop or removal. */
  onValueChange?: (files: File[]) => void;
  /** Allows more than one file. New picks are added to the list instead of replacing it. @defaultValue false */
  multiple?: boolean;
  /** Most files a `multiple` input keeps. Extra files are rejected with reason `count`. */
  maxFiles?: number;
  /** Largest allowed file, in bytes. Larger files are rejected with reason `size`. */
  maxSize?: number;
  /** Called with the files that were not added, and why. */
  onReject?: (rejections: FileRejection[]) => void;
  /** Main line in the drop area. @defaultValue the dictionary's `fileInputTitle` */
  title?: ReactNode;
  /** Line under the title. @defaultValue the largest allowed size, when `maxSize` is set */
  hint?: ReactNode;
  /** Classes for the wrapper around the drop area, errors and file list. */
  containerClassName?: string;
};

export type FileInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  keyof FileInputOwnProps | "type" | "children"
> &
  FileInputOwnProps;

/**
 * A drop area for choosing files by drag and drop, click or keyboard, with a list of the chosen
 * files. A real file input sits inside it, so Tab, Enter and Space open the file picker, and a
 * form submission sends the files shown in the list.
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  {
    value,
    defaultValue,
    onValueChange,
    multiple = false,
    maxFiles,
    maxSize,
    onReject,
    title,
    hint,
    containerClassName,
    className,
    accept,
    disabled,
    onChange,
    "aria-describedby": describedByProp,
    "aria-invalid": ariaInvalid,
    ...props
  },
  ref,
) {
  const { dictionary, locale, digits } = useAvero();
  const id = useId();
  const titleId = `${id}-title`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useControllableState({
    value,
    defaultValue: defaultValue ?? NO_FILES,
    onChange: onValueChange,
  });
  const [rejections, setRejections] = useState<FileRejection[]>([]);
  const [dragging, setDragging] = useState(false);

  const sizeLabel = (bytes: number) => formatFileSize(bytes, { locale, digits });
  const hintContent =
    hint ??
    (maxSize === undefined
      ? undefined
      : formatMessage(dictionary.fileInputMaxSize, { size: sizeLabel(maxSize) }));

  const messages = rejections
    .filter((rejection) => rejection.reason !== "count")
    .map((rejection) =>
      formatMessage(
        rejection.reason === "type"
          ? dictionary.fileInputRejectedType
          : dictionary.fileInputRejectedSize,
        { name: rejection.file.name, size: maxSize === undefined ? "" : sizeLabel(maxSize) },
      ),
    );
  if (rejections.some((rejection) => rejection.reason === "count")) {
    const limit = multiple ? (maxFiles ?? 1) : 1;
    messages.push(
      formatMessage(dictionary.fileInputRejectedCount, {
        count: formatNumber(limit, { locale, digits }),
      }),
    );
  }

  const invalid = ariaInvalid === true || ariaInvalid === "true" || messages.length > 0;
  // Without an explicit name or an id for a `<label>` to point at, the title names the input.
  const named =
    props["aria-label"] !== undefined ||
    props["aria-labelledby"] !== undefined ||
    props.id !== undefined;
  const describedBy =
    [describedByProp, hintContent ? hintId : undefined, messages.length > 0 ? errorId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  // Keeps the native FileList equal to the list shown, so a plain form submission sends exactly
  // these files. Environments without DataTransfer (jsdom) keep the browser's own selection.
  function syncInput(list: readonly File[]) {
    const input = inputRef.current;
    if (!input || typeof DataTransfer === "undefined") return;
    const transfer = new DataTransfer();
    list.forEach((file) => transfer.items.add(file));
    input.files = transfer.files;
  }

  useEffect(() => {
    syncInput(files);
  }, [files]);

  function addFiles(incoming: readonly File[]) {
    if (disabled || incoming.length === 0) return;
    const result = mergeFiles(incoming, files, { accept, maxSize, multiple, maxFiles });
    syncInput(result.files);
    setRejections(result.rejections);
    if (result.rejections.length > 0) onReject?.(result.rejections);
    if (result.files !== files) setFiles(result.files);
  }

  function removeFile(index: number) {
    const next = files.filter((_, position) => position !== index);
    syncInput(next);
    setRejections([]);
    setFiles(next);
    // The remove button disappears with its row, so focus returns to the input.
    inputRef.current?.focus();
  }

  return (
    <div
      data-slot="file-input"
      data-disabled={disabled ? "" : undefined}
      className={cn("flex w-full flex-col gap-3", containerClassName)}
    >
      <div
        data-slot="file-input-dropzone"
        data-dragging={dragging ? "" : undefined}
        data-invalid={invalid ? "" : undefined}
        data-disabled={disabled ? "" : undefined}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition",
          "hover:border-primary/60 focus-within:border-primary focus-within:ring-primary/20 focus-within:ring-2",
          "data-[dragging]:border-primary data-[dragging]:bg-blue-50",
          "data-[invalid]:border-red-500 data-[invalid]:focus-within:ring-red-500/20",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60 data-[disabled]:hover:border-gray-300",
          className,
        )}
        onClick={(event) => {
          // A click on the input itself already opens the picker.
          if (event.target !== inputRef.current) inputRef.current?.click();
        }}
        onDragOver={(event) => {
          if (disabled) return;
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          addFiles(Array.from(event.dataTransfer.files));
        }}
      >
        <span
          aria-hidden="true"
          className="text-primary flex size-10 items-center justify-center rounded-xl bg-white shadow-xs"
        >
          <UploadIcon className="size-5" />
        </span>
        <span id={titleId} className="text-sm font-medium text-gray-700">
          {title ?? dictionary.fileInputTitle}
        </span>
        {hintContent ? (
          <span id={hintId} className="text-xs text-gray-500">
            {hintContent}
          </span>
        ) : null}
        <input
          ref={mergeRefs(ref, inputRef)}
          type="file"
          data-slot="file-input-control"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-labelledby={named ? undefined : titleId}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className="sr-only"
          onChange={(event) => {
            onChange?.(event);
            addFiles(Array.from(event.target.files ?? []));
          }}
          {...props}
        />
      </div>

      {messages.length > 0 ? (
        <div
          id={errorId}
          role="alert"
          data-slot="file-input-error"
          className="flex flex-col gap-1 text-xs leading-5 text-red-600"
        >
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      ) : null}

      {files.length > 0 ? (
        <ul data-slot="file-input-list" className="flex flex-col gap-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
              data-slot="file-input-item"
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2"
            >
              <FileIcon className="size-5 shrink-0 text-gray-400" />
              <span dir="auto" className="min-w-0 flex-1 truncate text-sm text-gray-700">
                {file.name}
              </span>
              <span className="shrink-0 text-xs text-gray-500">{sizeLabel(file.size)}</span>
              <IconButton
                variant="ghost"
                size="sm"
                label={formatMessage(dictionary.fileInputRemove, { name: file.name })}
                disabled={disabled}
                onClick={() => removeFile(index)}
              >
                <XIcon className="size-4" />
              </IconButton>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
});

FileInput.displayName = "FileInput";
