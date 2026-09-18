import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Avatar } from "../avatar/Avatar.js";
import { AvatarGroup } from "./AvatarGroup.js";

const people = ["سارا محمدی", "علی رضایی", "نیکا کریمی", "رضا احمدی", "مینا شریفی"];

function group(props: Partial<React.ComponentProps<typeof AvatarGroup>> = {}) {
  return (
    <AvatarGroup label="شرکت‌کنندگان" {...props}>
      {people.map((name) => (
        <Avatar key={name} name={name} />
      ))}
    </AvatarGroup>
  );
}

describe("AvatarGroup", () => {
  it("renders every avatar when no maximum is set", () => {
    render(group());

    expect(screen.getAllByRole("img")).toHaveLength(people.length);
  });

  it("collapses the remainder into a counted tile", () => {
    render(group({ max: 3 }));

    // Arrange / Act above; three avatars plus the overflow tile.
    expect(screen.getAllByRole("img")).toHaveLength(4);
    expect(screen.getByLabelText("۲ نفر دیگر")).toHaveTextContent("+۲");
  });

  it("counts in the locale's digits and words", () => {
    render(<AveroProvider locale="en-US">{group({ max: 3 })}</AveroProvider>);

    expect(screen.getByLabelText("2 more")).toHaveTextContent("+2");
  });

  it("shows no overflow tile when the maximum covers everyone", () => {
    render(group({ max: people.length }));

    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
  });

  it("is a labelled group", () => {
    render(group({ max: 3 }));

    expect(screen.getByRole("group", { name: "شرکت‌کنندگان" })).toBeInTheDocument();
  });

  it("overlaps towards the reading direction with a logical margin", () => {
    const { container } = render(group());

    expect(container.querySelector('[data-slot="avatar-group"]')).toHaveClass(
      "[&>*:not(:first-child)]:-ms-3",
    );
  });

  it("accepts a single child", () => {
    render(
      <AvatarGroup label="یک نفر">
        <Avatar name="سارا محمدی" />
      </AvatarGroup>,
    );

    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  it("forwards its ref and merges className", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(group({ ref, className: "mt-4" }));

    expect(ref.current).toBe(container.querySelector('[data-slot="avatar-group"]'));
    expect(ref.current).toHaveClass("mt-4");
  });

  it("renders on the server", () => {
    expect(renderToString(group({ max: 2 }))).toContain("avatar-group");
  });

  it("has no axe violations", async () => {
    const { container } = render(group({ max: 3 }));

    await expectNoAxeViolations(container);
  });
});
