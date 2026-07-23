import { Router } from "express";
import {
    registerUser,
    loginUser,
    getProfile,
} from "../controllers/authController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", registerUser);



router.get(
    "/me", 
    // #swagger.tags = ['Authentication']
// #swagger.summary = 'Get Logged-in User Profile'
    
    
    protect, getProfile);

export default router;

router.post(
  "/login",
  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Login User'
  // #swagger.description = 'Authenticate a user and return a JWT token.'

  // #swagger.parameters['body'] = {
  //    in: 'body',
  //    required: true,
  //    schema: {
  //      email: 'john@example.com',
  //      password: 'Password@123'
  //    }
  // }

  // #swagger.responses[200] = {
  //    description: 'Login Successful'
  // }

  loginUser
);

router.post(
  "/register",

  // #swagger.tags = ['Authentication']
  // #swagger.summary = 'Register User'

  // #swagger.parameters['body'] = {
  //    in:'body',
  //    required:true,
  //    schema:{
  //      fullName:'John Doe',
  //      email:'john@gmail.com',
  //      phone:'9876543210',
  //      password:'Password@123',
  //      role:'DONOR'
  //    }
  // }

  registerUser
);

router.post("/login", loginUser);
