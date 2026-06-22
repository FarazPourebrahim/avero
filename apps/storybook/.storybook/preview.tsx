import type { Decorator, Preview } from "@storybook/react-vite";
import "../src/styles.css";

const withDirection: Decorator = (Story, context) => {
  const dir = context.globals.direction === "ltr" ? "ltr" : "rtl";
  const lang = context.globals.locale === "en" ? "en" : "fa";
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
  return (
    <div dir={dir} lang={lang} className="p-6">
      <Story />
    </div>
  );
};

const preview: Preview = {
  globalTypes: {
    direction: {
      description: "Text direction",
      toolbar: {
        title: "Direction",
        icon: "transfer",
        items: [
          { value: "rtl", title: "RTL" },
          { value: "ltr", title: "LTR" },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: "Locale",
      toolbar: {
        title: "Locale",
        icon: "globe",
        items: [
          { value: "fa", title: "فارسی" },
          { value: "en", title: "English" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { direction: "rtl", locale: "fa" },
  decorators: [withDirection],
  parameters: {
    layout: "fullscreen",
    a11y: { test: "error" },
  },
};

export default preview;
