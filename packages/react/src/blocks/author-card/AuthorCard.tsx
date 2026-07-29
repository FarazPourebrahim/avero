import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Avatar } from "../../components/avatar/index.js";
import { Card } from "../../components/card/index.js";
import { Heading } from "../../components/typography/index.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `AuthorCard`. It also accepts every native `<div>` attribute. */
export type AuthorCardOwnProps = {
  /** Author's name: the card's heading, and the avatar's alternative text. */
  name: string;
  /** Avatar image. Without one the avatar falls back to the name's initials. */
  image?: string;
  /**
   * Role pill under the name, e.g. "مدیر دورلنسر". Named `roleLabel` rather than `role` so the
   * native ARIA `role` attribute stays available on the card.
   */
  roleLabel?: ReactNode;
  /** Short biography. Clamped to four lines, as in the reference. */
  bio?: ReactNode;
};

export type AuthorCardProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof AuthorCardOwnProps | "children"
> &
  AuthorCardOwnProps;

/**
 * Author box in the article sidebar (B-06, R-01): a centred column of avatar, name, role pill and
 * a clamped biography.
 *
 * The reference's surface is `rounded-3xl` white with a `gray-100` border and the broken
 * `shadow-[0_0_20px_0_(--shadow)]` (defect R-02), which renders no shadow at all; this ships
 * `shadow-brand-soft`, a 2%-alpha shadow that is visually indistinguishable.
 */
export const AuthorCard = forwardRef<HTMLDivElement, AuthorCardProps>(function AuthorCard(
  { name, image, roleLabel, bio, className, ...props },
  ref,
) {
  return (
    <Card
      ref={ref}
      variant="surface"
      elevation="brand"
      padding="none"
      className={cn("flex flex-col items-center border-gray-100 p-6 text-center", className)}
      data-slot="author-card"
      {...props}
    >
      <Avatar src={image} name={name} size="2xl" border="muted" className="mb-4" />
      <Heading size="card" className="mb-1">
        {name}
      </Heading>
      {roleLabel ? (
        <p
          data-slot="author-card-role"
          className="mb-3 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
        >
          {roleLabel}
        </p>
      ) : null}
      {bio ? (
        <p
          data-slot="author-card-bio"
          className="line-clamp-4 px-2 text-xs leading-5 text-gray-500"
        >
          {bio}
        </p>
      ) : null}
    </Card>
  );
});

AuthorCard.displayName = "AuthorCard";
