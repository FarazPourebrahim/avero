import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";

/* --------------------------------------------------------------------------------------------
 * MetaItem + MetaBar (D-13): icon + label + value metadata.
 * ------------------------------------------------------------------------------------------ */

export const metaItemVariants = cva("flex items-center [&>svg]:shrink-0", {
  variants: {
    variant: {
      /** Article meta: icon, label and a medium-weight value (R-01). */
      plain: "gap-2",
      /** Project meta row: small icon and text (R-07). */
      compact: "gap-1.5",
      /** Profile location pill (R-04). */
      pill: "gap-1 rounded-lg bg-slate-100/80 px-2.5 py-1 text-slate-600 [&>svg]:size-4",
      /** Service stats chip (R-05). */
      chip: "gap-1.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-1.5 [&>svg]:size-4",
    },
  },
  defaultVariants: { variant: "plain" },
});

/** Props specific to `MetaItem`. It also accepts every native `<div>` attribute. */
export type MetaItemOwnProps = {
  /** Visual style. @defaultValue "plain" */
  variant?: VariantProps<typeof metaItemVariants>["variant"];
  /** Leading icon. */
  icon?: ReactNode;
  /** Label before the value, e.g. "انتشار:". */
  label?: ReactNode;
};

export type MetaItemProps = Omit<HTMLAttributes<HTMLDivElement>, keyof MetaItemOwnProps> &
  MetaItemOwnProps;

export const MetaItem = forwardRef<HTMLDivElement, MetaItemProps>(function MetaItem(
  { variant, icon, label, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="meta-item"
      className={cn(metaItemVariants({ variant }), className)}
      {...props}
    >
      {icon}
      {label ? <span>{label}</span> : null}
      {variant === "plain" || variant === undefined ? (
        <span className="font-medium text-gray-700">{children}</span>
      ) : (
        <span>{children}</span>
      )}
    </div>
  );
});

MetaItem.displayName = "MetaItem";

export const metaBarVariants = cva("flex flex-wrap items-center", {
  variants: {
    variant: {
      /** Article meta panel (R-01). */
      panel:
        "gap-5 rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-3 text-xs text-gray-500 sm:text-sm",
      /** Project meta row (R-07). */
      row: "text-sm-plus gap-4 font-normal text-gray-400",
      /** Profile meta line (R-04). */
      inline: "gap-4 text-xs font-medium text-gray-500 sm:text-sm",
    },
  },
  defaultVariants: { variant: "panel" },
});

/** Props specific to `MetaBar`. It also accepts every native `<div>` attribute. */
export type MetaBarOwnProps = {
  /** Container style. @defaultValue "panel" */
  variant?: VariantProps<typeof metaBarVariants>["variant"];
};

export type MetaBarProps = Omit<HTMLAttributes<HTMLDivElement>, keyof MetaBarOwnProps> &
  MetaBarOwnProps;

export const MetaBar = forwardRef<HTMLDivElement, MetaBarProps>(function MetaBar(
  { variant, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="meta-bar"
      className={cn(metaBarVariants({ variant }), className)}
      {...props}
    />
  );
});

MetaBar.displayName = "MetaBar";

/* --------------------------------------------------------------------------------------------
 * KeyValueRow (D-19): the footer's "ایمیل : …" contact rows.
 * ------------------------------------------------------------------------------------------ */

/** Props specific to `KeyValueRow`. It also accepts every native `<div>` attribute. */
export type KeyValueRowOwnProps = {
  label: ReactNode;
  /** The value; rendered as a link when `href` is set. */
  value: ReactNode;
  href?: string;
  /** Direction of the value. Contact details such as emails and phone numbers read left to right. @defaultValue "ltr" */
  valueDir?: "ltr" | "rtl" | "auto";
};

export type KeyValueRowProps = Omit<HTMLAttributes<HTMLDivElement>, keyof KeyValueRowOwnProps> &
  KeyValueRowOwnProps;

export const KeyValueRow = forwardRef<HTMLDivElement, KeyValueRowProps>(function KeyValueRow(
  { label, value, href, valueDir = "ltr", className, ...props },
  ref,
) {
  const valueClasses = "text-text-chrome text-xs font-normal md:text-sm";
  return (
    <div
      ref={ref}
      data-slot="key-value-row"
      className={cn("flex flex-row items-center justify-between", className)}
      {...props}
    >
      <span className={valueClasses}>{label}</span>
      {href ? (
        <a
          href={href}
          dir={valueDir}
          className={cn(
            valueClasses,
            "hover:text-text-chrome-hover transition-all duration-200 ease-linear",
          )}
        >
          {value}
        </a>
      ) : (
        <span dir={valueDir} className={valueClasses}>
          {value}
        </span>
      )}
    </div>
  );
});

KeyValueRow.displayName = "KeyValueRow";

/* --------------------------------------------------------------------------------------------
 * ContactMethod (D-20): verified contact chips on the service page (R-05).
 * ------------------------------------------------------------------------------------------ */

/** Props specific to `ContactMethod`. It also accepts every native `<a>` attribute. */
export type ContactMethodOwnProps = {
  /** Link to the contact channel, e.g. `mailto:`, `tel:` or `https:`. */
  href: string;
  icon?: ReactNode;
  /** Channel name, e.g. "email:". */
  label: ReactNode;
  /** Contact value, shown in a monospace span that reads left to right. */
  value: ReactNode;
  /** Opens in a new tab with `rel="noopener noreferrer"`. @defaultValue false */
  external?: boolean;
};

export type ContactMethodProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof ContactMethodOwnProps
> &
  ContactMethodOwnProps;

export const ContactMethod = forwardRef<HTMLAnchorElement, ContactMethodProps>(
  function ContactMethod({ href, icon, label, value, external = false, className, ...props }, ref) {
    return (
      <a
        ref={ref}
        href={href}
        data-slot="contact-method"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(
          "inline-flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 [&>svg]:size-4",
          "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none",
          className,
        )}
        {...props}
      >
        {icon}
        <span className="capitalize">{label}</span>
        <span dir="ltr" className="font-mono text-slate-600">
          {value}
        </span>
      </a>
    );
  },
);

ContactMethod.displayName = "ContactMethod";
