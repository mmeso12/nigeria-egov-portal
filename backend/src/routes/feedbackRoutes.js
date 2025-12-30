import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createFeedback, myFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

// Submit feedback
router.post("/", verifyToken, createFeedback);

// View own feedback
router.get("/my", verifyToken, myFeedback);

export default router;
