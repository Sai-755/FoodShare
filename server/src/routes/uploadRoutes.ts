import express from "express";
import { protect } from "../middleware/authMiddleware";
import upload from "../middleware/uploadMiddleware";
import { uploadImage } from "../controllers/uploadController";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("image"),
  uploadImage
);

export default router;

// #swagger.tags = ['Upload']
router.post(
  "/",

  // #swagger.tags = ['Upload']

  // #swagger.summary = 'Upload Image to Cloudinary'

  // #swagger.consumes = ['multipart/form-data']

  protect,
  upload.single("image"),
  uploadImage
);