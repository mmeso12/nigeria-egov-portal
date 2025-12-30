import { getDB } from "../db/connection.js";
import { generateTracking } from "../utils/tracking.js";

export async function createApplication(userId, { type, data }) {
  if (!type || !data) throw new Error("Application type and data are required");

  const tracking = generateTracking(type.toUpperCase());

  const db = await getDB();
  const result = await db.run(
    "INSERT INTO applications (user_id, type, status, data, tracking) VALUES (?, ?, ?, ?, ?)",
    [userId, type, "Pending", JSON.stringify(data), tracking]
  );

  const created = await db.get("SELECT * FROM applications WHERE id = ?", [result.lastID]);

  return {
    ...created,
    data: JSON.parse(created.data),
  };
}

export async function getUserApplications(userId) {
  const db = await getDB();
  const rows = await db.all("SELECT * FROM applications WHERE user_id = ? ORDER BY id DESC", [userId]);
  return rows.map((r) => ({ ...r, data: JSON.parse(r.data) }));
}

export async function getByTracking(tracking) {
  const db = await getDB();
  const row = await db.get("SELECT * FROM applications WHERE tracking = ?", [tracking]);
  if (!row) throw new Error("Application not found");
  return { ...row, data: JSON.parse(row.data) };
}
