import mongoose, { Document, Schema } from "mongoose";


export interface IEmailVerification extends Document {

  email: string;

  otp: string;

  expiresAt: Date;

  createdAt: Date;

}


const EmailVerificationSchema =
new Schema<IEmailVerification>(
{

  email: {
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
  },


  otp:{
    type:String,
    required:true,
  },


  expiresAt:{
    type:Date,
    required:true,
  }


},
{
  timestamps:true
});


export default mongoose.model<IEmailVerification>(
  "EmailVerification",
  EmailVerificationSchema
);