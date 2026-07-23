import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("=====================================");
    console.log("Connecting to MongoDB...");
    console.log("URI:", process.env.MONGODB_URI);

    mongoose.set("debug", true);

    await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });

    console.log("=====================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log("Database Name :", mongoose.connection.name);
    console.log("Host          :", mongoose.connection.host);
    console.log("Port          :", mongoose.connection.port);
    console.log("Ready State   :", mongoose.connection.readyState);
    console.log("=====================================");

  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;