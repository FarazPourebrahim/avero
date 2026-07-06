import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table.js";

function Comparison() {
  return (
    <Table>
      <TableCaption>فریلنسری بهتر است یا استخدام؟</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>فریلنسری</TableHead>
          <TableHead>استخدام</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>انعطاف زمانی بیشتر</TableCell>
          <TableCell>ساعت کاری مشخص‌تر</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe("Table", () => {
  it("renders a table inside a rounded, scrollable container", () => {
    render(<Comparison />);
    const table = screen.getByRole("table", { name: "فریلنسری بهتر است یا استخدام؟" });

    expect(table).toHaveClass("min-w-full", "border-collapse", "text-start", "text-sm");
    expect(table.parentElement).toHaveClass("overflow-x-auto", "rounded-xl", "border-gray-200");
  });

  it("styles header cells with a gray background and column scope", () => {
    render(<Comparison />);
    const head = screen.getByRole("columnheader", { name: "فریلنسری" });

    expect(head).toHaveAttribute("scope", "col");
    expect(head).toHaveClass("bg-gray-100", "font-bold", "p-2.5", "text-start");
  });

  it("styles body cells and rows", () => {
    render(<Comparison />);
    const cell = screen.getByRole("cell", { name: "انعطاف زمانی بیشتر" });

    expect(cell).toHaveClass("align-top", "text-gray-700", "border-gray-200");
    expect(cell.parentElement).toHaveClass("hover:bg-gray-50/50");
    expect(cell.closest("tbody")).toHaveClass("divide-gray-100");
  });

  it("supports row headers and container classes", () => {
    render(
      <Table containerClassName="my-4">
        <TableBody>
          <TableRow>
            <TableHead scope="row">درآمد</TableHead>
            <TableCell>متغیر</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole("rowheader")).toHaveAttribute("scope", "row");
    expect(screen.getByRole("table").parentElement).toHaveClass("my-4");
  });

  it("forwards refs", () => {
    const tableRef = createRef<HTMLTableElement>();
    const rowRef = createRef<HTMLTableRowElement>();
    render(
      <Table ref={tableRef}>
        <TableBody>
          <TableRow ref={rowRef}>
            <TableCell>x</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(tableRef.current?.tagName).toBe("TABLE");
    expect(rowRef.current?.tagName).toBe("TR");
  });

  it("renders on the server", () => {
    expect(renderToString(<Comparison />)).toContain('scope="col"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Comparison />);

    await expectNoAxeViolations(container);
  });
});
