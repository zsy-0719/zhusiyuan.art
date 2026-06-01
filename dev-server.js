const { spawn } = require("child_process");

// Clear problematic NODE_OPTIONS so Next.js Turbopack child processes don't choke
delete process.env.NODE_OPTIONS;

const args = process.argv.slice(2).join(" ");
const child = spawn(
  `npx next dev ${args}`,
  { stdio: "inherit", shell: true }
);

child.on("exit", (code) => process.exit(code));
child.on("error", (err) => {
  console.error("Failed to start dev server:", err.message);
  process.exit(1);
});
