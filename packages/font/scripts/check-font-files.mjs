// Verifies that every font file referenced by src/lahzeh.css exists in files/.
// Until the licensed files are added (known debt KD-02) this reports them as missing but only fails
// when AVERO_REQUIRE_FONTS=1, so CI can enforce it once the files are committed.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PACKAGE_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const cssPath = join(PACKAGE_DIR, "src", "lahzeh.css");
const css = readFileSync(cssPath, "utf8");

const referenced = [...css.matchAll(/url\("([^"]+)"\)/g)].map((match) =>
  resolve(dirname(cssPath), match[1]),
);
const missing = referenced.filter((file) => !existsSync(file));

if (missing.length === 0) {
  console.log(`All ${referenced.length} Lahzeh font files are present.`);
  process.exit(0);
}

const message = `${missing.length}/${referenced.length} Lahzeh font files are missing (known debt KD-02).`;
if (process.env.AVERO_REQUIRE_FONTS === "1") {
  console.error(`${message}\n  ${missing.join("\n  ")}`);
  process.exit(1);
}
console.warn(message);
