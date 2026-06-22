import type { Meta, StoryObj } from "@storybook/react-vite";

function TokenSmoke() {
  return (
    <div data-testid="token-smoke" className="bg-primary rounded-xl p-4 text-white">
      bg-primary
    </div>
  );
}

const meta = {
  title: "Internal/Token Smoke",
  component: TokenSmoke,
  tags: ["!autodocs"],
} satisfies Meta<typeof TokenSmoke>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
