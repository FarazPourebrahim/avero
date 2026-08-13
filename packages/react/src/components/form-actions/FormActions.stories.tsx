import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/Button.js";
import { Textarea } from "../textarea/Textarea.js";
import { FormActions } from "./FormActions.js";

const meta: Meta<typeof FormActions> = {
  title: "Forms/FormActions",
  component: FormActions,
};

export default meta;
type Story = StoryObj<typeof FormActions>;

export const CommentForm: Story = {
  render: (args) => (
    <form className="max-w-xl rounded-3xl bg-white p-6">
      <div className="mb-3">
        <Textarea aria-label="دیدگاه" placeholder="دیدگاه خود را درباره این مقاله بنویسید…" />
      </div>
      <FormActions {...args} hint="دیدگاه‌ها پس از بررسی منتشر می‌شوند.">
        <Button type="submit" size="sm">
          ارسال دیدگاه
        </Button>
      </FormActions>
    </form>
  ),
};

export const ActionsOnly: Story = {
  render: (args) => (
    <form className="max-w-xl rounded-3xl bg-white p-6">
      <FormActions {...args}>
        <Button type="submit" size="sm">
          ارسال دیدگاه
        </Button>
      </FormActions>
    </form>
  ),
};
