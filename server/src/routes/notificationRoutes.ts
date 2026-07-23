import express from "express";
import { protect } from "../middleware/authMiddleware";

import {
  createNotification,
  getNotifications,
  markAsRead,
} from "../controllers/notificationController";

const router = express.Router();
router.post("/", protect, createNotification);

router.get("/", protect, getNotifications);

router.put("/:id/read", protect, markAsRead);

export default router;

// #swagger.tags = ['Notifications']

router.get(
  "/",

  // #swagger.tags = ['Notifications']

  // #swagger.summary = 'Get User Notifications'

  // #swagger.security = [{
  //      "BearerAuth":[]
  // }]

  protect,
  getNotifications
);