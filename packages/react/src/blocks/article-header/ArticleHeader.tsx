import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Figure, Image } from "../../components/image/index.js";
import { MetaBar } from "../../components/meta/index.js";
import { Heading } from "../../components/typography/index.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `ArticleHeader`. It also accepts every native `<header>` attribute. */
export type ArticleHeaderOwnProps = {
  /** The article's title. */
  title: ReactNode;
  /** Cover image. Without one the header starts at the title. */
  image?: string;
  /** The cover's alternative text. @defaultValue the title, when it is a string */
  imageAlt?: string;
  /** Metadata under the title, typically `MetaItem`s. */
  meta?: ReactNode;
  /** Controls above the cover, e.g. a `BackLink`. */
  actions?: ReactNode;
  /** Id for the title, so the article can point `aria-labelledby` at it. */
  titleId?: string;
};

export type ArticleHeaderProps = Omit<
  HTMLAttributes<HTMLElement>,
  keyof ArticleHeaderOwnProps | "children"
> &
  ArticleHeaderOwnProps;

/**
 * Blog article header: an actions row, a wide cover that zooms slightly on hover,
 * the title, and the metadata panel.
 *
 * It is a `<header>` whose own gap matches the article card's, so the parts space evenly whether
 * the card lays them out or this block does.
 */
export const ArticleHeader = forwardRef<HTMLElement, ArticleHeaderProps>(function ArticleHeader(
  { title, image, imageAlt, meta, actions, titleId, className, ...props },
  ref,
) {
  return (
    <header
      ref={ref}
      data-slot="article-header"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      {actions ? (
        <div data-slot="article-header-actions" className="flex items-center justify-between">
          {actions}
        </div>
      ) : null}

      {image ? (
        <Figure>
          <Image
            src={image}
            alt={imageAlt ?? (typeof title === "string" ? title : "")}
            radius="2xl"
            zoom="subtle"
            className="h-60 w-full sm:h-80 md:h-[400px]"
          />
        </Figure>
      ) : null}

      <div>
        <Heading id={titleId} size="article" className="mb-5">
          {title}
        </Heading>
        {meta ? <MetaBar>{meta}</MetaBar> : null}
      </div>
    </header>
  );
});

ArticleHeader.displayName = "ArticleHeader";
