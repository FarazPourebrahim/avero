import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table.js";

const ROWS = [
  ["زمان‌بندی آزاد", "زمان‌بندی ثابت"],
  ["دسترسی از هر جا", "نیاز به حضور در محل"],
  ["هزینه کمتر", "هزینه رفت‌وآمد"],
  ["تمرین با سرعت دلخواه", "هماهنگی با سرعت کلاس"],
];

const meta: Meta = {
  title: "Data display/Table",
  component: Table,
};

export default meta;

export const Comparison: StoryObj = {
  render: () => (
    <div className="max-w-2xl">
      <Table>
        <TableCaption>دوره آنلاین یا کلاس حضوری؟</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>دوره آنلاین</TableHead>
            <TableHead>کلاس حضوری</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map(([online, inPerson]) => (
            <TableRow key={online}>
              <TableCell>{online}</TableCell>
              <TableCell>{inPerson}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
