---
"@avero/react": minor
---

Add `Pagination` and `InfiniteScroll`. `Pagination` shows the first and last pages with a window around the current one, renders pages as links (`getHref`, with `rel="prev"`/`"next"`) or buttons (`onPageChange`), marks the current page with `aria-current="page"`, and uses the locale's digits and reading direction; `paginationRange` exposes the same page list. `InfiniteScroll` calls `onLoadMore` when a sentinel after its content scrolls into view, pauses while `loading`, stops when `hasMore` is false, announces loading in a status region, and falls back to a load more button without `IntersectionObserver`. Also adds the `paginationLabel`, `paginationPage` and `loadMore` dictionary entries.
