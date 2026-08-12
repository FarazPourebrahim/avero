"use client";

import { forwardRef, type FormEvent, type HTMLAttributes, type ReactNode } from "react";
import { Badge } from "../../components/badge/index.js";
import { Button } from "../../components/button/index.js";
import { Card, CardTitle } from "../../components/card/index.js";
import { EmptyState } from "../../components/empty-state/index.js";
import { FormActions } from "../../components/form-actions/index.js";
import { Textarea } from "../../components/textarea/index.js";
import { Heading } from "../../components/typography/index.js";
import { useControllableState } from "../../hooks/useControllableState.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { MessageSquareIcon, SendIcon } from "../../icons/internalIcons.js";
import { CommentSolidIcon, PaperPlaneSolidIcon } from "../../icons/publicIcons.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `CommentSection`. It also accepts every native `<section>` attribute. */
export type CommentSectionOwnProps = {
  /**
   * Which of the reference's two comment panels to render: `article` is the blog's gray-toned
   * panel (R-01), `service` the detail page's slate one (R-05). @defaultValue "article"
   */
  variant?: "article" | "service";
  /** Section title. @defaultValue the `comments` dictionary string */
  title?: ReactNode;
  /**
   * How many comments there are. The `article` variant shows it in a counter badge, the `service`
   * variant in brackets after the title. The reference prints it unlocalised, so it is passed
   * through as given.
   */
  count?: string | number;
  /** Accessible name of the comment box. @defaultValue the `commentLabel` dictionary string */
  commentLabel?: string;
  /** Placeholder of the comment box. @defaultValue the `commentPlaceholder` dictionary string */
  placeholder?: string;
  /** Note beside the submit button, e.g. that comments are moderated. */
  hint?: ReactNode;
  /** Submit label. @defaultValue the `submitComment` dictionary string */
  submitLabel?: ReactNode;
  /** Controlled draft comment. */
  value?: string;
  /** Initial draft comment when uncontrolled. @defaultValue "" */
  defaultValue?: string;
  /** Called on every keystroke, in both controlled and uncontrolled use. */
  onValueChange?: (value: string) => void;
  /** Called with the draft when the form is submitted. */
  onSubmitComment?: (value: string) => void;
  /** Marks the form busy: the box is disabled and the button shows a spinner. @defaultValue false */
  pending?: boolean;
  /** The comment list. Without it the empty state is shown. */
  children?: ReactNode;
  /** Empty-state message. @defaultValue the `commentsEmpty` dictionary string */
  emptyMessage?: ReactNode;
};

export type CommentSectionProps = Omit<HTMLAttributes<HTMLElement>, keyof CommentSectionOwnProps> &
  CommentSectionOwnProps;

/**
 * Comment panel (B-08, R-01/R-05): a titled header with the comment count, a comment form, and
 * either the comment list or an empty state.
 *
 * Comment rows themselves are Tier B — the reference never renders one, so there is nothing to
 * reproduce. Pass them as children.
 *
 * Two reference defects are fixed here (deviations V-02 and V-04): the blog's submit button
 * hovers to the same color it already has, and neither comment box has an accessible name.
 */
export const CommentSection = forwardRef<HTMLElement, CommentSectionProps>(function CommentSection(
  {
    variant = "article",
    title,
    count,
    commentLabel,
    placeholder,
    hint,
    submitLabel,
    value,
    defaultValue = "",
    onValueChange,
    onSubmitComment,
    pending = false,
    children,
    emptyMessage,
    className,
    ...props
  },
  ref,
) {
  const { dictionary } = useAvero();
  const [draft, setDraft] = useControllableState({ value, defaultValue, onChange: onValueChange });
  const isService = variant === "service";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmitComment?.(draft);
  }

  return (
    <Card
      asChild
      variant="surface"
      elevation={isService ? "xs" : "brand"}
      padding="none"
      className={cn(
        isService ? "space-y-6 p-6 md:p-8" : "border-gray-100/80 p-6 sm:p-8",
        className,
      )}
    >
      <section ref={ref} data-slot="comment-section" {...props}>
        <div
          data-slot="comment-section-header"
          className={cn(
            "flex items-center border-b pb-4",
            isService ? "justify-between border-slate-100" : "mb-6 gap-3 border-gray-100",
          )}
        >
          {isService ? (
            <CardTitle size="lg">
              <MessageSquareIcon />
              {/* Title and count are one flex item, so the gap between them is the reference's
                  single space rather than the title row's `gap-2`. */}
              <span>
                {title ?? dictionary.comments}
                {count === undefined ? null : ` (${count})`}
              </span>
            </CardTitle>
          ) : (
            <>
              <CommentSolidIcon size={22} className="text-gray-600" />
              <Heading size="card">{title ?? dictionary.comments}</Heading>
              {count === undefined ? null : <Badge variant="counter">{count}</Badge>}
            </>
          )}
        </div>

        <form
          data-slot="comment-section-form"
          onSubmit={handleSubmit}
          className={isService ? "space-y-4" : "mb-8"}
        >
          <Textarea
            aria-label={commentLabel ?? dictionary.commentLabel}
            variant={isService ? "slate" : "soft"}
            rows={isService ? 3 : 4}
            required
            disabled={pending}
            placeholder={placeholder ?? dictionary.commentPlaceholder}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className={isService ? undefined : "mb-3"}
          />
          <FormActions hint={hint}>
            <Button
              type="submit"
              loading={pending}
              elevated={!isService}
              className={
                isService ? "px-6 text-xs font-bold" : "text-xs font-semibold shadow-indigo-100"
              }
            >
              {isService ? <SendIcon className="size-4" /> : <PaperPlaneSolidIcon size={12} />}
              <span>{submitLabel ?? dictionary.submitComment}</span>
            </Button>
          </FormActions>
        </form>

        <div data-slot="comment-section-list" className={isService ? undefined : "space-y-6"}>
          {children ?? (
            <EmptyState variant={isService ? "slate" : "text"}>
              {emptyMessage ?? dictionary.commentsEmpty}
            </EmptyState>
          )}
        </div>
      </section>
    </Card>
  );
});

CommentSection.displayName = "CommentSection";
