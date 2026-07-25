import { Request, Response } from "express";
import Donation from "../models/Donation";

/**
 * Create Donation
 */
export const createDonation = async (req: any, res: Response) => {
  try {
    const {
      foodName,
      description,
      category,
      foodType,
      quantity,
      quantityUnit,
      pickupAddress,
      pickupTime,
      expiryTime,
      latitude,
      longitude,
      images,
    } = req.body;

    const donation = await Donation.create({
      donor: req.user._id,

      foodName,
      description,
      category,
      foodType,
      quantity,
      quantityUnit,
      pickupAddress,
      pickupTime,
      expiryTime,

      latitude,
      longitude,

      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },

      images,
    });

    return res.status(201).json({
      success: true,
      message: "Donation created successfully",
      donation,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Donations
 */
export const getAllDonations = async (
  req: Request,
  res: Response
) => {
  try {
    const donations = await Donation.find({
      isDeleted: false,
    })
      .populate("donor", "fullName email phone")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: donations.length,
      donations,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Donation By ID
 */
export const getDonationById = async (
  req: Request,
  res: Response
) => {
  try {
    const donation = await Donation.findById(
      req.params.id
    ).populate("donor", "fullName email phone");

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation not found",
      });
    }

    donation.views += 1;
    await donation.save();

    return res.json({
      success: true,
      donation,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get My Donations
 */

export const getMyDonations = async (
  req: any,
  res: Response
) => {

  try {

    console.log("🔥 GET MY DONATIONS CALLED");

    console.log("USER:", req.user);


    const donations = await Donation.find({
      donor: req.user._id,
      isDeleted: false,
    }).sort({
      createdAt: -1,
    });


    console.log(
      "DONATIONS COUNT:",
      donations.length
    );


    return res.status(200).json({
      success: true,
      count: donations.length,
      donations,
    });


  } catch (error: any) {

    console.error(
      "❌ GET MY DONATIONS ERROR:",
      error
    );


    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

 /** 
  * Update Donation
 */
export const updateDonation = async (
  req: any,
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

    if (donation.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    return res.json({
      success: true,
      message: "Donation updated successfully",
      donation: updatedDonation,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Delete Donation (Soft Delete)
 */
export const deleteDonation = async (
  req: any,
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

    if (donation.donor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    donation.isDeleted = true;

    await donation.save();

    return res.json({
      success: true,
      message: "Donation deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};