import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { create, myApplications, statusByTracking } from "../controllers/applicationController.js";

const router = express.Router();

// User submits application
router.post("/", verifyToken, create);

// User views their applications
router.get("/my", verifyToken, myApplications);

// Public check status by tracking number
router.get("/status/:tracking", statusByTracking);

export default router;
