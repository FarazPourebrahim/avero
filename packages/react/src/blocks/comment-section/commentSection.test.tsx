import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { CommentSection } from "./CommentSection.js";

describe("CommentSection", () => {
  it("renders the article panel with a counter badge and the empty state", () => {
    const { container } = render(<CommentSection count={0} />);

    expect(container.querySelector("section")).toHaveAttribute("data-slot", "comment-section");
    expect(screen.getByRole("heading", { name: "نظرات کاربران" })).toBeInTheDocument();
    expect(container.querySelector('[data-slot="badge"]')).toHaveTextContent("0");
    expect(screen.getByText(/هنوز نظری ثبت نشده است/)).toBeInTheDocument();
  });

  it("puts the count in the title and uses the slate palette in the service variant", () => {
    const { container } = render(<CommentSection variant="service" count={0} />);

    expect(screen.getByRole("heading", { name: /نظرات کاربران \(0\)/ })).toBeInTheDocument();
    expect(container.querySelector('[data-slot="badge"]')).toBeNull();
    expect(container.querySelector('[data-slot="textarea"]')).toHaveClass("border-slate-200");
  });

  it("names the comment box, which the reference leaves unlabelled", () => {
    render(<CommentSection />);

    expect(screen.getByRole("textbox", { name: "نظر شما" })).toBeInTheDocument();
  });

  it("submits the draft and keeps the caller's value in control", async () => {
    const onSubmitComment = vi.fn();
    const onValueChange = vi.fn();
    render(
      <CommentSection
        onSubmitComment={onSubmitComment}
        onValueChange={onValueChange}
        submitLabel="ثبت نظر"
      />,
    );

    await userEvent.type(screen.getByRole("textbox"), "عالی");
    await userEvent.click(screen.getByRole("button", { name: /ثبت نظر/ }));

    expect(onValueChange).toHaveBeenCalled();
    expect(onSubmitComment).toHaveBeenCalledWith("عالی");
  });

  it("disables the box and marks the button busy while pending", () => {
    render(<CommentSection pending />);

    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("renders comments instead of the empty state when given children", () => {
    render(
      <CommentSection>
        <p>یک نظر</p>
      </CommentSection>,
    );

    expect(screen.getByText("یک نظر")).toBeInTheDocument();
    expect(screen.queryByText(/هنوز نظری ثبت نشده است/)).toBeNull();
  });

  it("shows the moderation hint beside the submit button", () => {
    const { container } = render(<CommentSection hint="نظرات پس از بررسی منتشر می‌شوند." />);

    expect(container.querySelector('[data-slot="form-actions"]')).toHaveClass("justify-between");
    expect(screen.getByText("نظرات پس از بررسی منتشر می‌شوند.")).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLElement>();
    render(<CommentSection ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "comment-section");
  });

  it("renders on the server", () => {
    expect(renderToString(<CommentSection count={0} />)).toContain("نظرات کاربران");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<CommentSection count={0} hint="با بررسی مدیر" />);

    await expectNoAxeViolations(container);
  });
});
