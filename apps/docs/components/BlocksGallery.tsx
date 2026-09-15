import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { demos, type DemoName } from "@/demos/registry";
import { ComponentPreview } from "./ComponentPreview";

const BLOCKS_DIR = join(process.cwd(), "content/docs/blocks");

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---/;
const FIELD = (name: string) => new RegExp(String.raw`^${name}:\s*(.+)$`, "m");
const FIRST_PREVIEW = /<ComponentPreview\s+name="([^"]+)"/;

type Block = {
  slug: string;
  title: string;
  description: string;
  demo: DemoName;
};

/** Reads each block page for its title, description and primary demo, so the gallery cannot drift. */
async function readBlocks(): Promise<ReadonlyArray<Block>> {
  const order = JSON.parse(await readFile(join(BLOCKS_DIR, "meta.json"), "utf8")).pages;
  const files = (await readdir(BLOCKS_DIR)).filter(
    (name) => name.endsWith(".mdx") && name !== "gallery.mdx",
  );

  const blocks = await Promise.all(
    files.map(async (file) => {
      const contents = await readFile(join(BLOCKS_DIR, file), "utf8");
      const frontMatter = FRONT_MATTER.exec(contents)?.[1] ?? "";
      const demo = FIRST_PREVIEW.exec(contents)?.[1];

      if (!demo || !Object.hasOwn(demos, demo)) {
        return null;
      }

      return {
        slug: file.replace(/\.mdx$/, ""),
        title: FIELD("title").exec(frontMatter)?.[1]?.trim() ?? file,
        description: FIELD("description").exec(frontMatter)?.[1]?.trim() ?? "",
        demo: demo as DemoName,
      };
    }),
  );

  const found = blocks.filter((block) => block !== null);
  const position = (slug: string) => {
    const index = order.indexOf(slug);
    return index === -1 ? order.length : index;
  };

  return found.sort((a, b) => position(a.slug) - position(b.slug));
}

/** The blocks gallery: every block with a live preview, its source and a full-page view. */
export async function BlocksGallery() {
  const blocks = await readBlocks();

  return (
    <div className="flex flex-col gap-12">
      {blocks.map((block) => (
        <section key={block.slug} className="flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 id={block.slug} className="!my-0 text-xl font-semibold">
              <a href={`/docs/blocks/${block.slug}`}>{block.title}</a>
            </h2>
            <a
              href={`/preview/${block.demo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fd-muted-foreground text-xs"
            >
              Full page ↗
            </a>
          </div>
          {block.description ? (
            <p className="text-fd-muted-foreground !my-0 text-sm">{block.description}</p>
          ) : null}
          <ComponentPreview name={block.demo} />
        </section>
      ))}
    </div>
  );
}
