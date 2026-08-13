import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Blockquote, List, ListItem } from "./List.js";

describe("List", () => {
  it("renders a bulleted list with outside markers", () => {
    render(
      <List>
        <ListItem>به تمرین منظم عادت دارند.</ListItem>
      </List>,
    );
    const list = screen.getByRole("list");

    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("list-disc", "list-outside", "ps-6", "sm:ps-7");
    expect(screen.getByRole("listitem")).toHaveClass("leading-8", "my-1");
  });

  it("renders a numbered list", () => {
    render(
      <List ordered>
        <ListItem>ثبت‌نام</ListItem>
      </List>,
    );

    expect(screen.getByRole("list").tagName).toBe("OL");
    expect(screen.getByRole("list")).toHaveClass("list-decimal");
  });

  it("forwards refs for both list types", () => {
    const ulRef = createRef<HTMLUListElement>();
    const olRef = createRef<HTMLUListElement>();
    render(
      <>
        <List ref={ulRef} />
        <List ref={olRef} ordered />
      </>,
    );

    expect(ulRef.current?.tagName).toBe("UL");
    expect(olRef.current?.tagName).toBe("OL");
  });
});

describe("Blockquote", () => {
  it("renders a quotation with a start border and a decorative quote mark", () => {
    const { container } = render(
      <Blockquote cite="https://example.com">یادگیری یعنی تمرین.</Blockquote>,
    );
    const quote = container.querySelector("blockquote");

    expect(quote).toHaveAttribute("cite", "https://example.com");
    expect(quote).toHaveClass("border-s-4", "border-indigo-500", "rounded-e-lg", "italic");
    expect(quote?.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("یادگیری یعنی تمرین.")).toHaveClass("inline");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLQuoteElement>();
    render(<Blockquote ref={ref}>quote</Blockquote>);

    expect(ref.current?.tagName).toBe("BLOCKQUOTE");
  });
});

describe("prose blocks", () => {
  it("render on the server", () => {
    const html = renderToString(
      <>
        <List ordered>
          <ListItem>a</ListItem>
        </List>
        <Blockquote>b</Blockquote>
      </>,
    );

    expect(html).toContain("<ol");
    expect(html).toContain("<blockquote");
  });

  it("have no accessibility violations", async () => {
    const { container } = render(
      <article>
        <List>
          <ListItem>one</ListItem>
        </List>
        <Blockquote>quote</Blockquote>
      </article>,
    );

    await expectNoAxeViolations(container);
  });
});
