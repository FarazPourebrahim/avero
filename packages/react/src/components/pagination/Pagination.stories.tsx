import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "./Pagination.js";

const meta: Meta<typeof Pagination> = {
  title: "Navigation/Pagination",
  component: Pagination,
  args: { pageCount: 20, defaultPage: 10 },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Buttons: Story = {};

export const Links: Story = {
  args: { defaultPage: 1, getHref: (page: number) => `?page=${page}` },
};

export const FewPages: Story = {
  args: { pageCount: 5, defaultPage: 3 },
};

export const MoreSiblings: Story = {
  args: { pageCount: 50, defaultPage: 25, siblingCount: 2 },
};
