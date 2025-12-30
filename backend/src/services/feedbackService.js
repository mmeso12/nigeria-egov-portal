import { getDB } from "../db/connection.js";

export async function submitFeedback(userId, message) {
  if (!message || message.trim().length < 5)
    throw new Error("Feedback message too short");

  const db = await getDB();
  const result = await db.run(
    "INSERT INTO feedback (user_id, message) VALUES (?, ?)",
    [userId, message.trim()]
  );

  const saved = await db.get("SELECT * FROM feedback WHERE id = ?", [result.lastID]);
  return saved;
}

export async function getUserFeedback(userId) {
  const db = await getDB();
  const rows = await db.all(
    "SELECT id, message, created_at FROM feedback WHERE user_id = ? ORDER BY id DESC",
    [userId]
  );
  return rows;
}
