const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const { once } = require("node:events");
const { test } = require("node:test");
const path = require("node:path");

test("startup fails when MongoDB is unavailable", { timeout: 15000 }, async (t) => {
  const child = spawn(process.execPath, [path.join(__dirname, "../dist/server.js")], {
    env: { ...process.env, PORT: "5000", MONGODB_URI: "mongodb://127.0.0.1:1/bookify" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  t.after(() => { if (child.exitCode === null) child.kill(); });
  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (chunk) => { stdout += chunk; });
  child.stderr.on("data", (chunk) => { stderr += chunk; });
  const [code] = await once(child, "close");
  assert.equal(code, 1);
  assert.match(stderr, /Failed to connect to MongoDB/);
  assert.doesNotMatch(stdout, /API running/);
});
