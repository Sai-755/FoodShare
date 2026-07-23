import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phone: string;

  role:
    | "USER"
    | "RESTAURANT"
    | "NGO"
    | "VOLUNTEER"
    | "ADMIN";

  profileImage?: string;

  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    latitude?: number;
    longitude?: number;
  };

  isVerified: boolean;
  isBlocked: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: [
        "USER",
        "RESTAURANT",
        "NGO",
        "VOLUNTEER",
        "ADMIN",
      ],
      default: "USER",
    },

    profileImage: {
      type: String,
      default: "",
    },

    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      latitude: Number,
      longitude: Number,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);