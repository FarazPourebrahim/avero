import { RuleTester } from "eslint";
import { describe, it } from "vitest";
import { noPhysicalDirection } from "./noPhysicalDirection.js";
import { noRawColor } from "./noRawColor.js";

RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
});

describe("avero/no-physical-direction", () => {
  ruleTester.run("no-physical-direction", noPhysicalDirection, {
    valid: [
      {
        code: `const c = "ps-4 pe-2 ms-auto me-1 start-0 end-3 border-s-4 rounded-s-lg text-start";`,
      },
      { code: `const c = "px-4 py-2 mx-auto inset-0 space-x-2 translate-x-full rotate-180";` },
      { code: `import x from "./left-panel.js";` },
      { code: "const c = `flex ${a} ps-2`;" },
      { code: `const t = "لطفا";` },
    ],
    invalid: [
      { code: `const c = "pl-4";`, errors: [{ messageId: "physical", data: { token: "pl-4" } }] },
      { code: `const c = "md:pr-6";`, errors: [{ messageId: "physical" }] },
      {
        code: `const c = "-ml-2 mr-auto";`,
        errors: [{ messageId: "physical" }, { messageId: "physical" }],
      },
      { code: `const c = "left-0";`, errors: [{ messageId: "physical" }] },
      { code: `const c = "hover:right-[calc(100%-1rem)]";`, errors: [{ messageId: "physical" }] },
      { code: `const c = "border-r-4";`, errors: [{ messageId: "physical" }] },
      { code: `const c = "border-l";`, errors: [{ messageId: "physical" }] },
      { code: `const c = "rounded-tl-full";`, errors: [{ messageId: "physical" }] },
      { code: `const c = "text-right";`, errors: [{ messageId: "physical" }] },
      { code: "const c = `flex pr-2 ${x}`;", errors: [{ messageId: "physical" }] },
      { code: `<div className="float-left" />`, errors: [{ messageId: "physical" }] },
    ],
  });
});

describe("avero/no-raw-color", () => {
  ruleTester.run("no-raw-color", noRawColor, {
    valid: [
      { code: `const c = "bg-primary text-text-strong";` },
      { code: `const href = "#main-content";` },
      { code: `const entity = "&#1234;";` },
      { code: `const c = "bg-(--color-primary)";` },
      { code: `const id = "item-#12";` },
    ],
    invalid: [
      {
        code: `const c = "bg-[#0a66c2]";`,
        errors: [{ messageId: "raw", data: { value: "#0a66c2" } }],
      },
      { code: `const c = "#fff";`, errors: [{ messageId: "raw" }] },
      { code: `const c = "shadow-[0_4px_25px_rgba(0,0,0,0.04)]";`, errors: [{ messageId: "raw" }] },
      { code: `const s = { color: "hsl(0 0% 100%)" };`, errors: [{ messageId: "raw" }] },
      { code: "const c = `text-[#FF9606]`;", errors: [{ messageId: "raw" }] },
    ],
  });
});
