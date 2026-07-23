import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/database";
import mongoose from "mongoose";
import User from "./models/User";

dotenv.config();
console.log("Mongo URI:", process.env.MONGODB_URI);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  console.log("User Model Loaded:", User.modelName);

  app.listen(PORT, () => {
    console.log("=================================");
    console.log("🚀 FoodShare Server Started");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("=================================");
  });
};

startServer();