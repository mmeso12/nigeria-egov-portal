import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import { getAllApplications, changeStatus, getAllFeedback } from "../controllers/adminController.js";

const router = express.Router();

// All routes below require admin access
router.use(verifyToken, verifyAdmin);

// List all applications
router.get("/applications", getAllApplications);

// Approve / Reject application
router.patch("/applications/:id/status", changeStatus);

// View all feedback
router.get("/feedback", getAllFeedback);

export default router;
