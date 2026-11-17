const assert = require("node:assert/strict");
const { once } = require("node:events");
const { after, before, test } = require("node:test");
const { app } = require("../dist/app");
const { config } = require("../dist/config");
const { errorHandler } = require("../dist/middlewares/error.middleware");

let server;
let baseUrl;

before(async () => {
  server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

test("health responds without database or authentication", async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: "ok" });
  assert.equal(res.headers.get("x-powered-by"), null);
  assert.equal(res.headers.get("x-content-type-options"), "nosniff");
});

test("removed authentication routes return JSON 404", async () => {
  for (const path of ["/api/auth/login", "/api/auth/register", "/missing"]) {
    const res = await fetch(`${baseUrl}${path}`, { method: "POST" });
    assert.equal(res.status, 404);
    assert.deepEqual(await res.json(), { message: "Route not found." });
  }
});

test("malformed JSON returns 400", async () => {
  const res = await fetch(`${baseUrl}/health`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  assert.equal(res.status, 400);
  assert.deepEqual(await res.json(), { message: "Invalid request body." });
});

test("oversized JSON returns 413", async () => {
  const res = await fetch(`${baseUrl}/health`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value: "a".repeat(110 * 1024) }),
  });
  assert.equal(res.status, 413);
});

test("CORS preflight allows the configured frontend origin", async () => {
  const res = await fetch(`${baseUrl}/health`, {
    method: "OPTIONS",
    headers: {
      Origin: config.clientOrigin,
      "Access-Control-Request-Method": "GET",
    },
  });
  assert.equal(res.status, 204);
  assert.equal(res.headers.get("access-control-allow-origin"), config.clientOrigin);
});

test("CORS does not allow an arbitrary origin", async () => {
  const res = await fetch(`${baseUrl}/health`, {
    headers: { Origin: "https://untrusted.example" },
  });
  assert.notEqual(res.headers.get("access-control-allow-origin"), "https://untrusted.example");
});

test("unexpected errors do not expose internal details", () => {
  let status;
  let body;
  const originalError = console.error;
  console.error = () => {};
  try {
    errorHandler(new Error("secret connection details"), {}, {
      headersSent: false,
      status(code) { status = code; return this; },
      json(value) { body = value; },
    }, () => assert.fail("Unexpected next call"));
    assert.equal(status, 500);
    assert.deepEqual(body, { message: "Internal server error." });
  } finally {
    console.error = originalError;
  }
});
