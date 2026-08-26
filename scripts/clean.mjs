import fs from "node:fs";
import path from "node:path";

const PREFIX = "\x1b[36m[clean]\x1b[0m";
const ROOT = path.resolve(import.meta.dirname, "..");

const TARGETS = [
  "backend/node_modules",
  "backend/dist",
  "frontend/node_modules",
  "frontend/dist",
  "frontend/coverage",
  "node_modules",
];

function main() {
  let removed = 0;
  for (const target of TARGETS) {
    const fullPath = path.join(ROOT, target);
    if (fs.existsSync(fullPath)) {
      console.log(`${PREFIX} Removing ${target}/...`);
      fs.rmSync(fullPath, { recursive: true, force: true });
      removed += 1;
    }
  }
  if (removed === 0) {
    console.log(`${PREFIX} Nothing to clean.`);
    return;
  }
  console.log(
    `${PREFIX} Removed ${removed} folder(s). Run \`npm run setup\` to restore.`,
  );
}

main();
