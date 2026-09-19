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
      {/* The preview brings its own chrome — the direction switch and the bordered surface — so it
          spans the panel edge to edge. */}
      <Tab value="Preview" className="p-0">
        <PreviewFrame>
          <Demo />
        </PreviewFrame>
      </Tab>
      {/* The code tab keeps the panel's own padding: Fumadocs bleeds a lone <figure> back out with
          `-m-4`, so removing the padding drags the block — and its copy button — past the edge. */}
      <Tab value="Code">
        <DynamicCodeBlock lang="tsx" code={source.trim()} />
      </Tab>
    </Tabs>
  );
}
