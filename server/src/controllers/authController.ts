import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      role,
      address,
    } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      role,
      address,
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

import { generateToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id.toString(), user.role);

  const userResponse = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    profileImage: user.profileImage,
    isVerified: user.isVerified,
};

return res.status(200).json({
    success: true,
    message: "Login Successful",
    token,
    user: userResponse,
});

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProfile = async (req: any, res: Response) => {

    return res.status(200).json({

        success: true,
        user: req.user,

    });

};