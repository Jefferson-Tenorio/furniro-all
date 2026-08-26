import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PREFIX = "\x1b[36m[doctor]\x1b[0m";
const OK = "\x1b[32m✓\x1b[0m";
const FAIL = "\x1b[31m✗\x1b[0m";
const WARN = "\x1b[33m!\x1b[0m";
const ROOT = path.resolve(import.meta.dirname, "..");

let failures = 0;
let warnings = 0;

function pass(label, detail = "") {
  console.log(`${OK} ${label}${detail ? ` — ${detail}` : ""}`);
}

function fail(label, hint = "") {
  console.log(`${FAIL} ${label}${hint ? ` — ${hint}` : ""}`);
  failures += 1;
}

function warn(label, hint = "") {
  console.log(`${WARN} ${label}${hint ? ` — ${hint}` : ""}`);
  warnings += 1;
}

function checkNode() {
  const major = Number(process.versions.node.split(".")[0]);
  if (major >= 22) {
    pass("Node.js", process.versions.node);
  } else {
    fail(`Node.js >= 22 required (found ${process.versions.node})`);
  }
}

function checkFile(relativePath, label, hint) {
  if (fs.existsSync(path.join(ROOT, relativePath))) {
    pass(label);
  } else {
    fail(label, hint);
  }
}

function checkPrismaClient() {
  const clientPath = path.join(ROOT, "backend/node_modules/.prisma/client");
  if (fs.existsSync(clientPath)) {
    pass("Prisma client generated");
  } else {
    fail(
      "Prisma client generated",
      "run `npm run setup` or `npx prisma generate` in backend/",
    );
  }
}

function checkMigrations() {
  const result = spawnSync("npx prisma migrate status", {
    cwd: path.join(ROOT, "backend"),
    encoding: "utf8",
    shell: true,
  });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  if (result.status === 0 && /Database schema is up to date/i.test(output)) {
    pass("Migrations applied");
  } else if (result.status !== 0) {
    fail("Migrations applied", output.trim().split("\n").pop());
  } else {
    warn("Migrations applied", output.trim().split("\n").pop());
  }
}

function main() {
  console.log(`${PREFIX} Checking environment...\n`);

  checkNode();
  checkFile(
    "backend/.env",
    "backend/.env exists",
    "run `npm run setup` or copy .env.example",
  );
  checkFile(
    "frontend/.env",
    "frontend/.env exists",
    "run `npm run setup` or copy .env.example",
  );
  checkFile(
    "backend/node_modules",
    "backend dependencies installed",
    "run `npm install` in backend/",
  );
  checkFile(
    "frontend/node_modules",
    "frontend dependencies installed",
    "run `npm install` in frontend/",
  );
  checkFile(
    "backend/prisma/dev.db",
    "SQLite database exists",
    "run `npm run db:migrate`",
  );
  checkPrismaClient();
  checkMigrations();

  console.log("");
  if (failures > 0) {
    console.error(
      `${PREFIX} ${failures} problem(s) found. Fix the items above and run again.`,
    );
    process.exit(1);
  }
  if (warnings > 0) {
    console.warn(`${PREFIX} Environment usable with ${warnings} warning(s).`);
    return;
  }
  console.log(`${PREFIX} \x1b[32mEnvironment ready.\x1b[0m`);
}

main();
