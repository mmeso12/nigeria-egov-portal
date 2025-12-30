import { getDB } from "./src/db/connection.js";

const email = "john@example.com"; // change to your admin email

const db = await getDB();
await db.run("UPDATE users SET role = 'admin' WHERE email = ?", [email]);
console.log("✅ Admin promoted:", email);
process.exit();
