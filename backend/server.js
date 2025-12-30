import { createServer } from "http";
import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = createServer(app);

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
