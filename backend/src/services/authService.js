import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDB } from "../db/connection.js";
import dotenv from "dotenv";

dotenv.config();

export async function register({ name, email, password }) {
  if (!name || !email || !password) throw new Error("All fields are required");

  const db = await getDB();
  const hashed = await bcrypt.hash(password, 10);

  try {
    const result = await db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed]
    );

    const user = await db.get("SELECT id, name, email, role FROM users WHERE id = ?", [result.lastID]);
    return user;
  } catch (err) {
    if (err.message.includes("UNIQUE constraint")) {
      throw new Error("Email already registered");
    }
    throw err;
  }
}

export async function login({ email, password }) {
  if (!email || !password) throw new Error("Email and password are required");

  const db = await getDB();
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return token;
}

export async function getUserById(id) {
  const db = await getDB();
  const user = await db.get("SELECT id, name, email, role FROM users WHERE id = ?", [id]);
  return user;
}
