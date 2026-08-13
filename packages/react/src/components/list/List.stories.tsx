import type { Meta, StoryObj } from "@storybook/react-vite";
import { Blockquote, List, ListItem } from "./List.js";

const meta: Meta = {
  title: "Data display/List and Blockquote",
  component: List,
};

export default meta;

export const ArticleBlocks: StoryObj = {
  render: () => (
    <div className="max-w-2xl rounded-3xl bg-white p-8 text-base leading-8 text-gray-700">
      <p>گذراندن یک دوره آنلاین معمولاً چند مرحله دارد:</p>
      <List ordered>
        <ListItem>
          <strong className="font-bold text-gray-900">ثبت‌نام و دسترسی به جلسه‌ها</strong>
        </ListItem>
        <ListItem>
          <strong className="font-bold text-gray-900">انجام تمرین‌های هر فصل</strong>
        </ListItem>
        <ListItem>
          <strong className="font-bold text-gray-900">ارسال پروژه پایانی</strong>
        </ListItem>
      </List>
      <List>
        <ListItem>به تمرین منظم عادت دارند.</ListItem>
        <ListItem>از یادگیری مستقل لذت می‌برند.</ListItem>
      </List>
      <Blockquote>
        <strong className="font-bold text-gray-900">یادگیری یعنی تمرین، نه فقط تماشا.</strong> هرچه
        بیشتر تمرین کنید، مهارت شما ماندگارتر می‌شود.
      </Blockquote>
    </div>
  ),
};
