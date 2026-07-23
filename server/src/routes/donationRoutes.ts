import { Router } from "express";
import {
    createDonation,
    getAllDonations,
    getDonationById,
    updateDonation,
    deleteDonation,
    completeDonation,
    getNearbyDonations,
} from "../controllers/donationController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, createDonation);
router.get("/", getAllDonations);
router.get("/nearby", getNearbyDonations);
router.get("/:id", getDonationById);
router.put("/:id", protect, updateDonation);
router.delete("/:id", protect, deleteDonation);
router.put("/:id/complete", protect, completeDonation);

export default router;

// #swagger.tags = ['Donations']
router.post(
  "/",

  // #swagger.tags = ['Donations']
  // #swagger.summary = 'Create Donation'

  // #swagger.security = [{
  //      "BearerAuth":[]
  // }]

  // #swagger.parameters['body'] = {
  //   in:'body',
  //   schema:{
  //      foodName:'Paneer Biryani',
  //      quantity:'5 Plates',
  //      expiry:'2026-08-01',
  //      pickupAddress:'Hyderabad',
  //      latitude:17.385,
  //      longitude:78.4867
  //   }
  // }

  protect,
  createDonation
);