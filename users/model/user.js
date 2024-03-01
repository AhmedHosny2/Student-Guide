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
      default: false,
    },
    verifyed: {
      type: Boolean,
      default: false,
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
const JTASchema = new Schema({
  Id: {
    type: String,
    required: true,
  },
  courseName: {
    type: Array,
    required: true,
  },
  semester: {
    type: Array,
    required: true,
  },
  Date: { type: Date, default: Date.now },
  days: {
    required: true,
    type: Array,
  },
  email: {
    type: String,
    required: true,
  },
});
module.exports = {
  userModel: mongoose.model("user", userSchema),
   JTAmodel: mongoose.model("JTA", JTASchema),
};


