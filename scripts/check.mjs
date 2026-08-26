import { spawnSync } from "node:child_process";
import path from "node:path";

const PREFIX = "\x1b[36m[check]\x1b[0m";
const OK = "\x1b[32m✓\x1b[0m";
const FAIL = "\x1b[31m✗\x1b[0m";
const ROOT = path.resolve(import.meta.dirname, "..");

const STAGES = [
  { label: "format", command: "npm run format:check" },
  { label: "frontend lint", cwd: "frontend", command: "npm run lint" },
  { label: "backend lint", cwd: "backend", command: "npm run lint" },
  { label: "backend typecheck", cwd: "backend", command: "npm run typecheck" },
  {
    label: "frontend typecheck",
    cwd: "frontend",
    command: "npm run typecheck",
  },
  { label: "frontend tests", cwd: "frontend", command: "npm run test:run" },
  { label: "backend build", cwd: "backend", command: "npm run build" },
  { label: "frontend build", cwd: "frontend", command: "npm run build" },
];

function main() {
  const failed = [];

  for (const stage of STAGES) {
    process.stdout.write(`${PREFIX} ${stage.label}... `);
    const result = spawnSync(stage.command, {
      cwd: path.join(ROOT, stage.cwd ?? "."),
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    });
    if (result.status === 0) {
      console.log(OK);
    } else {
      console.log(FAIL);
      failed.push(stage);
      break;
    }
  }

  if (failed.length > 0) {
    const stage = failed[0];
    console.error(
      `\n${PREFIX} ${FAIL} Failed at "${stage.label}". Full log:\n`,
    );
    const result = spawnSync(stage.command, {
      cwd: path.join(ROOT, stage.cwd ?? "."),
      stdio: "inherit",
      shell: true,
    });
    process.exit(result.status ?? 1);
  }

  console.log(`${PREFIX} \x1b[32mAll checks passed.\x1b[0m`);
}

main();
