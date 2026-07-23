import { Request, Response } from "express";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
      return;
    }

    // Upload image to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "foodshare",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file!.buffer).pipe(stream);
    });

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

  } catch (error) {
    console.error("Upload Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};