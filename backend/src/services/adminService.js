import { getDB } from "../db/connection.js";

export async function listAllApplications() {
  const db = await getDB();
  const rows = await db.all("SELECT * FROM applications ORDER BY id DESC");
  return rows.map((r) => ({ ...r, data: JSON.parse(r.data) }));
}

export async function updateApplicationStatus(id, status) {
  const db = await getDB();
  const result = await db.run(
    "UPDATE applications SET status = ? WHERE id = ?",
    [status, id]
  );
  if (result.changes === 0) throw new Error("Application not found");

  const updated = await db.get("SELECT * FROM applications WHERE id = ?", [id]);
  return { ...updated, data: JSON.parse(updated.data) };
}

export async function listAllFeedback() {
  const db = await getDB();
  const rows = await db.all(`
    SELECT feedback.id, users.name AS userName, feedback.message, feedback.created_at
    FROM feedback
    LEFT JOIN users ON feedback.user_id = users.id
    ORDER BY feedback.id DESC
  `);
  return rows;
}
