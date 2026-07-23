import { Request, Response } from "express";
import Donation from "../models/Donation";
import RequestModel from "../models/Request";
import { AuthRequest } from "../middleware/authMiddleware";

// Create Donation
export const createDonation = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    console.log("=====================================");
    console.log("Request Body:", req.body);

    const donation = await Donation.create({
      donor: req.user._id,
      foodName: req.body.foodName,
      quantity: req.body.quantity,
      foodType: req.body.foodType,
      description: req.body.description,
      expiryTime: req.body.expiryTime,
      pickupAddress: req.body.pickupAddress,
      latitude: req.body.latitude,
      longitude: req.body.longitude,

      location: {
      type: "Point",
      coordinates: [
      Number(req.body.longitude),
      Number(req.body.latitude),
  ],
},
      image: req.body.image,
    });

    console.log("=====================================");
    console.log("Donation Saved Successfully");
    console.log("Database   :", donation.db.name);
    console.log("Collection :", donation.collection.name);
    console.log("Document ID:", donation._id);
    console.log("Image URL  :", donation.image);
    console.log("=====================================");

    return res.status(201).json({
      success: true,
      message: "Donation Created Successfully",
      donation,
    });

  } catch (error) {

    console.error("Create Donation Error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// Get All Donations

export const getAllDonations = async (req: Request, res: Response) => {
  try {
    const donations = await Donation.find({
      status: "AVAILABLE",
    })
      .populate("donor", "fullName email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch donations",
    });
  }
};

export const getDonationById = async (req: Request, res: Response) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate("donor", "fullName email phone");

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    return res.status(200).json({
      success: true,
      donation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch donation",
    });
  }
};

export const updateDonation = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    // Only owner can update
    if (donation.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    Object.assign(donation, req.body);

    await donation.save();

    return res.status(200).json({
      success: true,
      message: "Donation updated successfully",
      donation,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
export const deleteDonation = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    // Only owner can delete
    if (donation.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await donation.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Donation deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};
// ==============================
// Complete Donation
// ==============================
export const completeDonation = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Find Donation
    const donation = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    // Only donor can complete donation
    if (donation.donor.toString() !== req.user!._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Donation must be RESERVED
    if (donation.status !== "RESERVED") {
      return res.status(400).json({
        success: false,
        message: "Donation is not reserved",
      });
    }

    // Update donation status
    donation.status = "PICKED_UP";
    await donation.save();

    // Update accepted request status
    await RequestModel.findOneAndUpdate(
      {
        donation: donation._id,
        status: "ACCEPTED",
      },
      {
        status: "COMPLETED",
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Donation completed successfully",
      donation,
    });

  } catch (error) {
    console.error("Complete Donation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

// ============================================
// Get Nearby Donations
// ============================================

export const getNearbyDonations = async (
  req: Request,
  res: Response
) => {
  try {
    const latitude = Number(req.query.lat);
    const longitude = Number(req.query.lng);
    const radius = Number(req.query.radius) || 5;

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required",
      });
    }

    const donations = await Donation.find({
      status: "AVAILABLE",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: radius * 1000,
        },
      },
    }).populate("donor", "fullName phone");

    return res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch nearby donations",
    });

  }
};