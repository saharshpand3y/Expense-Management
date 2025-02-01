import express from "express";
import {
  addExpense,
  getExpenses,
  getInsights,
  deleteExpense,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addExpense);

router.get("/", protect, getExpenses);

router.get("/insights", protect, getInsights);

router.delete("/:id", protect, deleteExpense);

export default router;
