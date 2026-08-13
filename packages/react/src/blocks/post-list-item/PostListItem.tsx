import { forwardRef, type LiHTMLAttributes, type ReactNode } from "react";
import { Image } from "../../components/image/index.js";
import { ClockSolidIcon } from "../../icons/publicIcons.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `PostListItem`. It also accepts every native `<li>` attribute. */
export type PostListItemOwnProps = {
  /** Post title, clamped to two lines. */
  title: string;
  /** Where the row links to. */
  href: string;
  /** Thumbnail image. */
  image?: string;
  /** Author name. */
  author?: ReactNode;
  /** Reading time, e.g. "5 دقیقه". Shown after a clock icon. */
  readTime?: ReactNode;
};

export type PostListItemProps = Omit<
  LiHTMLAttributes<HTMLLIElement>,
  keyof PostListItemOwnProps | "children"
> &
  PostListItemOwnProps;

/**
 * Related-post row in the article sidebar: a 64px thumbnail beside a clamped title,
 * author and reading time, all inside one link.
 *
 * The row renders an `<li>`, so place it inside a list, such as a `<ul>` of related posts.
 */
export const PostListItem = forwardRef<HTMLLIElement, PostListItemProps>(function PostListItem(
  { title, href, image, author, readTime, className, ...props },
  ref,
) {
  return (
    <li ref={ref} data-slot="post-list-item" className={cn(className)} {...props}>
      <a
        href={href}
        className="group flex items-center gap-3 rounded-2xl p-2.5 transition duration-200 hover:bg-gray-50"
      >
        <Image
          src={image}
          alt=""
          fit="cover"
          radius="xl"
          className="size-16 shrink-0 transition group-hover:opacity-90"
        />
        <div className="flex flex-col gap-1 overflow-hidden">
          <h4
            data-slot="post-list-item-title"
            className="line-clamp-2 text-xs leading-5 font-semibold text-gray-700 transition group-hover:text-gray-600"
          >
            {title}
          </h4>
          {author || readTime ? (
            <div
              data-slot="post-list-item-meta"
              className="text-2xs mt-1 flex items-center gap-3 text-gray-400"
            >
              {author ? <span>{author}</span> : null}
              {readTime ? (
                <span className="flex items-center gap-1">
                  <ClockSolidIcon className="size-2.5" /> {readTime}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </a>
    </li>
  );
});

PostListItem.displayName = "PostListItem";
