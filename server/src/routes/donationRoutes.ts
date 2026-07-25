import { Router } from "express";
import { validate } from "../middleware/validate";
import { createDonationSchema } from "../validators/donationValidator";

import {
  createDonation,
  getAllDonations,
  getDonationById,
  getMyDonations,
  updateDonation,
  deleteDonation,
} from "../controllers/donationController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

// Create Donation
router.post(
  "/",
  protect,
  validate(createDonationSchema),
  createDonation
);

// Get All Donations
router.get("/", getAllDonations);

// Get My Donations
router.get("/my", protect, getMyDonations);

// Get Donation By ID
router.get("/:id", getDonationById);

// Update Donation
router.put("/:id", protect, updateDonation);

// Delete Donation
router.delete("/:id", protect, deleteDonation);

export default router;