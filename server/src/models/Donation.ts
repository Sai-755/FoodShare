import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
  donor: mongoose.Types.ObjectId;
  foodName: string;
  quantity: number;
  foodType: string;
  description: string;
  expiryTime: Date;
  pickupAddress: string;
  latitude: number;
  longitude: number;

  location: {
    type: string;
    coordinates: number[];
  };

  status: string;
  image: string;
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
    },

    quantity: {
      type: Number,
      required: true,
    },

    foodType: {
      type: String,
      enum: ["Veg", "Non-Veg", "Vegan"],
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    expiryTime: {
      type: Date,
      required: true,
    },

    pickupAddress: {
      type: String,
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

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "AVAILABLE",
        "RESERVED",
        "PICKED_UP",
        "DELIVERED",
        "EXPIRED",
      ],
      default: "AVAILABLE",
    },
  },
  {
    timestamps: true,
  }
);

// GeoSpatial Index
donationSchema.index({
  location: "2dsphere",
});

export default mongoose.model<IDonation>("Donation", donationSchema);