import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContactMethod } from "../../components/meta/index.js";
import { TelegramIcon, WhatsappIcon } from "../../icons/referenceIcons.generated.js";
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
      title="راه‌های ارتباط مستقیم با ارائه‌دهنده خدمت"
      description="جهت مشاوره و هماهنگی سریع می‌توانید از راه‌های ارتباطی تاییدشده زیر استفاده نمایید:"
    >
      <ContactMethod
        href="mailto:hello@example.com"
        label="email:"
        value="hello@example.com"
        external
      />
      <ContactMethod href="tel:+989221257181" label="phone:" value="۰۹۲۲۱۲۵۷۱۸۱" />
      <ContactMethod
        href="https://t.me/example"
        label="telegram:"
        value="@example"
        icon={<TelegramIcon className="text-sky-500" />}
        external
      />
      <ContactMethod
        href="https://wa.me/989221257181"
        label="whatsapp:"
        value="۰۹۲۲۱۲۵۷۱۸۱"
        icon={<WhatsappIcon className="text-emerald-600" />}
        external
      />
    </ContactMethods>
  ),
};
