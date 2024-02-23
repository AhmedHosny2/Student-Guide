const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    semester: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    contributionPoints: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default:false,
    },
    verifyed:{
      type: Boolean,
      default:false,
    },
    OTP: {
      type: String,
    },
    forgetPasswordOTP: {
      type: String,

    },
    forgetPasswordTime: {
      type: Date,
    },
    OTPTiral: {
      type: Number,
      default: 0,
    },
    
    token: { type: String },
  },
  {
    strict: true,
  }
);
module.exports = mongoose.model("user", userSchema);
