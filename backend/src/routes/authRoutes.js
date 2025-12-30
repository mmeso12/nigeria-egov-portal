import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/authController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

// Signup
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get logged-in user profile
router.get("/profile", verifyToken, getProfile);

export default router;
