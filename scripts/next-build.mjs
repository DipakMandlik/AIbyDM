import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const existingNodeOptions = process.env.NODE_OPTIONS ?? "";
const heapOption = "--max-old-space-size=8192";

const child = spawn(process.execPath, [nextBin, "build", "--webpack"], {
  cwd: root,
  env: {
    ...process.env,
    NODE_OPTIONS: existingNodeOptions.includes(heapOption)
      ? existingNodeOptions
      : `${existingNodeOptions} ${heapOption}`.trim(),
  },
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
