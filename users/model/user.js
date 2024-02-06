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
    token: { type: String },
  },
  {
    strict: true,
  }
);
module.exports = mongoose.model("user", userSchema);
