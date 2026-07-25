import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
  donor: mongoose.Types.ObjectId;

  foodName: string;
  description: string;

  category:
    | "Rice"
    | "Curry"
    | "Bread"
    | "Bakery"
    | "Fruits"
    | "Vegetables"
    | "Beverages"
    | "Snacks"
    | "Other";

  foodType: "Veg" | "Non-Veg" | "Vegan";

  quantity: number;

  quantityUnit:
    | "Plates"
    | "Kg"
    | "Packets"
    | "Boxes"
    | "Liters";

  pickupAddress: string;

  pickupTime: Date;

  expiryTime: Date;

  latitude: number;

  longitude: number;

  location: {
    type: string;
    coordinates: number[];
  };

  images: string[];

  status:
    | "AVAILABLE"
    | "REQUESTED"
    | "ACCEPTED"
    | "RESERVED"
    | "PICKED_UP"
    | "COMPLETED"
    | "EXPIRED"
    | "CANCELLED";

  requestCount: number;

  views: number;

  shares: number;

  isAvailable: boolean;

  isDeleted: boolean;

  createdAt: Date;

  updatedAt: Date;
}

const donationSchema = new Schema<IDonation>(
  {
    donor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    foodName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      enum: [
        "Rice",
        "Curry",
        "Bread",
        "Bakery",
        "Fruits",
        "Vegetables",
        "Beverages",
        "Snacks",
        "Other",
      ],
      required: true,
    },

    foodType: {
      type: String,
      enum: ["Veg", "Non-Veg", "Vegan"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    quantityUnit: {
      type: String,
      enum: [
        "Plates",
        "Kg",
        "Packets",
        "Boxes",
        "Liters",
      ],
      default: "Plates",
    },

    pickupAddress: {
      type: String,
      required: true,
    },

    pickupTime: {
      type: Date,
      required: true,
    },

    expiryTime: {
      type: Date,
      required: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        required: true,
      },
    },

    images: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: [
        "AVAILABLE",
        "REQUESTED",
        "RESERVED",
        "ACCEPTED",
        "PICKED_UP",
        "COMPLETED",
        "EXPIRED",
        "CANCELLED",
      ],
      default: "AVAILABLE",
    },

    requestCount: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },

    shares: {
      type: Number,
      default: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

donationSchema.index({ location: "2dsphere" });
donationSchema.index({ donor: 1 });
donationSchema.index({ status: 1 });
donationSchema.index({ expiryTime: 1 });
donationSchema.index({ createdAt: -1 });

export default mongoose.model<IDonation>(
  "Donation",
  donationSchema
);