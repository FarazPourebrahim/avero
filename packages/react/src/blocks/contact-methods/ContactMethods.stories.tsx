import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContactMethod } from "../../components/meta/index.js";
import { TelegramIcon, WhatsappIcon } from "../../icons/publicIcons.js";
import { ContactMethods } from "./ContactMethods.js";

const meta: Meta<typeof ContactMethods> = {
  title: "Blocks/ContactMethods",
  component: ContactMethods,
  decorators: [
    (Story) => (
      <div className="max-w-3xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContactMethods>;

export const DirectContact: Story = {
  render: () => (
    <ContactMethods
      title="راه‌های ارتباط با پشتیبانی"
      description="برای پرسش درباره ثبت‌نام یا دسترسی به دوره‌ها از راه‌های زیر با ما در تماس باشید:"
    >
      <ContactMethod
        href="mailto:hello@example.com"
        label="email:"
        value="hello@example.com"
        external
      />
      <ContactMethod href="tel:+982100000000" label="phone:" value="۰۲۱-۰۰۰۰۰۰۰۰" />
      <ContactMethod
        href="https://t.me/example"
        label="telegram:"
        value="@example"
        icon={<TelegramIcon className="text-sky-500" />}
        external
      />
      <ContactMethod
        href="https://wa.me/982100000000"
        label="whatsapp:"
        value="۰۲۱-۰۰۰۰۰۰۰۰"
        icon={<WhatsappIcon className="text-emerald-600" />}
        external
      />
    </ContactMethods>
  ),
};
