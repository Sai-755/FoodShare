import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import donationRoutes from "./routes/donationRoutes";
import requestRoutes from "./routes/requestRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import { setupSwagger } from "./swagger";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/notifications", notificationRoutes);
setupSwagger(app);

// Test Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 FoodShare API is running successfully!",
    version: "1.0.0"
  });
});

export default app;