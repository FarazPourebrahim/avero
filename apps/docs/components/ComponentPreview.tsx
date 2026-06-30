import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { demos, type DemoName } from "@/demos/registry";
import { PreviewFrame } from "./PreviewFrame";

/**
 * Shows a live demo and its exact source code. The code tab reads the demo file itself, so the
 * snippet can never drift from what is rendered.
 */
export async function ComponentPreview({ name }: { name: DemoName }) {
  const Demo = demos[name];
  const source = await readFile(join(process.cwd(), "demos", `${name}.tsx`), "utf8");

  return (
    <Tabs items={["Preview", "Code"]} className="not-prose">
      <Tab value="Preview" className="p-0">
        <PreviewFrame>
          <Demo />
        </PreviewFrame>
      </Tab>
      <Tab value="Code" className="p-0">
        <DynamicCodeBlock lang="tsx" code={source.trim()} />
      </Tab>
    </Tabs>
  );
}
