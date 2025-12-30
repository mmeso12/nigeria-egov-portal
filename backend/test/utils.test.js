import test from "node:test";
import assert from "node:assert";
import { generateTracking } from "../src/utils/tracking.js";
import { getDB } from "../src/db/connection.js";

test("Tracking number format", () => {
  const code = generateTracking("NIN");
  assert.match(code, /^NIN-/);
});

test("Database connection works", async () => {
  const db = await getDB();
  assert.ok(db);
});
