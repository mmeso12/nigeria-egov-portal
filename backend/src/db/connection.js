import sqlite3 from "sqlite3";
import { open } from "sqlite";
import dotenv from "dotenv";

dotenv.config();

export async function getDB() {
  return open({
    filename: process.env.DB_PATH,
    driver: sqlite3.Database,
  });
}
