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


  address: string;


  // Account verification

  isVerified: boolean;


  // Account status

  isBlocked: boolean;


  // Email OTP Verification

  emailVerificationOTP?: string;

  emailVerificationExpires?: Date;


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

      minlength: 8,

    },


    phone: {

      type: String,

      required: true,

      unique: true,

      trim: true,

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

      type: String,

      default: "",

      trim: true,

    },


    // Email verification status

    isVerified: {

      type: Boolean,

      default: false,

    },


    // Temporary OTP storage

    emailVerificationOTP: {

      type: String,

      default: "",

    },


    emailVerificationExpires: {

      type: Date,

      default: null,

    },


    // Admin blocking

    isBlocked: {

      type: Boolean,

      default: false,

    },


  },

  {

    timestamps: true,

  }

);



export default mongoose.model<IUser>(
  "User",
  UserSchema
);