import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import { initDB } from "./db/migrate.js";
import healthRoutes from "./routes/healthRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/health", healthRoutes);

// DB
initDB();

// Error handler
app.use(errorHandler);

export default app;
