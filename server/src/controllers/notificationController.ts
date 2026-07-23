import { Response } from "express";
import Notification from "../models/Notifications";
import { AuthRequest } from "../middleware/authMiddleware";

// Get Logged-in User Notifications
export const getNotifications = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const notifications = await Notification.find({
      user: req.user!._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

// Mark Notification as Read
export const markAsRead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;
    await notification.save();

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const createNotification = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const notification = await Notification.create({
      user: req.user!._id,
      title: req.body.title,
      message: req.body.message,
      type: req.body.type,
    });

    return res.status(201).json({
      success: true,
      notification,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};