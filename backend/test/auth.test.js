import test from "node:test";
import assert from "node:assert";

const BASE = "http://localhost:5001/api/auth";

test("User registration and login flow", async () => {
  const email = `user${Date.now()}@test.com`;
  const password = "123456";

  const regRes = await fetch(`${BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Test User", email, password }),
  });
  const regData = await regRes.json();
  assert.equal(regRes.status, 201);
  assert.equal(regData.user.email, email);

  const loginRes = await fetch(`${BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const loginData = await loginRes.json();
  assert.equal(loginRes.status, 200);
  assert.ok(loginData.token);
});
