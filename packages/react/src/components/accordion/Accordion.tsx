"use client";

import { Accordion as RadixAccordion, Slot } from "radix-ui";
import { forwardRef, type AnchorHTMLAttributes, type ComponentPropsWithoutRef } from "react";
import { useAvero } from "../../i18n/AveroProvider.js";
import { ArrowDownIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";

/**
 * Accordion, styled for grouped links such as a mobile footer: muted rounded triggers
 * with a rotating down arrow, and panels that animate height and opacity over 300ms.
 */
export type AccordionProps = ComponentPropsWithoutRef<typeof RadixAccordion.Root>;

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { className, ...props },
  ref,
) {
  const { dir } = useAvero();
  return (
    <RadixAccordion.Root
      ref={ref}
      dir={dir}
      data-slot="accordion"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    />
  );
});

Accordion.displayName = "Accordion";

export type AccordionItemProps = ComponentPropsWithoutRef<typeof RadixAccordion.Item>;

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { className, ...props },
  ref,
) {
  return (
    <RadixAccordion.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
});

AccordionItem.displayName = "AccordionItem";

export type AccordionTriggerProps = ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>;

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ className, children, ...props }, ref) {
    return (
      <RadixAccordion.Header className="flex">
        <RadixAccordion.Trigger
          ref={ref}
          data-slot="accordion-trigger"
          className={cn(
            "group bg-surface-muted text-text-chrome flex w-full cursor-pointer items-center justify-between rounded-xl px-8 py-4 text-xs font-normal transition-all duration-300 ease-out hover:shadow-md active:scale-[0.99]",
            "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none",
            className,
          )}
          {...props}
        >
          <span className="text-sm font-normal">{children}</span>
          <span className="transition-transform duration-300 ease-out group-data-[state=open]:rotate-180">
            <ArrowDownIcon size={24} />
          </span>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
    );
  },
);

AccordionTrigger.displayName = "AccordionTrigger";

export type AccordionContentProps = ComponentPropsWithoutRef<typeof RadixAccordion.Content>;

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ className, children, ...props }, ref) {
    return (
      <RadixAccordion.Content
        ref={ref}
        data-slot="accordion-content"
        className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
        {...props}
      >
        <div className={cn("bg-surface-muted flex flex-col overflow-hidden rounded-xl", className)}>
          {children}
        </div>
      </RadixAccordion.Content>
    );
  },
);

AccordionContent.displayName = "AccordionContent";

/** Props specific to `AccordionLink`. It also accepts every native `<a>` attribute. */
export type AccordionLinkOwnProps = {
  /** Renders the child element (e.g. a router link) with accordion-link styles. @defaultValue false */
  asChild?: boolean;
};

export type AccordionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & AccordionLinkOwnProps;

/** A link row inside an accordion panel, like the footer's category links. */
export const AccordionLink = forwardRef<HTMLAnchorElement, AccordionLinkProps>(
  function AccordionLink({ asChild = false, className, ...props }, ref) {
    const Component = asChild ? Slot.Root : "a";
    return (
      <Component
        ref={ref}
        data-slot="accordion-link"
        className={cn(
          "text-text-chrome hover:text-text-chrome-hover px-8 py-5 text-xs font-medium transition-all duration-200 ease-out hover:bg-gray-50 hover:pe-5 md:text-sm",
          "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
          className,
        )}
        {...props}
      />
    );
  },
);

AccordionLink.displayName = "AccordionLink";
