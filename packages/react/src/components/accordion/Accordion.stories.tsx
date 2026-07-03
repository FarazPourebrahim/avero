import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionLink,
  AccordionTrigger,
} from "./Accordion.js";

// Accordion's props are a discriminated union (`type: "single" | "multiple"`), so these stories
// are render-only and don't bind args to the component's props.
const meta: Meta = {
  title: "Navigation/Accordion",
  component: Accordion,
  decorators: [
    (Story) => (
      <div className="bg-background w-full max-w-md p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

function Groups() {
  return (
    <>
      <AccordionItem value="about">
        <AccordionTrigger>درباره ما</AccordionTrigger>
        <AccordionContent>
          <AccordionLink href="#rules">قوانین و مقررات</AccordionLink>
          <AccordionLink href="#contact">تماس با ما</AccordionLink>
          <AccordionLink href="#about">درباره ما</AccordionLink>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="skills">
        <AccordionTrigger>مهارت ها</AccordionTrigger>
        <AccordionContent>
          <AccordionLink href="#web">طراحی سایت</AccordionLink>
          <AccordionLink href="#content">تولید محتوا</AccordionLink>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="quick">
        <AccordionTrigger>دسترسی سریع</AccordionTrigger>
        <AccordionContent>
          <AccordionLink href="#home">صفحه اصلی</AccordionLink>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}

export const FooterGroups: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <Groups />
    </Accordion>
  ),
};

export const OpenPanel: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="about">
      <Groups />
    </Accordion>
  ),
};
