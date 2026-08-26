import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PREFIX = "\x1b[36m[setup]\x1b[0m";
const OK = "\x1b[32m✓\x1b[0m";
const FAIL = "\x1b[31m✗\x1b[0m";
const ROOT = path.resolve(import.meta.dirname, "..");

const REQUIRED_NODE_MAJOR = 22;
const PROJECTS = ["backend", "frontend"];

function log(message) {
  console.log(`${PREFIX} ${message}`);
}

function die(message) {
  console.error(`${PREFIX} ${FAIL} ${message}`);
  process.exit(1);
}

function run(command, cwd) {
  log(`Running \`${command}\`...`);
  const result = spawnSync(command, {
    cwd,
    stdio: "inherit",
    shell: true,
  });
  if (result.status !== 0) {
    die(`\`${command}\` failed.`);
  }
}

function ensureEnvFile(project) {
  const examplePath = path.join(ROOT, project, ".env.example");
  const envPath = path.join(ROOT, project, ".env");

  if (fs.existsSync(envPath)) {
    console.log(`${OK} ${project}/.env already exists`);
    return;
  }
  fs.copyFileSync(examplePath, envPath);
  console.log(`${OK} Created ${project}/.env from ${project}/.env.example`);
}

function main() {
  const nodeMajor = Number(process.versions.node.split(".")[0]);
  if (nodeMajor < REQUIRED_NODE_MAJOR) {
    die(`Node.js >= ${REQUIRED_NODE_MAJOR} required (found ${process.versions.node}).`);
  }
  console.log(`${OK} Node.js ${process.versions.node}`);

  for (const project of PROJECTS) {
    if (!fs.existsSync(path.join(ROOT, project, "package.json"))) {
      die(`Missing ${project}/package.json. Are you at the repository root?`);
    }
  }

  log("Creating .env files...");
  for (const project of PROJECTS) {
    ensureEnvFile(project);
  }

  for (const project of PROJECTS) {
    log(`Installing dependencies (${project})...`);
    run("npm install", path.join(ROOT, project));
  }

  const backendDir = path.join(ROOT, "backend");

  log("Generating Prisma client...");
  run("npx prisma generate", backendDir);

  log("Running migrations...");
  run("npx prisma migrate dev", backendDir);

  log("Seeding database...");
  run("npm run db:seed", backendDir);

  console.log(`${PREFIX} ${OK} Setup completed successfully.`);
  console.log(`${PREFIX} Next step: \`npm run dev\``);
}

main();
