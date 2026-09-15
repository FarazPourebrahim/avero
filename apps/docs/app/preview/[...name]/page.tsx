import { notFound } from "next/navigation";
import { demos, type DemoName } from "@/demos/registry";
import { FullPagePreview } from "@/components/FullPagePreview";

/**
 * Renders one demo full-page with no documentation chrome, so a block or layout can be judged at
 * the width it will really be used at. Linked from the blocks gallery and the block pages.
 */
export default async function Page({ params }: PageProps<"/preview/[...name]">) {
  const { name } = await params;
  const demoName = name.join("/");

  if (!Object.hasOwn(demos, demoName)) {
    notFound();
  }

  const Demo = demos[demoName as DemoName];

  return (
    <FullPagePreview name={demoName}>
      <Demo />
    </FullPagePreview>
  );
}

export function generateStaticParams() {
  return Object.keys(demos).map((name) => ({ name: name.split("/") }));
}
