import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from "../models/User";
import EmailVerification from "../models/EmailVerification";

import { generateToken } from "../utils/jwt";
import { sendEmail } from "../utils/sendEmail";


const normaliseEmail = (value: unknown) =>
  String(value || "")
    .trim()
    .toLowerCase();


const normalisePhone = (value: unknown) =>
  String(value || "")
    .trim();



const strongPassword =
/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;



// ================= SEND EMAIL OTP =================


export const sendEmailOTP = async (
req:Request,
res:Response
)=>{

try{


const email =
normaliseEmail(req.body.email);



if(!email){

return res.status(400).json({
success:false,
message:"Email is required"
});

}



const existingUser =
await User.findOne({email});


if(existingUser){

return res.status(409).json({
success:false,
message:"Email already registered"
});

}



const otp =
crypto.randomInt(
100000,
999999
).toString();



await EmailVerification.findOneAndDelete({
email
});



await EmailVerification.create({

email,

otp,

expiresAt:
new Date(
Date.now()+10*60*1000
)

});



await sendEmail(

email,

"FoodShare Email Verification",

`
Welcome to FoodShare.

Your verification OTP is:

${otp}

This code expires in 10 minutes.

Thank you,
FoodShare Team
`

);



return res.json({

success:true,

message:"OTP sent successfully"

});


}catch(error:any){

console.error(
"OTP ERROR:",
error.message
);


return res.status(500).json({

success:false,

message:error.message || "Failed to send OTP"

});

}

};




// ================= VERIFY EMAIL OTP =================



export const verifyEmailOTP = async(
req:Request,
res:Response
)=>{


try{


const email =
normaliseEmail(req.body.email);


const otp =
String(req.body.otp || "");



const verification =
await EmailVerification.findOne({
email
});



if(!verification){

return res.status(400).json({

success:false,

message:"OTP not found"

});

}




if(
verification.expiresAt < new Date()
){

await EmailVerification.deleteOne({
email
});


return res.status(400).json({

success:false,

message:"OTP expired"

});

}




if(
verification.otp !== otp
){

return res.status(400).json({

success:false,

message:"Invalid OTP"

});

}



await EmailVerification.deleteOne({
email
});



return res.json({

success:true,

message:"Email verified successfully"

});



}catch(error){

console.error(error);

return res.status(500).json({

success:false,

message:"OTP verification failed"

});

}


};





// ================= REGISTER =================


export const registerUser = async(
req:Request,
res:Response
)=>{


try{


const fullName =
String(req.body.fullName || "")
.trim();



const email =
normaliseEmail(req.body.email);



const password =
String(req.body.password || "");



const phone =
normalisePhone(req.body.phone);



const {
role,
address
}=req.body;



if(
!fullName ||
!email ||
!phone
){

return res.status(400).json({

success:false,

message:"Required fields missing"

});

}




if(
!strongPassword.test(password)
){

return res.status(400).json({

success:false,

message:
"Password must contain alphabets, numbers, special characters and minimum 8 characters."

});

}



if(
!/^[6-9]\d{9}$/.test(phone)
){

return res.status(400).json({

success:false,

message:
"Invalid mobile number"

});

}



const existingByEmail =
await User.findOne({email});


if(existingByEmail){

return res.status(409).json({

success:false,

message:
"Email already registered"

});

}



const existingByPhone =
await User.findOne({phone});


if(existingByPhone){

return res.status(409).json({

success:false,

message:
"Phone already registered"

});

}



const user =
await User.create({

fullName,

email,

password:
await bcrypt.hash(password,10),

phone,

role,

address:
String(address || "")
.trim(),


isVerified:true

});




return res.status(201).json({

success:true,

message:
"Account created successfully",

data:{

_id:user._id,

fullName:user.fullName,

email:user.email,

role:user.role

}

});


}catch(error){

console.error(error);


return res.status(500).json({

success:false,

message:"Internal Server Error"

});


}


};





// ================= LOGIN =================


export const loginUser = async(
req:Request,
res:Response
)=>{


try{


const email =
normaliseEmail(req.body.email);



const password =
String(req.body.password || "");



const user =
await User.findOne({email});



if(
!user ||
!(await bcrypt.compare(password,user.password))
){

return res.status(401).json({

success:false,

message:"Invalid email or password"

});

}




const token =
generateToken(
user._id.toString(),
user.role
);



return res.json({

success:true,

message:"Login successful",

token,


user:{

_id:user._id,

fullName:user.fullName,

email:user.email,

phone:user.phone,

role:user.role,

profileImage:user.profileImage,

isVerified:user.isVerified

}


});


}catch(error){

console.error(error);


return res.status(500).json({

success:false,

message:"Internal Server Error"

});

}


};





export const getProfile =
async(req:any,res:Response)=>{

return res.status(200).json({

success:true,

user:req.user

});

};