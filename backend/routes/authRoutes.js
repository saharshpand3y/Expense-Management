import express from "express";
import {
  loginUser,
  registerUser,
  getLoggedInUser,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getLoggedInUser);

export default router;
