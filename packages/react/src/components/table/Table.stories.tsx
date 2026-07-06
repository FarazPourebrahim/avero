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
  ["انعطاف زمانی بیشتر", "ساعت کاری مشخص‌تر"],
  ["امکان همکاری با چند مشتری", "معمولاً یک کارفرما"],
  ["درآمد متغیر", "درآمد نسبتاً ثابت"],
  ["آزادی انتخاب پروژه", "وظایف مشخص سازمانی"],
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
        <TableCaption>فریلنسری بهتر است یا استخدام؟</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>فریلنسری</TableHead>
            <TableHead>استخدام</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ROWS.map(([freelance, employment]) => (
            <TableRow key={freelance}>
              <TableCell>{freelance}</TableCell>
              <TableCell>{employment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
