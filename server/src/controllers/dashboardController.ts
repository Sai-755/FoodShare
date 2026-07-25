import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Donation from "../models/Donation";
import Request from "../models/Request";

// ==========================
// DONOR DASHBOARD
// ==========================
export const getDonorDashboard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const donorId = req.user!._id;

    // Donation Counts
    const totalDonations = await Donation.countDocuments({
      donor: donorId,
    });

    const available = await Donation.countDocuments({
      donor: donorId,
      status: "AVAILABLE",
    });

    const requested = await Donation.countDocuments({
      donor: donorId,
      status: "REQUESTED",
    });

    const pickedUp = await Donation.countDocuments({
      donor: donorId,
      status: "PICKED_UP",
    });

    // Get donor donation IDs
    const donations = await Donation.find({ donor: donorId }).select("_id");

    const donationIds = donations.map((donation) => donation._id);

    // Request Counts
    const pendingRequests = await Request.countDocuments({
      donation: { $in: donationIds },
      status: "PENDING",
    });

    const acceptedRequests = await Request.countDocuments({
      donation: { $in: donationIds },
      status: "ACCEPTED",
    });

    const rejectedRequests = await Request.countDocuments({
      donation: { $in: donationIds },
      status: "REJECTED",
    });

    const completedRequests = await Request.countDocuments({
      donation: { $in: donationIds },
      status: "COMPLETED",
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        totalDonations,
        available,
        requested,
        pickedUp,
        pendingRequests,
        acceptedRequests,
        rejectedRequests,
        completedRequests,
      },
    });
  } catch (error) {
    console.error("Donor Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// RECEIVER DASHBOARD
// ==========================
export const getReceiverDashboard = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const receiverId = req.user!._id;

    const totalRequests = await Request.countDocuments({
      requester: receiverId,
    });

    const pending = await Request.countDocuments({
      requester: receiverId,
      status: "PENDING",
    });

    const accepted = await Request.countDocuments({
      requester: receiverId,
      status: "ACCEPTED",
    });

    const rejected = await Request.countDocuments({
      requester: receiverId,
      status: "REJECTED",
    });

    const completed = await Request.countDocuments({
      requester: receiverId,
      status: "COMPLETED",
    });

    return res.status(200).json({
      success: true,
      dashboard: {
        totalRequests,
        pending,
        accepted,
        rejected,
        completed,
      },
    });
  } catch (error) {
    console.error("Receiver Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};