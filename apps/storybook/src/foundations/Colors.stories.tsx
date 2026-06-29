import { tokens, type TokenName } from "@avero/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";

type Swatch = { name: string; cssVar: string; value: string };

function swatches(prefix: string, exclude: string[] = []): Swatch[] {
  return (Object.keys(tokens) as TokenName[])
    .filter((key) => key.startsWith(prefix) && !exclude.some((name) => key.startsWith(name)))
    .map((key) => ({ name: key, cssVar: tokens[key].cssVar, value: tokens[key].value }));
}

function SwatchGrid({ title, items }: { title: string; items: Swatch[] }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
          >
            <div
              className="h-16 border-b border-gray-100"
              style={{ background: `var(${item.cssVar})` }}
            />
            <div className="flex flex-col gap-0.5 p-3" dir="ltr">
              <span className="text-xs font-bold text-gray-800">{item.cssVar}</span>
              <span className="text-2xs font-mono text-gray-500">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ColorSpecimen() {
  return (
    <div className="bg-background flex flex-col gap-8 p-6">
      <SwatchGrid title="Brand and semantic" items={swatches("color", ["colorHero"])} />
      <SwatchGrid title="Hero illustration" items={swatches("colorHero")} />
    </div>
  );
}

const meta = {
  title: "Foundations/Colors",
  component: ColorSpecimen,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ColorSpecimen>;

export default meta;

export const Tokens: StoryObj<typeof meta> = {};
