import {
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import { cn } from "../../utils/cn.js";

/**
 * Bordered data table (D-09): a rounded, horizontally
 * scrollable container, gray header cells and a subtle row hover.
 */
export type TableProps = HTMLAttributes<HTMLTableElement> & {
  /** Classes for the scroll container around the table. */
  containerClassName?: string;
};

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { className, containerClassName, ...props },
  ref,
) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-2xs",
        containerClassName,
      )}
    >
      <table
        ref={ref}
        data-slot="table"
        className={cn(
          "min-w-full border-collapse divide-y divide-gray-200 text-start text-sm",
          className,
        )}
        {...props}
      />
    </div>
  );
});

Table.displayName = "Table";

export type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>;

export const TableHeader = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  function TableHeader(props, ref) {
    return <thead ref={ref} data-slot="table-header" {...props} />;
  },
);

TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(function TableBody(
  { className, ...props },
  ref,
) {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn("divide-y divide-gray-100 bg-white", className)}
      {...props}
    />
  );
});

TableBody.displayName = "TableBody";

export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow(
  { className, ...props },
  ref,
) {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn("border-b border-gray-200 hover:bg-gray-50/50", className)}
      {...props}
    />
  );
});

TableRow.displayName = "TableRow";

export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;

/** A header cell. Defaults to `scope="col"`. */
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { className, scope = "col", ...props },
  ref,
) {
  return (
    <th
      ref={ref}
      scope={scope}
      data-slot="table-head"
      className={cn(
        "border border-gray-200 bg-gray-100 p-2.5 text-start font-bold whitespace-nowrap text-gray-800",
        className,
      )}
      {...props}
    />
  );
});

TableHead.displayName = "TableHead";

export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { className, ...props },
  ref,
) {
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn("border border-gray-200 p-2.5 text-start align-top text-gray-700", className)}
      {...props}
    />
  );
});

TableCell.displayName = "TableCell";

export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ className, ...props }, ref) {
    return (
      <caption
        ref={ref}
        data-slot="table-caption"
        className={cn("p-2.5 text-start text-xs text-gray-500", className)}
        {...props}
      />
    );
  },
);

TableCaption.displayName = "TableCaption";
