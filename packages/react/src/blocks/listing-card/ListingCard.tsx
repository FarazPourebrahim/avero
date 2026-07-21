import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Avatar } from "../../components/avatar/index.js";
import { Card } from "../../components/card/index.js";
import { Chip } from "../../components/chip/index.js";
import { Image } from "../../components/image/index.js";
import { MetaItem } from "../../components/meta/index.js";
import { PriceTag } from "../../components/price-tag/index.js";
import { HeartIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";
import { stripHtml } from "../../utils/sanitize.js";

/** Props specific to `ListingCard`. It also accepts every native `<article>` attribute. */
export type ListingCardOwnProps = {
  /** Service title, also the card's accessible name. */
  title: string;
  /** Where the card links to. */
  href: string;
  /** Cover image. Without one the image well stays a neutral block, as in the reference. */
  image?: string;
  /** Category chip above the title, e.g. "سئو". */
  category?: ReactNode;
  /**
   * Short description. The reference stores excerpts as HTML and renders the tags as visible text
   * (defect R-08); this strips the markup instead (deviation V-03).
   */
  excerpt?: string;
  /** Author name beside the avatar. */
  authorName?: string;
  /** Author avatar image. */
  authorImage?: string;
  /** Starting price, rendered as "از … تومان". */
  price?: number;
  /** Like count. The reference prints it unlocalised, so it is passed through as given. */
  likes?: number;
};

export type ListingCardProps = Omit<
  HTMLAttributes<HTMLElement>,
  keyof ListingCardOwnProps | "children"
> &
  ListingCardOwnProps;

/**
 * Service listing card (B-01, R-06): a glass card whose whole surface is one link, with a cover
 * image, category chip, clamped title and excerpt, author row, starting price and like count.
 *
 * The reference makes the author row a `div role="link"` nested inside the card's own link (defect
 * R-10). A nested link is invalid, so the author row here is plain content and the card stays a
 * single link target (deviation V-04); the visuals are unchanged.
 */
export const ListingCard = forwardRef<HTMLElement, ListingCardProps>(function ListingCard(
  {
    title,
    href,
    image,
    category,
    excerpt,
    authorName,
    authorImage,
    price,
    likes,
    className,
    ...props
  },
  ref,
) {
  return (
    <article ref={ref} data-slot="listing-card" className={cn("w-full", className)} {...props}>
      <Card asChild variant="glass" padding="none" className="overflow-hidden p-3">
        <a href={href} aria-label={title}>
          <div className="h-60 w-full overflow-hidden bg-gray-100">
            <Image src={image} alt="" fit="cover" radius="lg" className="h-60 w-full" />
          </div>

          <div className="mt-5 mb-3 space-y-4 px-[5px]">
            {category ? <Chip variant="category">{category}</Chip> : null}

            <div className="mt-3 space-y-2">
              <div
                data-slot="listing-card-title"
                className="text-primary line-clamp-2 min-h-[45px] text-base leading-6 font-bold"
              >
                {title}
              </div>
              {excerpt ? (
                <p data-slot="listing-card-excerpt" className="line-clamp-2 text-xs text-gray-500">
                  {stripHtml(excerpt)}
                </p>
              ) : null}
            </div>

            {authorName ? (
              <div data-slot="listing-card-author" className="flex items-center gap-2">
                <Avatar size="xs" src={authorImage} name={authorName} />
                <span className="text-xs text-gray-500">{authorName}</span>
              </div>
            ) : null}

            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              {price === undefined ? <span /> : <PriceTag variant="inline" amount={price} />}
              {likes === undefined ? null : (
                <MetaItem
                  variant="compact"
                  className="gap-1 text-xs text-gray-500"
                  icon={<HeartIcon size={15} />}
                >
                  {likes}
                </MetaItem>
              )}
            </div>
          </div>
        </a>
      </Card>
    </article>
  );
});

ListingCard.displayName = "ListingCard";
