import { Router } from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  sendEmailOTP,
  verifyEmailOTP,
} from "../controllers/authController";

import { protect } from "../middleware/authMiddleware";


const router = Router();


// Email Verification

router.post(
  "/send-email-otp",
  sendEmailOTP
);


router.post(
  "/verify-email-otp",
  verifyEmailOTP
);


// Register

router.post(
  "/register",
  registerUser
);


// Login

router.post(
  "/login",
  loginUser
);


// Logged-in User Profile

router.get(
  "/profile",
  protect,
  getProfile
);


router.get(
  "/me",
  protect,
  getProfile
);


export default router;