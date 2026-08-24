import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox, type ComboboxItem, type ComboboxOption } from "./Combobox.js";

const CITIES: ComboboxOption[] = [
  { value: "tehran", label: "تهران", keywords: ["Tehran"] },
  { value: "mashhad", label: "مشهد", keywords: ["Mashhad"] },
  { value: "isfahan", label: "اصفهان", keywords: ["Isfahan"] },
  { value: "shiraz", label: "شیراز", keywords: ["Shiraz"] },
  { value: "tabriz", label: "تبریز", keywords: ["Tabriz"] },
  { value: "kerman", label: "کرمان", keywords: ["Kerman"], disabled: true },
  { value: "karaj", label: "کرج", keywords: ["Karaj"] },
];

const COURSES: ComboboxItem[] = [
  {
    label: "طراحی",
    options: [
      { value: "ui", label: "طراحی رابط کاربری" },
      { value: "motion", label: "موشن گرافیک" },
    ],
  },
  {
    label: "برنامه‌نویسی",
    options: [
      { value: "web", label: "برنامه‌نویسی وب" },
      { value: "python", label: "پایتون مقدماتی" },
    ],
  },
  {
    label: "داده",
    options: [{ value: "analytics", label: "تحلیل داده" }],
  },
];

const meta: Meta<typeof Combobox> = {
  title: "Forms/Combobox",
  component: Combobox,
  args: { "aria-label": "شهر", options: CITIES, placeholder: "جستجوی شهر" },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Searchable: Story = {};

export const Categories: Story = {
  args: { "aria-label": "دوره", options: COURSES, placeholder: "جستجوی دوره" },
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Combobox {...args} defaultValue="shiraz" />
      <Combobox {...args} defaultValue="tabriz" aria-invalid />
      <Combobox {...args} defaultValue="karaj" disabled />
    </div>
  ),
};
