import express from "express";
import { protect } from "../middleware/authMiddleware";
import {
  getDonorDashboard,
  getReceiverDashboard,
} from "../controllers/dashboardController";

const router = express.Router();

router.get("/donor", protect, getDonorDashboard);
router.get("/receiver", protect, getReceiverDashboard);

export default router;

// #swagger.tags = ['Dashboard']