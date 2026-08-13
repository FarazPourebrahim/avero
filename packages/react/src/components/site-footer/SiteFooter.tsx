import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn.js";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionLink,
  AccordionTrigger,
} from "../accordion/Accordion.js";
import { Container } from "../container/Container.js";
import { KeyValueRow } from "../meta/Meta.js";

/** One footer link. */
export type FooterLink = {
  label: ReactNode;
  href: string;
  /** Opens in a new tab with `rel="noopener noreferrer"`. @defaultValue false */
  external?: boolean;
};

/** A titled group of links: chips from `md`, an accordion below it. */
export type FooterGroup = {
  title: ReactNode;
  links: FooterLink[];
};

/** One contact row, e.g. "ایمیل : hello@example.com". */
export type FooterContactRow = {
  label: ReactNode;
  value: ReactNode;
  href?: string;
};

export type FooterChipProps = AnchorHTMLAttributes<HTMLAnchorElement>;

/** A bordered link chip, as used by the category grid and the brand column. */
export const FooterChip = forwardRef<HTMLAnchorElement, FooterChipProps>(function FooterChip(
  { className, ...props },
  ref,
) {
  return (
    <a
      ref={ref}
      data-slot="footer-chip"
      className={cn(
        "text-text-chrome border-text-chrome/15 hover:text-text-chrome-hover cursor-pointer rounded-md border px-4 py-2.5 text-xs font-medium transition-all duration-200 ease-linear hover:bg-white md:text-sm",
        className,
      )}
      {...props}
    />
  );
});

FooterChip.displayName = "FooterChip";

export type FooterSocialTileProps = AnchorHTMLAttributes<HTMLAnchorElement>;

/** A square tile holding one social glyph. */
export const FooterSocialTile = forwardRef<HTMLAnchorElement, FooterSocialTileProps>(
  function FooterSocialTile({ className, ...props }, ref) {
    return (
      <a
        ref={ref}
        data-slot="footer-social-tile"
        className={cn(
          "bg-surface-muted text-icon-muted hover:text-accent-social flex size-10 items-center justify-center rounded-md transition-colors duration-200",
          "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:outline-none",
          className,
        )}
        {...props}
      />
    );
  },
);

FooterSocialTile.displayName = "FooterSocialTile";

