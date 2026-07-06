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
      <p>فرآیند انجام یک پروژه فریلنسری معمولاً شامل چند مرحله است:</p>
      <List ordered>
        <ListItem>
          <strong className="font-bold text-gray-900">ثبت یا انتشار پروژه توسط کارفرما</strong>
        </ListItem>
        <ListItem>
          <strong className="font-bold text-gray-900">بررسی پروژه توسط فریلنسر</strong>
        </ListItem>
        <ListItem>
          <strong className="font-bold text-gray-900">ارسال پیشنهاد همکاری</strong>
        </ListItem>
      </List>
      <List>
        <ListItem>مهارت تخصصی قابل ارائه دارند.</ListItem>
        <ListItem>از کار مستقل لذت می‌برند.</ListItem>
      </List>
      <Blockquote>
        <strong className="font-bold text-gray-900">
          فریلنسری یعنی فروش مهارت، نه صرفاً فروش زمان.
        </strong>{" "}
        هرچه تخصص و نمونه‌کار بیشتری داشته باشید، شانس شما بیشتر است.
      </Blockquote>
    </div>
  ),
};
