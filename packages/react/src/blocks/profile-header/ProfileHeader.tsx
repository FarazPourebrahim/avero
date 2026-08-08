"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { CoverHeader } from "../../components/cover-header/index.js";
import { MetaBar } from "../../components/meta/index.js";
import { useAvero } from "../../i18n/AveroProvider.js";

/** Props specific to `ProfileHeader`. It also accepts every native `<div>` attribute. */
export type ProfileHeaderOwnProps = {
  /** The person's name. */
  name: ReactNode;
  /** Avatar image. */
  image?: string;
  /** Alternative text for the avatar. @defaultValue the name, when it is a string */
  imageAlt?: string;
  /** Cover artwork. Without one the reference's blue-to-purple gradient shows. */
  cover?: ReactNode;
  /** Badge beside the name, e.g. a premium `Badge`. */
  badge?: ReactNode;
  /** Line under the name, e.g. what the person does. */
  headline?: ReactNode;
  /** Metadata under the headline, `MetaItem`s in the reference. */
  meta?: ReactNode;
  /** Profile tabs, a `PillTabs` in the reference. */
  tabs?: ReactNode;
  /** Social links, `IconButton`s in their `social` variant. */
  socials?: ReactNode;
  /** Label before the social links. @defaultValue the `socialNetworks` dictionary string */
  socialsLabel?: ReactNode;
  /** Heading level of the name. @defaultValue "h1" */
  nameAs?: "h1" | "h2";
};

export type ProfileHeaderProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof ProfileHeaderOwnProps | "children"
> &
  ProfileHeaderOwnProps;

/**
 * Freelancer profile header (B-17, R-04/R-08): the gradient cover with the overlapping avatar,
 * the identity block, and a footer bar of tabs and social links.
 *
 * The same header appears on every profile tab with a different tab marked current, so the tabs
 * are a slot rather than data — which page is open is routing, not presentation.
 */
export const ProfileHeader = forwardRef<HTMLDivElement, ProfileHeaderProps>(function ProfileHeader(
  {
    name,
    image,
    imageAlt,
    cover,
    badge,
    headline,
    meta,
    tabs,
    socials,
    socialsLabel,
    nameAs: Name = "h1",
    ...props
  },
  ref,
) {
  const { dictionary } = useAvero();
  const hasFooter = Boolean(tabs || socials);

  return (
    <CoverHeader
      ref={ref}
      data-slot="profile-header"
      cover={cover}
      avatar={
        image ? <img src={image} alt={imageAlt ?? (typeof name === "string" ? name : "")} /> : null
      }
      footer={
        hasFooter ? (
          <>
            {tabs}
            {socials ? (
              <div
                data-slot="profile-header-socials"
                className="flex items-center justify-center gap-2"
              >
                <span className="me-1 text-xs font-medium text-slate-400">
                  {socialsLabel ?? dictionary.socialNetworks}
                </span>
                {socials}
              </div>
            ) : null}
          </>
        ) : null
      }
      {...props}
    >
      <div className="mb-2 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
        <Name className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">{name}</Name>
        {badge}
      </div>
      {headline ? (
        <p className="mb-3 text-sm font-medium text-gray-600 md:text-base">{headline}</p>
      ) : null}
      {meta ? (
        <MetaBar variant="inline" className="justify-center lg:justify-start">
          {meta}
        </MetaBar>
      ) : null}
    </CoverHeader>
  );
});

ProfileHeader.displayName = "ProfileHeader";
