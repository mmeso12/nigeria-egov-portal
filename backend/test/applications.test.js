import test from "node:test";
import assert from "node:assert";

const BASE_AUTH = "http://localhost:5001/api/auth";
const BASE_APP = "http://localhost:5001/api/applications";

test("Create and fetch application", async () => {
  const email = `app${Date.now()}@test.com`;
  const password = "123456";

  await fetch(`${BASE_AUTH}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "App Tester", email, password }),
  });

  const loginRes = await fetch(`${BASE_AUTH}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const { token } = await loginRes.json();
  assert.ok(token);

  const createRes = await fetch(BASE_APP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      type: "passport",
      data: { fullName: "Tester", dateOfBirth: "1990-01-01" },
    }),
  });
  const createData = await createRes.json();
  assert.equal(createRes.status, 201);
  assert.equal(createData.application.status, "Pending");

  const tracking = createData.application.tracking;

  const trackRes = await fetch(`${BASE_APP}/status/${tracking}`);
  const trackData = await trackRes.json();
  assert.equal(trackData.tracking, tracking);
});
