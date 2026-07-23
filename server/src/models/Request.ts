import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema(
  {
    donation: {
      type: Schema.Types.ObjectId,
      ref: "Donation",
      required: true,
    },

    requester: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "ACCEPTED",
        "REJECTED",
        "COMPLETED",
      ],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Request", requestSchema);