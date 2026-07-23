import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

import Request from "../models/Request";
import Donation from "../models/Donation";
import Notification from "../models/Notifications";

// ==============================
// Create Food Request
// ==============================
export const createRequest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { donationId, message } = req.body;

    // Check if donation exists
    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    // Check donation status
    if (donation.status !== "AVAILABLE") {
      return res.status(400).json({
        success: false,
        message: "Donation is not available",
      });
    }

    // Donor cannot request own donation
    if (donation.donor.toString() === req.user!._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot request your own donation",
      });
    }

    // Prevent duplicate requests
    const existingRequest = await Request.findOne({
      donation: donationId,
      requester: req.user!._id,
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Request already sent",
      });
    }

   // Create request
const request = await Request.create({
  donation: donationId,
  requester: req.user!._id,
  message,
});

// ⭐ NEW: Notify Donor
await Notification.create({
  user: donation.donor,
  title: "New Donation Request",
  message: `${req.user!.fullName} requested "${donation.foodName}".`,
  type: "NEW_REQUEST",
});

    return res.status(201).json({
      success: true,
      message: "Request sent successfully",
      request,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==============================
// Get All Requests For Logged-in Donor
// ==============================
export const getDonorRequests = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const donorId = req.user!._id;

    // Find all donations created by this donor
    const donations = await Donation.find({
      donor: donorId,
    });

    const donationIds = donations.map((donation) => donation._id);

    // Find requests for donor's donations
    const requests = await Request.find({
      donation: {
        $in: donationIds,
      },
    })
      .populate("requester", "fullName email phone")
      .populate(
        "donation",
        "foodName quantity pickupAddress status"
      );

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch requests",
    });
  }
};

// ==============================
// Accept Request
// ==============================
export const acceptRequest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Find Request
    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    // Find Donation
    const donation = await Donation.findById(request.donation);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    // Check donation owner
    if (donation.donor.toString() !== req.user!._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Check request status
    if (request.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Request has already been processed",
      });
    }

    // Accept request
request.status = "ACCEPTED";
await request.save();

// Update donation status
donation.status = "RESERVED";
await donation.save();

// ⭐ NEW: Notify Receiver
await Notification.create({
  user: request.requester,
  title: "Request Accepted",
  message: `Your request for "${donation.foodName}" has been accepted.`,
  type: "REQUEST_ACCEPTED",
});

    return res.status(200).json({
      success: true,
      message: "Request accepted successfully",
      request,
    });

  } catch (error) {
  console.error("Accept Request Error:", error);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error,
  });
}
};
// ==============================
// Reject Request
// ==============================
export const rejectRequest = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Find Request
    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    // Find Donation
    const donation = await Donation.findById(request.donation);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    // Only donor can reject
    if (donation.donor.toString() !== req.user!._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Request should be pending
    if (request.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Request has already been processed",
      });
    }

    // Reject Request
request.status = "REJECTED";
await request.save();

// ⭐ NEW: Notify Receiver
await Notification.create({
  user: request.requester,
  title: "Request Rejected",
  message: `Your request for "${donation.foodName}" has been rejected.`,
  type: "REQUEST_REJECTED",
});

    return res.status(200).json({
      success: true,
      message: "Request rejected successfully",
      request,
    });

  } catch (error) {
    console.error("Reject Request Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// ==============================
// Get Logged-in User Requests
// ==============================
export const getMyRequests = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const requests = await Request.find({
      requester: req.user!._id,
    })
      .populate(
        "donation",
        "foodName quantity pickupAddress status"
      )
      .populate(
        "requester",
        "fullName email phone"
      );

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};