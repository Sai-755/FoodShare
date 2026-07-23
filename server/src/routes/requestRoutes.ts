import express from "express";
import { protect } from "../middleware/authMiddleware";

import {
  createRequest,
  getDonorRequests,
  acceptRequest,
  rejectRequest,
  getMyRequests,
} from "../controllers/requestController";

const router = express.Router();

router.post("/", protect, createRequest);

router.get("/donor", protect, getDonorRequests);
router.put("/:id/accept", protect, acceptRequest);
router.put("/:id/reject", protect, rejectRequest);
router.get("/my", protect, getMyRequests);

export default router;
// #swagger.tags = ['Requests']

router.post(
  "/",

  // #swagger.tags = ['Requests']
  // #swagger.summary = 'Create Food Request'

  // #swagger.security = [{
  //      "BearerAuth":[]
  // }]

  // #swagger.parameters['body'] = {
  //    in:'body',
  //    schema:{
  //      donationId:'DONATION_ID',
  //      message:'Please donate this food.'
  //    }
  // }

  protect,
  createRequest
);