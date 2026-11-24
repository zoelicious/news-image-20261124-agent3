import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const src = join(repoDir, "entry.png");
const dest = join(outDir, "entry.png");

try {
  mkdirSync(outDir, { recursive: true });
} catch (err) {
  console.error("could not create output dir:", err.message);
  process.exit(1);
}

try {
  copyFileSync(src, dest);
  const srcSize = statSync(src).size;
  const destSize = statSync(dest).size;
  if (srcSize !== destSize) {
    console.error("size mismatch after copy:", srcSize, "vs", destSize);
    process.exit(1);
  }
} catch (err) {
  console.error("could not copy entry.png:", err.message);
  process.exit(1);
}

console.log("wrote " + dest);