function linkProps(link: FooterLink) {
  return link.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/** Props specific to `SiteFooter`. It also accepts every native `<footer>` attribute. */
export type SiteFooterOwnProps = {
  /** Category chip grid, shown from `md`: a heading and 3 (5 from `lg`) columns of links. */
  categories?: { title: ReactNode; columns: FooterLink[][] };
  /** Brand mark, usually a linked logo. */
  logo?: ReactNode;
  /** Chips beside the logo from `md`. */
  brandLinks?: FooterLink[];
  /** Title for `brandLinks` as the first accordion group below `md`. Without it they stay desktop-only. */
  brandLinksTitle?: ReactNode;
  /** Groups rendered as accordions below `md`. */
  groups?: FooterGroup[];
  /**
   * Desktop link columns, each a heading over chips, such as a "دسترسی سریع" column. They
   * are hidden below `md`, where the same links belong in `groups` instead.
   */
  linkColumns?: FooterGroup[];
  /** Contact column, shown from `md`. */
  contact?: { title: ReactNode; rows: FooterContactRow[] };
  /** About strip: the long text shows from `md`, the short one below it. */
  about?: { long: ReactNode; short?: ReactNode };
  /** Trust seal or certification badge, beside the about text. */
  trustSeal?: ReactNode;
  /** Copyright line. */
  copyright?: ReactNode;
  /** Social tiles, shown from `md`. */
  social?: ReactNode;
};

export type SiteFooterProps = Omit<HTMLAttributes<HTMLElement>, keyof SiteFooterOwnProps> &
  SiteFooterOwnProps;

/**
 * Site chrome footer. Everything is data-driven: the category grid, the brand chips, the
 * mobile accordion groups, the contact rows, the about strip and the social tiles are all props,
 * so no content is baked in.
 */
export const SiteFooter = forwardRef<HTMLElement, SiteFooterProps>(function SiteFooter(
  {
    categories,
    logo,
    brandLinks,
    brandLinksTitle,
    groups,
    linkColumns,
    contact,
    about,
    trustSeal,
    copyright,
    social,
    className,
    children,
    ...props
  },
  ref,
) {
  // Below `md` the brand chips become the first accordion group.
  const accordionGroups: FooterGroup[] = [
    ...(brandLinksTitle && brandLinks?.length
      ? [{ title: brandLinksTitle, links: brandLinks }]
      : []),
    ...(groups ?? []),
  ];

  return (
    <footer
      ref={ref}
      data-slot="site-footer"
      className={cn("relative flex w-full justify-center", className)}
      {...props}
    >
      <Container className="relative mb-4 flex flex-col gap-y-10 overflow-hidden md:mb-5 md:gap-y-20">
        {categories ? (
          <div data-slot="footer-categories" className="hidden w-full space-y-5 md:block">
            <h3 className="text-text-strong relative text-lg font-bold">
              <span>{categories.title}</span>
            </h3>
            <div className="grid grid-cols-3 gap-6 lg:grid-cols-5">
              {categories.columns.map((column, index) => (
                <div key={index} className="col-span-1">
                  <div className="flex flex-col items-start gap-y-3">
                    {column.map((link) => (
                      <FooterChip key={link.href} href={link.href} {...linkProps(link)}>
                        {link.label}
                      </FooterChip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="border-t border-gray-200" />

        <div data-slot="footer-columns" className="grid grid-cols-4 gap-y-2 md:gap-x-6">
          <div className="col-span-4 md:col-span-1">
            <div className="flex flex-col items-start gap-y-3">
              {logo ? <div className="mb-2 inline-flex items-center">{logo}</div> : null}
              {brandLinks && brandLinks.length > 0 ? (
                <div className="hidden gap-3 md:flex md:flex-row md:flex-wrap">
                  {brandLinks.map((link) => (
                    <FooterChip key={link.href} href={link.href} {...linkProps(link)}>
                      {link.label}
                    </FooterChip>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {accordionGroups.length > 0 ? (
            <div data-slot="footer-groups" className="col-span-4 md:hidden">
              <Accordion type="multiple">
                {accordionGroups.map((group, index) => (
                  <AccordionItem key={index} value={`group-${index}`} className="mb-2">
                    <AccordionTrigger>{group.title}</AccordionTrigger>
                    <AccordionContent>
                      {group.links.map((link) => (
                        <AccordionLink key={link.href} href={link.href} {...linkProps(link)}>
                          {link.label}
                        </AccordionLink>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : null}

          {linkColumns?.map((column, index) => (
            <div key={index} data-slot="footer-link-column" className="col-span-4 md:col-span-1">
              <div className="flex flex-col items-start gap-y-3">
                <div className="text-text-strong relative mb-3 hidden text-sm font-semibold md:block md:text-lg">
                  <span>{column.title}</span>
                </div>
                <div className="hidden gap-3 md:flex md:flex-row md:flex-wrap">
                  {column.links.map((link) => (
                    <FooterChip key={link.href} href={link.href} {...linkProps(link)}>
                      {link.label}
                    </FooterChip>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {contact ? (
            <div data-slot="footer-contact" className="col-span-4 hidden md:col-span-1 md:block">
              <div className="flex w-full flex-col items-start gap-y-3">
                <div className="text-text-strong relative mb-3 text-sm font-semibold md:text-lg">
                  <span>{contact.title}</span>
                </div>
                <div className="flex w-full flex-col gap-y-7">
                  {contact.rows.map((row, index) => (
                    <KeyValueRow key={index} label={row.label} value={row.value} href={row.href} />
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {about || trustSeal ? (
          <div
            data-slot="footer-about"
            className="bg-surface-muted shadow-brand-soft flex flex-col items-center justify-between gap-y-6 rounded-md px-6 py-10 md:flex-row md:gap-x-6"
          >
            {about ? (
              <>
                <p className="text-text-muted hidden text-sm leading-8 font-normal transition duration-300 md:block">
                  {about.long}
                </p>
                {about.short ? (
                  <div className="text-text-chrome block w-full text-xs leading-7 font-medium md:hidden">
                    {about.short}
                  </div>
                ) : null}
              </>
            ) : null}
            {trustSeal ? <div className="flex items-center gap-x-4">{trustSeal}</div> : null}
          </div>
        ) : null}

        {copyright || social ? (
          <div
            data-slot="footer-bottom"
            className="flex flex-col items-center justify-center md:flex-row md:justify-between"
          >
            {copyright ? (
              <div className="text-text-muted text-xs font-normal">{copyright}</div>
            ) : null}
            {social ? (
              <div className="hidden py-2 md:block">
                <div className="flex items-center gap-3">{social}</div>
              </div>
            ) : null}
          </div>
        ) : null}

        {children}
      </Container>
    </footer>
  );
});

SiteFooter.displayName = "SiteFooter";
