import { forwardRef, type HTMLAttributes, type LiHTMLAttributes, type Ref } from "react";
import { QuoteRightSolidIcon } from "../../icons/publicIcons.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `List`. It also accepts every native list attribute. */
export type ListOwnProps = {
  /** Numbered (`<ol>`) instead of bulleted (`<ul>`). @defaultValue false */
  ordered?: boolean;
};

export type ListProps = Omit<HTMLAttributes<HTMLUListElement>, keyof ListOwnProps> & ListOwnProps;

/** Article lists (D-10, R-01, R-07): outside markers with the reference's spacing. */
export const List = forwardRef<HTMLUListElement, ListProps>(function List(
  { ordered = false, className, ...props },
  ref,
) {
  const classes = cn(
    "my-3 list-outside space-y-2 ps-6 text-gray-700 sm:ps-7",
    ordered ? "list-decimal" : "list-disc",
    className,
  );

  if (ordered) {
    return (
      <ol ref={ref as Ref<HTMLOListElement>} data-slot="list" className={classes} {...props} />
    );
  }
  return <ul ref={ref} data-slot="list" className={classes} {...props} />;
});

List.displayName = "List";

export type ListItemProps = LiHTMLAttributes<HTMLLIElement>;

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { className, ...props },
  ref,
) {
  return (
    <li
      ref={ref}
      data-slot="list-item"
      className={cn("my-1 text-base leading-8", className)}
      {...props}
    />
  );
});

ListItem.displayName = "ListItem";

export type BlockquoteProps = HTMLAttributes<HTMLQuoteElement> & {
  /** Source URL of the quotation. */
  cite?: string;
};

/**
 * Article quotation (D-11, R-01): an indigo start border on a faint indigo background, italic
 * text and a decorative quote mark.
 */
export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>(function Blockquote(
  { className, children, ...props },
  ref,
) {
  return (
    <blockquote
      ref={ref}
      data-slot="blockquote"
      className={cn(
        "relative my-4 rounded-e-lg border-s-4 border-indigo-500 bg-indigo-50/30 py-2.5 ps-4 pe-2 text-gray-600 italic",
        className,
      )}
      {...props}
    >
      <QuoteRightSolidIcon className="me-2 mb-1 inline-block text-lg text-indigo-400/40" />
      <div className="inline">{children}</div>
    </blockquote>
  );
});

Blockquote.displayName = "Blockquote";
